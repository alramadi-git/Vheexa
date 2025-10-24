import { getTranslations } from "next-intl/server";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/shadcn/card";
import { FullHDImage } from "@/components/locals/blocks/image";

type TStep = {
  label: string;
  description: string;
  illustration: {
    src: string;
    alt: string;
  };
};

export default async function Steps() {
  const t = await getTranslations("app.user.page.how-it-works");
  const steps: Array<TStep> = t.raw("steps");

  return (
    <ol className="grid grid-cols-3 gap-6">
      {steps.map((step, index) => (
        <li key={index}>
          <Card>
            <CardContent className="mt-auto">
              <FullHDImage
                src={step.illustration.src}
                alt={step.illustration.alt}
                className="h-64 w-full rounded-lg"
              />
            </CardContent>
            <CardHeader className="block h-18 space-y-2">
              <CardTitle className="text-xl font-medium">{step.label}</CardTitle>
              <CardDescription>{step.description} </CardDescription>
            </CardHeader>
          </Card>
        </li>
      ))}
    </ol>
  );
}
