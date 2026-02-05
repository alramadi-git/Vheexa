"use client";

import { useTranslations } from "next-intl";

import { useId, useRef } from "react";
import { useRouter } from "@/i18n/navigation";

import {
  tLoginCredentials,
  zLoginCredentials,
} from "@/validators/authentication";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import useAccount from "@/user/hooks/account";

import { LuLoader } from "react-icons/lu";

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

import { Checkbox } from "@/components/shadcn/checkbox";

import { toast } from "sonner";
import { Toast } from "@/components/locals/blocks/toasts";

import { Button } from "@/components/shadcn/button";
import { Link } from "@/components/locals/blocks/links";

export default function Form() {
  const id = useId();

  const tForm = useTranslations("app.user.authentication.login.page.form");

  const emailRef = useRef<tFieldEmailRef>(null);
  const passwordRef = useRef<tFieldPasswordRef>(null);

  const router = useRouter();
  const { login } = useAccount();

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

  function reset() {
    handleReset();

    emailRef.current?.reset();
    passwordRef.current?.reset();
  }

  async function submit(credentials: tLoginCredentials) {
    const isSuccess = await login(credentials);

    if (!isSuccess) {
      toast.custom(() => (
        <Toast variant="destructive" label={tForm("actions.when-error")} />
      ));

      return;
    }

    toast.custom(() => (
      <Toast variant="success" label={tForm("actions.when-success")} />
    ));

    router.push("/");
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
            <FieldContent>
              <FieldLabel
                htmlFor={`${id}-remember-me`}
                className="hover:bg-accent/50 w-full cursor-pointer flex-row items-start gap-2 rounded border p-3"
              >
                <Checkbox
                  id={`${id}-remember-me`}
                  checked={value}
                  onCheckedChange={setValue}
                />
                <div className="grid gap-2">
                  <p className="leading-4">{tForm("remember-me.label")}</p>
                  <p className="text-muted-foreground text-xs">
                    {tForm("remember-me.description")}
                  </p>
                </div>
              </FieldLabel>
            </FieldContent>
            <FieldError errors={error} />
          </Field>
        )}
      />
      <FieldGroup className="grid-cols-2 gap-3">
        <Button
          disabled={formState.isSubmitting}
          type="submit"
          className="justify-start gap-1.5"
        >
          {formState.isSubmitting && <LuLoader className="animate-spin" />}
          {tForm("actions.submit")}
        </Button>
        <Button
          disabled={formState.isSubmitting}
          type="reset"
          variant="outline"
          className="justify-start gap-1.5"
        >
          {tForm("actions.reset")}
        </Button>
      </FieldGroup>
      <p className="text-muted-foreground">
        {tForm.rich("register", {
          link: (chunk) => (
            <Link
              href="/authentication/register"
              className="text-card-foreground hover:underline"
            >
              {chunk}
            </Link>
          ),
        })}
      </p>
    </form>
  );
}
