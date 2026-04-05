"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const navItems = [
  { label: "HOME", href: "#home" },
  { label: "DUMPSTER SIZES", href: "#sizes" },
  { label: "FAQS", href: "#fqa" },
  { label: "REVIEWS", href: "#reviews" },
  { label: "GALLERY", href: "#gallery" },
  { label: "CITIES", href: "#rent" },
  { label: "SERVICES", href: "/services" },
  { label: "BLOG", href: "/blog" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      e.preventDefault();
      // If not on homepage, go to homepage with hash
      if (window.location.pathname !== "/") {
        window.location.href = "/" + href;
        return;
      }
      const target = document.querySelector(href);
      if (target) {
        const headerHeight = document.getElementById("main-header")?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    }
  };

  return (
    <header
      id="main-header"
      className="fixed top-0 left-0 w-full z-[99999] transition-all duration-300"
      style={{ boxShadow: scrolled ? "0 2px 10px rgba(0,0,0,0.3)" : "none" }}
    >
      <nav aria-label="Main navigation" className="flex items-center justify-between bg-black rounded-[5px] px-[5vh] w-full">
        <div className="flex items-center">
          <a href="https://tpdumpsters.com/">
            <Image
              src="/images/logo/TP.png"
              alt="TP Dumpsters Logo"
              width={140}
              height={70}
              className="h-[70px] w-auto py-[5px]"
              priority
            />
          </a>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center">
          <ul className="flex items-center gap-0">
            {navItems.map((item) => (
              <li key={item.label} className="inline-block">
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-white font-semibold uppercase text-base px-[15px] py-5 block transition-opacity duration-300 hover:opacity-70 font-[var(--font-poppins)]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="/booking"
            className="ml-4 bg-tp-red hover:bg-tp-red-dark text-white font-bold uppercase text-sm px-6 py-2.5 rounded-lg transition-colors duration-300 font-[var(--font-poppins)] whitespace-nowrap"
          >
            BOOK ONLINE
          </a>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-black py-5 rounded-b-[5px]">
            <ul className="flex flex-col items-center">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-white font-semibold uppercase text-sm px-[15px] py-3 block transition-opacity duration-300 hover:opacity-70 font-[var(--font-poppins)]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="mt-3">
                <a
                  href="/booking"
                  onClick={() => setMobileOpen(false)}
                  className="bg-tp-red hover:bg-tp-red-dark text-white font-bold uppercase text-sm px-8 py-3 rounded-lg transition-colors duration-300 font-[var(--font-poppins)] inline-block"
                >
                  BOOK ONLINE
                </a>
              </li>
            </ul>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
          className={`flex md:hidden flex-col gap-[5px] cursor-pointer p-[10px] mobile-menu-btn bg-transparent border-none ${mobileOpen ? "active" : ""}`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className="w-[25px] h-[3px] bg-white block transition-all duration-300"></span>
          <span className="w-[25px] h-[3px] bg-white block transition-all duration-300"></span>
          <span className="w-[25px] h-[3px] bg-white block transition-all duration-300"></span>
        </button>
      </nav>
    </header>
  );
}
