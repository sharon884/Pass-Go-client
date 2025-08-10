import React from "react";


export default function HostTermsAndConditions({
  effectiveDate = "[INSERT EFFECTIVE DATE]",
  supportEmail = "[SUPPORT_EMAIL]",
  jurisdiction = "[JURISDICTION]",
}) {
  return (
    <main className="prose max-w-3xl mx-auto p-6">
      <header>
        <h1>Host Terms &amp; Conditions</h1>
        <p className="muted">Effective Date: {effectiveDate}</p>
      </header>

      <section>
        <h2>Welcome to Pass-Go Host Platform</h2>
        <p>
          These Terms &amp; Conditions (“Terms”) govern your role as an event host on the Pass-Go platform (“Platform”).
          By creating, managing, or promoting events, you agree to comply with these Terms to ensure trust, transparency,
          and a great experience for both hosts and attendees.
        </p>
      </section>

      <section>
        <h2>1. Host Verification &amp; Identity</h2>
        <p>
          You must complete identity verification by submitting a valid PAN card before listing any events.
          This verification helps us reduce fraudulent activities and ensures a secure environment for users.
        </p>
        <p>
          Pass-Go reserves the right to perform background checks and suspend or terminate accounts found
          involved in scams, fraud, or any unlawful activity.
        </p>
      </section>

      <section>
        <h2>2. Advance Payment &amp; Refund Policy</h2>
        <p>
          To list an event, you are required to pay an advance amount to secure your hosting privileges.
          This advance is fully refundable only if you complete the event as scheduled.
        </p>
        <p>
          If you cancel the event before completion, a platform charge of 25% of the advance will be deducted.
          This amount will be withheld to cover administrative costs and platform maintenance.
        </p>
        <p>
          The remaining amount will be refunded to you after deducting the platform charge.
          The deduction will be applied directly to your host wallet or payment method.
        </p>
        <p>
          Upon successful completion of your event, a 10% platform fee will be deducted from your earnings.
          This fee supports continued platform development and user support services.
        </p>
      </section>

      <section>
        <h2>3. Event Management &amp; Editing</h2>
        <p>
          You can edit your event details at any time before or during the event lifecycle.
          However, substantial or frequent edits may negatively impact user trust and event visibility.
          We recommend reviewing your event information carefully before publishing.
        </p>
        <p>
          Real-time updates for event status, ticket availability, and seat selection must be kept accurate to
          provide a seamless experience to attendees.
        </p>
      </section>

      <section>
        <h2>4. Responsibilities &amp; Conduct</h2>
        <p>
          As a host, you are responsible for delivering the event as described and adhering to all local laws and regulations.
          You agree not to post false, misleading, or offensive content.
        </p>
        <p>
          Any breach of these responsibilities may result in penalties, suspension, or termination of hosting privileges.
        </p>
      </section>

      <section>
        <h2>5. Payment Processing &amp; Wallet</h2>
        <p>
          All financial transactions, including advances, fees, refunds, and earnings, will be processed through the
          platform’s wallet system. You are responsible for providing valid payment details for payouts.
        </p>
        <p>
          Withdrawals and payouts are subject to verification and compliance checks.
          Fraudulent activity or disputes may delay or forfeit payments.
        </p>
      </section>

      <section>
        <h2>6. Cancellation &amp; Dispute Resolution</h2>
        <p>
          If you cancel an event, please notify affected users promptly via the platform notifications.
          Refunds and platform fees will be applied according to Section 2.
        </p>
        <p>
          Disputes related to cancellations, payments, or user complaints will be resolved
          according to our dispute resolution policy and jurisdiction laws.
        </p>
      </section>

      <section>
        <h2>7. Intellectual Property &amp; License</h2>
        <p>
          You grant Pass-Go a non-exclusive license to use your event content, images, and descriptions
          for promotional and operational purposes on the Platform.
        </p>
        <p>
          You retain ownership of your content but agree not to post anything that infringes on third-party rights.
        </p>
      </section>

      <section>
        <h2>8. Limitation of Liability</h2>
        <p>
          Pass-Go acts as a platform intermediary only and does not take responsibility for event delivery,
          quality, or attendee safety.
        </p>
        <p>
          You agree to indemnify Pass-Go from claims arising from your event, including damages, losses,
          or legal fees.
        </p>
      </section>

      <section>
        <h2>9. Modifications to Terms</h2>
        <p>
          We reserve the right to update or modify these Terms at any time.
          Continued use of hosting services after changes implies acceptance.
        </p>
      </section>

      <section>
        <h2>10. Governing Law &amp; Jurisdiction</h2>
        <p>
          These Terms are governed by the laws of {jurisdiction}. Any disputes will be resolved
          in the courts located in {jurisdiction}.
        </p>
      </section>

      <section>
        <h2>11. Contact &amp; Support</h2>
        <p>
          For questions or assistance regarding your host account or these Terms, please contact us at:{" "}
          <a href={`mailto:${supportEmail}`}>{supportEmail}</a>.
        </p>
      </section>

      <footer className="mt-8">
        <p className="text-sm muted">Last updated: {effectiveDate}. Please review regularly for updates.</p>
      </footer>
    </main>
  );
}
