"use client";

import { useTranslations } from "next-intl";

import { useId, useRef } from "react";
import { useRouter } from "@/i18n/navigation";

import {
  tRegisterCredentials,
  zRegisterCredentials,
} from "@/user/validators/authentication";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import useAccount from "@/user/hooks/account";

import { LuEarth, LuLoader } from "react-icons/lu";

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
  FieldUsername,
  FieldPhoneNumber,
  FieldDatePicker,
  FieldNumber,
  FieldIconInput,
} from "@/components/locals/blocks/fields";

import { Checkbox } from "@/components/shadcn/checkbox";

import { toast } from "sonner";
import { Toast } from "@/components/locals/blocks/toasts";

import { Button } from "@/components/shadcn/button";
import { Link } from "@/components/locals/blocks/links";
import {
  FieldFileUpload,
  tFieldFileUploadRef,
} from "@/components/locals/blocks/file-uploads";
import { GiMountainRoad } from "react-icons/gi";
import { FaMountainCity } from "react-icons/fa6";

export default function Form() {
  const id = useId();

  const tForm = useTranslations("app.user.authentication.register.page.form");

  const avatarRef = useRef<tFieldFileUploadRef>(null);

  const emailRef = useRef<tFieldEmailRef>(null);
  const passwordRef = useRef<tFieldPasswordRef>(null);

  const router = useRouter();
  const { register } = useAccount();

  const {
    formState,
    control,
    reset: handleReset,
    handleSubmit,
  } = useForm<tRegisterCredentials>({
    defaultValues: {
      location: {
        country: "",
        city: "",
        street: "",
        latitude: 0,
        longitude: 0,
      },
      username: "",
      phoneNumber: "",
      email: "",
      password: "",
      rememberMe: false,
    },
    resolver: zodResolver(zRegisterCredentials),
  });

  function reset() {
    handleReset();

    avatarRef.current?.reset();

    emailRef.current?.reset();
    passwordRef.current?.reset();
  }

  async function submit(credentials: tRegisterCredentials) {
    const { isSuccess } = await register(credentials);

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
      <FieldGroup className="sm:grid-cols-2 gap-3">
        <Controller
          control={control}
          name="avatar"
          render={({
            field: { value, onChange: setValue },
            fieldState: { invalid, error },
          }) => (
            <Field data-invalid={invalid}>
              <FieldLabel htmlFor={`${id}-avatar`} className="max-w-fit">
                {tForm("avatar.label")}
              </FieldLabel>
              <FieldContent className="size-full">
                <FieldFileUpload
                  ref={avatarRef}
                  id={`${id}-avatar`}
                  isInvalid={invalid}
                  defaultValue={value}
                  onValueChange={setValue}
                />
              </FieldContent>
              <FieldError errorsProp={error} />
            </Field>
          )}
        />
        <FieldGroup className="gap-3">
          <Controller
            control={control}
            name="username"
            render={({
              field: { value, onChange: setValue },
              fieldState: { invalid, error },
            }) => (
              <Field data-invalid={invalid}>
                <FieldLabel htmlFor={`${id}-username`} className="max-w-fit">
                  {tForm("username.label")}
                </FieldLabel>
                <FieldContent>
                  <FieldUsername
                    id={`${id}-username`}
                    aria-invalid={invalid}
                    required
                    placeholder={tForm("username.placeholder")}
                    defaultValue={value}
                    onChange={setValue}
                  />
                </FieldContent>
                <FieldError errorsProp={error} />
              </Field>
            )}
          />
          <Controller
            control={control}
            name="birthday"
            render={({
              field: { onChange: setValue },
              fieldState: { invalid, error },
            }) => (
              <Field data-invalid={invalid}>
                <FieldLabel htmlFor={`${id}-birthday`} className="max-w-fit">
                  {tForm("birthday.label")}
                </FieldLabel>
                <FieldContent>
                  <FieldDatePicker
                    id={`${id}-birthday`}
                    aria-invalid={invalid}
                    isRequired
                    placeholder={tForm("birthday.placeholder")}
                    setValue={setValue}
                  />
                </FieldContent>
                <FieldError errorsProp={error} />
              </Field>
            )}
          />
          <Controller
            control={control}
            name="phoneNumber"
            render={({
              field: { value, onChange: setValue },
              fieldState: { invalid, error },
            }) => (
              <Field data-invalid={invalid}>
                <FieldLabel
                  htmlFor={`${id}-phone-number`}
                  className="max-w-fit"
                >
                  {tForm("phone-number.label")}
                </FieldLabel>
                <FieldContent>
                  <FieldPhoneNumber
                    id={`${id}-phone-number`}
                    isInvalid={invalid}
                    isRequired
                    defaultValue={value}
                    onValueChange={setValue}
                  />
                </FieldContent>
                <FieldError errorsProp={error} />
              </Field>
            )}
          />
        </FieldGroup>
      </FieldGroup>
      <FieldGroup className="grid-cols-2 gap-3">
        <Controller
          control={control}
          name="location.country"
          render={({
            field: { value, onChange: setValue },
            fieldState: { invalid, error },
          }) => (
            <Field data-invalid={invalid} className="col-span-2">
              <FieldLabel
                htmlFor={`${id}-location-country`}
                className="max-w-fit"
              >
                {tForm("location.country.label")}
              </FieldLabel>
              <FieldContent>
                <FieldIconInput
                  id={`${id}-location-country`}
                  required
                  aria-invalid={invalid}
                  placeholder={tForm("location.country.placeholder")}
                  icon={<LuEarth className="size-4" />}
                  defaultValue={value}
                  onChange={setValue}
                />
              </FieldContent>
              <FieldError errorsProp={error} />
            </Field>
          )}
        />
        <Controller
          control={control}
          name="location.city"
          render={({
            field: { value, onChange: setValue },
            fieldState: { invalid, error },
          }) => (
            <Field data-invalid={invalid}>
              <FieldLabel htmlFor={`${id}-location-city`} className="max-w-fit">
                {tForm("location.city.label")}
              </FieldLabel>
              <FieldContent>
                <FieldIconInput
                  id={`${id}-location-city`}
                  required
                  aria-invalid={invalid}
                  placeholder={tForm("location.city.placeholder")}
                  icon={<FaMountainCity className="size-4" />}
                  defaultValue={value}
                  onChange={setValue}
                />
              </FieldContent>
              <FieldError errorsProp={error} />
            </Field>
          )}
        />
        <Controller
          control={control}
          name="location.street"
          render={({
            field: { value, onChange: setValue },
            fieldState: { invalid, error },
          }) => (
            <Field data-invalid={invalid}>
              <FieldLabel
                htmlFor={`${id}-location-street`}
                className="max-w-fit"
              >
                {tForm("location.street.label")}
              </FieldLabel>
              <FieldContent>
                <FieldIconInput
                  id={`${id}-location-street`}
                  required
                  aria-invalid={invalid}
                  placeholder={tForm("location.street.placeholder")}
                  icon={<GiMountainRoad className="size-4" />}
                  defaultValue={value}
                  onChange={setValue}
                />
              </FieldContent>
              <FieldError errorsProp={error} />
            </Field>
          )}
        />
        <Controller
          control={control}
          name="location.latitude"
          render={({
            field: { value, onChange: setValue },
            fieldState: { invalid, error },
          }) => (
            <Field data-invalid={invalid}>
              <FieldLabel
                htmlFor={`${id}-location-latitude`}
                className="max-w-fit"
              >
                {tForm("location.latitude.label")}
              </FieldLabel>
              <FieldContent>
                <FieldNumber
                  id={`${id}-location-latitude`}
                  required
                  aria-invalid={invalid}
                  value={value}
                  onValueChange={(number) => setValue(number ?? 0)}
                />
              </FieldContent>
              <FieldError errorsProp={error} />
            </Field>
          )}
        />
        <Controller
          control={control}
          name="location.longitude"
          render={({
            field: { value, onChange: setValue },
            fieldState: { invalid, error },
          }) => (
            <Field data-invalid={invalid}>
              <FieldLabel
                htmlFor={`${id}-location-longitude`}
                className="max-w-fit"
              >
                {tForm("location.longitude.label")}
              </FieldLabel>
              <FieldContent>
                <FieldNumber
                  id={`${id}-location-longitude`}
                  required
                  aria-invalid={invalid}
                  value={value}
                  onValueChange={(number) => setValue(number ?? 0)}
                />
              </FieldContent>
              <FieldError errorsProp={error} />
            </Field>
          )}
        />
      </FieldGroup>
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
                  isRequired
                  placeholder={tForm("email.placeholder")}
                  defaultValue={value}
                  onValueChange={setValue}
                />
              </FieldContent>
              <FieldError errorsProp={error} />
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
                  isRequired
                  placeholder={tForm("password.placeholder")}
                  defaultValue={value}
                  onValueChange={setValue}
                />
              </FieldContent>
              <FieldError errorsProp={error} />
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
            <FieldError errorsProp={error} />
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
        {tForm.rich("login", {
          link: (chunk) => (
            <Link
              href="/authentication/login"
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
