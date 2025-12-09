"use client";

import { useTranslations } from "next-intl";
import useAccount from "@/hooks/partner/use-account";

import { SidebarFooter as ShadcnSidebarFooter } from "@/components/shadcn/sidebar";
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/shadcn/card";
import { Button } from "@/components/shadcn/button";

export default function SidebarFooter() {
  const { account } = useAccount();

  if (account === null) return null;
  return (
    <ShadcnSidebarFooter>
      {account?.partner.settings.receiveNews === false && <News />}
    </ShadcnSidebarFooter>
  );
}

function News() {
  const tNews = useTranslations(
    "app.partner.dashboard.layout.sidebar.footer.news",
  );

  return (
    <Card
      aria-label="Subscribe to our news"
      className="gap-2 bg-transparent py-4 shadow-none"
    >
      <CardContent className="px-4">
        <CardTitle className="text-sm">{tNews("label")}</CardTitle>
        <CardDescription>{tNews("description")}</CardDescription>

        <Button
          size="sm"
          className="bg-sidebar-primary text-sidebar-primary-foreground mt-3 w-full shadow-none"
        >
          {tNews("subscribe")}
        </Button>
      </CardContent>
    </Card>
  );
}
