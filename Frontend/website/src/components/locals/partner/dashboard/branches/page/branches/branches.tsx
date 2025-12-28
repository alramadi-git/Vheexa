"use client";
import { tNullable } from "@/types/nullish";

import useBranches from "@/hooks/partner/branches";
import { ClsBranchService } from "@/services/partner/branch";

import { useTranslations } from "next-intl";

import { useRouter } from "@/i18n/navigation";
import { useId, useState, useRef } from "react";

import { tBranchCreate, zBranchCreate } from "@/validations/partner/branch";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm, Controller } from "react-hook-form";

import { LuPlus, LuLoader } from "react-icons/lu";

import { toast } from "sonner";

import { Section, Intro, Toast } from "@/components/locals/blocks/typography";
import {
  Title,
  Description,
} from "@/components/locals/partner/dashboard/blocks/typographies";

import Filter from "./filter";
import Table from "./table";
import { Pagination } from "@/components/locals/blocks/pagination";

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
  FieldGroup,
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/components/shadcn/field";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";

import {
  FieldPhoneNumber,
  FieldEmail,
  FieldNumber,
  tFieldPhoneNumberRef,
} from "@/components/locals/blocks/fields";

import { Separator } from "@/components/shadcn/separator";

import { Input } from "@/components/shadcn/input";
import { Button } from "@/components/shadcn/button";

