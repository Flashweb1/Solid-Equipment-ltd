"use client";

import { useRef, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeDollarSign,
  CalendarRange,
  CheckCircle2,
  Cog,
  FileUp,
  Loader2,
  MessageCircle,
  Send,
  Siren,
  Wrench,
  X,
} from "lucide-react";
import { SITE } from "@/lib/site";

const SERVICES = [
  {
    id: "Leasing",
    label: "Leasing",
    desc: "Flexible monthly terms with full operator & maintenance support",
    icon: CalendarRange,
  },
  {
    id: "Outright Purchase",
    label: "Outright Purchase",
    desc: "Full ownership with documentation, inspection & handover",
    icon: BadgeDollarSign,
  },
  {
    id: "Spare Parts",
    label: "Spare Parts",
    desc: "Genuine OEM & aftermarket components, rapid dispatch",
    icon: Cog,
  },
  {
    id: "Field Support",
    label: "Field Support",
    desc: "Technicians, breakdown response & site maintenance AMC",
    icon: Wrench,
  },
];

const EQUIPMENT_CATEGORIES = [
  "Earthmoving",
  "Material Handling",
  "Road & Paving",
  "Attachments",
  "Engine / Turbo",
  "Undercarriage",
  "Wear Parts",
  "Other",
];

const DURATIONS = [
  "Immediate / One-off",
  "Under 1 month",
  "1–6 months",
  "6–12 months",
  "12+ months",
  "Not applicable",
];

const STEPS = ["Service", "Category", "Details", "Contact"];

type FormData = {
  serviceType: string;
  equipmentCategory: string;
  projectDetails: string;
  duration: string;
  partNumbers: string;
  contactName: string;
  company: string;
  email: string;
  phone: string;
  fileName: string;
};

