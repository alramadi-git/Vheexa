import type { Metadata } from "next";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { Fragment } from "react";
import { Button } from "@/components/shadcn/button";
import { FaGoogle, FaApple, FaMeta } from "react-icons/fa6";
import { FullHDImage } from "@/components/locals/blocks/image";

const AUTHENTICATION_PROVIDERS = [
  {
    id: "google",
    label: "Sign in with google",
    icon: <FaGoogle />,
  },
  {
    id: "apple",
    label: "Sign in with apple",
    icon: <FaApple />,
  },
  {
    id: "meta",
    label: "Sign in with meta",
    icon: <FaMeta />,
  },
];

export const dynamic = "force-static";
export async function generateMetadata(
  props: LayoutProps<"/[locale]/auth">,
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "app.auth.layout" });

  return t.raw("metadata");
}

export default async function Layout(
  props: LayoutProps<"/[locale]/auth">,
) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations("app.auth.page");

  return (
    <Fragment>
      <div className="flex h-full flex-col gap-y-6 p-6">
        {props.children}

        <div className="after:border-border relative mt-auto text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-card text-muted-foreground relative z-10 px-2">
            OR CONTINUE WITH
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {AUTHENTICATION_PROVIDERS.map((provider) => (
            <Button
              key={provider.id}
              variant="outline"
              className="bg-transparent duration-300"
            >
              {provider.icon}
            </Button>
          ))}
        </div>
      </div>

      <FullHDImage
        src={t("image.src")}
        alt={t("image.alt")}
        className="size-full object-cover max-md:hidden dark:brightness-[0.2] dark:grayscale"
      />
    </Fragment>
  );
}
