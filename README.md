<p align="center">
 <img src="https://raw.githubusercontent.com/aetheris-project/.github/main/assets/logo.svg" alt="Aetheris Status" width="120" style="filter: drop-shadow(0 0 24px rgba(16,185,129,0.5))">
</p>

<h1 align="center">Aetheris Status</h1>

<p align="center">
 <strong>Real-time service status monitor for the Aetheris platform</strong>
</p>

<p align="center">
 <a href="https://aetheris-status.vercel.app"><img src="https://img.shields.io/badge/Live-aetheris--status.vercel.app-059669?style=for-the-badge&logo=vercel&logoColor=white" alt="Live status"></a>
 <a href="https://aetheris-status.vercel.app/api/status"><img src="https://img.shields.io/badge/Status%20API-JSON-10b981?style=for-the-badge" alt="Status API"></a>
 <a href="https://aetheris-docs.vercel.app"><img src="https://img.shields.io/badge/Docs-aetheris--docs.vercel.app-0EA5E9?style=for-the-badge&logo=readthedocs&logoColor=white" alt="Docs"></a>
 <a href="https://discord.gg/6GcfebuT2A"><img src="https://img.shields.io/badge/Discord-Community-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Discord"></a>
</p>

---

## What it monitors

The status page displays real-time status for all Aetheris platform services, APIs and integrations:

### Platform

| Service | URL | Status |
|---|---|---|
| Marketing Website | [aetheris-web.vercel.app](https://aetheris-web.vercel.app) | Operational |
| Admin Panel | [aetheris-panel.vercel.app/admin](https://aetheris-panel.vercel.app/admin) | Operational |
| Client Portal | [aetheris-panel.vercel.app](https://aetheris-panel.vercel.app) | Operational |
| Documentation Wiki | [aetheris-docs.vercel.app](https://aetheris-docs.vercel.app) | Operational |

### APIs

| Service | URL | Status |
|---|---|---|
| Backend API | /health | Operational |
| Pterodactyl Bridge | /api/hypervisors/pterodactyl | Operational |
| Proxmox VE Bridge | /api/hypervisors/proxmox | Operational |
| VirtFusion Bridge | /api/hypervisors/virtfusion | Operational |

### Integrations

| Service | Status |
|---|---|
| Stripe Gateway | Operational |
| PayPal Gateway | Operational |
| Mollie Gateway | Operational |
| Cloudflare DNS | Operational |

### Infrastructure

| Service | Status |
|---|---|
| GitHub Organization | Operational |
| Vercel Deployments | Operational |
| npm Registry | Operational |
| WinGet Package | Operational |

### Community

| Service | Status |
|---|---|
| Discord Server | Operational |

## Features

- **Real-time status** for 17+ services across 6 categories
- **Dark/Light theme** toggle with persistence
- **JSON API endpoint** at `/api/status` for programmatic access
- **Responsive design** works on all devices
- **SEO optimized** with OpenGraph, Twitter cards, and structured data
- **AGPL-3.0 licensed** with full attribution

## Quick start

```bash
git clone https://github.com/aetheris-project/aetheris-status.git
cd aetheris-status
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## JSON API

The status API is available at `https://aetheris-status.vercel.app/api/status`:

```bash
curl https://aetheris-status.vercel.app/api/status
```

Response:

```json
{
  "status": "operational",
  "timestamp": "2026-08-23T10:00:00.000Z",
  "uptime": "99.97%",
  "services": [
    {
      "name": "Marketing Website",
      "url": "https://aetheris-web.vercel.app",
      "category": "Platform",
      "status": "operational",
      "latency": "142ms",
      "uptime": "99.98%"
    }
  ],
  "incidents": [],
  "meta": {
    "project": "Aetheris",
    "version": "1.0.0",
    "documentation": "https://aetheris-docs.vercel.app",
    "source": "https://github.com/aetheris-project/aetheris-status",
    "contact": "hello@another-horizon.eu"
  }
}
```

## Deployment

This is a static Next.js site deployed to Vercel. Push to `main` to trigger automatic deployment.

**Live:** [https://aetheris-status.vercel.app](https://aetheris-status.vercel.app)

## Tech stack

- Next.js 16 (App Router)
- Tailwind CSS 4
- TypeScript

## Contributing

See [CONTRIBUTING.md](https://github.com/aetheris-project/aetheris-community/blob/main/docs/CONTRIBUTING.md) for guidelines.

## License

Licensed under **AGPL-3.0**. See [LICENSE.md](LICENSE.md).

Copyright (C) 2026 Leonardo Galli (Leo-Galli), Aetheris Project.

All contributions require a Pull Request with automated CI checks (lint, typecheck, build) before manual review. Contact: hello@another-horizon.eu

---

<p align="center">
 <strong>Made with care by <a href="https://github.com/Leo-Galli">Leonardo Galli</a></strong>
</p>

<p align="center">
 <a href="https://aetheris-web.vercel.app">Website</a>
 |
 <a href="https://aetheris-panel.vercel.app">Panel</a>
 |
 <a href="https://aetheris-docs.vercel.app">Docs</a>
 |
 <a href="https://github.com/aetheris-project/aetheris-app">App</a>
 |
 <a href="https://github.com/aetheris-project/aetheris-addons">Addons</a>
 |
 <a href="https://github.com/aetheris-project/aetheris-themes">Themes</a>
 |
 <a href="https://github.com/aetheris-project/aetheris-game-eggs">Game Eggs</a>
 |
 <a href="https://github.com/aetheris-project/aetheris-windows-installer">Windows Installer</a>
 |
 <a href="https://github.com/aetheris-project/aetheris-installer">Installer</a>
 |
 <a href="https://github.com/aetheris-project/aetheris-ops">Ops</a>
 |
 <a href="https://github.com/aetheris-project/aetheris-community">Community</a>
 |
 <a href="https://discord.gg/6GcfebuT2A">Discord</a>
 |
 <a href="https://paypal.me/LeonardoGalliITA">Donate</a>
</p>
