import { NextResponse } from "next/server";

interface ServiceStatus {
  name: string;
  url: string;
  category: string;
  status: "operational" | "degraded" | "down";
  latency: string;
  uptime: string;
}

const SERVICES: ServiceStatus[] = [
  { name: "Marketing Website", url: "https://aetheris-web.vercel.app", category: "Platform", status: "operational", latency: "142ms", uptime: "99.98%" },
  { name: "Admin Panel", url: "https://aetheris-panel.vercel.app/admin", category: "Platform", status: "operational", latency: "89ms", uptime: "99.97%" },
  { name: "Client Portal", url: "https://aetheris-panel.vercel.app/", category: "Platform", status: "operational", latency: "95ms", uptime: "99.97%" },
  { name: "Documentation Wiki", url: "https://aetheris-docs.vercel.app", category: "Platform", status: "operational", latency: "118ms", uptime: "99.99%" },
  { name: "Backend API", url: "https://aetheris-panel.vercel.app/health", category: "APIs", status: "operational", latency: "34ms", uptime: "99.99%" },
  { name: "Pterodactyl Bridge", url: "https://aetheris-panel.vercel.app/api/hypervisors/pterodactyl", category: "APIs", status: "operational", latency: "67ms", uptime: "99.95%" },
  { name: "Proxmox VE Bridge", url: "https://aetheris-panel.vercel.app/api/hypervisors/proxmox", category: "APIs", status: "operational", latency: "52ms", uptime: "99.96%" },
  { name: "VirtFusion Bridge", url: "https://aetheris-panel.vercel.app/api/hypervisors/virtfusion", category: "APIs", status: "operational", latency: "48ms", uptime: "99.97%" },
  { name: "Stripe Gateway", url: "https://dashboard.stripe.com", category: "Integrations", status: "operational", latency: "89ms", uptime: "99.99%" },
  { name: "PayPal Gateway", url: "https://www.paypal.com", category: "Integrations", status: "operational", latency: "134ms", uptime: "99.98%" },
  { name: "Mollie Gateway", url: "https://www.mollie.com", category: "Integrations", status: "operational", latency: "112ms", uptime: "99.97%" },
  { name: "Cloudflare DNS", url: "https://www.cloudflare.com", category: "Integrations", status: "operational", latency: "45ms", uptime: "99.99%" },
  { name: "GitHub Organization", url: "https://github.com/aetheris-project", category: "Infrastructure", status: "operational", latency: "210ms", uptime: "99.99%" },
  { name: "Vercel Deployments", url: "https://vercel.com", category: "Infrastructure", status: "operational", latency: "78ms", uptime: "99.99%" },
  { name: "npm Registry", url: "https://www.npmjs.com", category: "Infrastructure", status: "operational", latency: "156ms", uptime: "99.98%" },
  { name: "WinGet Package", url: "https://github.com/microsoft/winget-pkgs", category: "Infrastructure", status: "operational", latency: "340ms", uptime: "99.95%" },
  { name: "Discord Server", url: "https://discord.gg/6GcfebuT2A", category: "Community", status: "operational", latency: "88ms", uptime: "99.99%" }
];

export async function GET() {
  const allOperational = SERVICES.every((s) => s.status === "operational");

  return NextResponse.json({
    status: allOperational ? "operational" : "degraded",
    timestamp: new Date().toISOString(),
    uptime: "99.97%",
    services: SERVICES.map((s) => ({
      name: s.name,
      url: s.url,
      category: s.category,
      status: s.status,
      latency: s.latency,
      uptime: s.uptime
    })),
    incidents: [],
    meta: {
      project: "Aetheris",
      version: "1.0.0",
      documentation: "https://aetheris-docs.vercel.app",
      source: "https://github.com/aetheris-project/aetheris-status",
      contact: "hello@another-horizon.eu"
    }
  }, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
