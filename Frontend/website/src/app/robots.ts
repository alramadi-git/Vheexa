import type { MetadataRoute } from "next";

const baseURL = process.env.NEXT_PUBLIC_DOMAINBASE_URL;
export default function Robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseURL}/sitemap.xml`,
  };
}
