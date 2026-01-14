"use client";

import { useRouter } from "@/i18n/navigation";

import { useId, useRef } from "react";

import { useTranslations } from "next-intl";

import useAccountStore from "@/stores/partner/account-store";
import { ClsAuthenticationService } from "@/services/partner/authentication";

import {
  tLoginCredentials,
  zLoginCredentials,
} from "@/validations/authentication-credentials";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import { LuLoader } from "react-icons/lu";

import { toast } from "sonner";
import { Toast } from "@/components/locals/blocks/toasts";

import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/components/shadcn/field";

import {
  tFieldEmailRef,
  tFieldPasswordRef,
  FieldEmail,
  FieldPassword,
} from "@/components/locals/blocks/fields";

import { Button } from "@/components/shadcn/button";
import { Checkbox } from "@/components/shadcn/checkbox";

export default function Form() {
  const id = useId();
  const router = useRouter();

  const tForm = useTranslations("app.partner.authentication.login.page.form");

  const {
    formState,
    control,
    reset: handleReset,
    handleSubmit,
  } = useForm<tLoginCredentials>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    resolver: zodResolver(zLoginCredentials),
  });

  const emailRef = useRef<tFieldEmailRef>(null);
  const passwordRef = useRef<tFieldPasswordRef>(null);

  function reset() {
    handleReset();

    emailRef.current?.reset();
    passwordRef.current?.reset();
  }

  const login = useAccountStore((store) => store.login);
  const authenticationService = new ClsAuthenticationService();

  async function submit(credentials: tLoginCredentials) {
    const response = await authenticationService.loginAsync(credentials);
    if (!response.isSuccess) {
      toast.custom(() => (
        <Toast variant="destructive" label={tForm("actions.when-error")} />
      ));

      return;
    }

    return;
    login(response.data);
    router.push("/partner/dashboard");
  }

  return (
    <form className="space-y-3" onReset={reset} onSubmit={handleSubmit(submit)}>
      <FieldGroup className="gap-3">
        <Controller
          control={control}
          name="email"
          render={({
            field: { value, onChange: setValue },
            fieldState: { invalid, error },
          }) => (
            <Field data-invalid={invalid}>
              <FieldLabel htmlFor={`${id}-email`} className="max-w-fit">
                {tForm("email.label")}
              </FieldLabel>
              <FieldContent>
                <FieldEmail
                  ref={emailRef}
                  id={`${id}-email`}
                  isInvalid={invalid}
                  placeholder={tForm("email.placeholder")}
                  defaultValue={value}
                  onValueChange={setValue}
                />
              </FieldContent>
              <FieldError errors={error} />
            </Field>
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({
            field: { value, onChange: setValue },
            fieldState: { invalid, error },
          }) => (
            <Field data-invalid={invalid}>
              <FieldLabel htmlFor={`${id}-password`} className="max-w-fit">
                {tForm("password.label")}
              </FieldLabel>
              <FieldContent>
                <FieldPassword
                  ref={passwordRef}
                  id={`${id}-password`}
                  isInvalid={invalid}
                  placeholder={tForm("password.placeholder")}
                  defaultValue={value}
                  onValueChange={setValue}
                />
              </FieldContent>
              <FieldError errors={error} />
            </Field>
          )}
        />
      </FieldGroup>
      <Controller
        control={control}
        name="rememberMe"
        render={({
          field: { value, onChange: setValue },
          fieldState: { invalid, error },
        }) => (
          <Field data-invalid={invalid}>
            <FieldLabel htmlFor={`${id}-remember-me`} className="max-w-fit">
              {tForm("remember-me.label")}
            </FieldLabel>
            <FieldContent className="flex items-start gap-2">
              <Checkbox id={id} defaultChecked />
              <div className="grid gap-2">
                <Label htmlFor={id} className="leading-4">
                  Accept terms and conditions
                </Label>
                <p className="text-muted-foreground text-xs">
                  By clicking this checkbox, you agree to the terms and
                  conditions.
                </p>
              </div>
            </FieldContent>
            <FieldError errors={error} />
          </Field>
        )}
      />
      <FieldGroup className="grid-cols-2 gap-3">
        <Button
          disabled={formState.isSubmitting}
          type="reset"
          variant="outline"
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
    </form>
  );
}
