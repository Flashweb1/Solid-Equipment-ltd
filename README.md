# Solid Equipment Ltd website

## Production setup

1. Configure `DATABASE_URL`, then run `npm run db:migrate` followed by
   `npm run db:seed`. The seed is repeatable and updates existing catalog rows.
2. Configure a Firebase Storage bucket for project `solid-equipment-ltd` and
   deploy [storage.rules](./storage.rules). The rules intentionally deny all
   direct client access; uploads go through the server using Firebase Admin.
   Cloud Storage for Firebase requires the Blaze billing plan; the project is
   currently on Spark. Upgrade and set billing alerts before enabling uploads.
   After creating the bucket, deploy its rules with
   `npx firebase-tools@latest deploy --only storage --project solid-equipment-ltd`.
   Set `FIREBASE_PROJECT_ID` and `FIREBASE_STORAGE_BUCKET`. On Google Cloud,
   grant the app's runtime service account permission to write to the bucket.
   Elsewhere, provide `FIREBASE_CLIENT_EMAIL` and `FIREBASE_PRIVATE_KEY` from a
   service account with Storage Object Admin permission, using the hosting
   provider's secret manager. Never commit a service-account key.
3. Configure Resend, verify the sending domain, and set `RESEND_API_KEY`,
   `RFQ_NOTIFICATION_EMAIL`, and `RFQ_FROM_EMAIL`. The RFQ endpoint deliberately
   returns `503` until these notification settings are present.
4. Set production secrets in the hosting provider, verify the custom domain and
   TLS, then run the checks below and submit a real end-to-end RFQ in staging.

Copy `.env.example` to `.env.local` for local development. Firebase browser
configuration is not needed for server-side uploads. Admin sign-in, an RFQ
inbox and an attachment download interface are not implemented yet. For the
admin phase, enable Firebase Authentication (Google sign-in), allow only
approved staff, exchange and verify Firebase ID tokens in server routes, and
serve private attachment downloads only after server-side authorization.

## Checks

```sh
npm run lint
npm run typecheck
npm run build
```

To run a production-build check alongside a local Next.js server on Windows
PowerShell, use a separate output directory:

```powershell
$env:NEXT_DIST_DIR = ".next-validation"
npm run build
Remove-Item Env:NEXT_DIST_DIR
```

## Database

After changing `src/db/schema.ts`, run `npm run db:generate`, review and commit
the generated SQL migration, then run `npm run db:migrate` in each environment.
Run `npm run db:seed` only after the initial migration.
