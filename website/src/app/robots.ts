import type { MetadataRoute } from "next";

type TSitemap = {
  return: MetadataRoute.Robots;
};

export default function Robots(): TSitemap["return"] {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
  };
}
