import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { H2, P, UL } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | TP Dumpsters",
  description:
    "How TP Dumpsters collects, uses and protects your information, including mobile phone numbers and SMS opt-in data.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="September 28, 2026">
      <P>
        TP Dumpsters (&ldquo;TP Dumpsters&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) operates
        tpdumpsters.com and provides roll-off dumpster rental services in the San Francisco Bay Area.
        This Privacy Policy explains what information we collect, why we collect it, and what we do
        with it.
      </P>

      <H2>1. Information we collect</H2>
      <UL>
        <li>
          <strong>Information you give us:</strong> name, phone number, email address, delivery address
          and billing address, the details of your rental, and any notes you send us when you book,
          call, text or email.
        </li>
        <li>
          <strong>Payment information:</strong> card payments are processed by Stripe. We never see or
          store your full card number; we keep only the transaction record and the last four digits.
        </li>
        <li>
          <strong>Usage information:</strong> pages visited, device and browser type, approximate
          location derived from IP address, and referral source, collected through Google Analytics and
          similar tools.
        </li>
      </UL>

      <H2>2. How we use your information</H2>
      <UL>
        <li>To quote, schedule, deliver and pick up your dumpster rental.</li>
        <li>To contact you about your order by phone, text message or email.</li>
        <li>To process payments and issue invoices and receipts.</li>
        <li>To comply with legal, tax and disposal-permit requirements.</li>
        <li>
          To send service updates and promotions, only if you asked to receive them, and only until you
          tell us to stop.
        </li>
      </UL>

      <H2>3. Text messaging and mobile information</H2>
      <P>
        <strong>
          No mobile information will be shared with third parties or affiliates for marketing or
          promotional purposes. All the above categories exclude text messaging originator opt-in data
          and consent; this information will not be shared with any third parties.
        </strong>
      </P>
      <P>
        If you opt in to text messages, we use your mobile number only to send the messages described in
        our{" "}
        <Link href="/sms-policy" className="text-tp-red underline">
          SMS Terms &amp; Conditions
        </Link>
        . You can opt out at any time by replying STOP, and get help by replying HELP. Message and data
        rates may apply.
      </P>

      <H2>4. Who we share information with</H2>
      <P>We do not sell your personal information. We share it only with:</P>
      <UL>
        <li>
          <strong>Service providers acting on our behalf:</strong> our payment processor (Stripe), our
          messaging and phone provider, our email provider, our scheduling and dispatch tools, and our
          website hosting and analytics providers. They may use the information only to perform the
          service they provide to us.
        </li>
        <li>
          <strong>Disposal facilities and haulers</strong>, when required to complete delivery, pickup
          or lawful disposal of your load.
        </li>
        <li>
          <strong>Authorities</strong>, when required by law, subpoena or a valid legal process, or to
          protect our rights, property or safety.
        </li>
      </UL>

      <H2>5. Cookies and analytics</H2>
      <P>
        We use cookies and similar technologies to keep your booking session working, measure how the
        site is used, and understand which ads bring customers. You can block or delete cookies in your
        browser settings; parts of the booking flow may stop working if you do.
      </P>

      <H2>6. Data retention</H2>
      <P>
        We keep booking and payment records for as long as needed to provide the service and to meet
        legal, accounting and tax obligations, typically seven years. Marketing contact information is
        kept until you ask us to remove it.
      </P>

      <H2>7. Your rights (California residents)</H2>
      <P>
        If you are a California resident, you may ask us what personal information we hold about you,
        ask us to delete it, ask us to correct it, and opt out of any sharing of it. We do not sell
        personal information. To make a request, call (510) 650-2083 or email contact@tpdumpsters.com.
        We will not discriminate against you for exercising these rights.
      </P>

      <H2>8. Security</H2>
      <P>
        We use encrypted connections (HTTPS), restricted access to customer records, and reputable
        processors for payments and messaging. No method of transmission or storage is completely
        secure, and we cannot guarantee absolute security.
      </P>

      <H2>9. Children</H2>
      <P>
        Our services are intended for adults. We do not knowingly collect personal information from
        anyone under 18. If you believe a child gave us information, contact us and we will delete it.
      </P>

      <H2>10. Changes to this policy</H2>
      <P>
        We may update this Privacy Policy. The updated version takes effect when it is posted on this
        page, and the &ldquo;Last updated&rdquo; date above will change.
      </P>

      <H2>11. Contact us</H2>
      <P>
        TP Dumpsters
        <br />
        150 Brookside Dr, Richmond, CA 94801
        <br />
        Phone:{" "}
        <a href="tel:+15106502083" className="text-tp-red underline">
          (510) 650-2083
        </a>
        <br />
        Email:{" "}
        <a href="mailto:contact@tpdumpsters.com" className="text-tp-red underline">
          contact@tpdumpsters.com
        </a>
      </P>
    </LegalPage>
  );
}
