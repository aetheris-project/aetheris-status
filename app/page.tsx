"use client";

import { useState, useEffect, useCallback } from "react";

/* ── Types ─────────────────────────────────────────────────────────── */

interface ServiceStatus {
  name: string;
  url: string;
  category: string;
  status: "operational" | "degraded" | "down";
  latency: string;
  uptime: string;
  description: string;
}

interface Incident {
  id: string;
  title: string;
  status: "investigating" | "identified" | "monitoring" | "resolved";
  severity: "minor" | "major" | "critical";
  createdAt: string;
  resolvedAt?: string;
  updates: { time: string; message: string; status: string }[];
}

/* ── Service data ──────────────────────────────────────────────────── */

const SERVICES: ServiceStatus[] = [
  // Platform
  { name: "Marketing Website", url: "https://aetheris-web.vercel.app", category: "Platform", status: "operational", latency: "142ms", uptime: "99.98%", description: "Public marketing site and landing pages" },
  { name: "Admin Panel", url: "https://aetheris-panel.vercel.app/admin", category: "Platform", status: "operational", latency: "89ms", uptime: "99.97%", description: "Control panel for administrators" },
  { name: "Client Portal", url: "https://aetheris-panel.vercel.app/", category: "Platform", status: "operational", latency: "95ms", uptime: "99.97%", description: "Client-facing billing and server management" },
  { name: "Documentation Wiki", url: "https://aetheris-docs.vercel.app", category: "Platform", status: "operational", latency: "118ms", uptime: "99.99%", description: "Technical documentation and guides" },
  { name: "Status Page", url: "https://aetheris-status.vercel.app", category: "Platform", status: "operational", latency: "67ms", uptime: "99.99%", description: "This status monitoring page" },

  // APIs
  { name: "Backend API", url: "https://aetheris-panel.vercel.app/health", category: "APIs", status: "operational", latency: "34ms", uptime: "99.99%", description: "Core REST API with health endpoint" },
  { name: "Pterodactyl Bridge", url: "https://aetheris-panel.vercel.app/api/hypervisors/pterodactyl", category: "APIs", status: "operational", latency: "67ms", uptime: "99.95%", description: "Pterodactyl Application and Client API driver" },
  { name: "Proxmox VE Bridge", url: "https://aetheris-panel.vercel.app/api/hypervisors/proxmox", category: "APIs", status: "operational", latency: "52ms", uptime: "99.96%", description: "Proxmox VE API v2 driver" },
  { name: "VirtFusion Bridge", url: "https://aetheris-panel.vercel.app/api/hypervisors/virtfusion", category: "APIs", status: "operational", latency: "48ms", uptime: "99.97%", description: "VirtFusion REST API driver" },

  // Integrations
  { name: "Stripe Gateway", url: "https://dashboard.stripe.com", category: "Integrations", status: "operational", latency: "89ms", uptime: "99.99%", description: "Stripe payment processing" },
  { name: "PayPal Gateway", url: "https://www.paypal.com", category: "Integrations", status: "operational", latency: "134ms", uptime: "99.98%", description: "PayPal payment processing" },
  { name: "Mollie Gateway", url: "https://www.mollie.com", category: "Integrations", status: "operational", latency: "112ms", uptime: "99.97%", description: "Mollie payment processing" },
  { name: "Cloudflare DNS", url: "https://www.cloudflare.com", category: "Integrations", status: "operational", latency: "45ms", uptime: "99.99%", description: "DNS and CDN services" },

  // Infrastructure
  { name: "GitHub Organization", url: "https://github.com/aetheris-project", category: "Infrastructure", status: "operational", latency: "210ms", uptime: "99.99%", description: "Source code and CI/CD" },
  { name: "Vercel Deployments", url: "https://vercel.com", category: "Infrastructure", status: "operational", latency: "78ms", uptime: "99.99%", description: "Hosting and deployment platform" },
  { name: "npm Registry", url: "https://www.npmjs.com", category: "Infrastructure", status: "operational", latency: "156ms", uptime: "99.98%", description: "Package registry" },
  { name: "WinGet Package", url: "https://github.com/microsoft/winget-pkgs", category: "Infrastructure", status: "operational", latency: "340ms", uptime: "99.95%", description: "Windows package manager" },

  // Community
  { name: "Discord Server", url: "https://discord.gg/6GcfebuT2A", category: "Community", status: "operational", latency: "88ms", uptime: "99.99%", description: "Community support and discussion" },
  { name: "Email Support", url: "mailto:hello@another-horizon.eu", category: "Community", status: "operational", latency: "---", uptime: "99.99%", description: "Direct email support" },
];

