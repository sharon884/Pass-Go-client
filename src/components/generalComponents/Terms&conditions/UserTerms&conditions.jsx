"use client"

import { useEffect, useRef, useState } from "react"

export default function TermsAndConditions({
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
    { id: "who-can-use", label: "Who Can Use the Platform" },
    { id: "accounts-security", label: "Accounts & Security" },
    { id: "services", label: "Services We Provide" },
    { id: "tickets", label: "Booking & Pricing" },
    { id: "wallets-refunds", label: "Wallets & Refunds" },
    { id: "host-payments", label: "Host Payments" },
    { id: "changes", label: "Event Changes" },
    { id: "prohibited", label: "Prohibited Activities" },
    { id: "user-content", label: "User Content" },
    { id: "notifications", label: "Notifications" },
    { id: "privacy", label: "Privacy" },
    { id: "ip", label: "Intellectual Property" },
    { id: "disclaimer", label: "Disclaimers" },
    { id: "termination", label: "Suspension & Termination" },
    { id: "changes-terms", label: "Changes to Terms" },
    { id: "law-disputes", label: "Governing Law" },
    { id: "contact", label: "Contact" },
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
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight drop-shadow-sm">Terms &amp; Conditions</h1>
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
      <div className="mx-auto max-w-4xl px-6 py-10">
        {/* Welcome */}
        <section id="welcome" className="tc-section">
          <Card>
            <h2 className="tc-h2">Welcome to Pass-Go</h2>
            <p>
              These Terms &amp; Conditions ("Terms") govern your use of the Pass-Go web and mobile applications (the
              "Platform"), including all content, functionality, and services offered on or through the Platform. By
              creating an account or otherwise using the Platform, you agree to be bound by these Terms. If you do not
              agree with any part of these Terms, please do not use the Platform.
            </p>
          </Card>
        </section>

        {/* 1 */}
        <section id="who-can-use" className="tc-section">
          <Card>
            <h2 className="tc-h2">1. Who Can Use the Platform</h2>
            <p>
              You must be at least 18 years old to register and use the Platform without parental or guardian consent.
              If you are under 18 but meet your local legal age to contract, you may use the Platform only with explicit
              parental or guardian permission.
            </p>
            <p>
              You agree to provide accurate, current, and complete information during registration and to keep that
              information up to date. We may suspend or terminate accounts that provide false or misleading details.
            </p>
          </Card>
        </section>

        {/* 2 */}
        <section id="accounts-security" className="tc-section">
          <Card>
            <h2 className="tc-h2">2. Accounts, Authentication &amp; Security</h2>
            <p>
              You may register using an email/password combination or via third-party providers like Google. When you
              sign up using Google Login, you authorize us to access the basic profile information provided by Google
              (name, email, profile image) and you confirm the email is valid.
            </p>
            <p>
              You are responsible for keeping your account credentials secure. Notify us immediately if you suspect any
              unauthorized access or breach of your account. We are not responsible for any losses resulting from
              unauthorized access that results from your failure to keep credentials secure.
            </p>
          </Card>
        </section>

        {/* 3 */}
        <section id="services" className="tc-section">
          <Card>
            <h2 className="tc-h2">3. Services We Provide</h2>
            <p>
              The Platform enables users to discover events, book tickets (free or paid), select seats (where
              applicable), receive notifications, and use promotional offers. Hosts can list events, manage bookings,
              and handle refunds in accordance with platform policies.
            </p>
          </Card>
        </section>

        {/* 4 */}
        <section id="tickets" className="tc-section">
          <Card>
            <h2 className="tc-h2">4. Ticket Booking, Pricing &amp; Confirmation</h2>
            <p>
              All bookings are subject to availability and host confirmation. Ticket prices, fees, and taxes will be
              displayed at checkout. By completing payment you confirm that you have the legal right to use the selected
              payment method.
            </p>
            <p>
              Tickets may be non-transferable unless explicitly allowed by the host. If a booking is canceled by the
              host or the Platform, you will be notified and the applicable refund process will be initiated.
            </p>
          </Card>
        </section>

        {/* 5 */}
        <section id="wallets-refunds" className="tc-section">
          <Card>
            <h2 className="tc-h2">5. Wallets, Payments &amp; Refunds</h2>
            <p>
              The Platform may offer an in-app wallet for credits resulting from refunds, promotions, or other
              adjustments. Wallet balances are subject to verification and may be used for future bookings where
              allowed.
            </p>
            <p>Refund handling depends on the event type and the reason for refund. As a general rule:</p>
            <ul className="tc-ul">
              <li>
                <strong>Host-Initiated Cancellations:</strong> For paid tickets, the Platform will process a refund of
                75% of the ticket price back to the user (the Platform retains 25% as a fee), unless a different split
                is explicitly stated at the time of booking.
              </li>
              <li>
                <strong>Free Tickets:</strong> Free ticket reservations will be voided if the event is canceled; no
                monetary refund applies.
              </li>
              <li>
                <strong>Processing Time:</strong> Refunds may take up to 7–14 business days to appear depending on
                payment providers and banks.
              </li>
            </ul>
          </Card>
        </section>

        {/* 6 */}
        <section id="host-payments" className="tc-section">
          <Card>
            <h2 className="tc-h2">6. Host Advance Payments &amp; Commission</h2>
            <p>
              Hosts may be required to pay an advance or listing fee for certain services. Advance payments are subject
              to the host agreement and fees; full refunds of advance payments are not guaranteed. Platform commissions,
              fees, and retention percentages (for example, the 25% retention on paid-ticket cancellations) are applied
              as stated in host-facing agreements.
            </p>
          </Card>
        </section>

        {/* 7 */}
        <section id="changes" className="tc-section">
          <Card>
            <h2 className="tc-h2">7. Event Changes, Cancellations &amp; Rescheduling</h2>
            <p>
              Hosts may cancel or reschedule events. When an event is canceled by the host, we will notify affected
              users and initiate refunds according to Section 5. If an event is rescheduled, your ticket may remain
              valid for the new date; you will be given directions on how to accept the rescheduled date or request a
              refund where applicable.
            </p>
          </Card>
        </section>

        {/* 8 */}
        <section id="prohibited" className="tc-section">
          <Card>
            <h2 className="tc-h2">8. Prohibited Activities</h2>
            <p>You agree not to:</p>
            <ul className="tc-ul">
              <li>Use the Platform for unlawful or fraudulent purposes.</li>
              <li>
                Resell tickets or otherwise circumvent the Platform&apos;s booking process without our written
                permission.
              </li>
              <li>Interfere with or disrupt the Platform, including attempts to breach security.</li>
              <li>Post false or misleading information about events or other users.</li>
            </ul>
          </Card>
        </section>

        {/* 9 */}
        <section id="user-content" className="tc-section">
          <Card>
            <h2 className="tc-h2">9. User Content &amp; Reviews</h2>
            <p>
              If you post reviews, comments, or other content, you grant the Platform a worldwide, non-exclusive,
              royalty-free license to use, reproduce, and display that content in connection with the Platform. Do not
              post content that infringes on third-party rights or violates applicable laws.
            </p>
          </Card>
        </section>

        {/* 10 */}
        <section id="notifications" className="tc-section">
          <Card>
            <h2 className="tc-h2">10. Notifications &amp; Communications</h2>
            <p>
              By using the Platform you consent to receive transactional messages and notifications via email, SMS, or
              in-app notifications. Marketing messages will only be sent where you have provided consent, and you can
              opt out at any time using account settings or the unsubscribe link in email communications.
            </p>
          </Card>
        </section>

        {/* 11 */}
        <section id="privacy" className="tc-section">
          <Card>
            <h2 className="tc-h2">11. Privacy &amp; Data Processing</h2>
            <p>
              Our use of your personal data is governed by our Privacy Policy. When you sign in using third-party
              providers (e.g., Google), we will access and store the basic profile information necessary to create and
              manage your account.
            </p>
          </Card>
        </section>

        {/* 12 */}
        <section id="ip" className="tc-section">
          <Card>
            <h2 className="tc-h2">12. Intellectual Property</h2>
            <p>
              All intellectual property rights in the Platform, including trademarks, logos, designs, and software, are
              owned by or licensed to the Platform. You may not copy, reproduce, or create derivative works without our
              written permission.
            </p>
          </Card>
        </section>

        {/* 13 */}
        <section id="disclaimer" className="tc-section">
          <Card>
            <h2 className="tc-h2">13. Disclaimers &amp; Limitation of Liability</h2>
            <p>
              The Platform provides a marketplace and is not the event organizer. We are not responsible for the acts or
              omissions of event hosts, or for any injury, loss, or damage incurred as a result of attending an event.
              To the maximum extent permitted by law, our liability for any claim arising out of or related to these
              Terms is limited to the amount paid by you for the single transaction that gave rise to the claim.
            </p>
          </Card>
        </section>

        {/* 14 */}
        <section id="termination" className="tc-section">
          <Card>
            <h2 className="tc-h2">14. Suspension &amp; Termination</h2>
            <p>
              We reserve the right to suspend or terminate accounts for violations of these Terms, fraudulent behavior,
              or other activities that harm the Platform or other users. Upon termination, certain data may be retained
              for legal or operational purposes.
            </p>
          </Card>
        </section>

        {/* 15 */}
        <section id="changes-terms" className="tc-section">
          <Card>
            <h2 className="tc-h2">15. Changes to These Terms</h2>
            <p>
              We may modify these Terms from time to time. When we do, we will post an updated version on the Platform
              with a new &quot;Effective Date&quot;. Continued use of the Platform after the Effective Date constitutes
              acceptance of the updated Terms.
            </p>
          </Card>
        </section>

        {/* 16 */}
        <section id="law-disputes" className="tc-section">
          <Card>
            <h2 className="tc-h2">16. Governing Law &amp; Dispute Resolution</h2>
            <p>
              These Terms are governed by the laws of {jurisdiction}. Any dispute arising from or relating to these
              Terms will be resolved in the competent courts of {jurisdiction}, subject to mandatory consumer protection
              rules applicable in your location.
            </p>
          </Card>
        </section>

        {/* 17 */}
        <section id="contact" className="tc-section">
          <Card>
            <h2 className="tc-h2">17. Contact</h2>
            <p>
              If you have questions or need support, contact us at:{" "}
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
            margin-bottom: 1rem;
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
            text-shadow: 0 0 0 rgba(0,0,0,0);
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
