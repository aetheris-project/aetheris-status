"use client";

import Link from "next/link";

const LINKS = [
  { label: "Aetheris Platform", href: "https://aetheris-web.vercel.app" },
  { label: "Documentation", href: "https://aetheris-docs.vercel.app" },
  { label: "Admin Panel", href: "https://aetheris-panel.vercel.app" },
  { label: "GitHub", href: "https://github.com/aetheris-project" },
  { label: "Discord", href: "https://discord.gg/6GcfebuT2A" }
];

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <div className="relative">
        <div className="absolute -inset-x-20 -top-20 h-60 glow-accent opacity-30" aria-hidden="true" />
        <div className="relative h-16 w-16 rounded-2xl border border-[#27272a] bg-[#141418] flex items-center justify-center">
          <span className="text-2xl font-bold text-[#10b981]">!</span>
        </div>
      </div>

      <span className="mt-6 text-[80px] font-extrabold leading-none tracking-tighter text-white/[0.10]">
        404
      </span>

      <h1 className="mt-2 text-xl font-bold tracking-tight text-[#fafafa]">Service not found</h1>
      <p className="mt-3 max-w-md text-sm leading-6 text-[#a1a1aa]">
        This status endpoint does not exist. Check the service status below or return to the main status page.
      </p>

      <div className="mt-6 grid gap-2 sm:grid-cols-2">
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-[#27272a] bg-[#141418]/80 px-4 py-2.5 text-sm text-[#a1a1aa] transition-colors hover:border-[#10b981]/30 hover:text-[#fafafa]"
          >
            {link.label}
            <svg className="ml-auto h-3 w-3 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold text-[#09090B] transition-all" style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}>
          Status dashboard
        </Link>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl border border-[#27272a] bg-white/[0.03] px-5 text-sm font-medium text-[#fafafa] transition-all hover:border-[#10b981]/40"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Go back
        </button>
      </div>
    </div>
  );
}
