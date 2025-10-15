"use client";

import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form as ReactHookForm } from "@/components/shadcn/form";
import { Input } from "@/components/locals/blocks/input";
import { Button } from "@/components/shadcn/button";
import {
  AuthenticationService,
  zCredentials,
  tCredentials,
} from "@/app/[locale]/(authentication)/user/_services/authentication/authentication";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

export default function Form() {
  const router = useRouter();
  const t = useTranslations("app.user.authentication.signin.page.card.form");

  const form = useForm<tCredentials>({
    defaultValues: {
      email: t("email.default"),
      password: t("password.default"),
    },
    resolver: zodResolver(zCredentials),
  });

  function onSubmit(credentials: z.infer<typeof zCredentials>) {
    AuthenticationService.signin(credentials);

    // router.push("/user");
  }

  return (
    <ReactHookForm {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Input
          formField={{
            control: form.control,
            name: "email",
          }}
          label={t("email.label")}
          input={{
            placeholder: t("email.placeholder"),
            type: "email",
          }}
          description={t("email.description")}
        />

        <Input
          formField={{
            control: form.control,
            name: "password",
          }}
          label={t("password.label")}
          input={{
            placeholder: t("password.placeholder"),
            type: "password",
          }}
          description={t("password.description")}
        />

        <Button type="submit" variant="outline" className="w-full">
          Sign In
        </Button>
      </form>
    </ReactHookForm>
  );
}
