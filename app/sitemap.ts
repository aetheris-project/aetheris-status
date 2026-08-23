import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const SITE_URL = "https://aetheris-status.vercel.app";
  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 }
  ];
}
