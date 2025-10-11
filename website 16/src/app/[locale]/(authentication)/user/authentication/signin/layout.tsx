import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Button } from "@/components/shadcn/button";
import { FaGoogle, FaApple, FaMeta } from "react-icons/fa6";

const authenticationProviders = [
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
export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]/user/authentication/signin">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "app.user.authentication.signin.layout",
  });

  return t.raw("metadata");
}

export default async function Layout({
  params,
  children,
}: LayoutProps<"/[locale]/user/authentication/signin">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex flex-col gap-y-6 overflow-auto p-6">
      <div className="flex flex-col gap-6 p-6 md:p-8">
        {children}

        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-card text-muted-foreground relative z-10 px-2">
            OR CONTINUE WITH
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {authenticationProviders.map((provider) => (
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
    </div>
  );
}
