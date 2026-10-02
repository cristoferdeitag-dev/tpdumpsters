import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { H2, P, UL } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "SMS Terms & Text Messaging Policy | TP Dumpsters",
  description:
    "How TP Dumpsters uses text messaging: what we send, how you opt in, how to stop with STOP, get help with HELP, message frequency and rates.",
  alternates: { canonical: "/sms-policy" },
};

export default function SmsPolicyPage() {
  return (
    <LegalPage title="SMS Terms & Conditions" updated="October 2, 2026">
      <P>
        These SMS Terms &amp; Conditions govern the text messaging program operated by TP Dumpsters
        (&ldquo;TP Dumpsters&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). <strong>TP Dumpsters is a brand
        operated by Tp Pavers services Inc (EIN 99-2533265), a California corporation.</strong> By
        providing your mobile number and opting in, you agree to the terms below.
      </P>

      <H2>1. Program description</H2>
      <P>
        TP Dumpsters sends text messages about your dumpster rental: booking confirmations, delivery and
        pickup scheduling, driver arrival notices, invoices and payment reminders, and replies to
        questions you send us. We also send occasional service updates and promotional offers to
        customers who opt in to receive them.
      </P>

      <H2>2. How you opt in</H2>
      <P>You opt in to receive text messages from TP Dumpsters in any of these ways:</P>
      <UL>
        <li>
          By checking the SMS consent box during online checkout at{" "}
          <Link href="/booking" className="text-tp-red underline">
            tpdumpsters.com/booking
          </Link>
          . The box is unchecked by default and is <strong>not</strong> required to complete a purchase.{" "}
          <Link href="/sms-policy#opt-in" className="text-tp-red underline">
            See the exact wording of that checkbox below
          </Link>
          .
        </li>
        <li>By texting us first at (510) 650-2083 or (510) 650-1133.</li>
        <li>
          By giving verbal or written consent to a TP Dumpsters representative when you book by phone or
          email.
        </li>
      </UL>
      <P>
        Consent to receive marketing text messages is not a condition of purchasing any goods or
        services. You may still book, pay and receive service without opting in to texts.
      </P>

      {/* Sección 3 — nace del rechazo 30909 del 2-oct-2026. El checkbox de consentimiento
          sí existe, pero vive en el ÚLTIMO paso de /booking y la página se arma en el
          cliente: el HTML servido de /booking trae 0 ocurrencias de "Text me about my
          rental" y 0 de "Reply STOP to cancel" (medido con curl el 2-oct 22:47Z), así que
          el revisor de TCR no lo puede ver ni llegando a la URL. Esta réplica es estática
          y se renderiza en el servidor, por eso SÍ viaja en el HTML. Darle a Twilio la URL
          con ancla: https://tpdumpsters.com/sms-policy#opt-in */}
      <section id="opt-in" className="scroll-mt-28">
        <H2>3. The opt-in form, exactly as it appears at checkout</H2>
        <P>
          The consent checkbox below is shown to every customer on the final review step of our
          online booking at <strong>tpdumpsters.com/booking</strong>, immediately before payment. It
          is <strong>unchecked by default</strong>, it is clearly marked optional, and the order can
          be completed without it.
        </P>
        <div className="my-5 rounded-xl border border-[#d8dcdf] bg-[#fbfbfc] p-5">
          <div className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className="mt-[3px] h-[18px] w-[18px] shrink-0 rounded-[4px] border-2 border-[#9aa1a7] bg-white"
            />
            <span className="text-[14.5px] leading-[1.7] text-[#3a4045]">
              <strong className="font-semibold">Text me about my rental (optional).</strong> I agree to
              receive text messages from TP Dumpsters at the number I provided, about my delivery,
              pickup and account. Message frequency varies. Message and data rates may apply. Reply
              STOP to cancel or HELP for help. Consent is not a condition of purchase. See our{" "}
              <Link href="/sms-policy" className="text-tp-red underline">
                SMS Terms
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-tp-red underline">
                Privacy Policy
              </Link>
              .
            </span>
          </div>
        </div>
        <P>
          <em>
            The box above is a reproduction shown for reference. Ticking it on this page does nothing
            and does not sign you up for anything — the live checkbox is the one inside the booking
            flow.
          </em>
        </P>
      </section>

      <H2>4. Message frequency</H2>
      <P>
        Message frequency varies and depends on your activity with us. Most customers receive between 2
        and 10 messages per rental. Promotional messages, if you opted in to them, are limited to no
        more than 4 per month.
      </P>

      <H2>5. Cost</H2>
      <P>
        <strong>Message and data rates may apply.</strong> TP Dumpsters does not charge for text
        messages, but your mobile carrier&rsquo;s standard messaging and data rates apply to every message
        you send and receive. Contact your carrier for details about your plan.
      </P>

      <H2>6. How to stop receiving messages (opt out)</H2>
      <P>
        You can cancel at any time. Reply <strong>STOP</strong> to any message from us. We will send one
        final message confirming that you have been unsubscribed, and you will receive no further texts
        from that program. You may also call us at (510) 650-2083 or email contact@tpdumpsters.com to be
        removed. To rejoin, reply <strong>START</strong> or sign up again.
      </P>

      <H2>7. How to get help</H2>
      <P>
        Reply <strong>HELP</strong> to any message from us for assistance, or contact us directly at
        (510) 650-2083 or contact@tpdumpsters.com. Our office hours are Monday through Saturday, 7:00 AM
        to 6:00 PM Pacific Time.
      </P>

      <H2>8. Supported carriers and delivery</H2>
      <P>
        Our messaging program is supported by major U.S. carriers, including AT&amp;T, Verizon Wireless,
        T-Mobile, Sprint, Boost, U.S. Cellular, MetroPCS, Cricket and Virgin Mobile. Carriers are not
        liable for delayed or undelivered messages. Delivery is not guaranteed and may be affected by
        your device, coverage or carrier.
      </P>

      <H2>9. Privacy</H2>
      <P>
        <strong>
          No mobile information will be shared with third parties or affiliates for marketing or
          promotional purposes. All the above categories exclude text messaging originator opt-in data
          and consent; this information will not be shared with any third parties.
        </strong>{" "}
        Information may be shared with subcontractors that provide support services on our behalf, such
        as our messaging platform and customer support tools, solely so that we can deliver the messages
        you asked for. See our{" "}
        <Link href="/privacy" className="text-tp-red underline">
          Privacy Policy
        </Link>{" "}
        for the full detail.
      </P>

      <H2>10. Changes to these terms</H2>
      <P>
        We may update these SMS Terms &amp; Conditions at any time. The updated version takes effect when
        it is posted on this page, and the &ldquo;Last updated&rdquo; date above will change.
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
