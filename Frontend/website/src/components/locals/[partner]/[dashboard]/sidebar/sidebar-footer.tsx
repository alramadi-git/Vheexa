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

export default function SidebarFooter() {
  return (
    <ShadcnSidebarFooter>
      <Newsletter />
    </ShadcnSidebarFooter>
  );
}

function Newsletter() {
  const id = useId();
  const tNewsletter = useTranslations(
    "app.partner.dashboard.layout.sidebar.footer.newsletter",
  );

  const { control, handleSubmit } = useForm<tEmail>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(zEmail),
  });

  function onSubmit() {}

  return (
    <Card className="gap-2 bg-transparent py-4 shadow-none">
      <CardHeader className="px-4">
        <CardTitle className="text-sm">{tNewsletter("label")}</CardTitle>
        <CardDescription>{tNewsletter("description")}</CardDescription>
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
                      placeholder: tNewsletter("form.email.placeholder"),
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
            {tNewsletter("form.submit")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
