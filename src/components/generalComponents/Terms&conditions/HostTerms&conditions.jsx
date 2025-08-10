"use client"

import { useEffect, useRef, useState } from "react"

export default function HostTermsAndConditions({
  effectiveDate = "[INSERT EFFECTIVE DATE]",
  supportEmail = "[SUPPORT_EMAIL]",
  jurisdiction = "[JURISDICTION]",
}) {
  const containerRef = useRef(null)
  const [showTop, setShowTop] = useState(false)

  // In-view reveal for sections and show "back to top" after scroll
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (!prefersReduced) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in-view")
            }
          })
        },
        { threshold: 0.12 },
      )
      const sections = containerRef.current?.querySelectorAll(".tc-section")
      sections?.forEach((s) => io.observe(s))
      return () => io.disconnect()
    }
  }, [])

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 320)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const toc = [
    { id: "welcome", label: "Welcome" },
    { id: "verification", label: "Host Verification" },
    { id: "advance-refunds", label: "Advance & Refunds" },
    { id: "management", label: "Event Management" },
    { id: "conduct", label: "Responsibilities" },
    { id: "payments-wallet", label: "Payments & Wallet" },
    { id: "cancellation-disputes", label: "Cancellation & Disputes" },
    { id: "ip-license", label: "IP & License" },
    { id: "liability", label: "Liability" },
    { id: "modifications", label: "Modifications" },
    { id: "law", label: "Law & Jurisdiction" },
    { id: "contact", label: "Contact & Support" },
  ]

  return (
    <main ref={containerRef} className="relative">
      {/* Hero Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600" />
        {/* subtle pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,.3) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-6 py-12 md:py-16 text-white">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight drop-shadow-sm">
            Host Terms &amp; Conditions
          </h1>
          <p className="mt-3 text-white/90">
            Effective Date: <span className="font-medium">{effectiveDate}</span>
          </p>

          {/* TOC */}
          <nav
            className="mt-6 overflow-x-auto rounded-lg bg-white/10 backdrop-blur-sm ring-1 ring-white/20"
            aria-label="Table of contents"
          >
            <ul className="flex min-w-max gap-3 px-3 py-2 text-sm">
              {toc.map((t) => (
                <li key={t.id}>
                  <a
                    href={`#${t.id}`}
                    className="inline-flex items-center rounded-md px-3 py-1.5 text-white/90 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    {t.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-10 space-y-4">
        {/* Welcome */}
        <section id="welcome" className="tc-section">
          <Card>
            <h2 className="tc-h2">Welcome to Pass-Go Host Platform</h2>
            <p>
              These Terms &amp; Conditions (“Terms”) govern your role as an event host on the Pass-Go platform
              (“Platform”). By creating, managing, or promoting events, you agree to comply with these Terms to ensure
              trust, transparency, and a great experience for both hosts and attendees.
            </p>
          </Card>
        </section>

        {/* 1 */}
        <section id="verification" className="tc-section">
          <Card>
            <h2 className="tc-h2">1. Host Verification &amp; Identity</h2>
            <p>
              You must complete identity verification by submitting a valid PAN card before listing any events. This
              verification helps us reduce fraudulent activities and ensures a secure environment for users.
            </p>
            <p>
              Pass-Go reserves the right to perform background checks and suspend or terminate accounts found involved
              in scams, fraud, or any unlawful activity.
            </p>
          </Card>
        </section>

        {/* 2 */}
        <section id="advance-refunds" className="tc-section">
          <Card>
            <h2 className="tc-h2">2. Advance Payment &amp; Refund Policy</h2>
            <p>
              To list an event, you are required to pay an advance amount to secure your hosting privileges. This
              advance is fully refundable only if you complete the event as scheduled.
            </p>
            <p>
              If you cancel the event before completion, a platform charge of 25% of the advance will be deducted. This
              amount will be withheld to cover administrative costs and platform maintenance.
            </p>
            <p>
              The remaining amount will be refunded to you after deducting the platform charge. The deduction will be
              applied directly to your host wallet or payment method.
            </p>
            <p>
              Upon successful completion of your event, a 10% platform fee will be deducted from your earnings. This fee
              supports continued platform development and user support services.
            </p>
          </Card>
        </section>

        {/* 3 */}
        <section id="management" className="tc-section">
          <Card>
            <h2 className="tc-h2">3. Event Management &amp; Editing</h2>
            <p>
              You can edit your event details at any time before or during the event lifecycle. However, substantial or
              frequent edits may negatively impact user trust and event visibility. We recommend reviewing your event
              information carefully before publishing.
            </p>
            <p>
              Real-time updates for event status, ticket availability, and seat selection must be kept accurate to
              provide a seamless experience to attendees.
            </p>
          </Card>
        </section>

        {/* 4 */}
        <section id="conduct" className="tc-section">
          <Card>
            <h2 className="tc-h2">4. Responsibilities &amp; Conduct</h2>
            <p>
              As a host, you are responsible for delivering the event as described and adhering to all local laws and
              regulations. You agree not to post false, misleading, or offensive content.
            </p>
            <p>
              Any breach of these responsibilities may result in penalties, suspension, or termination of hosting
              privileges.
            </p>
          </Card>
        </section>

        {/* 5 */}
        <section id="payments-wallet" className="tc-section">
          <Card>
            <h2 className="tc-h2">5. Payment Processing &amp; Wallet</h2>
            <p>
              All financial transactions, including advances, fees, refunds, and earnings, will be processed through the
              platform’s wallet system. You are responsible for providing valid payment details for payouts.
            </p>
            <p>
              Withdrawals and payouts are subject to verification and compliance checks. Fraudulent activity or disputes
              may delay or forfeit payments.
            </p>
          </Card>
        </section>

        {/* 6 */}
        <section id="cancellation-disputes" className="tc-section">
          <Card>
            <h2 className="tc-h2">6. Cancellation &amp; Dispute Resolution</h2>
            <p>
              If you cancel an event, please notify affected users promptly via the platform notifications. Refunds and
              platform fees will be applied according to Section 2.
            </p>
            <p>
              Disputes related to cancellations, payments, or user complaints will be resolved according to our dispute
              resolution policy and jurisdiction laws.
            </p>
          </Card>
        </section>

        {/* 7 */}
        <section id="ip-license" className="tc-section">
          <Card>
            <h2 className="tc-h2">7. Intellectual Property &amp; License</h2>
            <p>
              You grant Pass-Go a non-exclusive license to use your event content, images, and descriptions for
              promotional and operational purposes on the Platform.
            </p>
            <p>
              You retain ownership of your content but agree not to post anything that infringes on third-party rights.
            </p>
          </Card>
        </section>

        {/* 8 */}
        <section id="liability" className="tc-section">
          <Card>
            <h2 className="tc-h2">8. Limitation of Liability</h2>
            <p>
              Pass-Go acts as a platform intermediary only and does not take responsibility for event delivery, quality,
              or attendee safety.
            </p>
            <p>
              You agree to indemnify Pass-Go from claims arising from your event, including damages, losses, or legal
              fees.
            </p>
          </Card>
        </section>

        {/* 9 */}
        <section id="modifications" className="tc-section">
          <Card>
            <h2 className="tc-h2">9. Modifications to Terms</h2>
            <p>
              We reserve the right to update or modify these Terms at any time. Continued use of hosting services after
              changes implies acceptance.
            </p>
          </Card>
        </section>

        {/* 10 */}
        <section id="law" className="tc-section">
          <Card>
            <h2 className="tc-h2">10. Governing Law &amp; Jurisdiction</h2>
            <p>
              These Terms are governed by the laws of {jurisdiction}. Any disputes will be resolved in the courts
              located in {jurisdiction}.
            </p>
          </Card>
        </section>

        {/* 11 */}
        <section id="contact" className="tc-section">
          <Card>
            <h2 className="tc-h2">11. Contact &amp; Support</h2>
            <p>
              For questions or assistance regarding your host account or these Terms, please contact us at:{" "}
              <a className="tc-link" href={`mailto:${supportEmail}`}>
                {supportEmail}
              </a>
              .
            </p>
            <p className="text-sm text-gray-500">Last updated: {effectiveDate}. Please review regularly for updates.</p>
          </Card>
        </section>
      </div>

      {/* Back to top */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={[
          "fixed bottom-6 right-6 z-30 rounded-full bg-indigo-600 text-white shadow-lg",
          "hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400",
          "transition-all duration-300",
          showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none",
          "h-11 w-11 grid place-items-center",
        ].join(" ")}
        aria-label="Back to top"
      >
        ↑
      </button>

      {/* Styles for animations and typography */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .tc-section {
            opacity: 0;
            transform: translateY(12px);
            transition: opacity 600ms ease-out, transform 600ms ease-out, box-shadow 300ms ease-out;
            will-change: opacity, transform;
            margin-bottom: 0.5rem;
          }
          .tc-section.in-view {
            opacity: 1;
            transform: translateY(0);
          }
          @media (prefers-reduced-motion: reduce) {
            .tc-section {
              opacity: 1 !important;
              transform: none !important;
              transition: none !important;
            }
          }
          .tc-card {
            background: white;
            border: 1px solid rgba(0,0,0,0.06);
            border-radius: 0.875rem;
            padding: 1.25rem;
            box-shadow: 0 4px 14px rgba(0,0,0,0.06);
          }
          @media (min-width: 768px) {
            .tc-card { padding: 1.75rem; }
          }
          .tc-h2 {
            font-size: clamp(1.125rem, 1.6vw, 1.5rem);
            line-height: 1.3;
            font-weight: 800;
            margin-bottom: 0.75rem;
            background: linear-gradient(90deg, #4338ca, #6d28d9);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
          }
          .tc-ul {
            list-style: disc inside;
            padding-left: 0;
            margin-top: .5rem;
          }
          .tc-link {
            color: #4338ca;
            text-decoration: none;
            position: relative;
          }
          .tc-link::after {
            content: "";
            position: absolute;
            left: 0; bottom: -2px;
            width: 100%;
            height: 2px;
            background: currentColor;
            transform: scaleX(0);
            transform-origin: left;
            transition: transform .25s ease;
          }
          .tc-link:hover::after { transform: scaleX(1); }
          /* :target highlight */
          :target .tc-h2 {
            filter: drop-shadow(0 6px 16px rgba(67,56,202,.18));
          }
        `,
        }}
      />
    </main>
  )
}

function Card({ children }) {
  return <div className="tc-card">{children}</div>
}
