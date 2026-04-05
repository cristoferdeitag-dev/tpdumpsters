export default function Footer() {
  return (
    <footer className="bg-tp-red py-10 text-center">
      <div className="w-[80%] max-w-[1080px] mx-auto">
        <p className="text-[#ddd] text-sm leading-[1.8] font-[var(--font-poppins)]">
          <a href="mailto:contact@tpdumpsters.com" className="text-[#ddd] hover:text-white transition-colors duration-200">
            contact@tpdumpsters.com
          </a>
        </p>
        <p className="text-[#ddd] text-sm leading-[1.8] font-[var(--font-poppins)]">
          Customer service{" "}
          <a href="tel:+15106502083" className="text-[#ddd] hover:text-white transition-colors duration-200">
            510-650-2083
          </a>
        </p>
        <p className="text-[#ddd] text-sm leading-[1.8] font-[var(--font-poppins)]">
          3201 Ramona Street, Pinole, California, 94564, EE. UU.
        </p>
        <p className="text-[#bbb] text-xs mt-4 font-[var(--font-poppins)]">
          &copy; {new Date().getFullYear()} TP Dumpsters. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
