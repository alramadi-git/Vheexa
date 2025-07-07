import type { ReactNode } from "react";

import Image from "next/image";

import { AnimatedGridPattern } from "@/app/_components/magicui/animated-grid-pattern";
import { Card, CardContent } from "@/app/_components/shadcn/card";

export const dynamic = "force-static";
export const metadata = {
  title: {
    absolute: "Vheexa - Auth",
    template: "%s | Vheexa - Auth",
  },
};

interface IProps extends Readonly<{ children: ReactNode }> {}
function Layout(props: IProps) {
  return (
    <main className="h-dvh flex items-center justify-center relative overflow-hidden">
      <AnimatedGridPattern
        numSquares={0}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className="[mask-image:radial-gradient(450px_circle_at_center,white,transparent)] skew-y-12"
      />

      <Card className="p-0 bg-transparent overflow-hidden relative">
        <CardContent className="w-[850px] h-[550px] grid p-0 md:grid-cols-2">
          {props.children}

          <Image
            width="375"
            height="462"
            src="/assets/placeholder.png"
            alt="placeholder"
            className="max-md:hidden size-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </CardContent>
      </Card>
    </main>
  );
}

export default Layout;
