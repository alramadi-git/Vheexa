"use client";

import { useTranslations } from "next-intl";

import { useRouter } from "@/i18n/navigation";
import { useId, useRef, useState } from "react";

import { tRoleCreate, zRoleCreate } from "@/validations/partner/role";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import useRoleService from "@/services/partner/role";
import useRoles from "@/hooks/partner/roles";

import { toast } from "sonner";
import { Toast } from "@/components/locals/blocks/toasts";

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
  FieldSet,
  FieldGroup,
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/components/shadcn/field";

import { FieldSearch } from "@/components/locals/blocks/fields";

import {
  tGroup,
  tOption,
  tFieldSelectRef,
  tFieldMultiSelectRef,
  FieldSelect,
  FieldMultiSelect,
} from "@/components/locals/blocks/selects";

import { Section, Intro } from "@/components/locals/blocks/typography";
import {
  Title,
  Description,
} from "@/components/locals/partner/dashboard/blocks/typographies";

import { Separator } from "@/components/shadcn/separator";

import { Button } from "@/components/shadcn/button";

import Filter from "./filter";
import Table from "./table";
import { Pagination } from "@/components/locals/blocks/pagination";

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

type tPermissionGroup = tGroup<tPermissionOption> & {
  label: string;
};
type tPermissionOption = tOption & {
  description: string;
};

function AddNew() {
  const id = useId();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const tAddNew = useTranslations(
    "app.partner.dashboard.roles.page.roles.add-new",
  );

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

  const permissionsRef = useRef<tFieldMultiSelectRef<tPermissionOption>>(null);
  const statusRef = useRef<tFieldSelectRef<tOption>>(null);

  const permissions: tPermissionGroup[] = tAddNew.raw(
    "content.form.permissions.permissions",
  );
  const statuses: tOption[] = tAddNew.raw("content.form.status.statuses");

  const roleService = useRoleService();

  function reset(): void {
    handleReset();

    permissionsRef.current?.reset();
    statusRef.current?.reset(statuses.find((status) => status.value === "0"));
  }

  async function submit(data: tRoleCreate): Promise<void> {
    const result = await roleService.create(data);

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
          onReset={reset}
          onSubmit={handleSubmit(submit)}
          className="flex grow flex-col gap-6"
        >
          <FieldGroup className="grid-cols-3">
            <Controller
              control={control}
              name="name"
              render={({
                field: { value, onChange: setValue },
                fieldState: { invalid, error },
              }) => (
                <Field>
                  <FieldLabel
                    aria-invalid={invalid}
                    htmlFor={`${id}-name`}
                    className="max-w-fit"
                  >
                    {tAddNew("content.form.name.label")}
                  </FieldLabel>
                  <FieldContent>
                    <FieldSearch
                      aria-invalid={invalid}
                      required
                      id={`${id}-name`}
                      placeholder={tAddNew("content.form.name.placeholder")}
                      value={value}
                      onChange={setValue}
                    />
                  </FieldContent>
                  <FieldError errors={error} />
                </Field>
              )}
            />
            <Controller
              control={control}
              name="permissions"
              render={({
                field: { value, onChange: setValue },
                fieldState: { invalid, error },
              }) => (
                <Field>
                  <FieldLabel
                    aria-invalid={invalid}
                    htmlFor={`${id}-permissions`}
                    className="max-w-fit"
                  >
                    {tAddNew("content.form.permissions.label")}
                  </FieldLabel>
                  <FieldContent>
                    <FieldMultiSelect<tPermissionGroup, tPermissionOption>
                      ref={permissionsRef}
                      isInvalid={invalid}
                      id={`${id}-permissions`}
                      placeholder={tAddNew(
                        "content.form.permissions.placeholder",
                      )}
                      defaultValues={permissions
                        .flatMap((group) => group.options)
                        .filter(
                          (option) =>
                            value?.includes(Number(option.value)) ?? false,
                        )}
                      groups={permissions}
                      searchPlaceholder={tAddNew(
                        "content.form.permissions.search-placeholder",
                      )}
                      groupRender={(group) => group.label}
                      optionRender={(option, isSelected) => (
                        <button
                          key={option.value}
                          type="button"
                          className="justify-between"
                        >
                          <span className="text-start">
                            {option.label}
                            <p className="text-muted-foreground line-clamp-1">
                              {option.description}
                            </p>
                          </span>
                          {isSelected && <LuCheck />}
                        </button>
                      )}
                      onToggle={(values) => {
                        setValue(values.map((option) => Number(option.value)));
                      }}
                    />
                  </FieldContent>
                  <FieldError errors={error} />
                </Field>
              )}
            />
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
          </FieldGroup>

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
