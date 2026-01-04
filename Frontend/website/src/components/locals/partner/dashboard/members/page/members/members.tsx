"use client";

import { useTranslations } from "next-intl";

import useRoles from "@/hooks/partner/roles";

import { useRouter } from "@/i18n/navigation";
import { useId, useRef, useState } from "react";

import { tMemberCreate, zMemberCreate } from "@/validations/partner/member";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm, Controller } from "react-hook-form";

import {
  LuPlus,
  LuCheck,
  LuShield,
  LuShieldAlert,
  LuShieldX,
  LuLoader,
  LuBuilding2,
} from "react-icons/lu";
import { GiIsland, GiAncientRuins } from "react-icons/gi";

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

import { Toast, Section, Intro } from "@/components/locals/blocks/typography";
import {
  Title,
  Description,
} from "@/components/locals/partner/dashboard/blocks/typographies";

import { Button } from "@/components/shadcn/button";

import Filter from "./filter";
import Table from "./table";
import { Pagination } from "@/components/locals/blocks/pagination";

import {
  FieldUsername,
  FieldEmail,
  FieldPassword,
} from "@/components/locals/blocks/fields";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";

import {
  tFieldAsyncSelectRef,
  FieldAsyncSelect,
} from "@/components/locals/blocks/selects";

import { toast } from "sonner";

import { ClsMemberService } from "@/services/partner/member";
import { ClsOptionsService } from "@/services/partner/options";

import { tOptionModel } from "@/models/partner/option";
import { tResponseManyService } from "@/services/service";

