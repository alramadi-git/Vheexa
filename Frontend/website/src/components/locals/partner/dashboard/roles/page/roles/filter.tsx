"use client";

import { useTranslations } from "next-intl";

import { useQuery } from "@/hooks/query";

import { useEffect, useId, useMemo, useRef } from "react";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { tRoleFilter, zRoleFilter } from "@/validations/partner/role";

import { LuCheck, LuX } from "react-icons/lu";

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
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/shadcn/select";
import { Button } from "@/components/shadcn/button";
import { CommandGroup, CommandItem } from "@/components/shadcn/command";
import {
  tGroup,
  tOption,
  tFieldMultiSelectRef,
  FieldMultiSelect,
} from "@/components/locals/blocks/selects";

type tPermissionGroup = tGroup<tPermissionOption> & {
  label: string;
};
type tPermissionOption = tOption & {
  description: string;
};

type tStatues = {
  value: string;
  label: string;
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
    resolver: zodResolver(zRoleFilter),
  });

  const permissionsRef = useRef<tFieldMultiSelectRef<tPermissionOption>>(null);

  const permissionGroups: tPermissionGroup[] = useMemo(
    () => tFilter.raw("permissions.permissions") satisfies tPermissionGroup[],
    [tFilter],
  );
  const statuses: tStatues[] = tFilter.raw("status.statuses");

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
    permissionsRef.current?.change(
      permissions.length > 0
        ? permissionGroups
            .flatMap((group) => group.options)
            .filter((option) => permissions.includes(Number(option.value)))
        : [],
    );

    setValue("status", status);
  }, []);

  function reset() {
    handleReset();
    permissionsRef.current?.reset();
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
                      value={value ?? ""}
                      onChange={(value) =>
                        value === "" ? setValue(undefined) : setValue(value)
                      }
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
                    {tFilter("permissions.label")}
                  </FieldLabel>
                  <FieldContent>
                    {/* <FieldMultiSelect<tPermissionGroup, tPermissionOption>
                      ref={permissionsRef}
                      isInvalid={invalid}
                      id={`${id}-permissions`}
                      maxShownItems={5}
                      placeholder={tFilter("permissions.select-placeholder")}
                      searchPlaceholder={tFilter(
                        "permissions.search-placeholder",
                      )}
                      defaultValues={permissionGroups
                        .flatMap((group) => group.options)
                        .filter(
                          (option) =>
                            value?.includes(Number(option.value)) ?? false,
                        )}
                      groups={permissionGroups}
                      groupRender={(group, selectedItems, toggleSelection) => {
                        return (
                          <CommandGroup key={group.value} heading={group.label}>
                            {group.options.map((option) => {
                              const isSelected = selectedItems.some(
                                (selectedItem) =>
                                  selectedItem.value === option.value,
                              );

                              return (
                                <CommandItem
                                  asChild
                                  key={option.value}
                                  value={option.label}
                                  onSelect={() =>
                                    toggleSelection(option, isSelected)
                                  }
                                >
                                  <button
                                    type="button"
                                    className="w-full justify-between"
                                  >
                                    <span className="text-start">
                                      {option.label}
                                      <p className="text-muted-foreground">
                                        {option.description}
                                      </p>
                                    </span>
                                    {isSelected && <LuCheck size={16} />}
                                  </button>
                                </CommandItem>
                              );
                            })}
                          </CommandGroup>
                        );
                      }}
                      onToggle={(options) => {
                        setValue(options.map((option) => Number(option.value)));
                      }}
                    /> */}
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
              }) => {
                return (
                  <Field>
                    <FieldLabel
                      aria-invalid={invalid}
                      htmlFor={`${id}-status`}
                      className="max-w-fit"
                    >
                      {tFilter("status.label")}
                    </FieldLabel>
                    <FieldContent>
                      <Select
                        value={value?.toString()}
                        onValueChange={(value) => {
                          console.log(value);
                          setValue(Number(value));
                        }}
                      >
                        <div className="flex items-center gap-1.5">
                          <SelectTrigger id={`${id}-status`} className="w-full">
                            <SelectValue
                              placeholder={tFilter("status.placeholder")}
                            />
                          </SelectTrigger>
                          {value !== undefined && (
                            <Button
                              variant="outline"
                              size="icon"
                              type="button"
                              onClick={() => setValue(undefined)}
                            >
                              <LuX size={16} />
                            </Button>
                          )}
                        </div>
                        <SelectContent>
                          {statuses.map((status) => (
                            <SelectItem key={status.value} value={status.value}>
                              {status.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FieldContent>
                    <FieldError errors={error} />
                  </Field>
                );
              }}
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
