"use client";

import { useTranslations } from "next-intl";

import { useRouter } from "@/i18n/navigation";
import useAccountStore from "@/stores/partner/account-store";

import {
  tLoginCredentials,
  zLoginCredentials,
} from "@/validations/authentication-credentials";

import { zodResolver } from "@hookform/resolvers/zod";

import { ClsAuthenticationService } from "@/services/partner/authentication";

import { LuLoader } from "react-icons/lu";

import { Controller, useForm } from "react-hook-form";
import {
  FieldSet,
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "@/components/shadcn/field";

import { FieldEmail, FieldPassword } from "@/components/locals/blocks/fields";

import { toast } from "sonner";
import { Toast } from "@/components/locals/blocks/toasts";

import { Button } from "@/components/shadcn/button";

export default function Form() {
  const authenticationService = new ClsAuthenticationService();

  const tForm = useTranslations("app.partner.authentication.login.page.form");

  const router = useRouter();
  const login = useAccountStore((store) => store.login);

  const {
    formState,
    control,
    reset: handleReset,
    handleSubmit,
  } = useForm<tLoginCredentials>({
    defaultValues: {
      rememberMe: false,
    },
    resolver: zodResolver(zLoginCredentials),
  });

  function reset() {
    handleReset();
  }

  async function submit(loginCredentials: tLoginCredentials) {
    const response = await authenticationService.loginAsync(loginCredentials);
    if (!response.isSuccess) {
      console.error("error: ", response.message);

      toast.custom(() => (
        <Toast variant="destructive" label={tForm("actions.when-error")} />
      ));

      return;
    }

    // login(response.data);
    return;

    router.push("/partner/dashboard");
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-8">
      <FieldGroup>
        {/* <Controller
          control={control}
          name="email"
          render={(controller) => (
            <Field data-invalid={controller.fieldState.invalid}>
              <FieldLabel htmlFor="email">{tForm("email.label")}</FieldLabel>
              <FieldEmail
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                controller={controller}
                inputProps={{
                  id: "email",
                  "aria-invalid": controller.fieldState.invalid,
                  placeholder: tForm("email.placeholder"),
                }}
              />
              <FieldError errors={[controller.fieldState.error]} />
              {!controller.fieldState.invalid && (
                <FieldDescription>
                  {tForm("email.description")}
                </FieldDescription>
              )}
            </Field>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={(controller) => (
            <Field data-invalid={controller.fieldState.invalid}>
              <FieldLabel htmlFor="password">
                {tForm("password.label")}
              </FieldLabel>
              <FieldPassword
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                controller={controller}
                inputProps={{
                  id: "password",
                  "aria-invalid": controller.fieldState.invalid,
                  placeholder: tForm("password.placeholder"),
                }}
              />
              <FieldError errors={[controller.fieldState.error]} />
              {!controller.fieldState.invalid && (
                <FieldDescription>
                  {tForm("password.description")}
                </FieldDescription>
              )}
            </Field>
          )}
        /> */}
      </FieldGroup>

      <FieldSet>
     <FieldGroup className="grid-cols-2 gap-3">
          <Button
            disabled={formState.isSubmitting}
            variant="outline"
            type="reset"
            className="justify-start gap-1.5"
          >
            {tForm("actions.reset")}
          </Button>
          <Button
            disabled={formState.isSubmitting}
            type="submit"
            className="justify-start gap-1.5"
          >
            {formState.isSubmitting && <LuLoader className="animate-spin" />}
            {tForm("actions.submit")}
          </Button>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
