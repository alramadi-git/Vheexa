"use client";

import useRoles from "@/hooks/partner/roles";
import { ClsRoleService } from "@/services/partner/role";

import { useTranslations } from "next-intl";

import { useRouter } from "@/i18n/navigation";
import { useId, useState } from "react";

import { tRoleCreate, zRoleCreate } from "@/validations/partner/role";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm, Controller } from "react-hook-form";

import { LuCheck, LuPlus, LuLoader } from "react-icons/lu";

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
  FieldSet,
} from "@/components/shadcn/field";
import { Separator } from "@/components/shadcn/separator";

import { Section, Intro } from "@/components/locals/blocks/typography";
import { Toast } from "@/components/locals/blocks/toasts";
import {
  Title,
  Description,
} from "@/components/locals/partner/dashboard/blocks/typographies";

import { Button } from "@/components/shadcn/button";

import Filter from "./filter";
import Table from "./table";
import { Pagination } from "@/components/locals/blocks/pagination";
import {
  FieldMultiSelect,
  FieldSearch,
} from "@/components/locals/blocks/fields";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";
import { toast } from "sonner";

export default function Roles() {
  const { isLoading, result } = useRoles();
  const tRoles = useTranslations("app.partner.dashboard.roles.page.roles");

  return (
    <Section className="h-fullscreen">
      <Card>
        <CardHeader className="flex items-end justify-between">
          <Intro className="space-y-1">
            <CardTitle>
              <Title heading="h1">{tRoles("title")}</Title>
            </CardTitle>
            <CardDescription>
              <Description>{tRoles("description")}</Description>
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
type tPermission = {
  value: string;
  label: string;
  description: string;
};
type tStatues = {
  value: string;
  label: string;
};

function AddNew() {
  const id = useId();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const {
    formState,
    control,
    reset: handleReset,
    handleSubmit,
  } = useForm<tRoleCreate>({
    defaultValues: {
      name: "",
      permissions: [],
      status: 0,
    },
    resolver: zodResolver(zRoleCreate),
  });

  const tAddNew = useTranslations(
    "app.partner.dashboard.roles.page.roles.add-new",
  );

  const permissions: tPermission[] = tAddNew.raw(
    "content.form.permissions.permissions",
  );
  const statuses: tStatues[] = tAddNew.raw("content.form.status.statuses");

  const clsRoleService = new ClsRoleService();

  function reset(): void {
    handleReset();
  }
  async function submit(data: tRoleCreate): Promise<void> {
    const result = await clsRoleService.addAsync(data);

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

    setIsOpen(false);

    reset();
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
          onReset={reset}
          onSubmit={handleSubmit(submit)}
          className="flex grow flex-col gap-6"
        >
          <FieldSet>
            <FieldGroup className="grid-cols-3">
              <Controller
                control={control}
                name="name"
                render={({
                  field: { value, onChange: setValue, ...field },
                  fieldState,
                }) => (
                  <Field>
                    <FieldLabel
                      aria-invalid={fieldState.invalid}
                      htmlFor={`${id}-name`}
                      className="max-w-fit"
                    >
                      {tAddNew("content.form.name.label")}
                    </FieldLabel>
                    <FieldContent>
                      <FieldSearch
                        {...field}
                        id={`${id}-name`}
                        placeholder={tAddNew("content.form.name.placeholder")}
                        value={value}
                        onChange={setValue}
                      />
                    </FieldContent>
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
              <Controller
                control={control}
                name="permissions"
                render={({
                  field: { onChange: setValue, ...field },
                  fieldState,
                }) => (
                  <Field>
                    <FieldLabel
                      aria-invalid={fieldState.invalid}
                      htmlFor={`${id}-permissions`}
                      className="max-w-fit"
                    >
                      {tAddNew("content.form.permissions.label")}
                    </FieldLabel>
                    <FieldContent>
                      <FieldMultiSelect
                        id={`${id}-permissions`}
                        placeholder={tAddNew(
                          "content.form.permissions.placeholder",
                        )}
                        options={permissions}
                        values={field.value.map((val) => val.toString())}
                        setValues={(values) =>
                          setValue(values.map((value) => Number(value)))
                        }
                        renderGroup={(option, isSelected) => (
                          <div className="flex w-full justify-between gap-3">
                            <div>
                              {option.label}
                              <p className="text-muted-foreground line-clamp-1">
                                {option.description}
                              </p>
                            </div>
                            {isSelected && <LuCheck size={16} />}
                          </div>
                        )}
                      />
                    </FieldContent>
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
              <Controller
                control={control}
                name="status"
                render={({
                  field: { value, onChange: setValue, ...field },
                  fieldState,
                }) => (
                  <Field>
                    <FieldLabel
                      aria-invalid={fieldState.invalid}
                      htmlFor={`${id}-status`}
                      className="max-w-fit"
                    >
                      {tAddNew("content.form.status.label")}
                    </FieldLabel>
                    <FieldContent>
                      <Select
                        {...field}
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
            </FieldGroup>
          </FieldSet>

          <FieldSet>
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
          </FieldSet>
        </form>
      </DialogContent>
    </Dialog>
  );
}
