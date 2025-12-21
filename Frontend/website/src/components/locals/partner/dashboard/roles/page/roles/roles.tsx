"use client";

import { useTranslations } from "next-intl";
import useRoles from "@/hooks/partner/roles";

import { tRoleCreate, zRoleCreate } from "@/validations/partner/role";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm, Controller } from "react-hook-form";

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

import { Button } from "@/components/shadcn/button";

import Filter from "./filter";
import Table from "./table";
import { Pagination } from "@/components/locals/blocks/pagination";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/dialog";
import { LuPlus } from "react-icons/lu";
import { ScrollArea } from "@/components/shadcn/scroll-area";
import { Separator } from "@/components/shadcn/separator";
import { FieldGroup } from "@/components/shadcn/field";

export default function Roles() {
  const tRoles = useTranslations("app.partner.dashboard.roles.page.roles");

  const { isLoading, result } = useRoles();

  return (
    <Section className="h-fullscreen">
      <Card>
        <CardHeader className="flex items-end justify-between">
          <Intro className="space-y-1">
            <CardTitle>
              <Title heading="h1">{tRoles("title")}</Title>
            </CardTitle>
            <CardDescription>
              <Description>{tRoles("description")}</Description>
            </CardDescription>
          </Intro>
          <AddNew />
        </CardHeader>
        <CardContent className="block space-y-6">
          <Filter />
          <Card>
            <CardContent className="space-y-6">
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

function AddNew() {
  const tAddNew = useTranslations(
    "app.partner.dashboard.roles.page.roles.add-new",
  );

  const {
    control,
    reset: handleReset,
    handleSubmit,
  } = useForm<tRoleCreate>({
    defaultValues: {
      name: "",
      permissions: [],
      status: 0,
    },
    resolver: zodResolver(zRoleCreate),
  });

  function submit(data: tRoleCreate): void {}
  function reset(): void {
    handleReset();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <LuPlus />
          {tAddNew("trigger")}
        </Button>
      </DialogTrigger>
      <DialogContent
        showCloseButton
        className="flex h-[calc(100vh-2rem)] min-w-[calc(100vw-2rem)] flex-col overflow-auto p-12"
      >
        <DialogHeader>
          <DialogTitle className="text-4xl">
            {tAddNew("content.title")}
          </DialogTitle>
          <DialogDescription className="text-lg">
            {tAddNew("content.description")}
          </DialogDescription>
        </DialogHeader>
        <Separator className="mt-1 mb-6" />

        <form
          onReset={reset}
          onSubmit={handleSubmit(submit)}
          className="flex grow items-end"
        >
          <FieldGroup className="grid-cols-2">
            <Button variant="outline" type="reset" className="mt-auto">
              {tAddNew("content.form.reset")}
            </Button>
            <Button type="submit" className="mt-auto">
              {tAddNew("content.form.submit")}
            </Button>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
