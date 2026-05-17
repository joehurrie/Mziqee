export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 px-[6vw] py-16">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        <div>
          <span className="font-display font-bold text-white text-2xl tracking-tight">
            Mziqee<span className="text-[#39FF14]">.</span>
          </span>
          <p className="font-body text-[#555] text-sm mt-2 max-w-xs">
            Sound engineered for those who feel it differently.
          </p>
        </div>
        <div className="flex flex-col gap-1.5 text-right">
          <p className="font-body text-[0.65rem] uppercase tracking-[0.18em] text-[#444]">Contact</p>
          <a
            href="mailto:hello@mziqee.com"
            className="font-body text-sm text-[#888] hover:text-[#39FF14] transition-colors duration-200 cursor-pointer"
          >
            hello@mziqee.com
          </a>
        </div>
      </div>
      <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-body text-[0.65rem] uppercase tracking-[0.18em] text-[#333]">
          © 2026 Mziqee Buds. All rights reserved.
        </p>
        <p className="font-body text-[0.65rem] uppercase tracking-[0.18em] text-[#333]">
          Built with rhythm.
        </p>
      </div>
    </footer>
  );
}
