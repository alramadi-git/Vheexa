"use client";

import { useTranslations } from "next-intl";

import { useRouter } from "@/i18n/navigation";
import { useId, useState, useRef } from "react";

import { tBranchCreate, zBranchCreate } from "@/validations/partner/branch";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import { ClsBranchService } from "@/services/partner/branch";
import useBranches from "@/hooks/partner/branches";

import { LuPlus, LuCheck, LuLoader } from "react-icons/lu";

import { toast } from "sonner";
import { Toast } from "@/components/locals/blocks/toasts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/dialog";

import {
  FieldSet,
  FieldGroup,
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/components/shadcn/field";

import {
  FieldPhoneNumber,
  FieldEmail,
  FieldNumber,
  tFieldPhoneNumberRef,
} from "@/components/locals/blocks/fields";

import {
  tOption,
  tFieldSelectRef,
  FieldSelect,
} from "@/components/locals/blocks/selects";

import { Section, Intro } from "@/components/locals/blocks/typography";
import {
  Title,
  Description,
} from "@/components/locals/partner/dashboard/blocks/typographies";

import { Separator } from "@/components/shadcn/separator";

import { Input } from "@/components/shadcn/input";
import { Button } from "@/components/shadcn/button";

import Filter from "./filter";
import Table from "./table";
import { Pagination } from "@/components/locals/blocks/pagination";

export default function Branches() {
  const { isLoading, result } = useBranches();
  const tBranches = useTranslations(
    "app.partner.dashboard.branches.page.branches",
  );

  return (
    <Section className="h-fullscreen">
      <Card>
        <CardHeader className="flex items-end justify-between">
          <Intro className="space-y-1">
            <CardTitle>
              <Title heading="h1">{tBranches("title")}</Title>
            </CardTitle>
            <CardDescription>
              <Description>{tBranches("description")}</Description>
            </CardDescription>
          </Intro>
          <AddNew />
        </CardHeader>
        <CardContent className="block space-y-6">
          <Filter />
          <Card>
            <CardContent className="space-y-6">
              <Table
                isLoading={isLoading}
                isSuccess={result?.isSuccess || false}
                data={result?.isSuccess ? result.data : []}
              />
              {!isLoading && result?.isSuccess && (
                <Pagination pagination={result.pagination} />
              )}
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </Section>
  );
}

function AddNew() {
  const id = useId();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const tAddNew = useTranslations(
    "app.partner.dashboard.branches.page.branches.add-new",
  );

  const {
    formState,
    control,
    reset: handleReset,
    handleSubmit,
  } = useForm<tBranchCreate>({
    defaultValues: {
      name: "",
      location: {
        country: "",
        city: "",
        street: "",
        latitude: 0,
        longitude: 0,
      },
      phoneNumber: "",
      email: "",
      status: 0,
    },
    resolver: zodResolver(zBranchCreate),
  });

  const phoneNumberRef = useRef<tFieldPhoneNumberRef>(null);
  const statusRef = useRef<tFieldSelectRef<tOption>>(null);

  const statuses: tOption[] = tAddNew.raw("content.form.status.statuses");

  const clsBranchService = new ClsBranchService();

  function reset(): void {
    handleReset();

    phoneNumberRef.current?.reset();
    statusRef.current?.reset(statuses.find((status) => status.value === "0"));
  }

  async function submit(data: tBranchCreate): Promise<void> {
    const result = await clsBranchService.addAsync(data);

    if (!result.isSuccess) {
      toast.custom(() => (
        <Toast
          variant="destructive"
          label={tAddNew("content.form.actions.toasts.when-error")}
        />
      ));
      return;
    }

    toast.custom(() => (
      <Toast
        variant="success"
        label={tAddNew("content.form.actions.toasts.when-success")}
      />
    ));

    reset();
    setIsOpen(false);

    router.refresh();
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <LuPlus />
          {tAddNew("trigger")}
        </Button>
      </DialogTrigger>
      <DialogContent
        showCloseButton
        className="flex h-[calc(100vh-2rem)] min-w-[calc(100vw-2rem)] flex-col overflow-auto p-12"
      >
        <DialogHeader>
          <DialogTitle className="text-4xl">
            {tAddNew("content.title")}
          </DialogTitle>
          <DialogDescription className="text-lg">
            {tAddNew("content.description")}
          </DialogDescription>
        </DialogHeader>
        <Separator className="mt-1 mb-6" />
        <form
          className="flex grow flex-col gap-6"
          onReset={reset}
          onSubmit={handleSubmit(submit)}
        >
          <FieldSet>
            <FieldGroup className="grid-cols-2">
              <Controller
                control={control}
                name="name"
                render={({ field, fieldState: { invalid, error } }) => (
                  <Field className="col-span-2">
                    <FieldLabel
                      aria-invalid={invalid}
                      htmlFor={`${id}-name`}
                      className="max-w-fit"
                    >
                      {tAddNew("content.form.information.name.label")}
                    </FieldLabel>
                    <FieldContent>
                      <Input
                        {...field}
                        required
                        aria-invalid={invalid}
                        id={`${id}-name`}
                        placeholder={tAddNew(
                          "content.form.information.name.placeholder",
                        )}
                      />
                    </FieldContent>
                    <FieldError errors={[error]} />
                  </Field>
                )}
              />
              <Controller
                control={control}
                name="phoneNumber"
                render={({ field, fieldState: { invalid, error } }) => (
                  <Field>
                    <FieldLabel
                      aria-invalid={invalid}
                      htmlFor={`${id}-phone-number`}
                      className="max-w-fit"
                    >
                      {tAddNew("content.form.information.phone-number.label")}
                    </FieldLabel>
                    <FieldContent>
                      <FieldPhoneNumber
                        ref={phoneNumberRef}
                        isRequired
                        isInvalid={invalid}
                        id={`${id}-phone-number`}
                        value={field.value}
                        setValue={field.onChange}
                      />
                    </FieldContent>
                    <FieldError errors={[error]} />
                  </Field>
                )}
              />
              <Controller
                control={control}
                name="email"
                render={({ field, fieldState: { invalid, error } }) => (
                  <Field>
                    <FieldLabel
                      aria-invalid={invalid}
                      htmlFor={`${id}-email`}
                      className="max-w-fit"
                    >
                      {tAddNew("content.form.information.email.label")}
                    </FieldLabel>
                    <FieldContent>
                      <FieldEmail
                        {...field}
                        required
                        aria-invalid={invalid}
                        id={`${id}-email`}
                        placeholder={tAddNew(
                          "content.form.information.email.placeholder",
                        )}
                      />
                    </FieldContent>
                    <FieldError errors={[error]} />
                  </Field>
                )}
              />
            </FieldGroup>
          </FieldSet>
          <FieldSet>
            <FieldGroup className="grid-cols-2">
              <Controller
                control={control}
                name="location.country"
                render={({ field, fieldState: { invalid, error } }) => (
                  <Field>
                    <FieldLabel
                      aria-invalid={invalid}
                      htmlFor={`${id}-country`}
                      className="max-w-fit"
                    >
                      {tAddNew("content.form.location.country.label")}
                    </FieldLabel>
                    <FieldContent>
                      <Input
                        {...field}
                        required
                        aria-invalid={invalid}
                        id={`${id}-country`}
                        placeholder={tAddNew(
                          "content.form.location.country.placeholder",
                        )}
                      />
                    </FieldContent>
                    <FieldError errors={[error]} />
                  </Field>
                )}
              />
              <Controller
                control={control}
                name="location.city"
                render={({ field, fieldState: { invalid, error } }) => (
                  <Field>
                    <FieldLabel
                      aria-invalid={invalid}
                      htmlFor={`${id}-city`}
                      className="max-w-fit"
                    >
                      {tAddNew("content.form.location.city.label")}
                    </FieldLabel>
                    <FieldContent>
                      <Input
                        {...field}
                        required
                        aria-invalid={invalid}
                        id={`${id}-city`}
                        placeholder={tAddNew(
                          "content.form.location.city.placeholder",
                        )}
                      />
                    </FieldContent>
                    <FieldError errors={[error]} />
                  </Field>
                )}
              />
              <Controller
                control={control}
                name="location.street"
                render={({ field, fieldState: { invalid, error } }) => (
                  <Field className="col-span-2">
                    <FieldLabel
                      aria-invalid={invalid}
                      htmlFor={`${id}-street`}
                      className="max-w-fit"
                    >
                      {tAddNew("content.form.location.street.label")}
                    </FieldLabel>
                    <FieldContent>
                      <Input
                        {...field}
                        required
                        aria-invalid={invalid}
                        id={`${id}-street`}
                        placeholder={tAddNew(
                          "content.form.location.street.placeholder",
                        )}
                      />
                    </FieldContent>
                    <FieldError errors={[error]} />
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
                  <Field>
                    <FieldLabel
                      aria-invalid={invalid}
                      htmlFor={`${id}-latitude`}
                      className="max-w-fit"
                    >
                      {tAddNew("content.form.location.latitude.label")}
                    </FieldLabel>
                    <FieldContent>
                      <FieldNumber
                        aria-invalid={invalid}
                        id={`${id}-latitude`}
                        value={value}
                        onValueChange={(number) => setValue(number ?? 0)}
                      />
                    </FieldContent>
                    <FieldError errors={[error]} />
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
                  <Field>
                    <FieldLabel
                      aria-invalid={invalid}
                      htmlFor={`${id}-longitude`}
                      className="max-w-fit"
                    >
                      {tAddNew("content.form.location.longitude.label")}
                    </FieldLabel>
                    <FieldContent>
                      <FieldNumber
                        aria-invalid={invalid}
                        id={`${id}-longitude`}
                        value={value}
                        onValueChange={(number) => setValue(number ?? 0)}
                      />
                    </FieldContent>
                    <FieldError errors={[error]} />
                  </Field>
                )}
              />
            </FieldGroup>
          </FieldSet>
          <Controller
            control={control}
            name="status"
            render={({
              field: { value, onChange: setValue },
              fieldState: { invalid, error },
            }) => (
              <Field>
                <FieldLabel
                  aria-invalid={invalid}
                  htmlFor={`${id}-status`}
                  className="max-w-fit"
                >
                  {tAddNew("content.form.status.label")}
                </FieldLabel>
                <FieldContent>
                  <FieldSelect<tOption>
                    ref={statusRef}
                    id={`${id}-status`}
                    isInvalid={invalid}
                    placeholder={tAddNew("content.form.status.placeholder")}
                    defaultValue={statuses.find(
                      (status) => status.value === value.toString(),
                    )}
                    onSelect={(option) =>
                      setValue(option && Number(option.value))
                    }
                    options={statuses}
                    optionRender={(option, isSelected) => (
                      <button type="button">
                        {option.label}
                        {isSelected && <LuCheck className="ms-auto" />}
                      </button>
                    )}
                  />
                </FieldContent>
                <FieldError errors={error} />
              </Field>
            )}
          />
          <FieldSet className="mt-auto">
            <FieldGroup className="grid-cols-2">
              <Button
                disabled={formState.isSubmitting}
                variant="outline"
                type="reset"
              >
                {tAddNew("content.form.actions.reset")}
              </Button>
              <Button disabled={formState.isSubmitting} type="submit">
                {formState.isSubmitting && (
                  <LuLoader className="animate-spin" />
                )}
                {tAddNew("content.form.actions.submit")}
              </Button>
            </FieldGroup>
          </FieldSet>
        </form>
      </DialogContent>
    </Dialog>
  );
}
