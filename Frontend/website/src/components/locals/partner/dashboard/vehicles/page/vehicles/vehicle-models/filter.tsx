"use client";

import { useLocale, useTranslations } from "next-intl";

import { useQuery } from "@/hooks/query";

import { useEffect, useId, useRef } from "react";

import {
  FieldError as FieldErrorType,
  useForm,
  Controller,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  tVehicleModelFilter,
  zVehicleModelFilter,
} from "@/validations/partner/vehicle-model";

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

import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/shadcn/select";
import { Button } from "@/components/shadcn/button";
import {
  FieldNumberMinMax,
  FieldSearch,
  tFieldNumberMinMaxRef,
} from "@/components/locals/blocks/fields";
import { ClsMonyFormatter, eCurrency } from "@/libraries/mony-formatter";
import { eLocale } from "@/i18n/routing";
import { tNullable } from "@/types/nullish";

type tStatues = {
  value: string;
  label: string;
};

export default function Filter() {
  const id = useId();
  const query = useQuery();

  const capacityRef = useRef<tFieldNumberMinMaxRef>(null);

  const priceRef = useRef<tFieldNumberMinMaxRef>(null);
  const discountRef = useRef<tFieldNumberMinMaxRef>(null);

  const locale = useLocale() as eLocale;
  const clsMonyFormatter = new ClsMonyFormatter(locale, eCurrency[locale]);

  const {
    formState,
    control,
    setValue,
    trigger,
    reset: handleReset,
    handleSubmit,
  } = useForm<tVehicleModelFilter>({
    defaultValues: {
      search: undefined,
      categories: [],
      capacity: {
        min: undefined,
        max: undefined,
      },
      transmissions: [],
      fuels: [],
      price: {
        min: undefined,
        max: undefined,
      },
      discount: {
        min: undefined,
        max: undefined,
      },
      status: undefined,
    },
    resolver: zodResolver(zVehicleModelFilter),
  });

  const [
    priceMin,
    priceMax,
    discountMin,
    discountMax,
    statusQuery,
  ]: tNullable<string>[] = [
    query.get("filter.price.min"),
    query.get("filter.price.max"),
    query.get("filter.discount.min"),
    query.get("filter.discount.max"),
    query.get("filter.status"),
  ];
  useEffect(() => {
    setValue("search", query.get("filter.search") ?? undefined);

    setValue(
      "categories",
      query.getAll("filter.categories").map((category) => Number(category)),
    );

    setValue("price.min", priceMin !== null ? Number(priceMin) : undefined);
    setValue("price.max", priceMax !== null ? Number(priceMax) : undefined);

    setValue(
      "discount.min",
      discountMin !== null ? Number(discountMin) : undefined,
    );
    setValue(
      "discount.max",
      discountMax !== null ? Number(discountMax) : undefined,
    );

    setValue("status", statusQuery !== null ? Number(statusQuery) : undefined);
  }, []);

  const tFilter = useTranslations(
    "app.partner.dashboard.vehicles.page.vehicles.vehicle-models.content.filter",
  );

  const statuses: tStatues[] = tFilter.raw("status.statuses");

  function reset() {
    handleReset();

    priceRef.current?.reset(formState.defaultValues?.price);
    discountRef.current?.reset(formState.defaultValues?.discount);
  }

  function submit(data: tVehicleModelFilter) {
    query.remove("filter.search");
    query.remove("filter.price.min");
    query.remove("filter.price.max");
    query.remove("filter.discount.min");
    query.remove("filter.discount.max");
    query.remove("filter.status");

    query.remove("pagination.page");

    query.set("filter.search", data.search);
    query.set("filter.price.min", data.price.min?.toString());
    query.set("filter.price.max", data.price.max?.toString());
    query.set("filter.discount.min", data.discount.min?.toString());
    query.set("filter.discount.max", data.discount.max?.toString());
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
                  fieldState: { invalid, error },
                }) => (
                  <Field>
                    <FieldLabel
                      aria-invalid={invalid}
                      htmlFor={`${id}-search`}
                      className="max-w-fit"
                    >
                      {tFilter("information.search.label")}
                    </FieldLabel>
                    <FieldContent>
                      <FieldSearch
                        {...field}
                        aria-invalid={invalid}
                        id={`${id}-search`}
                        placeholder={tFilter("information.search.placeholder")}
                        value={value ?? ""}
                        onChange={(event) => {
                          const value = event.currentTarget.value;
                          setValue(value === "" ? undefined : value);
                        }}
                      />
                    </FieldContent>
                    <FieldError errors={error} />
                  </Field>
                )}
              />
            </FieldGroup>
          </FieldSet>

          <FieldSet>
            <FieldGroup className="grid-cols-3">
              <Controller
                control={control}
                name="capacity"
                render={({
                  field: { value: capacity, onChange: setValue },
                  fieldState: { invalid, error },
                }) => (
                  <Field>
                    <FieldLabel
                      aria-invalid={invalid}
                      htmlFor={`${id}-capacity`}
                      className="max-w-fit"
                    >
                      {tFilter("specifications.capacity.label")}
                    </FieldLabel>
                    <FieldContent>
                      <FieldNumberMinMax
                        ref={capacityRef}
                        aria-invalid={invalid}
                        id={`${id}-capacity`}
                        min-placeholder={tFilter(
                          "specifications.capacity.min.placeholder",
                        )}
                        min={capacity.min}
                        onMinChange={(value) =>
                          setValue({ ...capacity, min: value })
                        }
                        max-placeholder={tFilter(
                          "specifications.capacity.max.placeholder",
                        )}
                        max={capacity.max}
                        onMaxChange={(value) =>
                          setValue({ ...capacity, max: value })
                        }
                      />
                    </FieldContent>
                    <FieldError errors={error} />
                  </Field>
                )}
              />
              {/* <Controller
                  control={control}
                  name="transmissions"
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel
                        htmlFor={`${id}-transmission`}
                        className="w-fit"
                      >
                        {tAddNew("content.form.specs.transmission.label")}
                      </FieldLabel>
                      <FieldContent>
                        <SearchableSelect
                          triggerRender={() => (
                            <Button
                              id={`${id}-transmission`}
                              role="combobox"
                              variant="outline"
                              className="bg-background hover:bg-background border-input w-full justify-start rounded px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
                            >
                              {field.value === "" ? (
                                <span className="text-muted-foreground truncate">
                                  {tAddNew(
                                    "content.form.specs.fuel.placeholder",
                                  )}
                                </span>
                              ) : (
                                field.value
                              )}
                              <LuChevronDown
                                size={16}
                                className="text-muted-foreground/80 ms-auto shrink-0"
                              />
                            </Button>
                          )}
                          value={field.value}
                          inputProps={{
                            placeholder: tAddNew(
                              "content.form.specs.transmission.placeholder",
                            ),
                          }}
                          onSelect={field.onChange}
                          list={transmissions}
                          itemRender={(item) => (
                            <button className="w-full">{item.value}</button>
                          )}
                          whenNoResultRender={() =>
                            transmissions.length === 0
                              ? tAddNew(
                                  "content.form.specs.transmission.when-invalid-category",
                                )
                              : tAddNew(
                                  "content.form.specs.transmission.when-no-result",
                                )
                          }
                        />
                      </FieldContent>
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                /> */}
              {/* <Controller
                  control={control}
                  name="fuels"
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel
                        aria-invalid={fieldState.invalid}
                        htmlFor="fuel"
                        className="max-w-fit"
                      >
                        {tAddNew("content.form.specs.fuel.label")}
                      </FieldLabel>
                      <FieldContent>
                        <SearchableSelect
                          triggerRender={() => (
                            <Button
                              id="fuel"
                              role="combobox"
                              variant="outline"
                              className="bg-background hover:bg-background border-input w-full justify-start rounded px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
                            >
                              {field.value === "" ? (
                                <span className="text-muted-foreground truncate">
                                  {tAddNew(
                                    "content.form.specs.fuel.placeholder",
                                  )}
                                </span>
                              ) : (
                                field.value
                              )}
                              <LuChevronDown
                                size={16}
                                className="text-muted-foreground/80 ms-auto shrink-0"
                              />
                            </Button>
                          )}
                          value={field.value}
                          inputProps={{
                            placeholder: tAddNew(
                              "content.form.specs.fuel.placeholder",
                            ),
                          }}
                          onSelect={field.onChange}
                          list={fuels}
                          itemRender={(item) => (
                            <button className="w-full">{item.value}</button>
                          )}
                          whenNoResultRender={() =>
                            fuels.length === 0
                              ? tAddNew(
                                  "content.form.specs.fuel.when-invalid-category",
                                )
                              : tAddNew(
                                  "content.form.specs.fuel.when-no-result",
                                )
                          }
                        />
                      </FieldContent>
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                /> */}
            </FieldGroup>
          </FieldSet>

          <FieldSet>
            <FieldGroup className="grid-cols-2">
              <Controller
                control={control}
                name="price"
                render={({
                  field: { value: price, onChange: setValue },
                  fieldState: { invalid, error },
                  formState: { isSubmitted },
                }) => (
                  <Field>
                    <FieldLabel
                      aria-invalid={invalid}
                      htmlFor={`${id}-price`}
                      className="max-w-fit"
                    >
                      {tFilter("pricing.price.label")}
                    </FieldLabel>
                    <FieldContent>
                      <FieldNumberMinMax
                        ref={priceRef}
                        id={`${id}-price`}
                        aria-invalid={invalid}
                        min-placeholder={tFilter(
                          "pricing.price.min.placeholder",
                        )}
                        min={price.min}
                        onMinChange={(value) => {
                          setValue({ ...price, min: value });
                          if (isSubmitted) trigger("discount");
                        }}
                        max-placeholder={tFilter(
                          "pricing.price.max.placeholder",
                        )}
                        max={price.max}
                        onMaxChange={(value) => {
                          setValue({ ...price, max: value });
                          if (isSubmitted) trigger("discount");
                        }}
                        formatter={(value) =>
                          value === undefined
                            ? ""
                            : clsMonyFormatter.format(value)
                        }
                      />
                    </FieldContent>
                    <FieldError errors={error} />
                  </Field>
                )}
              />
              <Controller
                control={control}
                name="discount"
                render={({
                  field: { value: discount, onChange: setValue },
                  fieldState: { invalid, error },
                }) => (
                  <Field>
                    <FieldLabel
                      aria-invalid={invalid}
                      htmlFor={`${id}-discount`}
                      className="max-w-fit"
                    >
                      {tFilter("pricing.discount.label")}
                    </FieldLabel>
                    <FieldContent>
                      <FieldNumberMinMax
                        ref={discountRef}
                        id={`${id}-discount`}
                        aria-invalid={invalid}
                        min-placeholder={tFilter(
                          "pricing.discount.min.placeholder",
                        )}
                        min={discount.min}
                        onMinChange={(value) =>
                          setValue({ ...discount, min: value })
                        }
                        max-placeholder={tFilter(
                          "pricing.discount.max.placeholder",
                        )}
                        max={discount.max}
                        onMaxChange={(value) =>
                          setValue({ ...discount, max: value })
                        }
                        formatter={(value) =>
                          value === undefined
                            ? ""
                            : clsMonyFormatter.format(value)
                        }
                      />
                    </FieldContent>
                    <FieldError errors={error} />
                  </Field>
                )}
              />
            </FieldGroup>
          </FieldSet>

          <Controller
            control={control}
            name="status"
            render={({
              field: { value, onChange: setValue, ...field },
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
