"use client";

import { useTranslations } from "next-intl";

import { useId, useCallback } from "react";
import { useRouter } from "@/i18n/navigation";

import {
  tRegisterCredentials,
  zRegisterCredentials,
} from "@/validations/partner/authentication-credentials";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, Control, FormState } from "react-hook-form";

import useAccount from "@/hooks/partner/account";

import {
  LuArrowLeft,
  LuArrowRight,
  LuBuilding2,
  LuEarth,
  LuLoader,
  LuUserPlus,
} from "react-icons/lu";

import { GiMountainRoad } from "react-icons/gi";
import { FaMountainCity, FaRegHandshake } from "react-icons/fa6";

import { toast } from "sonner";
import { Toast } from "@/components/locals/blocks/toasts";

import {
  Stepper,
  StepperList,
  StepperItem,
  StepperIndicator,
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

import { FieldFileUpload } from "@/components/locals/blocks/file-uploads";
import {
  FieldIconInput,
  FieldHandle,
  FieldPhoneNumber,
  FieldEmail,
  FieldPassword,
  FieldNumber,
  FieldUsername,
} from "@/components/locals/blocks/fields";

import { Button } from "@/components/shadcn/button";
import { Link } from "@/components/locals/blocks/links";
import { Checkbox } from "@/components/shadcn/checkbox";

type tStep = {
  value: "partner" | "branch" | "member";
  label: string;
  description: string;
  fields: string[];
};

const icons = [FaRegHandshake, LuBuilding2, LuUserPlus];

export default function Form() {
  const { register } = useAccount();
  const router = useRouter();

  const tForm = useTranslations(
    "app.partner.authentication.register.page.form",
  );

  const steps = (tForm.raw("steps") as tStep[]).map((step) => ({
    ...step,
  }));

  const { formState, control, trigger, handleSubmit } =
    useForm<tRegisterCredentials>({
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
      value =
        value === "branch"
          ? "partner"
          : value === "member"
            ? "branch"
            : "member";

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
      <Stepper defaultValue="partner" onValidate={onValidate}>
        <StepperList className="flex-wrap gap-3">
          {steps.map((step, index) => (
            <StepperItem
              key={step.value}
              value={step.value}
              className="space-x-3"
            >
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
            </StepperItem>
          ))}
        </StepperList>
        <PartnerStep control={control} />
        <BranchStep control={control} />
        <MemberStep formState={formState} control={control} />
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
    <StepperContent value="partner" className="space-y-3">
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
                  htmlFor={`${id}-partner-organization-name`}
                  className="max-w-fit"
                >
                  {tPartnerStep("organization-name.label")}
                </FieldLabel>
                <FieldContent>
                  <FieldIconInput
                    id={`${id}-partner-organization-name`}
                    aria-invalid={invalid}
                    placeholder={tPartnerStep("organization-name.placeholder")}
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
                    id={`${id}-partner-phone-number`}
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
        <Button className="w-full">
          {tPartnerStep("next")}
          <LuArrowRight className="size-4" />
        </Button>
      </StepperNext>
    </StepperContent>
  );
}

function BranchStep({ control }: tStepProps) {
  const id = useId();
  const tBranchStep = useTranslations(
    "app.partner.authentication.register.page.form.branch",
  );

  return (
    <StepperContent value="branch" className="space-y-3">
      <Controller
        control={control}
        name="branch.name"
        render={({
          field: { value, onChange: setValue },
          fieldState: { invalid, error },
        }) => (
          <Field data-invalid={invalid}>
            <FieldLabel htmlFor={`${id}-branch-name`} className="max-w-fit">
              {tBranchStep("name.label")}
            </FieldLabel>
            <FieldContent>
              <FieldIconInput
                id={`${id}-branch-name`}
                aria-invalid={invalid}
                placeholder={tBranchStep("name.placeholder")}
                icon={<LuBuilding2 className="size-4" />}
                defaultValue={value}
                onChange={setValue}
              />
            </FieldContent>
            <FieldError errors={error} />
          </Field>
        )}
      />
      <FieldGroup className="grid-cols-2 gap-3">
        <Controller
          control={control}
          name="branch.location.country"
          render={({
            field: { value, onChange: setValue },
            fieldState: { invalid, error },
          }) => (
            <Field data-invalid={invalid} className="col-span-2">
              <FieldLabel
                htmlFor={`${id}-branch-location-country`}
                className="max-w-fit"
              >
                {tBranchStep("location.country.label")}
              </FieldLabel>
              <FieldContent>
                <FieldIconInput
                  id={`${id}-branch-location-country`}
                  aria-invalid={invalid}
                  placeholder={tBranchStep("location.country.placeholder")}
                  icon={<LuEarth className="size-4" />}
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
          name="branch.location.city"
          render={({
            field: { value, onChange: setValue },
            fieldState: { invalid, error },
          }) => (
            <Field data-invalid={invalid}>
              <FieldLabel
                htmlFor={`${id}-branch-location-city`}
                className="max-w-fit"
              >
                {tBranchStep("location.city.label")}
              </FieldLabel>
              <FieldContent>
                <FieldIconInput
                  id={`${id}-branch-location-city`}
                  aria-invalid={invalid}
                  placeholder={tBranchStep("location.city.placeholder")}
                  icon={<FaMountainCity className="size-4" />}
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
          name="branch.location.street"
          render={({
            field: { value, onChange: setValue },
            fieldState: { invalid, error },
          }) => (
            <Field data-invalid={invalid}>
              <FieldLabel
                htmlFor={`${id}-branch-location-street`}
                className="max-w-fit"
              >
                {tBranchStep("location.street.label")}
              </FieldLabel>
              <FieldContent>
                <FieldIconInput
                  id={`${id}-branch-location-street`}
                  aria-invalid={invalid}
                  placeholder={tBranchStep("location.street.placeholder")}
                  icon={<GiMountainRoad className="size-4" />}
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
          name="branch.location.latitude"
          render={({
            field: { value, onChange: setValue },
            fieldState: { invalid, error },
          }) => (
            <Field data-invalid={invalid}>
              <FieldLabel
                htmlFor={`${id}-branch-location-latitude`}
                className="max-w-fit"
              >
                {tBranchStep("location.latitude.label")}
              </FieldLabel>
              <FieldContent>
                <FieldNumber
                  id={`${id}-branch-location-latitude`}
                  aria-invalid={invalid}
                  value={value}
                  onValueChange={(number) => setValue(number ?? 0)}
                />
              </FieldContent>
              <FieldError errors={error} />
            </Field>
          )}
        />
        <Controller
          control={control}
          name="branch.location.longitude"
          render={({
            field: { value, onChange: setValue },
            fieldState: { invalid, error },
          }) => (
            <Field data-invalid={invalid}>
              <FieldLabel
                htmlFor={`${id}-branch-location-longitude`}
                className="max-w-fit"
              >
                {tBranchStep("location.longitude.label")}
              </FieldLabel>
              <FieldContent>
                <FieldNumber
                  id={`${id}-branch-location-longitude`}
                  aria-invalid={invalid}
                  value={value}
                  onValueChange={(number) => setValue(number ?? 0)}
                />
              </FieldContent>
              <FieldError errors={error} />
            </Field>
          )}
        />
      </FieldGroup>
      <FieldGroup className="grid-cols-2 gap-3">
        <Controller
          control={control}
          name="branch.phoneNumber"
          render={({
            field: { value, onChange: setValue },
            fieldState: { invalid, error },
          }) => (
            <Field data-invalid={invalid}>
              <FieldLabel
                htmlFor={`${id}-branch-phone-number`}
                className="max-w-fit"
              >
                {tBranchStep("phone-number.label")}
              </FieldLabel>
              <FieldContent>
                <FieldPhoneNumber
                  id={`${id}-branch-phone-number`}
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
        <Controller
          control={control}
          name="branch.email"
          render={({
            field: { value, onChange: setValue },
            fieldState: { invalid, error },
          }) => (
            <Field data-invalid={invalid}>
              <FieldLabel htmlFor={`${id}-branch-email`} className="max-w-fit">
                {tBranchStep("email.label")}
              </FieldLabel>
              <FieldContent>
                <FieldEmail
                  id={`${id}-branch-email`}
                  isRequired
                  isInvalid={invalid}
                  placeholder={tBranchStep("email.placeholder")}
                  defaultValue={value}
                  onValueChange={setValue}
                />
              </FieldContent>
              <FieldError errors={error} />
            </Field>
          )}
        />
      </FieldGroup>
      <FieldGroup className="grid-cols-2 gap-3">
        <StepperPrev asChild>
          <Button className="w-full">
            <LuArrowLeft className="size-4" />
            {tBranchStep("back")}
          </Button>
        </StepperPrev>
        <StepperNext asChild>
          <Button className="w-full">
            {tBranchStep("next")}
            <LuArrowRight className="size-4" />
          </Button>
        </StepperNext>
      </FieldGroup>
    </StepperContent>
  );
}

type tLastStepProps = tStepProps & {
  formState: FormState<tRegisterCredentials>;
};

function MemberStep({ formState, control }: tLastStepProps) {
  const id = useId();
  const tMemberStep = useTranslations(
    "app.partner.authentication.register.page.form.member",
  );

  return (
    <StepperContent value="member" className="space-y-3">
      <FieldGroup className="grid-cols-2 gap-3">
        <Controller
          control={control}
          name="member.avatar"
          render={({
            field: { value, onChange: setValue },
            fieldState: { invalid, error },
          }) => (
            <Field data-invalid={invalid}>
              <FieldLabel htmlFor={`${id}-member-avatar`} className="max-w-fit">
                {tMemberStep("avatar.label")}
              </FieldLabel>
              <FieldContent>
                <FieldFileUpload
                  id={`${id}-member-avatar`}
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
            name="member.username"
            render={({
              field: { value, onChange: setValue },
              fieldState: { invalid, error },
            }) => (
              <Field data-invalid={invalid}>
                <FieldLabel
                  htmlFor={`${id}-member-username`}
                  className="max-w-fit"
                >
                  {tMemberStep("username.label")}
                </FieldLabel>
                <FieldContent>
                  <FieldUsername
                    id={`${id}-member-username`}
                    aria-invalid={invalid}
                    placeholder={tMemberStep("username.placeholder")}
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
            name="member.email"
            render={({
              field: { value, onChange: setValue },
              fieldState: { invalid, error },
            }) => (
              <Field data-invalid={invalid}>
                <FieldLabel
                  htmlFor={`${id}-member-email`}
                  className="max-w-fit"
                >
                  {tMemberStep("email.label")}
                </FieldLabel>
                <FieldContent>
                  <FieldEmail
                    id={`${id}-member-email`}
                    isRequired
                    isInvalid={invalid}
                    placeholder={tMemberStep("email.placeholder")}
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
            name="member.password"
            render={({
              field: { value, onChange: setValue },
              fieldState: { invalid, error },
            }) => (
              <Field data-invalid={invalid}>
                <FieldLabel
                  htmlFor={`${id}-member-password`}
                  className="max-w-fit"
                >
                  {tMemberStep("password.label")}
                </FieldLabel>
                <FieldContent>
                  <FieldPassword
                    id={`${id}-member-password`}
                    isRequired
                    isInvalid={invalid}
                    placeholder={tMemberStep("password.placeholder")}
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
                  <p className="leading-4">
                    {tMemberStep("remember-me.label")}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {tMemberStep("remember-me.description")}
                  </p>
                </div>
              </FieldLabel>
            </FieldContent>
            <FieldError errors={error} />
          </Field>
        )}
      />
      <FieldGroup className="grid-cols-2 gap-3">
        <StepperPrev asChild>
          <Button disabled={formState.isSubmitting} className="w-full">
            <LuArrowLeft className="size-4" />
            {tMemberStep("back")}
          </Button>
        </StepperPrev>
        <Button
          disabled={formState.isSubmitting}
          type="submit"
          className="w-full"
        >
          {formState.isSubmitting && <LuLoader className="animate-spin" />}
          {tMemberStep("confirm")}
        </Button>
      </FieldGroup>
    </StepperContent>
  );
}
