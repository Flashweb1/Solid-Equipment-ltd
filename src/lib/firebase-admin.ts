import {
  applicationDefault,
  cert,
  getApps,
  initializeApp,
} from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

export function getPrivateStorageBucket() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const bucketName = process.env.FIREBASE_STORAGE_BUCKET;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !bucketName) {
    throw new Error(
      "FIREBASE_PROJECT_ID and FIREBASE_STORAGE_BUCKET are required for RFQ attachments."
    );
  }

  if (Boolean(clientEmail) !== Boolean(privateKey)) {
    throw new Error(
      "FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY must both be configured."
    );
  }

  const credential =
    clientEmail && privateKey
      ? cert({
          projectId,
          clientEmail,
          privateKey: privateKey.replace(/\\n/g, "\n"),
        })
      : applicationDefault();

  const app =
    getApps().find((candidate) => candidate.name === "rfq-uploads") ??
    initializeApp(
      { credential, projectId, storageBucket: bucketName },
      "rfq-uploads"
    );

  return getStorage(app).bucket(bucketName);
}
