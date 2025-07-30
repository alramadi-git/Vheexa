import type { Metadata } from "next";
import type { TParamsLocale } from "@/types/params";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/shadcn/button";
import { FaApple, FaGoogle, FaMeta } from "react-icons/fa6";
import Form from "@/app/[locale]/auth/signin/_components/form";

type TGenerateMetadata = {
  props: TParamsLocale;
  return: Promise<Metadata>;
};

type TPage = {
  props: TParamsLocale;
};

export const dynamic = "force-static";
export async function generateMetadata(
  props: TGenerateMetadata["props"],
): TGenerateMetadata["return"] {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "auth.signin" });

  return t.raw("metadata");
}

export default async function Page(props: TPage["props"]) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8">
      {/** Header */}
      <div className="flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-muted-foreground text-balance">
          Sign in to your Vheexa account
        </p>
      </div>

      {/** Form */}
      <Form />

      {/** Separator */}
      <div className="after:border-border relative mt-auto text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
        <span className="text-muted-foreground relative z-10 px-2">
          Or continue with
        </span>
      </div>

      {/** Auth Providers */}
      <div className="grid grid-cols-3 gap-4">
        <Button variant="outline" type="button" className="w-full">
          <FaApple />
        </Button>
        <Button variant="outline" type="button" className="w-ful">
          <FaGoogle />
        </Button>
        <Button variant="outline" type="button" className="w-full">
          <FaMeta />
        </Button>
      </div>

      {/** Create an Account */}
      <p className="text-sm">
        {"Don't"} have an account?{" "}
        <Button variant="link" className="p-0 duration-[0] hover:text-blue-500">
          <Link href="/auth/signup">Create one</Link>
        </Button>
      </p>
    </div>
  );
}
