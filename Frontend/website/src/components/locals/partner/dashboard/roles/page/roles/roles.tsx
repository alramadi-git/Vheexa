"use client";

import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { Section, Intro } from "@/components/locals/blocks/typography";
import { Title, Description } from "../../../blocks/typographies";

export default function Vehicles() {
  const tVehicles = useTranslations(
    "app.partner.dashboard.vehicles.page.vehicles",
  );

  return (
    <Section className="h-fullscreen">
      <Card>
        <CardContent className="block space-y-3.5">
          <CardHeader className="flex justify-between px-0">
            <Intro className="space-y-1">
              <CardTitle>
                <Title heading="h1">{tVehicles("title")}</Title>
              </CardTitle>
              <CardDescription>
                <Description>{tVehicles("description")}</Description>
              </CardDescription>
            </Intro>
          </CardHeader>
        </CardContent>
      </Card>
    </Section>
  );
}
