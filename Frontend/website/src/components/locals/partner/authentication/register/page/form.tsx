"use client";

import { useTranslations } from "next-intl";

import { useCallback, useId, useRef } from "react";
import { useRouter } from "@/i18n/navigation";

import {
  tRegisterCredentials,
  zRegisterCredentials,
} from "@/validations/partner/authentication-credentials";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, Control } from "react-hook-form";

import useAccount from "@/hooks/partner/account";

import { LuBuilding2, LuLoader, LuUserPlus } from "react-icons/lu";

import { toast } from "sonner";
import { Toast } from "@/components/locals/blocks/toasts";

import {
  StepperProps,
  Stepper,
  StepperList,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperSeparator,
  StepperContent,
  StepperNext,
  StepperPrev,
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
  FieldHandle,
  FieldIconInput,
  FieldPhoneNumber,
} from "@/components/locals/blocks/fields";

import { Checkbox } from "@/components/shadcn/checkbox";

import { Button } from "@/components/shadcn/button";
import { Link } from "@/components/locals/blocks/links";
import { FaRegHandshake } from "react-icons/fa6";
import {
  FieldFileUpload,
  tFieldFileUploadRef,
} from "@/components/locals/blocks/file-uploads";

type tStep = {
  value: "partner" | "branch" | "member";
  label: string;
  description: string;
  fields: string[];
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

  const { control, trigger, handleSubmit } = useForm<tRegisterCredentials>({
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

  const onValidate = useCallback(
    async (value: string, direction: "prev" | "next") => {
      if (direction === "prev") return true;
      value = value === "Branch" ? "Partner" : "Branch";

      const fields = steps.find((step) => step.value === value)?.fields ?? [];
      const isValid = await trigger(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        fields,
      );

      if (!isValid) {
        toast.custom(() => (
          <Toast
            variant="info"
            label={tForm("when-step-validation-error.label")}
          >
            {tForm("when-step-validation-error.description")}
          </Toast>
        ));
      }

      return isValid;
    },
    [tForm, steps, trigger],
  );

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
    <form className="space-y-3" onSubmit={handleSubmit(submit)}>
      <Stepper defaultValue="Partner" onValidate={onValidate}>
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
        <PartnerStep control={control} />
        <BranchStep />
        <MemberStep />
      </Stepper>
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

type tStepProps = {
  control: Control<tRegisterCredentials>;
};

function PartnerStep({ control }: tStepProps) {
  const id = useId();

  const tPartnerStep = useTranslations(
    "app.partner.authentication.register.page.form.partner",
  );

  return (
    <StepperContent value="Partner" className="space-y-3">
      <Controller
        control={control}
        name="partner.banner"
        render={({
          field: { value, onChange: setValue },
          fieldState: { invalid, error },
        }) => (
          <Field data-invalid={invalid}>
            <FieldLabel htmlFor={`${id}-partner-banner`} className="max-w-fit">
              {tPartnerStep("banner.label")}
            </FieldLabel>
            <FieldContent>
              <FieldFileUpload
                id={`${id}-partner-banner`}
                isInvalid={invalid}
                defaultValue={value}
                onValueChange={setValue}
              />
            </FieldContent>
            <FieldError errors={error} />
          </Field>
        )}
      />
      <FieldGroup className="grid-cols-2 gap-3">
        <Controller
          control={control}
          name="partner.logo"
          render={({
            field: { value, onChange: setValue },
            fieldState: { invalid, error },
          }) => (
            <Field data-invalid={invalid}>
              <FieldLabel htmlFor={`${id}-partner-logo`} className="max-w-fit">
                {tPartnerStep("logo.label")}
              </FieldLabel>
              <FieldContent>
                <FieldFileUpload
                  id={`${id}-partner-logo`}
                  isInvalid={invalid}
                  defaultValue={value}
                  onValueChange={setValue}
                />
              </FieldContent>
              <FieldError errors={error} />
            </Field>
          )}
        />

        <FieldGroup className="flex justify-between gap-3">
          <Controller
            control={control}
            name="partner.handle"
            render={({
              field: { value, onChange: setValue },
              fieldState: { invalid, error },
            }) => (
              <Field data-invalid={invalid}>
                <FieldLabel
                  htmlFor={`${id}-partner-handle`}
                  className="max-w-fit"
                >
                  {tPartnerStep("handle.label")}
                </FieldLabel>
                <FieldContent>
                  <FieldHandle
                    id={`${id}-partner-handle`}
                    aria-invalid={invalid}
                    placeholder={tPartnerStep("handle.placeholder")}
                    defaultValue={value}
                    onChange={setValue}
                  />
                </FieldContent>
                <FieldError errors={error} />
              </Field>
            )}
          />
          <Controller
            control={control}
            name="partner.name"
            render={({
              field: { value, onChange: setValue },
              fieldState: { invalid, error },
            }) => (
              <Field data-invalid={invalid}>
                <FieldLabel
                  htmlFor={`${id}-partner-name`}
                  className="max-w-fit"
                >
                  {tPartnerStep("name.label")}
                </FieldLabel>
                <FieldContent>
                  <FieldIconInput
                    id={`${id}-partner-name`}
                    aria-invalid={invalid}
                    placeholder={tPartnerStep("name.placeholder")}
                    icon={<LuBuilding2 className="size-4" />}
                    defaultValue={value}
                    onChange={setValue}
                  />
                </FieldContent>
                <FieldError errors={error} />
              </Field>
            )}
          />
          <Controller
            control={control}
            name="partner.phoneNumber"
            render={({
              field: { value, onChange: setValue },
              fieldState: { invalid, error },
            }) => (
              <Field data-invalid={invalid}>
                <FieldLabel
                  htmlFor={`${id}-partner-phone-number`}
                  className="max-w-fit"
                >
                  {tPartnerStep("phone-number.label")}
                </FieldLabel>
                <FieldContent>
                  <FieldPhoneNumber
                    id={`${id}-partner-phoneNumber`}
                    isRequired
                    isInvalid={invalid}
                    defaultValue={value}
                    onValueChange={setValue}
                  />
                </FieldContent>
                <FieldError errors={error} />
              </Field>
            )}
          />
        </FieldGroup>
      </FieldGroup>
      <FieldGroup className="flex justify-between gap-3">
        <Controller
          control={control}
          name="partner.email"
          render={({
            field: { value, onChange: setValue },
            fieldState: { invalid, error },
          }) => (
            <Field data-invalid={invalid}>
              <FieldLabel htmlFor={`${id}-partner-email`} className="max-w-fit">
                {tPartnerStep("email.label")}
              </FieldLabel>
              <FieldContent>
                <FieldEmail
                  id={`${id}-partner-email`}
                  isRequired
                  isInvalid={invalid}
                  placeholder={tPartnerStep("email.placeholder")}
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
          name="partner.password"
          render={({
            field: { value, onChange: setValue },
            fieldState: { invalid, error },
          }) => (
            <Field data-invalid={invalid}>
              <FieldLabel
                htmlFor={`${id}-partner-password`}
                className="max-w-fit"
              >
                {tPartnerStep("password.label")}
              </FieldLabel>
              <FieldContent>
                <FieldPassword
                  id={`${id}-partner-password`}
                  isRequired
                  isInvalid={invalid}
                  placeholder={tPartnerStep("password.placeholder")}
                  defaultValue={value}
                  onValueChange={setValue}
                />
              </FieldContent>
              <FieldError errors={error} />
            </Field>
          )}
        />
      </FieldGroup>
      <StepperNext asChild>
        <Button className="w-full">{tPartnerStep("next")}</Button>
      </StepperNext>
    </StepperContent>
  );
}

function BranchStep() {
  return <StepperContent value="Branch"></StepperContent>;
}

function MemberStep() {
  return (
    <StepperContent value="Member">
      {/* <FieldGroup className="grid-cols-2 gap-3">
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
      </FieldGroup> */}
    </StepperContent>
  );
}
