import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { H2, P, UL } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions | TP Dumpsters",
  description:
    "Terms and conditions for renting a roll-off dumpster from TP Dumpsters: rental periods, weight limits, prohibited items, cancellations, payment and liability.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions" updated="September 28, 2026">
      <P>
        These Terms &amp; Conditions govern the rental of roll-off dumpsters and related services from
        TP Dumpsters (&ldquo;TP Dumpsters&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). <strong>TP Dumpsters is a brand operated by Tp Pavers services Inc (EIN 99-2533265), a California corporation.</strong> By booking online, by phone or by email, you agree to them. The prices and fees shown to you at checkout are the ones
        that govern your rental; the amounts quoted below are current as of the date above.
      </P>

      <H2>1. Services and service area</H2>
      <P>
        We deliver, place, pick up and lawfully dispose of roll-off dumpsters in the San Francisco Bay
        Area, including Contra Costa, Alameda, Solano, Marin, San Mateo and Santa Clara counties.
        Delivery, pickup and disposal of the included weight are part of the quoted price.
      </P>

      <H2>2. Booking and payment</H2>
      <UL>
        <li>Full payment is due at the time of booking. We accept major credit and debit cards.</li>
        <li>Card payments are processed by Stripe. We do not store full card numbers.</li>
        <li>
          By completing checkout you authorize TP Dumpsters to charge the card on file for any
          additional fees described in these terms and incurred during your rental.
        </li>
        <li>Additional charges may be processed after the dumpster is picked up and weighed.</li>
      </UL>

      <H2>3. Rental period and extra days</H2>
      <UL>
        <li>10-yard dumpsters include a 3-day rental period.</li>
        <li>20-yard and 30-yard dumpsters include a 7-day rental period.</li>
        <li>
          The period starts on the delivery date. Days beyond the included period are billed at the
          daily rate shown at checkout ($49 per day as of the date above), up to a maximum of 14 extra
          days.
        </li>
        <li>
          Need more time? Call us before the pickup date and we will extend the rental instead of
          charging you a surprise.
        </li>
      </UL>

      <H2>4. Weight limits and overweight charges</H2>
      <P>
        Each size includes a set tonnage: 1 ton on the 10-yard, 2 tons on the 20-yard and 3 tons on the
        30-yard. Weight above the included tonnage is billed at the per-ton rate shown at checkout ($179
        per ton as of the date above), prorated, based on the certified scale ticket from the disposal
        facility.
      </P>

      <H2>5. Loading rules and overloading</H2>
      <UL>
        <li>
          Do not load above the top edge of the container. State law prohibits us from transporting an
          overloaded dumpster. Loads above the rim add a $149 fee, charged at pickup.
        </li>
        <li>
          Load must be evenly distributed. We may refuse to haul a container that is unsafe to lift or
          transport.
        </li>
        <li>
          If a container cannot be picked up because it is overloaded, blocked or inaccessible, a
          return trip fee applies.
        </li>
      </UL>

      <H2>6. Prohibited items</H2>
      <P>
        The following may not be placed in the dumpster: paint and solvents, oil, fuel, batteries,
        tires, asbestos, refrigerants and appliances containing them, propane tanks, medical waste,
        chemicals, and any hazardous or toxic material. Prohibited or hazardous items found in the load
        are charged at $20&ndash;$60 per item, plus any special handling or fine imposed on us by the
        disposal facility. The customer remains responsible for the contents of the container.
      </P>

      <H2>7. Placement, access and permits</H2>
      <UL>
        <li>
          You are responsible for providing clear, legal and safe access to the placement location on
          the delivery date.
        </li>
        <li>
          Placing a dumpster on a public street may require a permit from your city. Obtaining it is the
          customer&rsquo;s responsibility unless we agree otherwise in writing.
        </li>
        <li>
          Driveways, sidewalks, lawns, sprinklers, septic systems and underground utilities can be
          damaged by the weight of a loaded container and the truck. By requesting placement on private
          property you accept that risk; TP Dumpsters is not liable for surface damage caused by normal
          delivery and pickup.
        </li>
        <li>
          If our driver cannot deliver or pick up because of blocked access, parked vehicles or
          unsuitable conditions, a return trip fee applies.
        </li>
      </UL>

      <H2>8. Cancellations and changes</H2>
      <P>
        Cancellations require 24 hours&rsquo; notice before the scheduled delivery, and a $150
        cancellation fee applies. Cancellations with less than 24 hours&rsquo; notice, or after the
        truck has been dispatched, may be charged the full delivery cost. Date changes are free when
        requested at least 24 hours in advance and subject to availability.
      </P>

      <H2>9. Liability</H2>
      <P>
        TP Dumpsters is not liable for indirect, incidental or consequential damages, including lost
        profits or project delays. Our total liability for any claim arising from a rental is limited to
        the amount you paid for that rental. Nothing in these terms limits liability that cannot be
        limited under California law.
      </P>

      <H2>10. Communications and text messages</H2>
      <P>
        By providing your contact information you agree that we may contact you about your order by
        phone, email and text message.
      </P>
      <P>
        If you opt in to text messages, you will receive SMS from TP Dumpsters about your delivery,
        pickup, billing and account. Message frequency varies, typically 2 to 10 messages per rental.
        Message and data rates may apply. Reply STOP at any time to cancel, or HELP for help. Consent
        to receive text messages is not a condition of any purchase. The full program terms are in our{" "}
        <Link href="/sms-policy" className="text-tp-red underline">
          SMS Terms &amp; Conditions
        </Link>
        .
      </P>
      <P>
        <strong className="font-semibold">
          No mobile information will be shared with third parties or affiliates for marketing or
          promotional purposes. All the above categories exclude text messaging originator opt-in
          data and consent; this information will not be shared with any third parties.
        </strong>{" "}
        How we handle the rest of your data is described in our{" "}
        <Link href="/privacy" className="text-tp-red underline">
          Privacy Policy
        </Link>
        .
      </P>

      <H2>11. Governing law</H2>
      <P>
        These terms are governed by the laws of the State of California. Any dispute will be resolved in
        the state or federal courts located in Contra Costa County, California.
      </P>

      <H2>12. Changes to these terms</H2>
      <P>
        We may update these Terms &amp; Conditions at any time. The version posted on this page when you
        book is the version that applies to your rental.
      </P>

      <H2>13. Contact us</H2>
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
