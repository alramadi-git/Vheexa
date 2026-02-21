"use client";

import { useTranslations } from "next-intl";

import { useQuery } from "@/hooks/query";

import { useId, useRef, useEffect } from "react";

import { tMemberFilter, zMemberFilter } from "@/partner/validators/member";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { tOptionModel } from "@/partner/models/option";

import useMemberService from "@/partner/services/member";

import { toast } from "sonner";
import { Toast } from "@/components/blocks/toasts";

import {
  LuCheck,
  LuShield,
  LuShieldAlert,
  LuShieldX,
  LuBuilding2,
} from "react-icons/lu";
import { GiIsland, GiAncientRuins } from "react-icons/gi";

import { Card, CardContent } from "@/components/shadcn/card";

import {
  FieldGroup,
  FieldSet,
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/components/shadcn/field";

import { FieldSearch } from "@/components/blocks/fields";

import {
  tOption,
  tFieldSelectRef,
  tFieldMultiAsyncSelectRef,
  FieldSelect,
  FieldMultiAsyncSelect,
} from "@/components/blocks/selects";

import { Button } from "@/components/shadcn/button";
import { tOptionFilter, tOptionPagination } from "@/partner/validators/option";
import { tPaginatedService } from "@/services/success";
import { tErrorService } from "@/services/error";

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
      roleUuids: [],
      branchUuids: [],
      status: undefined,
    },
    resolver: zodResolver(zMemberFilter),
  });

  const rolesRef = useRef<tFieldMultiAsyncSelectRef<tOption>>(null);
  const branchesRef = useRef<tFieldMultiAsyncSelectRef<tOption>>(null);
  const statusRef = useRef<tFieldSelectRef<tOption>>(null);

  const statuses: tOption[] = tFilter.raw("status.statuses");

  const memberService = useMemberService();

  useEffect(() => {
    const [searchQuery, roleUuidsQuery, branchUuidsQuery, statusQuery] = [
      query.get("filter.search"),
      query.getAll("filter.roleUuids"),
      query.getAll("filter.branchUuids"),
      query.get("filter.status"),
    ];

    const [search, roleUuids, branchUuids, status] = [
      searchQuery !== null ? searchQuery : undefined,
      roleUuidsQuery,
      branchUuidsQuery,
      statusQuery !== null ? Number(statusQuery) : undefined,
    ];

    setValue("search", search);

    setValue("roleUuids", roleUuids);
    setValue("branchUuids", branchUuids);

    Promise.all([
      roleUuids.length > 0 ? memberService.readRoles(roleUuids) : null,
      branchUuids.length > 0 ? memberService.readBranches(branchUuids) : null,
    ]).then(([rolesResult, branchesResult]) => {
      if (rolesResult !== null) {
        if (!rolesResult.isSuccess) {
          toast.custom(() => (
            <Toast
              variant="destructive"
              label={tFilter("roles.roles.when-error.description")}
            />
          ));

          setValue("roleUuids", []);
        } else {
          setValue(
            "roleUuids",
            rolesResult.data.map((role) => role.uuid),
          );
          rolesRef.current?.change(
            rolesResult.data.map((option: tOptionModel) => ({
              value: option.uuid,
              label: option.name,
            })),
          );
        }
      }

      if (branchesResult !== null) {
        if (!branchesResult.isSuccess) {
          toast.custom(() => (
            <Toast
              variant="destructive"
              label={tFilter("branches.branches.when-error.description")}
            />
          ));

          setValue("branchUuids", []);
        } else {
          setValue(
            "branchUuids",
            branchesResult.data.map((branch: tOptionModel) => branch.uuid),
          );
          branchesRef.current?.change(
            branchesResult.data.map((option: tOptionModel) => ({
              value: option.uuid,
              label: option.name,
            })),
          );
        }
      }
    });

    setValue("status", status);
    statusRef.current?.setValue(
      statuses.find((_status) => _status.value === status?.toString()),
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function reset() {
    handleReset();

    rolesRef.current?.reset();
    branchesRef.current?.reset();
    statusRef.current?.reset();
  }

  function submit(data: tMemberFilter) {
    query.remove("filter.search");
    query.remove("filter.role-uuids");
    query.remove("filter.branch-uuids");
    query.remove("filter.status");
    query.remove("pagination.page");

    query.set("filter.search", data.search);
    query.set("filter.role-uuids", data.roleUuids);
    query.set("filter.branch-uuids", data.branchUuids);
    query.set("filter.status", data.status?.toString());

    query.apply();
  }

  async function fetch(
    type: "roles" | "branches",
    filter: tOptionFilter,
    pagination: tOptionPagination,
  ): Promise<tPaginatedService<tOption> | tErrorService> {
    const serviceResult: tPaginatedService<tOptionModel> | tErrorService =
      await (type === "roles"
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
    <Card>
      <CardContent>
        <form
          className="space-y-6"
          onReset={reset}
          onSubmit={handleSubmit(submit)}
        >
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
          <FieldGroup className="grid-cols-2">
            <Controller
              control={control}
              name="roleUuids"
              render={({
                field: { onChange: setValues },
                fieldState: { invalid, error },
              }) => (
                <Field>
                  <FieldLabel
                    aria-invalid={invalid}
                    htmlFor={`${id}-role-uuids`}
                    className="max-w-fit"
                  >
                    {tFilter("roles.label")}
                  </FieldLabel>
                  <FieldContent>
                    <FieldMultiAsyncSelect<tOption>
                      ref={rolesRef}
                      id={`${id}-role-uuids`}
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
                              {tFilter("roles.roles.when-empty.label")}
                            </p>
                            <p className="text-muted-foreground line-clamp-1 text-xs">
                              {tFilter("roles.roles.when-empty.description")}
                            </p>
                          </div>
                        </div>
                      )}
                      whenErrorRender={() => (
                        <div className="flex items-center gap-3">
                          <LuShieldX size={24} />
                          <div>
                            <p className="text-sm">
                              {tFilter("roles.roles.when-error.label")}
                            </p>
                            <p className="text-muted-foreground line-clamp-1 text-xs">
                              {tFilter("roles.roles.when-error.description")}
                            </p>
                          </div>
                        </div>
                      )}
                      onToggle={(options) =>
                        setValues(options?.map((option) => option.value))
                      }
                    />
                  </FieldContent>
                  <FieldError errorsProp={error} />
                </Field>
              )}
            />
            <Controller
              control={control}
              name="branchUuids"
              render={({
                field: { onChange: setValues },
                fieldState: { invalid, error },
              }) => (
                <Field>
                  <FieldLabel
                    aria-invalid={invalid}
                    htmlFor={`${id}-branch-uuids`}
                    className="max-w-fit"
                  >
                    {tFilter("branches.label")}
                  </FieldLabel>
                  <FieldContent>
                    <FieldMultiAsyncSelect<tOption>
                      ref={branchesRef}
                      id={`${id}-branch-uuids`}
                      isInvalid={invalid}
                      placeholder={tFilter("branches.placeholder")}
                      valueRender={(value) => (
                        <span className="inline-flex items-center gap-1.5">
                          <LuBuilding2 />
                          <span className="line-clamp-1 text-wrap">
                            {value.label}
                          </span>
                        </span>
                      )}
                      searchPlaceholder={tFilter(
                        "branches.branches.placeholder",
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
                              {tFilter("branches.branches.when-empty.label")}
                            </p>
                            <p className="text-muted-foreground line-clamp-1 text-xs">
                              {tFilter(
                                "branches.branches.when-empty.description",
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
                              {tFilter("branches.branches.when-error.label")}
                            </p>
                            <p className="text-muted-foreground line-clamp-1 text-xs">
                              {tFilter(
                                "branches.branches.when-error.description",
                              )}
                            </p>
                          </div>
                        </div>
                      )}
                      onToggle={(options) =>
                        setValues(options?.map((option) => option.value))
                      }
                    />
                  </FieldContent>
                  <FieldError errorsProp={error} />
                </Field>
              )}
            />
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