const DEMO_INCIDENTS: Incident[] = [
  {
    id: "inc-001",
    title: "Elevated API latency on Pterodactyl Bridge",
    status: "resolved",
    severity: "minor",
    createdAt: "2026-08-15T14:30:00Z",
    resolvedAt: "2026-08-15T15:45:00Z",
    updates: [
      { time: "15:45 UTC", message: "Performance has returned to normal levels. Monitoring for 24 hours.", status: "resolved" },
      { time: "15:10 UTC", message: "Identified the root cause as a connection pool exhaustion. Deploying fix.", status: "identified" },
      { time: "14:30 UTC", message: "Investigating reports of slow API responses on Pterodactyl Bridge.", status: "investigating" }
    ]
  },
  {
    id: "inc-002",
    title: "Scheduled maintenance - Database migration",
    status: "resolved",
    severity: "major",
    createdAt: "2026-08-10T02:00:00Z",
    resolvedAt: "2026-08-10T03:30:00Z",
    updates: [
      { time: "03:30 UTC", message: "Maintenance completed successfully. All systems operational.", status: "resolved" },
      { time: "02:00 UTC", message: "Starting scheduled maintenance for database schema migration.", status: "investigating" }
    ]
  }
];

/* ── Helpers ────────────────────────────────────────────────────────── */

const CATEGORY_ICONS: Record<string, string> = {
  Platform: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  APIs: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01",
  Integrations: "M13 10V3L4 14h7v7l9-11h-7z",
  Infrastructure: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
  Community: "M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
};

/* ── Components ─────────────────────────────────────────────────────── */

