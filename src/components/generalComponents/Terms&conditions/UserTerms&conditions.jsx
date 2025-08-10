import React from "react";

export default function TermsAndConditions({
  effectiveDate = "[INSERT EFFECTIVE DATE]",
  supportEmail = "[SUPPORT_EMAIL]",
  jurisdiction = "[JURISDICTION]",
}) {
  return (
    <main className="prose max-w-3xl mx-auto p-6">
      <header>
        <h1>Terms &amp; Conditions</h1>
        <p className="muted">Effective Date: {effectiveDate}</p>
      </header>

      <section>
        <h2>Welcome to Pass-Go</h2>
        <p>
          These Terms &amp; Conditions ("Terms") govern your use of the Pass-Go web and mobile
          applications (the "Platform"), including all content, functionality, and services
          offered on or through the Platform. By creating an account or otherwise using the
          Platform, you agree to be bound by these Terms. If you do not agree with any part of
          these Terms, please do not use the Platform.
        </p>
      </section>

      <section>
        <h2>1. Who Can Use the Platform</h2>
        <p>
          You must be at least 18 years old to register and use the Platform without parental or
          guardian consent. If you are under 18 but meet your local legal age to contract, you may
          use the Platform only with explicit parental or guardian permission.
        </p>
        <p>
          You agree to provide accurate, current, and complete information during registration and
          to keep that information up to date. We may suspend or terminate accounts that provide
          false or misleading details.
        </p>
      </section>

      <section>
        <h2>2. Accounts, Authentication &amp; Security</h2>
        <p>
          You may register using an email/password combination or via third-party providers like
          Google. When you sign up using Google Login, you authorize us to access the basic profile
          information provided by Google (name, email, profile image) and you confirm the email is
          valid.
        </p>
        <p>
          You are responsible for keeping your account credentials secure. Notify us immediately if
          you suspect any unauthorized access or breach of your account. We are not responsible for
          any losses resulting from unauthorized access that results from your failure to keep
          credentials secure.
        </p>
      </section>

      <section>
        <h2>3. Services We Provide</h2>
        <p>
          The Platform enables users to discover events, book tickets (free or paid), select seats
          (where applicable), receive notifications, and use promotional offers. Hosts can list
          events, manage bookings, and handle refunds in accordance with platform policies.
        </p>
      </section>

      <section>
        <h2>4. Ticket Booking, Pricing &amp; Confirmation</h2>
        <p>
          All bookings are subject to availability and host confirmation. Ticket prices, fees, and
          taxes will be displayed at checkout. By completing payment you confirm that you have the
          legal right to use the selected payment method.
        </p>
        <p>
          Tickets may be non-transferable unless explicitly allowed by the host. If a booking is
          canceled by the host or the Platform, you will be notified and the applicable refund
          process will be initiated.
        </p>
      </section>

      <section>
        <h2>5. Wallets, Payments &amp; Refunds</h2>
        <p>
          The Platform may offer an in-app wallet for credits resulting from refunds, promotions,
          or other adjustments. Wallet balances are subject to verification and may be used for
          future bookings where allowed.
        </p>
        <p>
          Refund handling depends on the event type and the reason for refund. As a general rule:
        </p>
        <ul>
          <li>
            <strong>Host-Initiated Cancellations:</strong> For paid tickets, the Platform will
            process a refund of 75% of the ticket price back to the user (the Platform retains 25%
            as a fee), unless a different split is explicitly stated at the time of booking.
          </li>
          <li>
            <strong>Free Tickets:</strong> Free ticket reservations will be voided if the event is
            canceled; no monetary refund applies.
          </li>
          <li>
            <strong>Processing Time:</strong> Refunds may take up to 7–14 business days to appear
            depending on payment providers and banks.
          </li>
        </ul>
      </section>

      <section>
        <h2>6. Host Advance Payments &amp; Commission</h2>
        <p>
          Hosts may be required to pay an advance or listing fee for certain services. Advance
          payments are subject to the host agreement and fees; full refunds of advance payments are
          not guaranteed. Platform commissions, fees, and retention percentages (for example, the
          25% retention on paid-ticket cancellations) are applied as stated in host-facing
          agreements.
        </p>
      </section>

      <section>
        <h2>7. Event Changes, Cancellations &amp; Rescheduling</h2>
        <p>
          Hosts may cancel or reschedule events. When an event is canceled by the host, we will
          notify affected users and initiate refunds according to Section 5. If an event is
          rescheduled, your ticket may remain valid for the new date; you will be given directions
          on how to accept the rescheduled date or request a refund where applicable.
        </p>
      </section>

      <section>
        <h2>8. Prohibited Activities</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the Platform for unlawful or fraudulent purposes.</li>
          <li>Resell tickets or otherwise circumvent the Platform's booking process without our
            written permission.</li>
          <li>Interfere with or disrupt the Platform, including attempts to breach security.</li>
          <li>Post false or misleading information about events or other users.</li>
        </ul>
      </section>

      <section>
        <h2>9. User Content &amp; Reviews</h2>
        <p>
          If you post reviews, comments, or other content, you grant the Platform a worldwide,
          non-exclusive, royalty-free license to use, reproduce, and display that content in
          connection with the Platform. Do not post content that infringes on third-party rights or
          violates applicable laws.
        </p>
      </section>

      <section>
        <h2>10. Notifications &amp; Communications</h2>
        <p>
          By using the Platform you consent to receive transactional messages and notifications via
          email, SMS, or in-app notifications. Marketing messages will only be sent where you have
          provided consent, and you can opt out at any time using account settings or the unsubscribe
          link in email communications.
        </p>
      </section>

      <section>
        <h2>11. Privacy &amp; Data Processing</h2>
        <p>
          Our use of your personal data is governed by our Privacy Policy. When you sign in using
          third-party providers (e.g., Google), we will access and store the basic profile
          information necessary to create and manage your account.
        </p>
      </section>

      <section>
        <h2>12. Intellectual Property</h2>
        <p>
          All intellectual property rights in the Platform, including trademarks, logos, designs,
          and software, are owned by or licensed to the Platform. You may not copy, reproduce, or
          create derivative works without our written permission.
        </p>
      </section>

      <section>
        <h2>13. Disclaimers &amp; Limitation of Liability</h2>
        <p>
          The Platform provides a marketplace and is not the event organizer. We are not responsible
          for the acts or omissions of event hosts, or for any injury, loss, or damage incurred as a
          result of attending an event. To the maximum extent permitted by law, our liability for
          any claim arising out of or related to these Terms is limited to the amount paid by you
          for the single transaction that gave rise to the claim.
        </p>
      </section>

      <section>
        <h2>14. Suspension &amp; Termination</h2>
        <p>
          We reserve the right to suspend or terminate accounts for violations of these Terms,
          fraudulent behavior, or other activities that harm the Platform or other users. Upon
          termination, certain data may be retained for legal or operational purposes.
        </p>
      </section>

      <section>
        <h2>15. Changes to These Terms</h2>
        <p>
          We may modify these Terms from time to time. When we do, we will post an updated version
          on the Platform with a new "Effective Date". Continued use of the Platform after the
          Effective Date constitutes acceptance of the updated Terms.
        </p>
      </section>

      <section>
        <h2>16. Governing Law &amp; Dispute Resolution</h2>
        <p>
          These Terms are governed by the laws of {jurisdiction}. Any dispute arising from or
          relating to these Terms will be resolved in the competent courts of {jurisdiction},
          subject to mandatory consumer protection rules applicable in your location.
        </p>
      </section>

      <section>
        <h2>17. Contact</h2>
        <p>
          If you have questions or need support, contact us at: <a href={`mailto:${supportEmail}`}>{supportEmail}</a>.
        </p>
      </section>

      <footer className="mt-8">
        <p className="text-sm muted">Last updated: {effectiveDate}. Please review regularly for updates.</p>
      </footer>
    </main>
  );
}
