import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";

const locales = routing.locales;
const baseURL = process.env.NEXT_PUBLIC_BASE_URL!;

const userPaths = ["/", "/vehicles", "/authentication/login"];
// const partnerPaths = []; // coming soon...
// const adminPaths = []; // coming soon...

const lastModified = new Date();

function generator(paths: string[]): MetadataRoute.Sitemap {
  return paths.flatMap<MetadataRoute.Sitemap[number]>((path) =>
    locales.map<MetadataRoute.Sitemap[number]>((locale) => {
      return {
        url: `${baseURL}/${locale}${path}`,
        alternates: {
          languages: Object.fromEntries(
            locales.map((locale) => [locale, `${baseURL}/${locale}${path}`]),
          ),
        },
        lastModified: lastModified,
      };
    }),
  );
}

export default function Sitemap(): MetadataRoute.Sitemap {
  const user = generator(userPaths);

  return [user].flat();
}
