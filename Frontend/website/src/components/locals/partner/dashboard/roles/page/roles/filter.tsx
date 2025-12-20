"use client";

import { useTranslations } from "next-intl";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { tRoleFilter, zRoleFilter } from "@/validations/partner/role";

import { Card, CardContent } from "@/components/shadcn/card";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/shadcn/field";
import {
  FieldMultiSelect,
  FieldSearch,
} from "@/components/locals/blocks/fields";

type tPermission = {
  value: string;
  label: string;
  description: string;
};

export default function Filter() {
  const tFilter = useTranslations(
    "app.partner.dashboard.roles.page.roles.filter",
  );

  const permissions: tPermission[] = tFilter.raw("permissions.permissions");

  const { control, handleSubmit } = useForm<tRoleFilter>({
    resolver: zodResolver(zRoleFilter),
  });

  function onSubmit(data: tRoleFilter) {}

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup className="grid-cols-3">
            <Controller
              control={control}
              name="name"
              render={({
                field: { value, onChange: setValue, ...field },
                fieldState,
              }) => (
                <Field>
                  <FieldLabel htmlFor="name">
                    {tFilter("name.label")}
                  </FieldLabel>
                  <FieldContent>
                    <FieldSearch
                      {...field}
                      id="name"
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
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="permissions">
                    {tFilter("permissions.label")}
                  </FieldLabel>
                  <FieldContent>
                    <FieldMultiSelect
                      placeholder={tFilter("permissions.placeholder")}
                      options={permissions}
                      values={field.value}
                      setValues={field.onChange}
                    
                    />
                  </FieldContent>
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
            <Controller
              control={control}
              name="status"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="status">
                    {tFilter("status.label")}
                  </FieldLabel>
                  <FieldContent></FieldContent>
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
