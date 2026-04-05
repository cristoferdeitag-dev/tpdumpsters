import { FaCalendarDays, FaPhone } from "react-icons/fa6";

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-[15px] right-[15px] md:bottom-[30px] md:right-[30px] z-[99998] flex flex-col gap-3 items-end">
      <a
        href="/booking"
        className="inline-flex items-center gap-2 px-[18px] py-2.5 text-sm md:px-6 md:py-3.5 md:text-base rounded-[30px] font-[var(--font-poppins)] font-semibold cursor-pointer transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.2)] bg-tp-red text-white hover:bg-tp-red-dark hover:scale-105"
      >
        <FaCalendarDays /> Rent Now
      </a>
      <a
        href="tel:+15106502083"
        className="inline-flex items-center gap-2 px-[18px] py-2.5 text-sm md:px-6 md:py-3.5 md:text-base rounded-[50px] font-[var(--font-poppins)] font-semibold cursor-pointer transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.2)] bg-white text-[#333] border-2 border-[#e0e0e0] hover:border-tp-red hover:text-tp-red hover:scale-105"
      >
        <FaPhone /> Call Now!
      </a>
    </div>
  );
}
