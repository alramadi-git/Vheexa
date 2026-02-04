import  { MetadataRoute } from "next";

const domain = process.env.NEXT_PUBLIC_DOMAIN!;

export default function Robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${domain}/sitemap.xml`,
  };
}
