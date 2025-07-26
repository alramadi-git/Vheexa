import Image from "next/image";
import { type ReactNode } from "react";
import { Card, CardContent } from "@/components/shadcn/card";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";

export const dynamic = "force-static";
export const metadata = {
  title: {
    absolute: "Vheexa - Auth",
    template: "%s | Vheexa - Auth",
  },
};

interface IProps extends Readonly<{ children: ReactNode }> {}
export default function Layout(props: IProps) {
  return (
    <main className="relative flex h-dvh items-center justify-center overflow-hidden">
      <AnimatedGridPattern
        numSquares={0}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
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
