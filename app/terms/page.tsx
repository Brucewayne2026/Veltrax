import Link from "next/link";
import Container from "@/components/shared/Container";

export const metadata = {
  title: "Terms of Service — Veltrax",
  description: "Terms governing use of the Veltrax application and website.",
};

export default function TermsOfService() {
  return (
    <main className="bg-black text-white">
      <Container className="py-24 sm:py-32">
        <div className="mx-auto max-w-3xl">
          <Link href="/" className="mb-8 inline-block text-sm text-white/50 hover:text-white/80">
            ← Back to home
          </Link>

          <h1 className="mb-2 font-[family-name:var(--font-heading)] text-4xl font-bold tracking-tight">
            Terms of Service
          </h1>
          <p className="mb-12 text-sm text-white/40">Last updated: [DATE]</p>

          <div className="mb-12 rounded-xl border border-yellow-400/20 bg-yellow-400/5 px-6 py-4 text-sm text-yellow-200/80">
            <strong>Draft notice:</strong> This is a starting template, not a legal document
            reviewed by a lawyer. Have this reviewed by counsel before relying on it, particularly
            the liability, SLA, and termination sections, which need real commitments before
            being published as binding terms.
          </div>

          <div className="flex flex-col gap-8 text-sm leading-relaxed text-white/60">
            <section>
              <h2 className="mb-2 text-lg font-semibold text-white">1. Agreement</h2>
              <p>
                These terms govern use of the Veltrax website and, once a deployment agreement is
                signed, use of the Veltrax application by your organization. Using this website
                or requesting a demo does not itself create a service contract — deployments are
                governed by a separate agreement signed between Veltrax and your organization.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-white">2. Pricing shown on this site</h2>
              <p>
                Pricing displayed on this website is an estimate for planning purposes only.
                Final pricing depends on seat count, deployment complexity, and any custom
                requirements, and is confirmed in a signed agreement before billing begins.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-white">3. Service availability</h2>
              <p>
                Veltrax is deployed on-premise, on infrastructure your organization owns and
                operates. As such, uptime and availability are governed primarily by your own
                infrastructure, network, and IT team — we do not host your production deployment
                and do not offer a hosting SLA by default. Where we are separately engaged to
                assist with hosting, deployment, or maintenance, any uptime commitment will be set
                out explicitly in that agreement, not implied by this website.
              </p>
              <p className="mt-3">
                If your deployment goes offline, staff submissions made during the outage are
                queued locally in the browser and automatically synced once connectivity to your
                server is restored, so no in-progress work is lost on the client side.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-white">4. Data ownership</h2>
              <p>
                Data entered into a Veltrax deployment belongs to the deploying organization, in
                full, at all times. We do not claim any ownership interest in your production
                data, and — because it lives on your own database — we never hold a separate copy
                to return or delete.
              </p>
              <p className="mt-3">
                If you discontinue using Veltrax, you retain full access to export your data (via
                the built-in XLSX/CSV export tools) at any time before or after discontinuation,
                since the database itself remains under your control. Any custom
                data-migration or export assistance beyond the built-in tools would be scoped
                separately.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-white">5. Limitation of liability</h2>
              <p>
                The website and any deployed Veltrax application are provided &quot;as is&quot;
                and &quot;as available,&quot; without warranties of any kind, express or implied,
                except as expressly set out in a signed deployment agreement. To the maximum
                extent permitted by applicable law, Veltrax and its operators will not be liable
                for any indirect, incidental, special, or consequential damages, or for any loss
                of data, revenue, or profits, arising from use of the website or application.
              </p>
              <p className="mt-3">
                Where liability cannot be excluded under applicable law, our total aggregate
                liability arising out of or relating to a deployment will not exceed the fees paid
                by your organization for the service in the twelve (12) months preceding the claim.
                Nothing in these terms limits liability that cannot be limited under applicable law
                (for example, liability for fraud or gross negligence).
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-white">6. Governing law</h2>
              <p>
                These website terms are governed by the laws of India, without regard to conflict
                of law principles, and any dispute arising from use of this website will be
                subject to the exclusive jurisdiction of the courts of India. For a signed
                deployment agreement with an organization based outside India (including the
                United States), the governing law and venue will be specified in that agreement
                and may differ from this default.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-white">7. Contact</h2>
              <p>
                Questions about these terms can be sent to{" "}
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