export default function RfqForm({
  prefillService,
  prefillCategory,
  prefillPartNumbers,
  urgent = false,
}: {
  prefillService?: string;
  prefillCategory?: string;
  prefillPartNumbers?: string;
  urgent?: boolean;
}) {
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const [notificationSent, setNotificationSent] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<FormData>({
    serviceType: prefillService ?? "",
    equipmentCategory: prefillCategory ?? "",
    projectDetails: "",
    duration: DURATIONS[0],
    partNumbers: prefillPartNumbers ?? "",
    contactName: "",
    company: "",
    email: "",
    phone: "",
    fileName: "",
  });

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const next = () => {
    setError("");
    if (step === 1 && !data.serviceType)
      return setError("Select a service type to continue.");
    if (step === 2 && !data.equipmentCategory)
      return setError("Select an equipment category to continue.");
    setStep((s) => Math.min(s + 1, 4));
  };

  const back = () => {
    setError("");
    setStep((s) => Math.max(s - 1, 1));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!data.contactName.trim()) return setError("Your name is required.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      return setError("Enter a valid email address.");
    if (data.phone.trim().length < 7)
      return setError("Enter a valid phone number.");
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.set("payload", JSON.stringify(data));
      if (selectedFile) formData.set("file", selectedFile);

      const res = await fetch("/api/rfq", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error ?? "Submission failed");
      setReference(json.reference);
      setNotificationSent(json.notificationSent !== false);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* ---------- Success screen ---------- */
  if (reference) {
    return (
      <div className="glass p-8 text-center md:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15">
          <CheckCircle2 className="h-8 w-8 text-emerald-400" />
        </div>
        <h3 className="mt-6 font-display text-2xl font-bold text-white md:text-3xl">
          RFQ Received — {reference}
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-steel-300">
          Our procurement desk responds within{" "}
          <span className="font-semibold text-bronze-300">4 working hours</span>.
          For urgent on-site deployment, call the hotline below or continue on
          WhatsApp.
        </p>
        {!notificationSent ? (
          <p className="mx-auto mt-4 max-w-md rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
            Your request was saved, but our email alert did not send. Please
            call us or continue on WhatsApp to ensure a prompt response.
          </p>
        ) : null}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-400"
          >
            <MessageCircle className="h-4 w-4" /> Continue on WhatsApp
          </a>
          <button
            type="button"
            onClick={() => {
              setReference(null);
              setStep(1);
              setData({
                serviceType: "",
                equipmentCategory: "",
                projectDetails: "",
                duration: DURATIONS[0],
                partNumbers: "",
                contactName: "",
                company: "",
                email: "",
                phone: "",
                fileName: "",
              });
              setSelectedFile(null);
              setNotificationSent(true);
            }}
            className="rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-bronze-500 hover:text-bronze-300"
          >
            Submit Another RFQ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass p-6 md:p-10">
      {/* Urgent banner */}
      {urgent ? (
        <div className="mb-6 flex items-center gap-3 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3">
          <Siren className="h-5 w-5 shrink-0 text-red-400" />
          <p className="text-sm text-red-200">
            <span className="font-semibold text-red-300">URGENT ON-SITE REQUEST</span>{" "}
            — this RFQ is flagged for priority dispatch and same-day engineer
            review.
          </p>
        </div>
      ) : null}

      {/* Progress */}
      <div className="mb-8 flex items-center">
        {STEPS.map((label, i) => {
          const n = i + 1;
          const active = step === n;
          const done = step > n;
          return (
            <div key={label} className="flex flex-1 items-center last:flex-none">
              <button
                type="button"
                onClick={() => step > n && setStep(n)}
                className="group flex items-center gap-2.5"
                aria-current={active ? "step" : undefined}
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold transition-colors ${
                    done
                      ? "border-transparent bg-bronze-600 text-white"
                      : active
                        ? "border-bronze-500 text-bronze-300"
                        : "border-white/20 text-steel-400"
                  }`}
                >
                  {done ? <CheckCircle2 className="h-4 w-4" /> : `0${n}`}
                </span>
                <span
                  className={`hidden text-xs font-semibold uppercase sm:block ${
                    active ? "text-white" : "text-steel-400"
                  }`}
                >
                  {label}
                </span>
              </button>
              {n < STEPS.length ? (
                <span
                  className={`mx-3 h-0.5 flex-1 rounded-full transition-colors ${
                    step > n ? "bg-bronze-600" : "bg-white/15"
                  }`}
                />
              ) : null}
            </div>
          );
        })}
      </div>

      <form onSubmit={submit} noValidate>
        {/* STEP 1 — Service */}
        {step === 1 ? (
          <div>
            <h3 className="font-display text-xl font-bold text-white">
              What do you need?
            </h3>
            <p className="mt-1 mb-6 text-sm text-steel-400">
              Select the service that matches your requirement.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {SERVICES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => set("serviceType", s.id)}
                  className={`group flex items-start gap-4 rounded-lg border p-5 text-left transition-colors ${
                    data.serviceType === s.id
                      ? "border-bronze-500/70 bg-bronze-500/10"
                      : "border-white/10 bg-white/[0.03] hover:border-white/30"
                  }`}
                >
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-colors ${
                      data.serviceType === s.id
                        ? "bg-bronze-600 text-white"
                        : "bg-white/10 text-steel-300 group-hover:text-white"
                    }`}
                  >
                    <s.icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-white">
                      {s.label}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-steel-400">
                      {s.desc}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {/* STEP 2 — Category */}
        {step === 2 ? (
          <div>
            <h3 className="font-display text-xl font-bold text-white">
              Equipment category
            </h3>
            <p className="mt-1 mb-6 text-sm text-steel-400">
              Which division does your requirement fall under?
            </p>
            <div className="flex flex-wrap gap-2.5">
              {EQUIPMENT_CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => set("equipmentCategory", c)}
                  className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                    data.equipmentCategory === c
                      ? "border-transparent bg-bronze-600 text-white"
                      : "border-white/15 bg-white/[0.03] text-steel-300 hover:border-white/40 hover:text-white"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {/* STEP 3 — Details */}
        {step === 3 ? (
          <div>
            <h3 className="font-display text-xl font-bold text-white">
              Project details
            </h3>
            <p className="mt-1 mb-6 text-sm text-steel-400">
              Site scope, timelines and part numbers help us quote faster.
            </p>
            <div className="space-y-5">
              <div>
                <label htmlFor="rfq-details" className="mb-2 block text-xs font-semibold text-steel-300">
                  Project scope / requirements
                </label>
                <textarea
                  id="rfq-details"
                  rows={4}
                  value={data.projectDetails}
                  onChange={(e) => set("projectDetails", e.target.value)}
                  placeholder="e.g. 2 excavators for road rehabilitation in Rivers State, 6-month lease with operator…"
                  className="w-full rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-steel-500 transition-colors focus:border-bronze-500 focus:ring-2 focus:ring-bronze-500/20 focus:outline-none"
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="rfq-duration" className="mb-2 block text-xs font-semibold text-steel-300">
                    Required duration
                  </label>
                  <select
                    id="rfq-duration"
                    value={data.duration}
                    onChange={(e) => set("duration", e.target.value)}
                    className="w-full rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white transition-colors focus:border-bronze-500 focus:ring-2 focus:ring-bronze-500/20 focus:outline-none [&>option]:bg-navy-900"
                  >
                    {DURATIONS.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="rfq-parts" className="mb-2 block text-xs font-semibold text-steel-300">
                    Part numbers / models
                  </label>
                  <input
                    id="rfq-parts"
                    type="text"
                    value={data.partNumbers}
                    onChange={(e) => set("partNumbers", e.target.value)}
                    placeholder="e.g. CAT 3306 turbo, 107-5000"
                    className="w-full rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-steel-500 transition-colors focus:border-bronze-500 focus:ring-2 focus:ring-bronze-500/20 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* STEP 4 — Contact */}
        {step === 4 ? (
          <div>
            <h3 className="font-display text-xl font-bold text-white">
              Contact information
            </h3>
            <p className="mt-1 mb-6 text-sm text-steel-400">
              Our engineering desk replies within 4 working hours.
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="rfq-name" className="mb-2 block text-xs font-semibold text-steel-300">
                  Full name *
                </label>
                <input
                  id="rfq-name"
                  type="text"
                  required
                  value={data.contactName}
                  onChange={(e) => set("contactName", e.target.value)}
                  placeholder="Engineer / Procurement contact"
                  className="w-full rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-steel-500 transition-colors focus:border-bronze-500 focus:ring-2 focus:ring-bronze-500/20 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="rfq-company" className="mb-2 block text-xs font-semibold text-steel-300">
                  Company
                </label>
                <input
                  id="rfq-company"
                  type="text"
                  value={data.company}
                  onChange={(e) => set("company", e.target.value)}
                  placeholder="Company / site name"
                  className="w-full rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-steel-500 transition-colors focus:border-bronze-500 focus:ring-2 focus:ring-bronze-500/20 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="rfq-email" className="mb-2 block text-xs font-semibold text-steel-300">
                  Email *
                </label>
                <input
                  id="rfq-email"
                  type="email"
                  required
                  value={data.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="you@company.com"
                  className="w-full rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-steel-500 transition-colors focus:border-bronze-500 focus:ring-2 focus:ring-bronze-500/20 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="rfq-phone" className="mb-2 block text-xs font-semibold text-steel-300">
                  Phone / WhatsApp *
                </label>
                <input
                  id="rfq-phone"
                  type="tel"
                  required
                  value={data.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder="+234 …"
                  className="w-full rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-steel-500 transition-colors focus:border-bronze-500 focus:ring-2 focus:ring-bronze-500/20 focus:outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <span className="mb-2 block text-xs font-semibold text-steel-300">
                  Attachment (optional)
                </span>
                <label
                  htmlFor="rfq-file"
                  className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-dashed border-white/20 bg-white/[0.03] px-5 py-4 transition-colors hover:border-bronze-500/70 hover:bg-bronze-500/5"
                >
                  <span className="flex items-center gap-3 text-sm text-steel-300">
                    <FileUp className="h-5 w-5 text-bronze-400" />
                    {data.fileName
                      ? data.fileName
                      : "Upload CAD drawing, spec sheet, or photo of part tag"}
                  </span>
                  {data.fileName ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        set("fileName", "");
                        setSelectedFile(null);
                        if (fileInputRef.current) fileInputRef.current.value = "";
                      }}
                      className="text-steel-400 hover:text-white"
                      aria-label="Remove file"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  ) : (
                    <span className="text-xs font-semibold text-bronze-400">
                      Browse
                    </span>
                  )}
                  <input
                    id="rfq-file"
                    ref={fileInputRef}
                    type="file"
                    className="sr-only"
                    accept=".pdf,.png,.jpg,.jpeg,.dwg,.dxf,.step,.stp"
                    onChange={(e) => {
                      const file = e.target.files?.[0] ?? null;
                      setSelectedFile(file);
                      set("fileName", file?.name ?? "");
                    }}
                  />
                </label>
                <p className="mt-2 text-xs leading-relaxed text-steel-500">
                  PDF, image or CAD file, up to 10 MB. Attachments are stored
                  privately in Firebase and are not publicly accessible.
                </p>
              </div>
            </div>
          </div>
        ) : null}

        {error ? (
          <p className="mt-6 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        ) : null}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between gap-4">
          {step > 1 ? (
            <button
              type="button"
              onClick={back}
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-6 py-3 text-sm font-semibold text-steel-300 transition-colors hover:border-white/40 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
          ) : (
            <span />
          )}
          {step < 4 ? (
            <button
              type="button"
              onClick={next}
              className="inline-flex items-center gap-2 rounded-lg bg-bronze-600 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-bronze-500"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-lg bg-bronze-600 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-bronze-500 disabled:opacity-60"
            >
              {submitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              {submitting ? "Transmitting…" : "Submit RFQ"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
