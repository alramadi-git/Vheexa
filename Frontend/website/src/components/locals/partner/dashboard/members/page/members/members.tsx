"use client";

import useRoles from "@/hooks/partner/roles";
import { useTranslations } from "next-intl";

import { useRouter } from "@/i18n/navigation";
import { useId, useRef, useState } from "react";

import { tOptionModel } from "@/models/partner/option";
import { tResponseManyService } from "@/services/service";

import { ClsOptionsService } from "@/services/partner/options";
import { ClsMemberService } from "@/services/partner/member";

import { tMemberCreate, zMemberCreate } from "@/validations/partner/member";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import {
  LuPlus,
  LuCheck,
  LuShield,
  LuShieldAlert,
  LuShieldX,
  LuBuilding2,
  LuLoader,
} from "react-icons/lu";
import { GiIsland, GiAncientRuins } from "react-icons/gi";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
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

import {
  FieldUsername,
  FieldEmail,
  FieldPassword,
  FieldFileUpload,
} from "@/components/locals/blocks/fields";

import {
  tFieldAsyncSelectRef,
  FieldAsyncSelect,
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

import { Button } from "@/components/shadcn/button";

import { toast } from "sonner";
import { Toast } from "@/components/locals/blocks/toasts";

import Filter from "./filter";
import Table from "./table";
import { Pagination } from "@/components/locals/blocks/pagination";

export default function Members() {
  const { isLoading, result } = useRoles();

  const tMembers = useTranslations(
    "app.partner.dashboard.members.page.members",
  );

  return (
    <Section className="h-fullscreen">
      <Card>
        <CardHeader className="flex items-end justify-between">
          <Intro className="space-y-1">
            <CardTitle>
              <Title heading="h1">{tMembers("title")}</Title>
            </CardTitle>
            <CardDescription>
              <Description>{tMembers("description")}</Description>
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
    "app.partner.dashboard.members.page.members.add-new",
  );

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

  const roleRef = useRef<tFieldAsyncSelectRef<tOption>>(null);
  const branchRef = useRef<tFieldAsyncSelectRef<tOption>>(null);
  const statusRef = useRef<tFieldSelectRef<tOption>>(null);

  const statuses: tOption[] = tAddNew.raw("content.form.status.statuses");

  const clsMemberService = new ClsMemberService();

  function reset(): void {
    handleReset();

    roleRef.current?.reset();
    branchRef.current?.reset();
    statusRef.current?.reset(statuses.find((status) => status.value === "0"));
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

  const clsOptionsService = new ClsOptionsService();

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
                  <FieldContent>
                    <FieldFileUpload maxFiles={1} />
                  </FieldContent>
                  <FieldError errors={[error]} />
                </Field>
              )}
            />
            <FieldGroup className="col-span-3 grid-cols-2">
              <Controller
                control={control}
                name="username"
                render={({
                  field: { value, onChange: setValue },
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
                        id={`${id}-username`}
                        aria-invalid={invalid}
                        required
                        value={value}
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
                      <FieldAsyncSelect<tOption>
                        ref={roleRef}
                        id={`${id}-role`}
                        isInvalid={invalid}
                        placeholder={tAddNew("content.form.role.placeholder")}
                        valueRender={(option) => (
                          <span className="inline-flex items-center gap-1.5">
                            <LuShield />
                            <span className="line-clamp-1 text-wrap">
                              {option.label}
                            </span>
                          </span>
                        )}
                        searchPlaceholder={tAddNew(
                          "content.form.role.roles.placeholder",
                        )}
                        cacheKey="roles"
                        fetch={(search, page) => fetch("roles", search, page)}
                        optionRender={(option, isSelected) => (
                          <button
                            type="button"
                            className="inline-flex justify-between gap-1.5"
                          >
                            <div className="flex items-center gap-1.5">
                              <LuShield />
                              <span className="line-clamp-1 text-wrap">
                                {option.label}
                              </span>
                            </div>
                            {isSelected && <LuCheck />}
                          </button>
                        )}
                        whenEmptyRender={() => (
                          <div className="flex items-center gap-3">
                            <LuShieldAlert size={24} />
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
                        whenErrorRender={() => (
                          <div className="flex items-center gap-3">
                            <LuShieldX size={24} />
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
                        onSelect={(option) => setValue(option?.value)}
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
                  field: { onChange: setValue },
                  fieldState: { invalid, error },
                }) => (
                  <Field className="col-span-2 mt-auto">
                    <FieldLabel
                      aria-invalid={invalid}
                      htmlFor={`${id}-branch`}
                      className="max-w-fit"
                    >
                      {tAddNew("content.form.branch.label")}
                    </FieldLabel>
                    <FieldContent>
                      <FieldAsyncSelect<tOption>
                        ref={branchRef}
                        id={`${id}-branch`}
                        isInvalid={invalid}
                        placeholder={tAddNew("content.form.branch.placeholder")}
                        valueRender={(option) => (
                          <span className="inline-flex items-center gap-1.5">
                            <LuBuilding2 />
                            <span className="line-clamp-1 text-wrap">
                              {option.label}
                            </span>
                          </span>
                        )}
                        searchPlaceholder={tAddNew(
                          "content.form.branch.branches.placeholder",
                        )}
                        cacheKey="branches"
                        fetch={(search, page) =>
                          fetch("branches", search, page)
                        }
                        optionRender={(option, isSelected) => (
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
                            {isSelected && <LuCheck />}
                          </button>
                        )}
                        whenEmptyRender={() => (
                          <div className="flex items-center gap-3">
                            <GiAncientRuins size={24} />
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
                        whenErrorRender={() => (
                          <div className="flex items-center gap-3">
                            <GiIsland size={24} />
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
                        onSelect={(option) => setValue(option?.value)}
                      />
                    </FieldContent>
                    <FieldError errors={[error]} />
                  </Field>
                )}
              />
            </FieldGroup>
          </FieldGroup>
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
                      {tAddNew("content.form.credentials.email.label")}
                    </FieldLabel>
                    <FieldContent>
                      <FieldEmail
                        id={`${id}-email`}
                        aria-invalid={invalid}
                        required
                        placeholder={tAddNew(
                          "content.form.credentials.email.placeholder",
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
                      {tAddNew("content.form.credentials.password.label")}
                    </FieldLabel>
                    <FieldContent>
                      <FieldPassword
                        id={`${id}-password`}
                        aria-invalid={invalid}
                        required
                        placeholder={tAddNew(
                          "content.form.credentials.password.placeholder",
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
