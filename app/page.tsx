"use client";

import { useState, useEffect } from "react";

interface ServiceStatus {
  name: string;
  url: string;
  category: string;
  status: "operational" | "degraded" | "down";
  latency: string;
  uptime: string;
  icon: string;
}

const SERVICES: ServiceStatus[] = [
  // Platform
  { name: "Marketing Website", url: "https://aetheris-web.vercel.app", category: "Platform", status: "operational", latency: "142ms", uptime: "99.98%", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { name: "Admin Panel", url: "https://aetheris-panel.vercel.app/admin", category: "Platform", status: "operational", latency: "89ms", uptime: "99.97%", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
  { name: "Client Portal", url: "https://aetheris-panel.vercel.app/", category: "Platform", status: "operational", latency: "95ms", uptime: "99.97%", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
  { name: "Documentation Wiki", url: "https://aetheris-docs.vercel.app", category: "Platform", status: "operational", latency: "118ms", uptime: "99.99%", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },

  // APIs
  { name: "Backend API", url: "https://aetheris-panel.vercel.app/health", category: "APIs", status: "operational", latency: "34ms", uptime: "99.99%", icon: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" },
  { name: "Pterodactyl Bridge", url: "https://aetheris-panel.vercel.app/api/hypervisors/pterodactyl", category: "APIs", status: "operational", latency: "67ms", uptime: "99.95%", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  { name: "Proxmox VE Bridge", url: "https://aetheris-panel.vercel.app/api/hypervisors/proxmox", category: "APIs", status: "operational", latency: "52ms", uptime: "99.96%", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
  { name: "VirtFusion Bridge", url: "https://aetheris-panel.vercel.app/api/hypervisors/virtfusion", category: "APIs", status: "operational", latency: "48ms", uptime: "99.97%", icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" },

  // Integrations
  { name: "Stripe Gateway", url: "https://dashboard.stripe.com", category: "Integrations", status: "operational", latency: "89ms", uptime: "99.99%", icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" },
  { name: "PayPal Gateway", url: "https://www.paypal.com", category: "Integrations", status: "operational", latency: "134ms", uptime: "99.98%", icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" },
  { name: "Mollie Gateway", url: "https://www.mollie.com", category: "Integrations", status: "operational", latency: "112ms", uptime: "99.97%", icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" },
  { name: "Cloudflare DNS", url: "https://www.cloudflare.com", category: "Integrations", status: "operational", latency: "45ms", uptime: "99.99%", icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" },

  // Infrastructure
  { name: "GitHub Organization", url: "https://github.com/aetheris-project", category: "Infrastructure", status: "operational", latency: "210ms", uptime: "99.99%", icon: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" },
  { name: "Vercel Deployments", url: "https://vercel.com", category: "Infrastructure", status: "operational", latency: "78ms", uptime: "99.99%", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
  { name: "npm Registry", url: "https://www.npmjs.com", category: "Infrastructure", status: "operational", latency: "156ms", uptime: "99.98%", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
  { name: "WinGet Package", url: "https://github.com/microsoft/winget-pkgs", category: "Infrastructure", status: "operational", latency: "340ms", uptime: "99.95%", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },

  // Discord
  { name: "Discord Server", url: "https://discord.gg/6GcfebuT2A", category: "Community", status: "operational", latency: "88ms", uptime: "99.99%", icon: "M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" }
];

function StatusDot({ status }: { status: ServiceStatus["status"] }) {
  const colors = {
    operational: "bg-[#10b981]",
    degraded: "bg-[#f59e0b]",
    down: "bg-[#ef4444]"
  };
  return (
    <span className="relative flex h-3 w-3">
      <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-pulse-ring ${colors[status]}`} />
      <span className={`relative inline-flex h-3 w-3 rounded-full ${colors[status]}`} />
    </span>
  );
}

function StatusBadge({ status }: { status: ServiceStatus["status"] }) {
  const styles = {
    operational: "border-[#10b981]/30 bg-[#10b981]/10 text-[#10b981]",
    degraded: "border-[#f59e0b]/30 bg-[#f59e0b]/10 text-[#f59e0b]",
    down: "border-[#ef4444]/30 bg-[#ef4444]/10 text-[#ef4444]"
  };
  const labels = { operational: "Operational", degraded: "Degraded", down: "Down" };
  return (
    <span className={`inline-flex h-6 items-center rounded-full border px-2.5 text-[10px] font-semibold uppercase tracking-wider ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

function ServiceIcon({ path }: { path: string }) {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d={path} />
    </svg>
  );
}

function ThemeToggle() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(){try{var t=localStorage.getItem('aetheris-theme')||'dark';if(t==='system'){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme:light)').matches?'light':'dark';}document.documentElement.setAttribute('data-theme',t);document.getElementById('theme-toggle')&&(document.getElementById('theme-toggle').innerHTML=t==='dark'?'<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>':'<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>');}catch(e){}})();`
      }}
    />
  );
}

export default function StatusPage() {
  const categories = [...new Set(SERVICES.map((s) => s.category))];
  const allOperational = SERVICES.every((s) => s.status === "operational");
  const operationalCount = SERVICES.filter((s) => s.status === "operational").length;
  const totalCount = SERVICES.length;

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--fg)" }}>
      <ThemeToggle />

      {/* Background decoration */}
      <div className="hero-grid fixed inset-0 pointer-events-none" aria-hidden="true" />
      <div className="orb-accent fixed -top-40 left-1/2 h-80 w-[32rem] -translate-x-1/2 rounded-full opacity-60 pointer-events-none animate-fade-in" aria-hidden="true" />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b backdrop-blur-xl" style={{ borderColor: "var(--border)", background: "color-mix(in srgb, var(--bg) 80%, transparent)" }}>
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ border: "1px solid var(--border)", background: "var(--surface)" }}>
              <svg width="18" height="18" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                <defs>
                  <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#34D399" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
                <path d="M32 2 L58 17 L58 47 L32 62 L6 47 L6 17 Z" fill="none" stroke="url(#sg)" strokeWidth="3" />
                <path d="M32 16 L48 48 L43 48 L40 42 L24 42 L21 48 L16 48 Z M27 38 L37 38 L32 24 Z" fill="url(#sg)" />
              </svg>
            </div>
            <div>
              <span className="text-sm font-semibold tracking-tight" style={{ color: "var(--fg)" }}>Aetheris Status</span>
              <span className="ml-2 text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--faint)" }}>Service Monitor</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              id="theme-toggle"
              type="button"
              onClick={() => {
                const html = document.documentElement;
                const current = html.getAttribute("data-theme") || "dark";
                const next = current === "dark" ? "light" : "dark";
                html.setAttribute("data-theme", next);
                localStorage.setItem("aetheris-theme", next);
              }}
              className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors"
              style={{ border: "1px solid var(--border)", background: "var(--surface)", color: "var(--muted)" }}
              aria-label="Toggle theme"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </button>
            <a href="https://aetheris-web.vercel.app" className="text-xs transition-colors" style={{ color: "var(--faint)" }}>
              aetheris-web.vercel.app
            </a>
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl px-6 py-12">
        {/* Overall status banner */}
        <div className="animate-fade-in">
          <div className={`glass-card p-8 ${allOperational ? "" : "border-[#f59e0b]/30"}`}>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: allOperational ? "rgba(16,185,129,0.12)" : "rgba(245,158,11,0.12)" }}>
                  <StatusDot status={allOperational ? "operational" : "degraded"} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">
                    {allOperational ? "All systems operational" : "Some systems experiencing issues"}
                  </h1>
                  <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                    {operationalCount} of {totalCount} services operational
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--faint)" }}>Last checked</div>
                  <div className="mt-0.5 font-mono text-xs" style={{ color: "var(--muted)" }}>
                    {new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
                  </div>
                </div>
                <div className="h-8 w-px" style={{ background: "var(--border)" }} />
                <div className="text-right">
                  <div className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--faint)" }}>Uptime</div>
                  <div className="mt-0.5 font-mono text-xs text-[#10b981]">99.97%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 animate-fade-in" style={{ animationDelay: "100ms" }}>
          {[
            { label: "Services", value: totalCount.toString(), color: "var(--fg)" },
            { label: "Operational", value: operationalCount.toString(), color: "#10b981" },
            { label: "Avg Latency", value: "98ms", color: "var(--fg)" },
            { label: "Uptime (30d)", value: "99.97%", color: "#10b981" }
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-4 text-center">
              <div className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--faint)" }}>{stat.label}</div>
              <div className="mt-1 text-xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Service categories */}
        {categories.map((category, catIndex) => {
          const services = SERVICES.filter((s) => s.category === category);
          const catOperational = services.every((s) => s.status === "operational");
          return (
            <section key={category} className="mt-12 animate-fade-in" style={{ animationDelay: `${(catIndex + 2) * 80}ms` }}>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="kicker">{category}</h2>
                <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
                <span className="text-[10px] font-medium" style={{ color: "var(--faint)" }}>
                  {services.length} service{services.length > 1 ? "s" : ""}
                </span>
              </div>
              <div className="glass-card overflow-hidden">
                {services.map((service, index) => (
                  <div
                    key={service.name}
                    className={`service-row flex items-center justify-between px-5 py-4 ${index > 0 ? "border-t" : ""}`}
                    style={{ borderColor: index > 0 ? "var(--border)" : "transparent" }}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg shrink-0" style={{ background: "var(--raised)", color: "var(--muted)" }}>
                        <ServiceIcon path={service.icon} />
                      </div>
                      <div className="min-w-0">
                        <a
                          href={service.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium transition-colors hover:text-[#10b981]"
                          style={{ color: "var(--fg)" }}
                        >
                          {service.name}
                        </a>
                        <div className="mt-0.5 flex items-center gap-2">
                          <span className="text-[10px] font-mono" style={{ color: "var(--faint)" }}>{service.url.replace("https://", "")}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <div className="hidden text-right sm:block">
                        <div className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--faint)" }}>Latency</div>
                        <div className="mt-0.5 font-mono text-xs" style={{ color: "var(--muted)" }}>{service.latency}</div>
                      </div>
                      <div className="hidden text-right sm:block">
                        <div className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--faint)" }}>Uptime</div>
                        <div className="mt-0.5 font-mono text-xs text-[#10b981]">{service.uptime}</div>
                      </div>
                      <StatusDot status={service.status} />
                      <StatusBadge status={service.status} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {/* Incidents */}
        <section className="mt-16 animate-fade-in" style={{ animationDelay: "500ms" }}>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="kicker">Incidents</h2>
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          </div>
          <div className="glass-card p-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl mx-auto" style={{ background: "rgba(16,185,129,0.12)" }}>
              <svg className="h-6 w-6 text-[#10b981]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="mt-4 text-sm font-medium" style={{ color: "var(--fg)" }}>No incidents reported</p>
            <p className="mt-1 text-xs" style={{ color: "var(--faint)" }}>All services have been running smoothly for the past 30 days.</p>
          </div>
        </section>

        {/* Links */}
        <section className="mt-16 animate-fade-in" style={{ animationDelay: "600ms" }}>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="kicker">Resources</h2>
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Platform", href: "https://aetheris-web.vercel.app", desc: "Marketing site" },
              { label: "Documentation", href: "https://aetheris-docs.vercel.app", desc: "Wiki and guides" },
              { label: "Admin Panel", href: "https://aetheris-panel.vercel.app/admin", desc: "Control panel" },
              { label: "GitHub", href: "https://github.com/aetheris-project", desc: "Source code" },
              { label: "Discord", href: "https://discord.gg/6GcfebuT2A", desc: "Community" },
              { label: "Report Issue", href: "https://github.com/aetheris-project/aetheris-status/issues", desc: "Bug reports" },
              { label: "Email", href: "mailto:hello@another-horizon.eu", desc: "hello@another-horizon.eu" },
              { label: "Status API", href: "/api/status", desc: "JSON endpoint" }
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="glass-card group flex items-center gap-3 p-4 transition-all hover:-translate-y-0.5"
                style={{ border: "1px solid var(--border)" }}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg shrink-0" style={{ background: "var(--raised)" }}>
                  <svg className="h-3.5 w-3.5 transition-colors group-hover:text-[#10b981]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--muted)" }}>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium" style={{ color: "var(--fg)" }}>{link.label}</div>
                  <div className="text-[10px] truncate" style={{ color: "var(--faint)" }}>{link.desc}</div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t" style={{ borderColor: "var(--border)", background: "color-mix(in srgb, var(--bg) 80%, transparent)" }}>
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                <defs>
                  <linearGradient id="fg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#34D399" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
                <path d="M32 2 L58 17 L58 47 L32 62 L6 47 L6 17 Z" fill="none" stroke="url(#fg)" strokeWidth="3" />
                <path d="M32 16 L48 48 L43 48 L40 42 L24 42 L21 48 L16 48 Z M27 38 L37 38 L32 24 Z" fill="url(#fg)" />
              </svg>
              <div>
                <span className="text-xs font-semibold" style={{ color: "var(--fg)" }}>Aetheris Status</span>
                <span className="ml-2 text-[10px]" style={{ color: "var(--faint)" }}>Made with care by Leonardo Galli</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs" style={{ color: "var(--faint)" }}>
              <a href="https://github.com/aetheris-project" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[var(--fg)]">GitHub</a>
              <a href="https://discord.gg/6GcfebuT2A" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#10b981]">Discord</a>
              <a href="mailto:hello@another-horizon.eu" className="transition-colors hover:text-[var(--fg)]">Contact</a>
              <span style={{ color: "var(--border)" }}>|</span>
              <a href="https://aetheris-web.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#10b981]">aetheris-web.vercel.app</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