export default function Branches() {
  const tBranches = useTranslations(
    "app.partner.dashboard.branches.page.branches",
  );

  const { isLoading, result } = useBranches();

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

type tStatues = {
  value: string;
  label: string;
};

function AddNew() {
  const id = useId();

  const clsBranchService = new ClsBranchService();

  const tAddNew = useTranslations(
    "app.partner.dashboard.branches.page.branches.add-new",
  );

  const statuses: tStatues[] = tAddNew.raw("content.form.status.statuses");

  const router = useRouter();

  const phoneNumberRef = useRef<tNullable<tFieldPhoneNumberRef>>(null);

  const [open, setOpen] = useState(false);
  const {
    formState,
    control,
    reset: handleReset,
    handleSubmit,
  } = useForm<tBranchCreate>({
    defaultValues: {
      name: "",
      country: "",
      city: "",
      street: "",
      latitude: 0,
      longitude: 0,
      phoneNumber: "",
      email: "",
      status: 0,
    },
    resolver: zodResolver(zBranchCreate),
  });

  function reset(): void {
    handleReset();
    phoneNumberRef.current?.reset();
  }
  async function submit(data: tBranchCreate): Promise<void> {
    const result = await clsBranchService.addAsync(data);

    if (!result.isSuccess) {
      toast.custom(() => (
        <Toast
          variant="destructive"
          label={tAddNew("content.form.when-error")}
        />
      ));
      return;
    }

    toast.custom(() => (
      <Toast variant="success" label={tAddNew("content.form.when-success")} />
    ));

    setOpen(false);
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          onReset={reset}
          onSubmit={handleSubmit(submit)}
          className="flex grow flex-col gap-6"
        >
          <FieldGroup className="grid-cols-2">
            <Controller
              control={control}
              name="name"
              render={({ field, fieldState }) => (
                <Field className="col-span-2">
                  <FieldLabel
                    aria-invalid={fieldState.invalid}
                    htmlFor={`${id}-name`}
                    className="max-w-fit"
                  >
                    {tAddNew("content.form.information.name.label")}
                  </FieldLabel>
                  <FieldContent>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      required
                      id={`${id}-name`}
                      placeholder={tAddNew(
                        "content.form.information.name.placeholder",
                      )}
                    />
                  </FieldContent>
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />

            <Controller
              control={control}
              name="phoneNumber"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel
                    aria-invalid={fieldState.invalid}
                    htmlFor={`${id}-phone-number`}
                    className="max-w-fit"
                  >
                    {tAddNew("content.form.information.phone-number.label")}
                  </FieldLabel>
                  <FieldContent>
                    <FieldPhoneNumber
                      ref={phoneNumberRef}
                      isInvalid={fieldState.invalid}
                      isRequired
                      id={`${id}-phone-number`}
                      value={field.value}
                      setValue={field.onChange}
                    />
                  </FieldContent>
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel
                    aria-invalid={fieldState.invalid}
                    htmlFor={`${id}-email`}
                    className="max-w-fit"
                  >
                    {tAddNew("content.form.information.email.label")}
                  </FieldLabel>
                  <FieldContent>
                    <FieldEmail
                      {...field}
                      required
                      aria-invalid={fieldState.invalid}
                      id={`${id}-email`}
                      placeholder={tAddNew(
                        "content.form.information.email.placeholder",
                      )}
                    />
                  </FieldContent>
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
          </FieldGroup>

          <FieldGroup className="grid-cols-2">
            <Controller
              control={control}
              name="country"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel
                    aria-invalid={fieldState.invalid}
                    htmlFor={`${id}-country`}
                    className="max-w-fit"
                  >
                    {tAddNew("content.form.location.country.label")}
                  </FieldLabel>
                  <FieldContent>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      required
                      id={`${id}-country`}
                      placeholder={tAddNew(
                        "content.form.location.country.placeholder",
                      )}
                    />
                  </FieldContent>
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
            <Controller
              control={control}
              name="city"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel
                    aria-invalid={fieldState.invalid}
                    htmlFor={`${id}-city`}
                    className="max-w-fit"
                  >
                    {tAddNew("content.form.location.city.label")}
                  </FieldLabel>
                  <FieldContent>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      required
                      id={`${id}-city`}
                      placeholder={tAddNew(
                        "content.form.location.city.placeholder",
                      )}
                    />
                  </FieldContent>
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />

            <Controller
              control={control}
              name="street"
              render={({ field, fieldState }) => (
                <Field className="col-span-2">
                  <FieldLabel
                    aria-invalid={fieldState.invalid}
                    htmlFor={`${id}-street`}
                    className="max-w-fit"
                  >
                    {tAddNew("content.form.location.street.label")}
                  </FieldLabel>
                  <FieldContent>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      required
                      id={`${id}-street`}
                      placeholder={tAddNew(
                        "content.form.location.street.placeholder",
                      )}
                    />
                  </FieldContent>
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
          </FieldGroup>

          <FieldGroup className="grid-cols-2">
            <Controller
              control={control}
              name="latitude"
              render={({
                field: { onChange: setValue, ...field },
                fieldState,
              }) => (
                <Field>
                  <FieldLabel
                    aria-invalid={fieldState.invalid}
                    htmlFor={`${id}-latitude`}
                    className="max-w-fit"
                  >
                    {tAddNew("content.form.coordinates.latitude.label")}
                  </FieldLabel>
                  <FieldContent>
                    <FieldNumber
                      {...field}
                      aria-invalid={fieldState.invalid}
                      required
                      id={`${id}-latitude`}
                      onValueChange={(number) => setValue(number ?? 0)}
                    />
                  </FieldContent>
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
            <Controller
              control={control}
              name="longitude"
              render={({
                field: { onChange: setValue, ...field },
                fieldState,
              }) => (
                <Field>
                  <FieldLabel
                    aria-invalid={fieldState.invalid}
                    htmlFor={`${id}-longitude`}
                    className="max-w-fit"
                  >
                    {tAddNew("content.form.coordinates.longitude.label")}
                  </FieldLabel>
                  <FieldContent>
                    <FieldNumber
                      {...field}
                      aria-invalid={fieldState.invalid}
                      required
                      id={`${id}-longitude`}
                      onValueChange={(number) => setValue(number ?? 0)}
                    />
                  </FieldContent>
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
          </FieldGroup>

          <Controller
            control={control}
            name="status"
            render={({
              field: { value, onChange: setValue, ...field },
              fieldState,
            }) => (
              <Field>
                <FieldLabel htmlFor={`${id}-status`} className="max-w-fit">
                  {tAddNew("content.form.status.label")}
                </FieldLabel>
                <FieldContent>
                  <Select
                    {...field}
                    required
                    value={value.toString()}
                    onValueChange={(val) => setValue(Number(val))}
                  >
                    <SelectTrigger id={`${id}-status`} className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FieldContent>
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />

          <FieldGroup className="grid-cols-2">
            <Button
              variant="outline"
              disabled={formState.isSubmitting}
              type="reset"
              className="mt-auto"
            >
              {tAddNew("content.form.actions.reset")}
            </Button>
            <Button
              disabled={formState.isSubmitting}
              type="submit"
              className="mt-auto"
            >
              {formState.isSubmitting && (
                <LuLoader size={16} className="animate-spin" />
              )}
              {tAddNew("content.form.actions.submit")}
            </Button>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
