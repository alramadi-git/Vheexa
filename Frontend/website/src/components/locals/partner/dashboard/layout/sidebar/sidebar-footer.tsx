"use client";

import { useId } from "react";
import { useTranslations } from "next-intl";
import { useForm, Controller } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { tEmail, zEmail } from "@/validations/authentication";

import { SidebarFooter as ShadcnSidebarFooter } from "@/components/shadcn/sidebar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/shadcn/card";

import { Field, FieldError } from "@/components/shadcn/field";
import { FieldEmail } from "@/components/locals/blocks/fields";
import { Button } from "@/components/shadcn/button";
import useAccount from "@/hooks/partner/use-account";

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
  const id = useId();
  const tNews = useTranslations(
    "app.partner.dashboard.layout.sidebar.footer.news",
  );

  const { control, handleSubmit } = useForm<tEmail>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(zEmail),
  });

  function onSubmit() {}

  return (
    <Card
      aria-label="Subscribe to our news"
      className="gap-2 bg-transparent py-4 shadow-none"
    >
      <CardHeader className="px-4">
        <CardTitle className="text-sm">{tNews("label")}</CardTitle>
        <CardDescription>{tNews("description")}</CardDescription>
      </CardHeader>

      <CardContent className="px-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            control={control}
            name="email"
            render={(controllerRenderProps) => {
              const { fieldState } = controllerRenderProps;

              return (
                <Field data-invalid={fieldState.invalid}>
                  <FieldEmail
                    inputProps={{
                      "aria-invalid": fieldState.invalid,
                      autoComplete: "off",
                      id: id,
                      placeholder: tNews("form.email.placeholder"),
                    }}
                    controllerRenderProps={controllerRenderProps}
                  />

                  {fieldState.error && (
                    <FieldError>{fieldState.error!.message}</FieldError>
                  )}
                </Field>
              );
            }}
          />

          <Button
            size="sm"
            className="bg-sidebar-primary text-sidebar-primary-foreground w-full shadow-none"
          >
            {tNews("form.submit")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
