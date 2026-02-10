"use client";

import { useTranslations } from "next-intl";

import { useId, useRef, useEffect } from "react";
import { useQuery } from "@/hooks/query";

import { tBranchFilter, zBranchFilter } from "@/partner/validators/branch";

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
  tOption,
  tFieldSelectRef,
  FieldSelect,
} from "@/components/locals/blocks/selects";

import { Button } from "@/components/shadcn/button";

export default function Filter() {
  const id = useId();
  const query = useQuery();

  const tFilter = useTranslations(
    "app.partner.dashboard.branches.page.branches.filter",
  );

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

  const statusRef = useRef<tFieldSelectRef<tOption>>(null);

  const statuses: tOption[] = tFilter.raw("status.statuses");

  useEffect(() => {
    const [searchQuery, statusQuery] = [
      query.get("filter.search"),
      query.get("filter.status"),
    ];

    const [search, status] = [
      searchQuery !== null ? searchQuery : undefined,
      statusQuery !== null ? Number(statusQuery) : undefined,
    ];

    setValue("search", search);
    setValue("status", status);
    statusRef.current?.setValue(
      statuses.find((_status) => _status.value === status?.toString()),
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function reset() {
    handleReset();

    statusRef.current?.reset();
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
          <FieldGroup className="grid-cols-2">
            <Controller
              control={control}
              name="search"
              render={({
                field: { value, onChange: setValue },
                fieldState: { invalid, error },
              }) => (
                <Field>
                  <FieldLabel
                    aria-invalid={invalid}
                    htmlFor={`${id}-search`}
                    className="max-w-fit"
                  >
                    {tFilter("search.label")}
                  </FieldLabel>
                  <FieldContent>
                    <FieldSearch
                      id={`${id}-search`}
                      aria-invalid={invalid}
                      placeholder={tFilter("search.placeholder")}
                      value={value ?? ""}
                      onChange={(value) =>
                        setValue(value === "" ? undefined : value)
                      }
                    />
                  </FieldContent>
                  <FieldError errorsProp={error} />
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
                  <FieldError errorsProp={error} />
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
