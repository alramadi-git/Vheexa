"use client";

import { useTranslations } from "next-intl";

import { useQuery } from "@/hooks/query";

import { useEffect, useId } from "react";

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
} from "@/components/shadcn/field";

import {
  FieldSearch,
  FieldMultiSelect,
} from "@/components/locals/blocks/fields";

import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/shadcn/select";
import { Button } from "@/components/shadcn/button";

type tPermission = {
  value: string;
  label: string;
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

  const permissions: tPermission[] = tFilter.raw("permissions.permissions");
  const statuses: tStatues[] = tFilter.raw("status.statuses");

  const [statusQuery] = [query.get("filter.status")];

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

  useEffect(() => {
    setValue("name", query.get("filter.name") ?? undefined);
    setValue(
      "permissions",
      query
        .getAll("filter.permissions")
        .map((permission) => Number(permission)),
    );
    setValue("status", statusQuery !== null ? Number(statusQuery) : undefined);
  }, []);

  function reset() {
    handleReset();
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
                field: { value, onChange: setValue, ...field },
                fieldState,
              }) => (
                <Field>
                  <FieldLabel
                    aria-invalid={fieldState.invalid}
                    htmlFor={`${id}-name`}
                    className="max-w-fit"
                  >
                    {tFilter("name.label")}
                  </FieldLabel>
                  <FieldContent>
                    <FieldSearch
                      {...field}
                      id={`${id}-name`}
                      placeholder={tFilter("name.placeholder")}
                      value={value ?? ""}
                      onChange={(event) =>
                        event.currentTarget.value === ""
                          ? setValue(undefined)
                          : setValue(event)
                      }
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
                    {tFilter("permissions.label")}
                  </FieldLabel>
                  <FieldContent>
                    <FieldMultiSelect
                      id={`${id}-permissions`}
                      placeholder={tFilter("permissions.placeholder")}
                      options={permissions}
                      values={field.value.map((val) => val.toString())}
                      setValues={(values) =>
                        setValue(values.map((value) => Number(value)))
                      }
                      render={(option, isSelected) => (
                        <div className="flex w-full justify-between gap-3">
                          <span>
                            {option.label}
                            <p className="text-muted-foreground line-clamp-1">
                              {option.description}
                            </p>
                          </span>
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
                    {tFilter("status.label")}
                  </FieldLabel>
                  <FieldContent>
                    <Select
                      {...field}
                      value={value?.toString() ?? ""}
                      onValueChange={(val) => {
                        if (value === undefined) {
                          setValue(Number(val));
                          return;
                        }

                        if (value.toString() === val) setValue(undefined);
                        else setValue(Number(val));
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
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
          </FieldGroup>

          <FieldGroup className="grid-cols-2">
            <Button variant="outline" type="reset">
              {tFilter("actions.reset")}
            </Button>
            <Button type="submit">{tFilter("actions.submit")}</Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
