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
import { FieldEmail, FieldPassword } from "@/components/locals/blocks/fields";

export default function Form() {
  const authenticationService = new ClsAuthenticationService();

  const tForm = useTranslations("app.user.authentication.login.page.form");

  const router = useRouter();
  const login = useAccountStore((store) => store.login);

  const form = useForm<tLoginCredentials>({
    defaultValues: {
      email: tForm("email.default-value"),
      password: tForm("password.default-value"),
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
      <FieldGroup>
        <Controller
          control={form.control}
          name="email"
          render={(controller) => (
            <Field data-invalid={controller.fieldState.invalid}>
              <FieldLabel htmlFor="email">{tForm("email.label")}</FieldLabel>
              <FieldEmail
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                controllerRenderProps={controller}
                inputProps={{
                  id: "email",
                  placeholder: tForm("email.placeholder"),
                }}
              />
              {controller.fieldState.invalid && (
                <FieldError errors={[controller.fieldState.error]} />
              )}
              {!controller.fieldState.invalid && (
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
          render={(controller) => (
            <Field data-invalid={controller.fieldState.invalid}>
              <FieldLabel htmlFor="password">
                {tForm("password.label")}
              </FieldLabel>
              <FieldPassword
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                controllerRenderProps={controller}
                inputProps={{
                  "aria-invalid": controller.fieldState.invalid,
                  id: "email",
                  placeholder: tForm("password.placeholder"),
                }}
              />
              {controller.fieldState.invalid && (
                <FieldError errors={[controller.fieldState.error]} />
              )}
              {!controller.fieldState.invalid && (
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
