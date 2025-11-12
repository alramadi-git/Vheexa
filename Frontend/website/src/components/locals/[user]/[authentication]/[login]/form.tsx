"use client";

import { ClsAuthenticationService } from "@/services/[user]/authentication";

import z from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  tLoginCredentials,
  zLoginCredentials,
} from "@/validations/authentication";

import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import useAccountStore from "@/stores/[user]/account-store";

import { LuLoaderCircle } from "react-icons/lu";

import { Controller, useForm } from "react-hook-form";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/shadcn/field";
import { toast } from "sonner";
import { ErrorToast } from "@/components/locals/blocks/toast";

import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import { PasswordInput } from "@/components/locals/blocks/form";

export default function Form() {
  const authenticationService = new ClsAuthenticationService();

  const tForm = useTranslations("app.user.authentication.login.page.form");

  const router = useRouter();
  const login = useAccountStore((store) => store.login);

  const form = useForm<tLoginCredentials>({
    defaultValues: {
      email: tForm("email.default"),
      password: tForm("password.default"),
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
    router.back();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FieldGroup>
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">{tForm("email.label")}</FieldLabel>
              <Input
                aria-invalid={fieldState.invalid}
                id="email"
                type="email"
                placeholder={tForm("email.placeholder")}
                autoComplete="off"
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              {!fieldState.invalid && (
                <FieldDescription>
                  {tForm("email.description")}
                </FieldDescription>
              )}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password">
                {tForm("password.label")}
              </FieldLabel>
              <PasswordInput
                aria-invalid={fieldState.invalid}
                id="password"
                placeholder={tForm("password.placeholder")}
                autoComplete="off"
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              {!fieldState.invalid && (
                <FieldDescription>
                  {tForm("password.description")}
                </FieldDescription>
              )}
            </Field>
          )}
        />
      </FieldGroup>

      <Button
        type="submit"
        variant="outline"
        className="w-full"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting && (
          <LuLoaderCircle
            className="-ms-1 animate-spin"
            size={16}
            aria-hidden="true"
          />
        )}
        {tForm("submit")}
      </Button>
    </form>
  );
}
