"use client";

import useMembers from "@/partner/hooks/member";
import { useTranslations } from "next-intl";

import { useRouter } from "@/i18n/navigation";
import { useId, useRef, useState } from "react";

import { tOptionModel } from "@/partner/models/option";

import { tMemberCreate, zMemberCreate } from "@/partner/validators/member";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import useMemberService from "@/partner/services/member";

import { toast } from "sonner";
import { Toast } from "@/components/locals/blocks/toasts";

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
} from "@/components/shadcn/field";

import {
  FieldUsername,
  FieldEmail,
  FieldPassword,
  tFieldEmailRef,
  tFieldPasswordRef,
} from "@/components/locals/blocks/fields";

import {
  FieldFileUpload,
  tFieldFileUploadRef,
} from "@/components/locals/blocks/file-uploads";

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

import Filter from "./filter";
import Table from "./table";
import { Pagination } from "@/components/locals/blocks/pagination";
import { tOptionFilter, tOptionPagination } from "@/partner/validators/option";
import { tPaginatedService } from "@/services/success";
import { tErrorService } from "@/services/error";

export default function Members() {
  const { isLoading, result } = useMembers();

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

  const avatarRef = useRef<tFieldFileUploadRef>(null);

  const roleRef = useRef<tFieldAsyncSelectRef<tOption>>(null);
  const branchRef = useRef<tFieldAsyncSelectRef<tOption>>(null);

  const emailRef = useRef<tFieldEmailRef>(null);
  const passwordRef = useRef<tFieldPasswordRef>(null);

  const statusRef = useRef<tFieldSelectRef<tOption>>(null);

  const statuses: tOption[] = tAddNew.raw("content.form.status.statuses");

  const memberService = useMemberService();

  function reset(): void {
    handleReset();

    avatarRef.current?.reset();
    roleRef.current?.reset();
    branchRef.current?.reset();
    emailRef.current?.reset();
    passwordRef.current?.reset();
    statusRef.current?.reset(statuses.find((status) => status.value === "0"));
  }

  async function submit(data: tMemberCreate): Promise<void> {
    const result = await memberService.create(data);

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

  async function fetch(
    type: "roles" | "branches",
    filter: tOptionFilter,
    pagination: tOptionPagination,
  ): Promise<tPaginatedService<tOption> | tErrorService> {
    const serviceResult:
      | tPaginatedService<tOptionModel>
      | tErrorService = await (type === "roles"
      ? memberService.searchRoles(filter, pagination)
      : memberService.searchBranches(filter, pagination));

    const result: tPaginatedService<tOption> | tErrorService =
      !serviceResult.isSuccess
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
        className="flex h-[calc(100vh-2rem)] min-w-[calc(100vw-2rem)] flex-col overflow-auto"
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
          className="flex grow flex-col space-y-6"
          onReset={reset}
          onSubmit={handleSubmit(submit)}
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
                  <FieldContent className="h-full">
                    <FieldFileUpload
                      ref={avatarRef}
                      id={`${id}-avatar`}
                      isInvalid={invalid}
                      onValueChange={setValue}
                    />
                  </FieldContent>
                  <FieldError errorsProp={error} />
                </Field>
              )}
            />
            <FieldGroup className="col-span-3 grid-cols-2">
              <Controller
                control={control}
                name="username"
                render={({
                  field: { onChange: setValue },
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
                        placeholder={tAddNew(
                          "content.form.username.placeholder",
                        )}
                        onChange={setValue}
                      />
                    </FieldContent>
                    <FieldError errorsProp={error} />
                  </Field>
                )}
              />
              <Controller
                control={control}
                name="roleUuid"
                render={({
                  field: { onChange: setValue },
                  fieldState: { invalid, error },
                }) => (
                  <Field>
                    <FieldLabel
                      aria-invalid={invalid}
                      htmlFor={`${id}-role-uuid`}
                      className="max-w-fit"
                    >
                      {tAddNew("content.form.role.label")}
                    </FieldLabel>
                    <FieldContent>
                      <FieldAsyncSelect<tOption>
                        ref={roleRef}
                        id={`${id}-role-uuid`}
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
                        fetch={(search, page) =>
                          fetch(
                            "roles",
                            {
                              search: search.trim() === "" ? undefined : search,
                            },
                            {
                              page,
                            },
                          )
                        }
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
                    <FieldError errorsProp={error} />
                  </Field>
                )}
              />
              <Controller
                control={control}
                name="branchUuid"
                render={({
                  field: { onChange: setValue },
                  fieldState: { invalid, error },
                }) => (
                  <Field className="col-span-2 mt-auto">
                    <FieldLabel
                      aria-invalid={invalid}
                      htmlFor={`${id}-branch-uuid`}
                      className="max-w-fit"
                    >
                      {tAddNew("content.form.branch.label")}
                    </FieldLabel>
                    <FieldContent>
                      <FieldAsyncSelect<tOption>
                        ref={branchRef}
                        id={`${id}-branch-uuid`}
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
                          fetch(
                            "branches",
                            {
                              search: search.trim() === "" ? undefined : search,
                            },
                            {
                              page,
                            },
                          )
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
                    <FieldError errorsProp={error} />
                  </Field>
                )}
              />
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
                        ref={emailRef}
                        id={`${id}-email`}
                        isRequired
                        isInvalid={invalid}
                        placeholder={tAddNew(
                          "content.form.credentials.email.placeholder",
                        )}
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
                        ref={passwordRef}
                        id={`${id}-password`}
                        isRequired
                        isInvalid={invalid}
                        placeholder={tAddNew(
                          "content.form.credentials.password.placeholder",
                        )}
                        onValueChange={setValue}
                      />
                    </FieldContent>
                    <FieldError errorsProp={error} />
                  </Field>
                )}
              />
            </FieldGroup>
          </FieldGroup>
          <Controller
            control={control}
            name="status"
            render={({
              field: { onChange: setValue },
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
                <FieldError errorsProp={error} />
              </Field>
            )}
          />
          <FieldGroup className="mt-auto grid-cols-2">
            <Button
              disabled={formState.isSubmitting}
              variant="outline"
              type="reset"
            >
              {tAddNew("content.form.actions.reset")}
            </Button>
            <Button disabled={formState.isSubmitting} type="submit">
              {formState.isSubmitting && <LuLoader className="animate-spin" />}
              {tAddNew("content.form.actions.submit")}
            </Button>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
