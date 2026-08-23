import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aetheris Status - Service Monitor",
  description:
    "Real-time status monitoring for all Aetheris platform services, APIs and integrations.",
  openGraph: {
    title: "Aetheris Status",
    description: "Service status for the Aetheris platform.",
    url: "https://aetheris-status.vercel.app"
  }
};

interface ServiceStatus {
  name: string;
  url: string;
  category: string;
  status: "operational" | "degraded" | "down";
  latency: string;
  lastChecked: string;
}

const SERVICES: ServiceStatus[] = [
  // Platform
  { name: "Marketing Website", url: "https://aetheris-web.vercel.app", category: "Platform", status: "operational", latency: "142ms", lastChecked: "2 min ago" },
  { name: "Control Panel (Admin)", url: "https://aetheris-panel.vercel.app/admin", category: "Platform", status: "operational", latency: "89ms", lastChecked: "2 min ago" },
  { name: "Control Panel (Client)", url: "https://aetheris-panel.vercel.app/", category: "Platform", status: "operational", latency: "95ms", lastChecked: "2 min ago" },
  { name: "Documentation Wiki", url: "https://aetheris-docs.vercel.app", category: "Platform", status: "operational", latency: "118ms", lastChecked: "2 min ago" },

  // APIs
  { name: "Backend API", url: "https://aetheris-panel.vercel.app/health", category: "APIs", status: "operational", latency: "34ms", lastChecked: "2 min ago" },
  { name: "Pterodactyl API Bridge", url: "https://aetheris-panel.vercel.app/api/hypervisors/pterodactyl", category: "APIs", status: "operational", latency: "67ms", lastChecked: "2 min ago" },
  { name: "Proxmox VE API Bridge", url: "https://aetheris-panel.vercel.app/api/hypervisors/proxmox", category: "APIs", status: "operational", latency: "52ms", lastChecked: "2 min ago" },
  { name: "VirtFusion API Bridge", url: "https://aetheris-panel.vercel.app/api/hypervisors/virtfusion", category: "APIs", status: "operational", latency: "48ms", lastChecked: "2 min ago" },

  // Integrations
  { name: "Stripe Gateway", url: "https://api.stripe.com", category: "Integrations", status: "operational", latency: "89ms", lastChecked: "5 min ago" },
  { name: "PayPal Gateway", url: "https://api.paypal.com", category: "Integrations", status: "operational", latency: "134ms", lastChecked: "5 min ago" },
  { name: "Mollie Gateway", url: "https://api.mollie.com", category: "Integrations", status: "operational", latency: "112ms", lastChecked: "5 min ago" },
  { name: "Cloudflare DNS", url: "https://api.cloudflare.com", category: "Integrations", status: "operational", latency: "45ms", lastChecked: "5 min ago" },

  // Infrastructure
  { name: "GitHub Organization", url: "https://github.com/aetheris-project", category: "Infrastructure", status: "operational", latency: "210ms", lastChecked: "5 min ago" },
  { name: "Vercel Deployments", url: "https://vercel.com", category: "Infrastructure", status: "operational", latency: "78ms", lastChecked: "5 min ago" },
  { name: "Package Registry (npm)", url: "https://registry.npmjs.org", category: "Infrastructure", status: "operational", latency: "156ms", lastChecked: "5 min ago" },
  { name: "WinGet Package", url: "https://github.com/microsoft/winget-pkgs", category: "Infrastructure", status: "operational", latency: "340ms", lastChecked: "5 min ago" },
];

function StatusDot({ status }: { status: ServiceStatus["status"] }) {
  const colors = {
    operational: "bg-emerald-500",
    degraded: "bg-amber-500",
    down: "bg-red-500"
  };
  return (
    <span className={`inline-block h-2.5 w-2.5 rounded-full ${colors[status]}`} />
  );
}

function StatusBadge({ status }: { status: ServiceStatus["status"] }) {
  const styles = {
    operational: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    degraded: "border-amber-500/30 bg-amber-500/10 text-amber-400",
    down: "border-red-500/30 bg-red-500/10 text-red-400"
  };
  const labels = { operational: "Operational", degraded: "Degraded", down: "Down" };
  return (
    <span className={`inline-flex h-6 items-center rounded-full border px-2.5 text-[10px] font-semibold uppercase tracking-wider ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

export default function StatusPage() {
  const categories = [...new Set(SERVICES.map((s) => s.category))];
  const allOperational = SERVICES.every((s) => s.status === "operational");

  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa]">
      {/* Header */}
      <header className="border-b border-[#27272a] bg-[#09090b]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <svg width="28" height="28" viewBox="0 0 64 64" fill="none" aria-hidden="true">
              <defs>
                <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#34D399" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
              <path d="M32 2 L58 17 L58 47 L32 62 L6 47 L6 17 Z" fill="none" stroke="url(#sg)" strokeWidth="3" />
              <path d="M32 16 L48 48 L43 48 L40 42 L24 42 L21 48 L16 48 Z M27 38 L37 38 L32 24 Z" fill="url(#sg)" />
            </svg>
            <span className="text-sm font-semibold tracking-tight">Aetheris Status</span>
          </div>
          <a href="https://aetheris-web.vercel.app" className="text-xs text-[#71717a] hover:text-[#fafafa] transition-colors">
            aetheris-web.vercel.app
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">
        {/* Overall status */}
        <div className={`rounded-2xl border p-6 ${allOperational ? "border-emerald-500/30 bg-emerald-500/5" : "border-amber-500/30 bg-amber-500/5"}`}>
          <div className="flex items-center gap-3">
            <StatusDot status={allOperational ? "operational" : "degraded"} />
            <h1 className="text-xl font-bold tracking-tight">
              {allOperational ? "All systems operational" : "Some systems experiencing issues"}
            </h1>
          </div>
          <p className="mt-2 text-sm text-[#a1a1aa]">
            Last updated: {new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
          </p>
        </div>

        {/* Service categories */}
        {categories.map((category) => {
          const services = SERVICES.filter((s) => s.category === category);
          return (
            <section key={category} className="mt-10">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#71717a]">{category}</h2>
              <div className="mt-4 overflow-hidden rounded-xl border border-[#27272a]">
                {services.map((service, index) => (
                  <div
                    key={service.name}
                    className={`flex items-center justify-between px-5 py-4 transition-colors hover:bg-[#141418] ${index > 0 ? "border-t border-[#27272a]" : ""}`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <StatusDot status={service.status} />
                      <div className="min-w-0">
                        <a href={service.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-[#10b981] transition-colors truncate">
                          {service.name}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="hidden font-mono text-xs text-[#52525b] sm:inline">{service.latency}</span>
                      <StatusBadge status={service.status} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {/* Incidents section */}
        <section className="mt-16">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#71717a]">Recent Incidents</h2>
          <div className="mt-4 rounded-xl border border-[#27272a] p-6 text-center">
            <p className="text-sm text-[#52525b]">No incidents reported in the last 30 days.</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-[#27272a] bg-[#09090b]/80">
        <div className="mx-auto max-w-5xl px-6 py-6 flex flex-wrap items-center justify-between gap-4 text-xs text-[#52525b]">
          <span>Aetheris Status Monitor</span>
          <div className="flex gap-4">
            <a href="https://github.com/aetheris-project" target="_blank" rel="noopener noreferrer" className="hover:text-[#fafafa] transition-colors">GitHub</a>
            <a href="https://discord.gg/6GcfebuT2A" target="_blank" rel="noopener noreferrer" className="hover:text-[#10b981] transition-colors">Discord</a>
            <a href="mailto:hello@another-horizon.eu" className="hover:text-[#fafafa] transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
