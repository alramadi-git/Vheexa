"use client";

import { useTranslations } from "next-intl";

import { useId, useRef } from "react";
import { useRouter } from "@/i18n/navigation";

import {
  tRegisterCredentials,
  zRegisterCredentials,
} from "@/validations/partner/authentication-credentials";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import useAccount from "@/hooks/partner/account";

import { LuBuilding2, LuLoader, LuUserPlus } from "react-icons/lu";

import { toast } from "sonner";
import { Toast } from "@/components/locals/blocks/toasts";

import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperList,
  StepperSeparator,
  StepperTrigger,
} from "@/components/shadcn/stepper";

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

import { Button } from "@/components/shadcn/button";
import { Link } from "@/components/locals/blocks/links";
import { FaRegHandshake } from "react-icons/fa6";

type tStep = {
  value: string;
  label: string;
  description: string;
};

const icons = [FaRegHandshake, LuBuilding2, LuUserPlus];

export default function Form() {
  const id = useId();

  const router = useRouter();
  const { register } = useAccount();

  const tForm = useTranslations(
    "app.partner.authentication.register.page.form",
  );

  const steps = (tForm.raw("steps") as tStep[]).map((step) => ({
    ...step,
  }));

  const emailRef = useRef<tFieldEmailRef>(null);
  const passwordRef = useRef<tFieldPasswordRef>(null);

  const {
    formState,
    control,
    trigger,
    reset: handleReset,
    handleSubmit,
  } = useForm<tRegisterCredentials>({
    defaultValues: {
      partner: {
        handle: "",
        name: "",
        phoneNumber: "",
        email: "",
        password: "",
      },
      branch: {
        location: {
          country: "",
          city: "",
          street: "",
          latitude: 0,
          longitude: 0,
        },
        name: "",
        phoneNumber: "",
        email: "",
      },
      member: {
        username: "",
        email: "",
        password: "",
      },
      rememberMe: false,
    },
    resolver: zodResolver(zRegisterCredentials),
  });

  function reset() {
    handleReset();

    emailRef.current?.reset();
    passwordRef.current?.reset();
  }

  async function submit(credentials: tRegisterCredentials) {
    const isSuccess = await register(credentials);

    if (!isSuccess) {
      toast.custom(() => (
        <Toast variant="destructive" label={tForm("actions.when-error")} />
      ));

      return;
    }

    toast.custom(() => (
      <Toast variant="success" label={tForm("actions.when-success")} />
    ));

    router.push("/partner/dashboard");
  }

  return (
    <form className="space-y-3" onReset={reset} onSubmit={handleSubmit(submit)}>
      <Stepper defaultValue="Partner">
        <StepperList>
          {steps.map((step, index) => (
            <StepperItem key={step.value} value={step.value}>
              <StepperTrigger>
                <StepperIndicator className="size-10 rounded p-2">
                  {icons[index]({
                    className: "size-full",
                  })}
                </StepperIndicator>
                <div>
                  <p className="line-clamp-1">{step.label}</p>
                  <p className="text-muted-foreground line-clamp-1 text-sm">
                    {step.description}
                  </p>
                </div>
              </StepperTrigger>
              <StepperSeparator className="mx-4" />
            </StepperItem>
          ))}
        </StepperList>
        {/* {steps.map((step) => (
          <StepperContent
            key={step.value}
            value={step.value}
            className="bg-card text-card-foreground flex flex-col items-center gap-4 rounded-md border p-4"
          >
            <div className="flex flex-col items-center gap-px text-center">
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
            <p className="text-sm">Content for {step.title} goes here.</p>
          </StepperContent>
        ))} */}
      </Stepper>

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
        {tForm.rich("login", {
          link: (chunk) => (
            <Link
              href="/partner/authentication/login"
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
