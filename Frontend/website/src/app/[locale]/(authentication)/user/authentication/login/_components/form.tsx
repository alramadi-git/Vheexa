"use client";

import { AuthenticationService } from "@/services/user/authentication";

import z from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  tLoginCredentials,
  zLoginCredentials,
} from "@/validations/authentication";

import useAccountStore from "@/app/[locale]/user/_stores/account-store";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/shadcn/field";
import { toast } from "sonner";
import { ErrorToast } from "@/components/locals/blocks/toast";

export default function Form() {
  const authenticationService = new AuthenticationService();

  const t = useTranslations("app.user.authentication.login.page.card.form");

  const router = useRouter();
  const login = useAccountStore((store) => store.login);

  const form = useForm<tLoginCredentials>({
    defaultValues: {
      email: t("email.default"),
      password: t("password.default"),
    },
    resolver: zodResolver(zLoginCredentials),
  });

  async function onSubmit(loginCredentials: z.infer<typeof zLoginCredentials>) {
    const response = await authenticationService.login(loginCredentials);
    if (response.isSuccess === false) {
      console.error("error status code: ", response.statusCode);
      console.error("error status text: ", response.statusText);
      console.error("error message: ", response.message);
      console.error("error issues: ", response.issues);

      toast.custom(() => <ErrorToast error={response} />);
      return;
    }
    login(response.data);
    router.push("/user");
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <Controller
        control={form.control}
        name="email"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="email">{t("email.label")}</FieldLabel>
            <Input
              {...field}
              id="email"
              type="email"
              placeholder={t("email.placeholder")}
              autoComplete="off"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            {!fieldState.invalid && (
              <FieldDescription>{t("email.description")}</FieldDescription>
            )}
          </Field>
        )}
      />

      <Controller
        control={form.control}
        name="password"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="password">{t("password.label")}</FieldLabel>
            <Input
              {...field}
              id="password"
              type="text"
              placeholder={t("password.placeholder")}
              autoComplete="off"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            {!fieldState.invalid && (
              <FieldDescription>{t("password.description")}</FieldDescription>
            )}
          </Field>
        )}
      />

      <Button type="submit" variant="outline" className="w-full">
        {t("submit")}
      </Button>
    </form>
  );
}
