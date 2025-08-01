import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import type { TParamsLocale } from "@/types/params";

import { getTranslations, setRequestLocale } from "next-intl/server";

import Image from "next/image";
import { Card, CardContent } from "@/components/shadcn/card";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";

type TGenerateMetadata = {
  props: TParamsLocale;
  return: Promise<Metadata>;
};

type TLayout = {
  props: TParamsLocale & PropsWithChildren;
};

export const dynamic = "force-static";
export async function generateMetadata(
  props: TGenerateMetadata["props"],
): TGenerateMetadata["return"] {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "partner" });

  return t.raw("metadata");
}

export default async function Layout(props: TLayout["props"]) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <main className="relative flex h-dvh items-center justify-center overflow-hidden">
      <AnimatedGridPattern
        duration={3}
        numSquares={0}
        repeatDelay={1}
        maxOpacity={0.1}
        className="skew-y-12 [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
      />

      <Card className="relative overflow-hidden bg-transparent p-0">
        <CardContent className="grid h-[550px] w-[850px] p-0 md:grid-cols-2">
          {props.children}

          <Image
            width="375"
            height="462"
            src="/assets/placeholder.png"
            alt="placeholder"
            className="size-full object-cover max-md:hidden dark:brightness-[0.2] dark:grayscale"
          />
        </CardContent>
      </Card>
    </main>
  );
}
