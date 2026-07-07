import Link from "next/link";
import Container from "@/components/shared/Container";

export const metadata = {
  title: "Privacy Policy — Veltrax",
  description: "How Veltrax handles data for deployments and website visitors.",
};

export default function PrivacyPolicy() {
  return (
    <main className="bg-black text-white">
      <Container className="py-24 sm:py-32">
        <div className="mx-auto max-w-3xl">
          <Link href="/" className="mb-8 inline-block text-sm text-white/50 hover:text-white/80">
            ← Back to home
          </Link>

          <h1 className="mb-2 font-[family-name:var(--font-heading)] text-4xl font-bold tracking-tight">
            Privacy Policy
          </h1>
          <p className="mb-12 text-sm text-white/40">Last updated: [DATE]</p>

          <div className="mb-12 rounded-xl border border-yellow-400/20 bg-yellow-400/5 px-6 py-4 text-sm text-yellow-200/80">
            <strong>Draft notice:</strong> This is a starting template, not a legal document
            reviewed by a lawyer. Given Veltrax handles RCM / medical billing workflow data,
            have this reviewed by counsel — especially around data handling, retention, and any
            HIPAA-adjacent obligations for your specific deployments — before relying on it.
          </div>

          <div className="flex flex-col gap-8 text-sm leading-relaxed text-white/60">
            <section>
              <h2 className="mb-2 text-lg font-semibold text-white">1. What this policy covers</h2>
              <p>
                This policy explains how Veltrax (&quot;we,&quot; &quot;us&quot;) collects and
                handles information in two contexts: (a) when you visit this marketing website,
                and (b) when your organization deploys the Veltrax application. These are
                different data flows and are described separately below.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-white">2. Website visitors</h2>
              <p>
                When you browse veltrax.in, we may collect standard analytics data (pages
                visited, approximate location by IP, browser/device type, referral source)
                through Google Analytics. If you submit the &quot;Request a demo&quot; form, we
                collect the information you provide — name, work email, company, and any message
                you include — solely to respond to your inquiry. We do not sell this information
                or share it with third parties for marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-white">3. Deployed application data</h2>
              <p>
                Veltrax is deployed on-premise, on infrastructure controlled by your
                organization. Production data entered into a Veltrax deployment (staff
                submissions, task records, timestamps, leave data, and any AI assistant queries)
                resides on your servers and database — we do not host or have standing access to
                this data unless explicitly engaged for support.
              </p>
              <p className="mt-3">
                The AI assistant feature sends only the specific query context needed to answer a
                request to an external model provider (currently Groq). No credentials, full
                database contents, or data outside the scoped query context are transmitted.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-white">4. Data retention</h2>
              <p>
                Because Veltrax runs on infrastructure your organization controls, your
                organization sets its own retention practices for production data, backups, and
                logs — we do not independently retain or delete this data unless engaged for
                support. Data submitted through this website (demo requests, contact form
                submissions) is retained only as long as needed to respond to your inquiry and for
                our own record-keeping, and is not kept indefinitely.
              </p>
              <p className="mt-3">
                If your organization discontinues use of Veltrax, all production data remains on
                your own servers and database under your control — there is nothing on our side
                to delete, since we never held a copy. You can export any table via the built-in
                XLSX/CSV export tools at any time before or after discontinuing service.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-white">5. Your rights</h2>
              <p>
                Veltrax does not process Protected Health Information (PHI) — it tracks staff
                task and production activity, not patient records. The personal data we do handle
                is limited to (a) website visitor analytics, (b) information submitted through the
                demo/contact form, and (c) staff account and activity data within a customer&apos;s
                own deployment, which that customer controls as data controller.
              </p>
              <p className="mt-3">
                <strong className="text-white/80">If you are in India:</strong> under the Digital
                Personal Data Protection Act, 2023, you may request access to, correction of, or
                erasure of your personal data, and may raise a grievance with us directly. For
                data held within a customer&apos;s Veltrax deployment, that customer (as Data
                Fiduciary) is responsible for handling such requests from its own staff; contact
                your organization&apos;s Veltrax administrator first.
              </p>
              <p className="mt-3">
                <strong className="text-white/80">If you are in the United States (e.g. California
                residents under the CCPA/CPRA):</strong> you may request to know what personal
                information we hold about you, request its deletion, and opt out of any sale or
                sharing of personal information. We do not sell or share personal information with
                third parties for cross-context behavioral advertising.
              </p>
              <p className="mt-3">
                To exercise any of these rights for data we hold directly (website/demo form
                data), email us using the contact below. We will respond within a reasonable time
                and may need to verify your identity first.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-white">6. Contact</h2>
              <p>
                Questions about this policy can be sent to{" "}
                <a href="mailto:hello@veltrax.in" className="text-[#47D7FF] hover:underline">
                  hello@veltrax.in
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}