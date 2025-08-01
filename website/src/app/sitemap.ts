import type { MetadataRoute } from "next";

type TSitemap = {
  return: MetadataRoute.Sitemap;
};

export default function Sitemap(): TSitemap["return"] {
  return [];
}