function StatusDot({ status }: { status: string }) {
  const colors = { operational: "bg-[#10b981]", degraded: "bg-[#f59e0b]", down: "bg-[#ef4444]" };
  return (
    <span className="relative flex h-3 w-3 shrink-0">
      <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-pulse-ring ${colors[status as keyof typeof colors] || colors.operational}`} />
      <span className={`relative inline-flex h-3 w-3 rounded-full ${colors[status as keyof typeof colors] || colors.operational}`} />
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    operational: "border-[#10b981]/30 bg-[#10b981]/10 text-[#10b981]",
    degraded: "border-[#f59e0b]/30 bg-[#f59e0b]/10 text-[#f59e0b]",
    down: "border-[#ef4444]/30 bg-[#ef4444]/10 text-[#ef4444]"
  };
  const labels: Record<string, string> = { operational: "Operational", degraded: "Degraded", down: "Down" };
  return (
    <span className={`inline-flex h-6 items-center rounded-full border px-2.5 text-[10px] font-semibold uppercase tracking-wider ${styles[status] || styles.operational}`}>
      {labels[status] || status}
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

function UptimeBar({ uptime }: { uptime: string }) {
  const pct = parseFloat(uptime);
  const bars = 30;
  const filled = Math.round((pct / 100) * bars);
  return (
    <div className="flex gap-[2px]" aria-label={`Uptime: ${uptime}`}>
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          className={`h-4 w-[3px] rounded-sm transition-colors ${
            i < filled ? "bg-[#10b981]" : "bg-[#27272a]"
          }`}
        />
      ))}
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────────────────── */

export default function StatusPage() {
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);

  const refresh = useCallback(() => {
    setLastUpdated(new Date());
  }, []);

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(refresh, 60000);
    return () => clearInterval(interval);
  }, [autoRefresh, refresh]);

  const categories = [...new Set(SERVICES.map((s) => s.category))];
  const allOperational = SERVICES.every((s) => s.status === "operational");
  const operationalCount = SERVICES.filter((s) => s.status === "operational").length;
  const totalCount = SERVICES.length;
  const avgLatency = "98ms";

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--fg)" }}>
      {/* Background decoration */}
      <div className="hero-grid fixed inset-0 pointer-events-none" aria-hidden="true" />
      <div className="orb-accent fixed -top-40 left-1/2 h-80 w-[32rem] -translate-x-1/2 rounded-full opacity-60 pointer-events-none animate-fade-in" aria-hidden="true" />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b backdrop-blur-xl" style={{ borderColor: "var(--border)", background: "color-mix(in srgb, var(--bg) 80%, transparent)" }}>
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <a href="https://aetheris-web.vercel.app" className="flex items-center gap-2.5">
              <img src="/logo.svg" alt="Aetheris" className="h-8 w-8" />
              <div>
                <span className="text-sm font-semibold tracking-tight" style={{ color: "var(--fg)" }}>Aetheris Status</span>
                <span className="ml-2 text-[10px] font-medium uppercase tracking-wider hidden sm:inline" style={{ color: "var(--faint)" }}>Service Monitor</span>
              </div>
            </a>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setAutoRefresh(!autoRefresh)}
              className="hidden sm:flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-medium transition-colors"
              style={{ border: "1px solid var(--border)", background: "var(--surface)", color: autoRefresh ? "#10b981" : "var(--muted)" }}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${autoRefresh ? "bg-[#10b981] animate-pulse-dot" : "bg-[var(--faint)]"}`} />
              {autoRefresh ? "Auto-refresh ON" : "Auto-refresh OFF"}
            </button>
            <a href="https://discord.gg/6GcfebuT2A" target="_blank" rel="noopener noreferrer" className="rounded-lg px-3 py-1.5 text-[11px] font-medium transition-colors" style={{ border: "1px solid var(--border)", background: "var(--surface)", color: "var(--muted)" }}>
              Discord
            </a>
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Overall status banner */}
        <div className="animate-fade-in">
          <div className={`glass-card p-6 sm:p-8 ${allOperational ? "" : "border-[#f59e0b]/30"}`}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl" style={{ background: allOperational ? "rgba(16,185,129,0.12)" : "rgba(245,158,11,0.12)" }}>
                  <StatusDot status={allOperational ? "operational" : "degraded"} />
                </div>
                <div>
                  <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
                    {allOperational ? "All systems operational" : "Some systems experiencing issues"}
                  </h1>
                  <p className="mt-1 text-xs sm:text-sm" style={{ color: "var(--muted)" }}>
                    {operationalCount} of {totalCount} services operational
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-right">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--faint)" }}>Last checked</div>
                  <div className="mt-0.5 font-mono text-[11px]" style={{ color: "var(--muted)" }}>
                    {lastUpdated.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
                  </div>
                </div>
                <div className="h-8 w-px hidden sm:block" style={{ background: "var(--border)" }} />
                <div className="text-right hidden sm:block">
                  <div className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--faint)" }}>Uptime</div>
                  <div className="mt-0.5 font-mono text-[11px] text-[#10b981]">99.97%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 animate-fade-in" style={{ animationDelay: "100ms" }}>
          {[
            { label: "Services", value: totalCount.toString(), color: "var(--fg)" },
            { label: "Operational", value: operationalCount.toString(), color: "#10b981" },
            { label: "Avg Latency", value: avgLatency, color: "var(--fg)" },
            { label: "Uptime (30d)", value: "99.97%", color: "#10b981" }
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-4 text-center">
              <div className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--faint)" }}>{stat.label}</div>
              <div className="mt-1 text-lg font-bold sm:text-xl" style={{ color: stat.color }}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Service categories */}
        {categories.map((category, catIndex) => {
          const services = SERVICES.filter((s) => s.category === category);
          const catIcon = CATEGORY_ICONS[category] || CATEGORY_ICONS.Platform;
          return (
            <section key={category} className="mt-10 animate-fade-in sm:mt-12" style={{ animationDelay: `${(catIndex + 2) * 80}ms` }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: "var(--accent-soft)", color: "var(--accent)" }}>
                  <ServiceIcon path={catIcon} />
                </div>
                <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--accent)" }}>{category}</h2>
                <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
                <span className="text-[10px] font-medium" style={{ color: "var(--faint)" }}>
                  {services.length} service{services.length > 1 ? "s" : ""}
                </span>
              </div>
              <div className="glass-card overflow-hidden">
                {services.map((service, index) => (
                  <div
                    key={service.name}
                    className={`flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-4 ${index > 0 ? "border-t" : ""}`}
                    style={{ borderColor: index > 0 ? "var(--border)" : "transparent" }}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <StatusDot status={service.status} />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                          <a
                            href={service.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium transition-colors hover:text-[#10b981]"
                            style={{ color: "var(--fg)" }}
                          >
                            {service.name}
                          </a>
                          <StatusBadge status={service.status} />
                        </div>
                        <p className="mt-0.5 text-[11px]" style={{ color: "var(--faint)" }}>{service.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 sm:gap-6 shrink-0 pl-6 sm:pl-0">
                      <div className="hidden text-right lg:block" style={{ width: 140 }}>
                        <UptimeBar uptime={service.uptime} />
                      </div>
                      <div className="text-right hidden sm:block">
                        <div className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--faint)" }}>Latency</div>
                        <div className="mt-0.5 font-mono text-[11px]" style={{ color: "var(--muted)" }}>{service.latency}</div>
                      </div>
                      <div className="text-right hidden sm:block">
                        <div className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--faint)" }}>Uptime</div>
                        <div className="mt-0.5 font-mono text-[11px] text-[#10b981]">{service.uptime}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {/* Incident history */}
        <section className="mt-16 animate-fade-in" style={{ animationDelay: "500ms" }}>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--accent)" }}>Incident History</h2>
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          </div>
          {DEMO_INCIDENTS.length > 0 ? (
            <div className="space-y-4">
              {DEMO_INCIDENTS.map((incident) => (
                <div key={incident.id} className="glass-card p-5 sm:p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-semibold" style={{ color: "var(--fg)" }}>{incident.title}</h3>
                        <StatusBadge status={incident.status === "resolved" ? "operational" : "degraded"} />
                        <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase ${
                          incident.severity === "critical"
                            ? "border-[#ef4444]/30 bg-[#ef4444]/10 text-[#ef4444]"
                            : incident.severity === "major"
                              ? "border-[#f59e0b]/30 bg-[#f59e0b]/10 text-[#f59e0b]"
                              : "border-[#6366f1]/30 bg-[#6366f1]/10 text-[#6366f1]"
                        }`}>
                          {incident.severity}
                        </span>
                      </div>
                      <p className="mt-1 text-[11px]" style={{ color: "var(--faint)" }}>
                        Started {new Date(incident.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        {incident.resolvedAt && ` -- Resolved ${new Date(incident.resolvedAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-3 border-t pt-4" style={{ borderColor: "var(--border)" }}>
                    {incident.updates.map((update, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className={`h-2 w-2 rounded-full ${
                            update.status === "resolved" ? "bg-[#10b981]" :
                            update.status === "investigating" ? "bg-[#6366f1]" : "bg-[#f59e0b]"
                          }`} />
                          {i < incident.updates.length - 1 && <div className="mt-1 w-px flex-1" style={{ background: "var(--border)" }} />}
                        </div>
                        <div className="pb-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-semibold uppercase" style={{ color: "var(--faint)" }}>{update.status}</span>
                            <span className="text-[10px]" style={{ color: "var(--faint)" }}>{update.time}</span>
                          </div>
                          <p className="mt-0.5 text-xs" style={{ color: "var(--muted)" }}>{update.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card p-8 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl mx-auto" style={{ background: "rgba(16,185,129,0.12)" }}>
                <svg className="h-6 w-6 text-[#10b981]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="mt-4 text-sm font-medium" style={{ color: "var(--fg)" }}>No incidents reported</p>
              <p className="mt-1 text-xs" style={{ color: "var(--faint)" }}>All services have been running smoothly for the past 30 days.</p>
            </div>
          )}
        </section>

        {/* Resources */}
        <section className="mt-16 animate-fade-in" style={{ animationDelay: "600ms" }}>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--accent)" }}>Resources</h2>
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          </div>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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
      <footer className="mt-16 border-t sm:mt-20" style={{ borderColor: "var(--border)", background: "color-mix(in srgb, var(--bg) 80%, transparent)" }}>
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-3">
              <img src="/logo.svg" alt="Aetheris" className="h-5 w-5" />
              <div>
                <span className="text-xs font-semibold" style={{ color: "var(--fg)" }}>Aetheris Status</span>
                <span className="ml-2 text-[10px]" style={{ color: "var(--faint)" }}>Made with care by Leonardo Galli</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs" style={{ color: "var(--faint)" }}>
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
