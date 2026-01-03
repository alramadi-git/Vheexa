"use client";

import { useTranslations } from "next-intl";

import { useRouter } from "@/i18n/navigation";
import useAccountStore from "@/stores/partner/account-store";

import {
  tRegisterCredentials,
  zRegisterCredentials,
} from "@/validations/partner/authentication-credentials";

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
  const tForm = useTranslations(
    "app.partner.authentication.register.page.form",
  );

  const router = useRouter();
  const login = useAccountStore((store) => store.login);

  const {
    formState,
    control,
    reset: handleReset,
    handleSubmit,
  } = useForm<tRegisterCredentials>({
    defaultValues: {
      rememberMe: false,
    },
    resolver: zodResolver(zRegisterCredentials),
  });

  const authenticationService = new ClsAuthenticationService();

  function reset() {
    handleReset();
  }

  async function submit(registerCredentials: tRegisterCredentials) {
    const response =
      await authenticationService.registerAsync(registerCredentials);
    if (!response.isSuccess) {
      console.error("error: ", response.message);

      toast.custom(() => (
        <Toast variant="destructive" label={tForm("actions.when-error")} />
      ));

      return;
    }

    login(response.data);
    return;

    router.push("/partner/dashboard");
  }

  return (
    <form className="space-y-3" onReset={reset} onSubmit={handleSubmit(submit)}>
      <FieldSet>
        <FieldGroup className="gap-3"></FieldGroup>
      </FieldSet>

      <FieldSet>
        <FieldGroup className="gap-3"></FieldGroup>
      </FieldSet>

      <FieldSet>
        <FieldGroup className="gap-3"></FieldGroup>
      </FieldSet>

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
