"use client";

import { useTranslations } from "next-intl";

import { useQuery } from "@/hooks/query";

import { useId, useRef, useEffect } from "react";

import { tMemberFilter, zMemberFilter } from "@/validations/partner/member";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  LuCheck,
  LuShield,
  LuShieldAlert,
  LuShieldX,
  LuX,
} from "react-icons/lu";

import { Card, CardContent } from "@/components/shadcn/card";

import {
  FieldGroup,
  FieldSet,
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/components/shadcn/field";

import { FieldSearch } from "@/components/locals/blocks/fields";

import { Button } from "@/components/shadcn/button";
import {
  FieldAsyncSelect,
  FieldMultiAsyncSelect,
  FieldSelect,
  tFieldMultiAsyncSelectRef,
  tFieldSelectRef,
  tOption,
} from "@/components/locals/blocks/selects";
import { GiIsland } from "react-icons/gi";
import { tResponseManyService } from "@/services/service";
import { tOptionModel } from "@/models/partner/option";
import { ClsOptionsService } from "@/services/partner/options";

type tStatues = {
  value: string;
  label: string;
};

export default function Filter() {
  const id = useId();
  const query = useQuery();

  const tFilter = useTranslations(
    "app.partner.dashboard.members.page.members.filter",
  );

  const {
    control,
    setValue,
    reset: handleReset,
    handleSubmit,
  } = useForm<tMemberFilter>({
    defaultValues: {
      search: undefined,
      roles: [],
      branches: [],
      status: undefined,
    },
    resolver: zodResolver(zMemberFilter),
  });

  const rolesRef = useRef<tFieldMultiAsyncSelectRef<tOption>>(null);
  const branchesRef = useRef<tFieldMultiAsyncSelectRef<tOption>>(null);
  const statusRef = useRef<tFieldSelectRef<tOption>>(null);

  const statuses: tStatues[] = tFilter.raw("status.statuses");

  useEffect(() => {
    const [searchQuery, rolesQuery, branchesQuery, statusQuery] = [
      query.get("filter.search"),
      query.getAll("filter.roles"),
      query.getAll("filter.branches"),
      query.get("filter.status"),
    ];

    const [search, roles, branches, status] = [
      searchQuery !== null ? searchQuery : undefined,
      rolesQuery,
      branchesQuery,
      statusQuery !== null ? Number(statusQuery) : undefined,
    ];

    setValue("search", search);
    setValue("roles", roles);
    setValue("branches", branches);
    setValue("status", status);

    // rolesRef
    // branchesRef
    statusRef.current?.change(
      statuses.find((_status) => _status.value === status?.toString()),
    );
  }, []);

  function reset() {
    handleReset();

    rolesRef.current?.reset();
    branchesRef.current?.reset();
    statusRef.current?.reset();
  }

  function submit(data: tMemberFilter) {
    query.remove("filter.search");
    query.remove("filter.roles");
    query.remove("filter.branches");
    query.remove("filter.status");
    query.remove("pagination.page");

    query.set("filter.search", data.search);
    query.set("filter.roles", data.roles);
    query.set("filter.branches", data.branches);
    query.set("filter.status", data.status?.toString());

    query.apply();
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
    <Card>
      <CardContent>
        <form
          className="space-y-6"
          onReset={reset}
          onSubmit={handleSubmit(submit)}
        >
          {/* 
            <FieldGroup className="grid-cols-3">
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
        */}

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
                <FieldError errors={error} />
              </Field>
            )}
          />

          <Controller
            control={control}
            name="roles"
            render={({
              field: { onChange: setValues },
              fieldState: { invalid, error },
            }) => (
              <Field>
                <FieldLabel
                  aria-invalid={invalid}
                  htmlFor={`${id}-role`}
                  className="max-w-fit"
                >
                  {tFilter("roles.label")}
                </FieldLabel>
                <FieldContent>
                  <FieldMultiAsyncSelect<tOption>
                    ref={rolesRef}
                    id={`${id}-role`}
                    isInvalid={invalid}
                    placeholder={tFilter("roles.placeholder")}
                    valueRender={(value) => (
                      <span className="inline-flex items-center gap-1.5">
                        <LuShield />
                        <span className="line-clamp-1 text-wrap">
                          {value.label}
                        </span>
                      </span>
                    )}
                    searchPlaceholder={tFilter("roles.roles.placeholder")}
                    cacheKey="roles"
                    fetch={(search, page) => fetch("roles", search, page)}
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
                    whenEmptyRender={() => (
                      <div className="flex items-center gap-3">
                        <LuShieldAlert size={24} />
                        <div>
                          <p className="text-sm">
                            {tFilter(
                              "roles.roles.when-empty.label",
                            )}
                          </p>
                          <p className="text-muted-foreground line-clamp-1 text-xs">
                            {tFilter(
                              "roles.roles.when-empty.description",
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
                            {tFilter(
                              "roles.roles.when-error.label",
                            )}
                          </p>
                          <p className="text-muted-foreground line-clamp-1 text-xs">
                            {tFilter(
                              "roles.roles.when-error.description",
                            )}
                          </p>
                        </div>
                      </div>
                    )}
                    onToggle={(options) => setValues(options)}
                  />
                </FieldContent>
                <FieldError errors={[error]} />
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
