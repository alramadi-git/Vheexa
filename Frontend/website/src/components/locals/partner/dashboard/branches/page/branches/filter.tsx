"use client";

import { useTranslations } from "next-intl";

import { useQuery } from "@/hooks/query";

import { useEffect, useId } from "react";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { tBranchFilter, zBranchFilter } from "@/validations/partner/branch";

import { LuX } from "react-icons/lu";

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

type tStatues = {
  value: string;
  label: string;
};

export default function Filter() {
  const id = useId();
  const query = useQuery();

  const {
    control,
    setValue,
    reset: handleReset,
    handleSubmit,
  } = useForm<tBranchFilter>({
    defaultValues: {
      search: undefined,
      status: undefined,
    },
    resolver: zodResolver(zBranchFilter),
  });

  const [statusQuery] = [query.get("filter.status")];

  useEffect(() => {
    setValue("search", query.get("filter.search") ?? undefined);
    setValue("", query.get("filter.search") ?? undefined);
    
    setValue("status", statusQuery !== null ? Number(statusQuery) : undefined);
  }, []);

  const tFilter = useTranslations(
    "app.partner.dashboard.branches.page.branches.filter",
  );

  const statuses: tStatues[] = tFilter.raw("status.statuses");

  function reset() {
    handleReset();
  }

  function submit(data: tBranchFilter) {
    query.remove("filter.search");
    query.remove("filter.status");

    query.remove("pagination.page");

    query.set("filter.search", data.search);
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
          <FieldSet>
            <FieldGroup className="grid-cols-2">
              <Controller
                control={control}
                name="search"
                render={({
                  field: { value, onChange: setValue, ...field },
                  fieldState,
                }) => (
                  <Field>
                    <FieldLabel
                      aria-invalid={fieldState.invalid}
                      htmlFor={`${id}-search`}
                      className="max-w-fit"
                    >
                      {tFilter("search.label")}
                    </FieldLabel>
                    <FieldContent>
                      <FieldSearch
                        {...field}
                        id={`${id}-search`}
                        placeholder={tFilter("search.placeholder")}
                        value={value ?? ""}
                        onChange={(event) => {
                          const value = event.currentTarget.value;
                          setValue(value === "" ? undefined : value);
                        }}
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
          </FieldSet>
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
