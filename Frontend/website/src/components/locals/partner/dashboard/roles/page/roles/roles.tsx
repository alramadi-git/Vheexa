"use client";

import { useTranslations } from "next-intl";
import useRoles from "@/hooks/partner/roles";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";

import { Section, Intro } from "@/components/locals/blocks/typography";
import {
  Title,
  Description,
} from "@/components/locals/partner/dashboard/blocks/typographies";

import Filter from "./filter";
import Table from "./table";
import { Pagination } from "@/components/locals/blocks/pagination";

export default function Roles() {
  const tRoles = useTranslations("app.partner.dashboard.roles.page.roles");

  const { isLoading, result } = useRoles();

  return (
    <Section className="h-fullscreen">
      <Card>
        <CardHeader className="flex justify-between">
          <Intro className="space-y-1">
            <CardTitle>
              <Title heading="h1">{tRoles("title")}</Title>
            </CardTitle>
            <CardDescription>
              <Description>{tRoles("description")}</Description>
            </CardDescription>
          </Intro>
        </CardHeader>
        <CardContent className="block space-y-6">
          <Filter />
          <Card>
            <CardContent>
              <Table
                isLoading={isLoading}
                isSuccess={result?.isSuccess || false}
                data={result?.isSuccess ? result.data : []}
              />
              {!isLoading && result?.isSuccess && (
                <Pagination pagination={result.pagination} />
              )}
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </Section>
  );
}
