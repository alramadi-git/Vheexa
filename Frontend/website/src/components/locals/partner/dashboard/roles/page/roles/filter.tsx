"use client";

import { useTranslations } from "next-intl";

import { useId, useRef, useEffect } from "react";
import { useQuery } from "@/hooks/query";

import { tRoleFilter, zRoleFilter } from "@/validations/partner/role";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LuCheck } from "react-icons/lu";

import { Card, CardContent } from "@/components/shadcn/card";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
  FieldSet,
} from "@/components/shadcn/field";

import { FieldSearch } from "@/components/locals/blocks/fields";

import {
  tGroup,
  tOption,
  tFieldMultiSelectRef,
  FieldMultiSelect,
  tFieldSelectRef,
  FieldSelect,
} from "@/components/locals/blocks/selects";

import { Button } from "@/components/shadcn/button";

type tPermissionGroup = tGroup<tPermissionOption> & {
  label: string;
};
type tPermissionOption = tOption & {
  description: string;
};

export default function Filter() {
  const id = useId();
  const query = useQuery();

  const tFilter = useTranslations(
    "app.partner.dashboard.roles.page.roles.filter",
  );

  const {
    control,
    setValue,
    reset: handleReset,
    handleSubmit,
  } = useForm<tRoleFilter>({
    defaultValues: {
      name: undefined,
      permissions: [],
      status: undefined,
    },
    resolver: zodResolver(zRoleFilter),
  });

  const permissionsRef = useRef<tFieldMultiSelectRef<tPermissionOption>>(null);
  const statusRef = useRef<tFieldSelectRef<tOption>>(null);

  const permissionGroups: tPermissionGroup[] = tFilter.raw(
    "permissions.permissions",
  );
  const statuses: tOption[] = tFilter.raw("status.statuses");

  useEffect(() => {
    const [nameQuery, permissionsQuery, statusQuery] = [
      query.get("filter.name"),
      query.getAll("filter.permissions"),
      query.get("filter.status"),
    ];

    const [name, permissions, status] = [
      nameQuery !== null ? nameQuery : undefined,
      permissionsQuery.map((permission) => Number(permission)),
      statusQuery !== null ? Number(statusQuery) : undefined,
    ];

    setValue("name", name);
    setValue("permissions", permissions);
    permissionsRef.current?.setValue(
      permissions.length > 0
        ? permissionGroups
            .flatMap((group) => group.options)
            .filter((option) => permissions.includes(Number(option.value)))
        : [],
    );
    setValue("status", status);
    statusRef.current?.setValue(
      statuses.find((_status) => _status.value === status?.toString()),
    );
  }, []);

  function reset() {
    handleReset();

    permissionsRef.current?.reset();
    statusRef.current?.reset();
  }

  function submit(data: tRoleFilter) {
    query.remove("filter.name");
    query.remove("filter.permissions");
    query.remove("filter.status");
    query.remove("pagination.page");

    query.set("filter.name", data.name);
    query.set(
      "filter.permissions",
      data.permissions.map((permission) => permission.toString()),
    );
    query.set("filter.status", data.status?.toString());

    query.apply();
  }

  return (
    <Card>
      <CardContent>
        <form
          className="space-y-6"
          onReset={reset}
          onSubmit={handleSubmit(submit)}
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
                    {tFilter("name.label")}
                  </FieldLabel>
                  <FieldContent>
                    <FieldSearch
                      aria-invalid={invalid}
                      id={`${id}-name`}
                      placeholder={tFilter("name.placeholder")}
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
                field: { onChange: setValue },
                fieldState: { invalid, error },
              }) => (
                <Field>
                  <FieldLabel
                    aria-invalid={invalid}
                    htmlFor={`${id}-permissions`}
                    className="max-w-fit"
                  >
                    {tFilter("permissions.label")}
                  </FieldLabel>
                  <FieldContent>
                    <FieldMultiSelect<tPermissionGroup, tPermissionOption>
                      ref={permissionsRef}
                      isInvalid={invalid}
                      id={`${id}-permissions`}
                      placeholder={tFilter("permissions.placeholder")}
                      groups={permissionGroups}
                      searchPlaceholder={tFilter(
                        "permissions.search-placeholder",
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
                field: { onChange: setValue },
                fieldState: { invalid, error },
              }) => (
                <Field>
                  <FieldLabel
                    aria-invalid={invalid}
                    htmlFor={`${id}-status`}
                    className="max-w-fit"
                  >
                    {tFilter("status.label")}
                  </FieldLabel>
                  <FieldContent>
                    <FieldSelect<tOption>
                      ref={statusRef}
                      id={`${id}-status`}
                      isInvalid={invalid}
                      placeholder={tFilter("status.placeholder")}
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

          <FieldSet>
            <FieldGroup className="grid-cols-2">
              <Button variant="outline" type="reset">
                {tFilter("actions.reset")}
              </Button>
              <Button type="submit">{tFilter("actions.submit")}</Button>
            </FieldGroup>
          </FieldSet>
        </form>
      </CardContent>
    </Card>
  );
}
