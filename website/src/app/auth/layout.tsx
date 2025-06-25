import type { ReactNode } from "react";

import Image from "next/image";

import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { Card, CardContent } from "@/components/shadcn/card";

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

      <Card className="p-0 overflow-hidden">
        <CardContent className="w-[750px] h-[450px] grid p-0 md:grid-cols-2">
          {props.children}

          <div className="bg-muted relative hidden md:block">
            <Image
              fill
              src="/assets/placeholder.png"
              alt="placeholder"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

export default Layout;
