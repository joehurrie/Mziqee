export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 px-[6vw] py-16">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <div className="max-w-full md:max-w-[75%]">
          <span className="font-display font-black text-white tracking-tighter block uppercase leading-[0.9]" style={{ fontSize: 'clamp(2.8rem, 8vw, 7.5rem)' }}>
            Mziqee<span className="text-[#39FF14]">.</span>
          </span>
          <p className="font-body text-[#555] text-xs mt-4 uppercase tracking-[0.22em] font-semibold">
            Premium sound engineering.
          </p>
        </div>
        <div className="flex flex-col gap-1.5 text-left md:text-right shrink-0 pb-2">
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
