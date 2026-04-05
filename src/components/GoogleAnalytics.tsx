"use client";

import { useEffect } from "react";
import Script from "next/script";

const GA_ID = "G-RLV3201E1G";
const AW_ID = "AW-17134217839";
const CONVERSION_LABEL = "AW-17134217839/EtBFCMDt_-EaEO_Uneo_";

export function trackConversion(value = 1.0, currency = "USD") {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: CONVERSION_LABEL,
      value,
      currency,
    });
  }
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export default function GoogleAnalytics() {
  // Track conversions on link clicks (calls, CTAs, booking links)
  useEffect(() => {
    function safeGtag(...args: unknown[]) {
      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag(...args);
      } else {
        // Queue for when gtag loads
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push(args);
      }
    }

    function getPageName(): string {
      const path = window.location.pathname;
      if (path === "/") return "home";
      return path.replace(/^\//, "").replace(/\//g, "_") || "home";
    }

    function getButtonLocation(el: HTMLElement): string {
      const section = el.closest("section");
      if (section?.id) return section.id;
      if (el.closest("header")) return "header";
      if (el.closest("footer")) return "footer";
      if (el.closest(".hero-bg, [id='home']")) return "hero";
      return "page";
    }

    function handleClick(e: MouseEvent) {
      const el = e.target as HTMLElement;
      const anchor = el.closest("a");
      const button = el.closest("button");
      const clickable = anchor || button;
      if (!clickable) return;

      const page = getPageName();
      const location = getButtonLocation(clickable as HTMLElement);
      const text = clickable.textContent?.trim()?.substring(0, 60) || "unknown";
      const href = anchor?.href || anchor?.getAttribute("href") || "";

      // Phone call clicks — only count once per session, track device type
      if (href.startsWith("tel:")) {
        const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
        const alreadyCalled = sessionStorage.getItem("tp_call_tracked");
        
        if (!alreadyCalled) {
          sessionStorage.setItem("tp_call_tracked", "1");
          trackConversion();
          safeGtag("event", "call_click", {
            page,
            button_location: location,
            button_text: text,
            phone_number: href.replace("tel:", ""),
            device_type: isMobile ? "mobile" : "desktop",
            likely_real_call: isMobile ? "yes" : "no",
          });
        }
        return;
      }

      // Email clicks
      if (href.startsWith("mailto:")) {
        safeGtag("event", "email_click", {
            page,
            button_location: location,
            email: href.replace("mailto:", ""),
          });
        return;
      }

      // Booking/CTA link clicks — once per session
      if (href.includes("/booking")) {
        const alreadyClicked = sessionStorage.getItem("tp_cta_tracked");
        if (!alreadyClicked) {
          sessionStorage.setItem("tp_cta_tracked", "1");
          safeGtag("event", "cta_click", {
            page,
            cta_text: text,
            cta_type: "booking",
            button_location: location,
          });
        }
        return;
      }

      // Service page clicks
      if (href.includes("/general-debris") || href.includes("/construction-debris") ||
          href.includes("/roofing") || href.includes("/green-waste") ||
          href.includes("/clean-soil") || href.includes("/clean-concrete") ||
          href.includes("/mixed-materials") || href.includes("/household") ||
          href.includes("/services")) {
        safeGtag("event", "service_click", {
            page,
            service_page: href.split("/").pop() || "services",
            button_text: text,
            button_location: location,
          });
        return;
      }

      // City page clicks
      const cityMatch = href.match(/tpdumpsters\.com\/([a-z-]+)$/) ||
        (href.startsWith("/") && !href.includes(".") && href.match(/^\/([a-z-]+)$/));
      if (cityMatch && !["booking","services","blog","hub","dashboard","driver"].includes(cityMatch[1])) {
        safeGtag("event", "city_click", {
            page,
            city: cityMatch[1],
            button_location: location,
          });
        return;
      }

      // Blog clicks
      if (href.includes("/blog")) {
        safeGtag("event", "blog_click", {
            page,
            blog_post: href.split("/").pop() || "blog",
            button_location: location,
          });
        return;
      }

      // WhatsApp clicks
      if (href.includes("wa.me") || href.includes("whatsapp")) {
        safeGtag("event", "whatsapp_click", {
            page,
            button_location: location,
          });
        return;
      }

      // Any other button/CTA with visual styling (not plain nav links)
      const isStyledButton = button ||
        clickable.classList.toString().match(/bg-tp-red|bg-white|rounded-lg|btn|cta|font-bold/);
      if (isStyledButton) {
        safeGtag("event", "button_click", {
            page,
            button_text: text,
            button_location: location,
            button_href: href.substring(0, 100) || "none",
          });
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      {/* Google Tag Manager */}
      <Script id="gtm-head" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NPD8BWW9');`}
      </Script>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-NPD8BWW9"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
      {/* Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
          gtag('config', '${AW_ID}');
        `}
      </Script>
    </>
  );
}
