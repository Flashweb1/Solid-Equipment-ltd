import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { Resend } from "resend";
import { db } from "@/db";
import { rfqSubmissions } from "@/db/schema";
import { getPrivateStorageBucket } from "@/lib/firebase-admin";
import { formatReference } from "@/lib/site";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const SERVICES = [
  "Leasing",
  "Outright Purchase",
  "Spare Parts",
  "Field Support",
];
const CATEGORIES = [
  "Earthmoving",
  "Material Handling",
  "Road & Paving",
  "Attachments",
  "Engine / Turbo",
  "Undercarriage",
  "Wear Parts",
  "Other",
];
const FILE_EXTENSIONS = new Set([
  "pdf",
  "png",
  "jpg",
  "jpeg",
  "dwg",
  "dxf",
  "step",
  "stp",
]);
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_REQUEST_SIZE = MAX_FILE_SIZE + 64 * 1024;

function str(value: unknown, max = 2000): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed && trimmed.length <= max ? trimmed : null;
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length"));
  if (contentLength > MAX_REQUEST_SIZE) {
    return NextResponse.json(
      { ok: false, error: "The attachment must be 10 MB or smaller." },
      { status: 413 }
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const notificationEmail = process.env.RFQ_NOTIFICATION_EMAIL;
  const fromEmail = process.env.RFQ_FROM_EMAIL;
  if (!resendApiKey || !notificationEmail || !fromEmail) {
    console.error("RFQ submission is unavailable: email notification is not configured.");
    return NextResponse.json(
      {
        ok: false,
        error: "The quotation form is temporarily unavailable. Please call our hotline.",
      },
      { status: 503 }
    );
  }

  let uploadedFilePath: string | null = null;
  try {
    const formData = await request.formData();
    const payload = formData.get("payload");
    const fileValue = formData.get("file");
    if (
      typeof payload !== "string" ||
      (fileValue !== null && typeof fileValue === "string")
    ) {
      return NextResponse.json(
        { ok: false, error: "Invalid form submission." },
        { status: 400 }
      );
    }

    const parsed: unknown = JSON.parse(payload);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return NextResponse.json(
        { ok: false, error: "Invalid form submission." },
        { status: 400 }
      );
    }
    const body = parsed as Record<string, unknown>;
    const serviceType = str(body.serviceType, 100);
    const equipmentCategory = str(body.equipmentCategory, 100);
    const contactName = str(body.contactName, 200);
    const email = str(body.email, 200);
    const phone = str(body.phone, 60);

    if (
      !serviceType ||
      !SERVICES.includes(serviceType) ||
      !equipmentCategory ||
      !CATEGORIES.includes(equipmentCategory) ||
      !contactName ||
      !email ||
      !phone
    ) {
      return NextResponse.json(
        { ok: false, error: "Complete all required fields with valid selections." },
        { status: 400 }
      );
    }
    if (
      phone.length < 7 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json(
        { ok: false, error: "Enter valid contact details." },
        { status: 400 }
      );
    }

    let fileName: string | null = null;
    if (fileValue !== null && typeof fileValue !== "string" && fileValue.size > 0) {
      if (fileValue.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { ok: false, error: "The attachment must be 10 MB or smaller." },
          { status: 413 }
        );
      }

      const originalName = (fileValue.name.split(/[\\/]/).pop() ?? "")
        .replace(/[^\w.\- ()]/g, "_")
        .slice(0, 300);
      const extension = originalName.split(".").pop()?.toLowerCase() ?? "";
      if (
        !FILE_EXTENSIONS.has(extension) ||
        (fileValue.type &&
          fileValue.type !== "application/octet-stream" &&
          ![
            "application/pdf",
            "image/png",
            "image/jpeg",
            "image/vnd.dwg",
            "application/acad",
            "application/dxf",
            "application/step",
            "model/step",
          ].includes(fileValue.type))
      ) {
        return NextResponse.json(
          { ok: false, error: "That attachment type is not supported." },
          { status: 400 }
        );
      }

      const storage = getPrivateStorageBucket();
      uploadedFilePath = `rfq-attachments/${randomUUID()}.${extension}`;
      await storage.file(uploadedFilePath).save(
        Buffer.from(await fileValue.arrayBuffer()),
        {
          resumable: false,
          metadata: {
            contentType: fileValue.type || "application/octet-stream",
            cacheControl: "private, no-store",
          },
        }
      );
      fileName = originalName;
    }

    const [row] = await db
      .insert(rfqSubmissions)
      .values({
        serviceType,
        equipmentCategory,
        projectDetails: str(body.projectDetails),
        duration: str(body.duration, 100),
        partNumbers: str(body.partNumbers, 500),
        contactName,
        company: str(body.company, 200),
        email,
        phone,
        fileName,
        filePath: uploadedFilePath,
      })
      .returning({ id: rfqSubmissions.id });

    const reference = formatReference(row.id);
    let notificationSent = false;
    try {
      const resend = new Resend(resendApiKey);
      const notification = await resend.emails.send({
        from: fromEmail,
        to: notificationEmail,
        replyTo: email,
        subject: `New quotation request — ${reference}`,
        text: [
          `Reference: ${reference}`,
          `Service: ${serviceType}`,
          `Category: ${equipmentCategory}`,
          `Name: ${contactName}`,
          `Company: ${str(body.company, 200) ?? "Not provided"}`,
          `Email: ${email}`,
          `Phone: ${phone}`,
          `Duration: ${str(body.duration, 100) ?? "Not provided"}`,
          `Part numbers / models: ${str(body.partNumbers, 500) ?? "Not provided"}`,
          `Project details: ${str(body.projectDetails) ?? "Not provided"}`,
          `Attachment: ${fileName ?? "None"}`,
          `Private Firebase Storage path: ${uploadedFilePath ?? "None"}`,
        ].join("\n"),
      });
      if (notification.error) throw notification.error;
      notificationSent = true;
    } catch (notificationError) {
      console.error("RFQ saved, but staff email notification failed:", notificationError);
    }

    return NextResponse.json({ ok: true, reference, notificationSent });
  } catch (error) {
    console.error("RFQ submission failed:", error);
    if (uploadedFilePath) {
      try {
        await getPrivateStorageBucket().file(uploadedFilePath).delete();
      } catch (cleanupError) {
        console.error("Failed to remove orphaned RFQ attachment:", cleanupError);
      }
    }
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { ok: false, error: "Invalid form submission." },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { ok: false, error: "Submission failed. Please try again or call our hotline." },
      { status: 500 }
    );
  }
}
