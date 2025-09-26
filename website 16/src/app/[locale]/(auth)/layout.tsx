import type { PropsWithChildren } from "react";

import { Card, CardContent } from "@/components/shadcn/card";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";

type TLayout = {
  props: PropsWithChildren;
};

export const dynamic = "force-static";

export default function Layout(props: LayoutProps<"/[locale]">) {
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
        </CardContent>
      </Card>
    </main>
  );
}