export default function Members() {
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

type tOption = {
  value: string;
  label: string;
};

function AddNew() {
  const tAddNew = useTranslations(
    "app.partner.dashboard.members.page.members.add-new",
  );

  const id = useId();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const roleRef = useRef<tFieldAsyncSelectRef>(null);
  const branchRef = useRef<tFieldAsyncSelectRef>(null);

  const {
    formState,
    control,
    reset: handleReset,
    handleSubmit,
  } = useForm<tMemberCreate>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      status: 0,
    },
    resolver: zodResolver(zMemberCreate),
  });

  const statuses: tOption[] = tAddNew.raw("content.form.status.statuses");

  const clsOptionsService = new ClsOptionsService();
  const clsMemberService = new ClsMemberService();

  async function fetch(
    type: "roles" | "branches",
    search: string,
    page: number,
  ): Promise<tResponseManyService<tOption>> {
    const serviceResult: tResponseManyService<tOptionModel> = await (type ===
    "roles"
      ? clsOptionsService.getRolesAsync(search, page)
      : clsOptionsService.getBranchesAsync(search, page));

    const result: tResponseManyService<tOption> = !serviceResult.isSuccess
      ? serviceResult
      : {
          ...serviceResult,
          data: serviceResult.data.map((option) => ({
            value: option.uuid,
            label: option.name,
          })),
        };
    return result;
  }

  function reset(): void {
    handleReset();

    roleRef.current?.reset();
    branchRef.current?.reset();
  }
  async function submit(data: tMemberCreate): Promise<void> {
    const result = await clsMemberService.addAsync(data);

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
            <FieldGroup className="grid-cols-4">
              <Controller
                control={control}
                name="avatar"
                render={({
                  field: { onChange: setValue },
                  fieldState: { invalid, error },
                }) => (
                  <Field>
                    <FieldLabel
                      aria-invalid={invalid}
                      htmlFor={`${id}-avatar`}
                      className="max-w-fit"
                    >
                      {tAddNew("content.form.avatar.label")}
                    </FieldLabel>
                    <FieldContent></FieldContent>
                    <FieldError errors={[error]} />
                  </Field>
                )}
              />
              <FieldGroup className="col-span-3 grid-cols-2">
                <Controller
                  control={control}
                  name="username"
                  render={({
                    field: { onChange: setValue, ...field },
                    fieldState: { invalid, error },
                  }) => (
                    <Field>
                      <FieldLabel
                        aria-invalid={invalid}
                        htmlFor={`${id}-username`}
                        className="max-w-fit"
                      >
                        {tAddNew("content.form.username.label")}
                      </FieldLabel>
                      <FieldContent>
                        <FieldUsername
                          {...field}
                          aria-invalid={invalid}
                          id={`${id}-username`}
                          placeholder={tAddNew(
                            "content.form.username.placeholder",
                          )}
                          onChange={setValue}
                        />
                      </FieldContent>
                      <FieldError errors={[error]} />
                    </Field>
                  )}
                />
                <Controller
                  control={control}
                  name="role"
                  render={({
                    field: { onChange: setValue },
                    fieldState: { invalid, error },
                  }) => (
                    <Field>
                      <FieldLabel
                        aria-invalid={invalid}
                        htmlFor={`${id}-role`}
                        className="max-w-fit"
                      >
                        {tAddNew("content.form.role.label")}
                      </FieldLabel>
                      <FieldContent>
                        <FieldAsyncSelect
                          ref={roleRef}
                          isInvalid={invalid}
                          id={`${id}-role`}
                          placeholder={tAddNew("content.form.role.placeholder")}
                          triggerRender={(option) => (
                            <span className="inline-flex items-center gap-1.5">
                              <LuShield />
                              <span className="line-clamp-1 text-wrap">
                                {option.label}
                              </span>
                            </span>
                          )}
                          cacheKey="roles"
                          fetch={(search, page) => fetch("roles", search, page)}
                          inputProps={{
                            placeholder: tAddNew(
                              "content.form.role.roles.search-placeholder",
                            ),
                          }}
                          whenEmptyRender={() => (
                            <div className="flex items-center gap-3">
                              <GiAncientRuins size={24} />
                              <div>
                                <p className="text-sm">
                                  {tAddNew(
                                    "content.form.role.roles.when-empty.label",
                                  )}
                                </p>
                                <p className="text-muted-foreground line-clamp-1 text-xs">
                                  {tAddNew(
                                    "content.form.role.roles.when-empty.description",
                                  )}
                                </p>
                              </div>
                            </div>
                          )}
                          optionRender={(option) => (
                            <button
                              type="button"
                              className="inline-flex items-center gap-1.5"
                            >
                              <LuShield />
                              <span className="line-clamp-1 text-wrap">
                                {option.label}
                              </span>
                            </button>
                          )}
                          onSelect={(option) => setValue(option.value)}
                          whenErrorRender={() => (
                            <div className="flex items-center gap-3">
                              <GiIsland size={24} />
                              <div>
                                <p className="text-sm">
                                  {tAddNew(
                                    "content.form.role.roles.when-error.label",
                                  )}
                                </p>
                                <p className="text-muted-foreground line-clamp-1 text-xs">
                                  {tAddNew(
                                    "content.form.role.roles.when-error.description",
                                  )}
                                </p>
                              </div>
                            </div>
                          )}
                        />
                      </FieldContent>
                      <FieldError errors={[error]} />
                    </Field>
                  )}
                />
                <Controller
                  control={control}
                  name="branch"
                  render={({
                    field: { value, onChange: setValue },
                    fieldState: { invalid, error },
                  }) => (
                    <Field className="col-span-2">
                      <FieldLabel
                        aria-invalid={invalid}
                        htmlFor={`${id}-branch`}
                        className="max-w-fit"
                      >
                        {tAddNew("content.form.branch.label")}
                      </FieldLabel>
                      <FieldContent>
                        <FieldAsyncSelect
                          ref={branchRef}
                          isInvalid={invalid}
                          id={`${id}-branch`}
                          placeholder={tAddNew(
                            "content.form.branch.placeholder",
                          )}
                          triggerRender={(option) => (
                            <span className="inline-flex items-center gap-1.5">
                              <LuBuilding2  />
                              <span className="line-clamp-1 text-wrap">
                                {option.label}
                              </span>
                            </span>
                          )}
                          cacheKey="branches"
                          fetch={(search, page) =>
                            fetch("branches", search, page)
                          }
                          inputProps={{
                            placeholder: tAddNew(
                              "content.form.branch.branches.search-placeholder",
                            ),
                          }}
                          whenEmptyRender={() => (
                            <div className="flex items-center gap-3">
                              <LuShieldAlert size={24} />
                              <div>
                                <p className="text-sm">
                                  {tAddNew(
                                    "content.form.branch.branches.when-empty.label",
                                  )}
                                </p>
                                <p className="text-muted-foreground line-clamp-1 text-xs">
                                  {tAddNew(
                                    "content.form.branch.branches.when-empty.description",
                                  )}
                                </p>
                              </div>
                            </div>
                          )}
                          optionRender={(option) => (
                            <button
                              type="button"
                              className="inline-flex justify-between gap-1.5"
                            >
                              <div className="flex items-center gap-1.5">
                                <LuBuilding2 />
                                <span className="line-clamp-1 text-wrap">
                                  {option.label}
                                </span>
                              </div>
                              {option.value === value && <LuCheck />}
                            </button>
                          )}
                          onSelect={(option) => setValue(option.value)}
                          whenErrorRender={() => (
                            <div className="flex items-center gap-3">
                              <LuShieldX size={24} />
                              <div>
                                <p className="text-sm">
                                  {tAddNew(
                                    "content.form.branch.branches.when-error.label",
                                  )}
                                </p>
                                <p className="text-muted-foreground line-clamp-1 text-xs">
                                  {tAddNew(
                                    "content.form.branch.branches.when-error.description",
                                  )}
                                </p>
                              </div>
                            </div>
                          )}
                        />
                      </FieldContent>
                      <FieldError errors={[error]} />
                    </Field>
                  )}
                />
              </FieldGroup>
            </FieldGroup>
          </FieldSet>

          <FieldSet>
            <FieldGroup className="grid-cols-2">
              <Controller
                control={control}
                name="email"
                render={({
                  field: { onChange: setValue },
                  fieldState: { invalid, error },
                }) => (
                  <Field>
                    <FieldLabel
                      aria-invalid={invalid}
                      htmlFor={`${id}-email`}
                      className="max-w-fit"
                    >
                      {tAddNew("content.form.email.label")}
                    </FieldLabel>
                    <FieldContent>
                      <FieldEmail
                        aria-invalid={invalid}
                        id={`${id}-email`}
                        placeholder={tAddNew("content.form.email.placeholder")}
                        onChange={setValue}
                      />
                    </FieldContent>
                    <FieldError errors={[error]} />
                  </Field>
                )}
              />
              <Controller
                control={control}
                name="password"
                render={({
                  field: { onChange: setValue },
                  fieldState: { invalid, error },
                }) => (
                  <Field>
                    <FieldLabel
                      aria-invalid={invalid}
                      htmlFor={`${id}-password`}
                      className="max-w-fit"
                    >
                      {tAddNew("content.form.password.label")}
                    </FieldLabel>
                    <FieldContent>
                      <FieldPassword
                        aria-invalid={invalid}
                        id={`${id}-password`}
                        placeholder={tAddNew(
                          "content.form.password.placeholder",
                        )}
                        onChange={setValue}
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
                  <Select
                    value={value.toString()}
                    onValueChange={(value) => setValue(Number(value))}
                  >
                    <Button asChild variant="outline">
                      <SelectTrigger
                        id={`${id}-status`}
                        className="w-full justify-between"
                      >
                        <SelectValue />
                      </SelectTrigger>
                    </Button>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FieldContent>
                <FieldError errors={[error]} />
              </Field>
            )}
          />

          <FieldSet className="mt-auto">
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
