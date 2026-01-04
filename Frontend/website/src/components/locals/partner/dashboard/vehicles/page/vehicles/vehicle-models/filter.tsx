"use client";

import { useLocale, useTranslations } from "next-intl";

import { useQuery } from "@/hooks/query";

import { useEffect, useId, useMemo, useRef } from "react";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  tVehicleModelFilter,
  zVehicleModelFilter,
} from "@/validations/partner/vehicle-model";

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

import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/shadcn/select";
import { Button } from "@/components/shadcn/button";
import {
  FieldMultiSelect,
  FieldNumberMinMax,
  FieldSearch,
  FieldTags,
  tFieldMultiSelectRef,
  tFieldNumberMinMaxRef,
  tFieldTagsRef,
} from "@/components/locals/blocks/fields";
import { ClsMonyFormatter, eCurrency } from "@/libraries/mony-formatter";
import { eLocale } from "@/i18n/routing";
import { tNullable } from "@/types/nullish";
import { CommandGroup, CommandItem } from "@/components/shadcn/command";

type tGroup<gtOption extends tOption> = {
  value: string;
  options: gtOption[];
};
type tOption = {
  value: string;
  label: string;
};

type tStatues = {
  value: string;
  label: string;
};

export default function Filter() {
  const tFilter = useTranslations(
    "app.partner.dashboard.vehicles.page.vehicles.vehicle-models.content.filter",
  );

  const id = useId();
  const query = useQuery();

  const locale = useLocale() as eLocale;
  const clsMonyFormatter = new ClsMonyFormatter(locale, eCurrency[locale]);

  const categoriesRef = useRef<tFieldMultiSelectRef<tOption>>(null);

  const capacityRef = useRef<tFieldNumberMinMaxRef>(null);
  const transmissionsRef = useRef<tFieldTagsRef>(null);
  const fuelsRef = useRef<tFieldTagsRef>(null);

  const priceRef = useRef<tFieldNumberMinMaxRef>(null);
  const discountRef = useRef<tFieldNumberMinMaxRef>(null);

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

  const categoryGroups: tGroup<tOption> = useMemo(() => {
    return {
      value: "0",
      options: tFilter.raw("information.categories.categories"),
    };
  }, [tFilter]);
  const statuses: tStatues[] = tFilter.raw("status.statuses");

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

    const categories = query
      .getAll("filter.categories")
      .map((category) => Number(category));
    const categoryOptions = categoryGroups.options.filter((category) => {
      return categories.includes(Number(category.value));
    });

    setValue("categories", categories);
    categoriesRef.current?.change(categoryOptions);

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

  function reset() {
    handleReset();

    categoriesRef.current?.reset();

    capacityRef.current?.reset();
    transmissionsRef.current?.reset();
    fuelsRef.current?.reset();

    priceRef.current?.reset();
    discountRef.current?.reset();
  }

  function submit(data: tVehicleModelFilter) {
    query.remove("filter.search");
    query.remove("filter.categories");
    query.remove("filter.capacity.min");
    query.remove("filter.capacity.max");
    query.remove("filter.transmissions");
    query.remove("filter.fuels");
    query.remove("filter.price.min");
    query.remove("filter.price.max");
    query.remove("filter.discount.min");
    query.remove("filter.discount.max");
    query.remove("filter.status");
    query.remove("pagination.page");

    query.set("filter.search", data.search);
    query.set(
      "filter.categories",
      data.categories.map((category) => category.toString()),
    );
    query.set("filter.capacity.min", data.capacity.min?.toString());
    query.set("filter.capacity.max", data.capacity.min?.toString());
    query.set(
      "filter.transmissions",
      data.transmissions.map((transmission) => transmission.toString()),
    );
    query.set(
      "filter.fuels",
      data.fuels.map((fuel) => fuel.toString()),
    );
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
              <Controller
                control={control}
                name="categories"
                render={({
                  field: { onChange: setValue },
                  fieldState: { invalid, error },
                }) => (
                  <Field>
                    <FieldLabel
                      aria-invalid={invalid}
                      htmlFor={`${id}-categories`}
                      className="max-w-fit"
                    >
                      {tFilter("information.categories.label")}
                    </FieldLabel>
                    <FieldContent>
                      <FieldMultiSelect<tGroup<tOption>, tOption>
                        ref={categoriesRef}
                        aria-invalid={invalid}
                        id={`${id}-categories`}
                        search-placeholder={tFilter("information.categories.search-placeholder")}
                        select-placeholder={tFilter("information.categories.select-placeholder")}
                        groups={[categoryGroups]}
                        renderTrigger={(option) => option.label}
                        renderGroup={(
                          group,
                          selectedOptions,
                          toggleSelection,
                        ) => (
                          <CommandGroup key={group.value}>
                            {group.options.map((option) => {
                              const isSelected = selectedOptions.some(
                                (selectedOption) =>
                                  selectedOption.value === option.value,
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
                                    {option.label}
                                    {isSelected && <LuCheck size={16} />}
                                  </button>
                                </CommandItem>
                              );
                            })}
                          </CommandGroup>
                        )}
                        onChange={(options) =>
                          setValue(options.map((option) => option.value))
                        }
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
                  field: { value, onChange: setValue },
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
                        isInvalid={invalid}
                        id={`${id}-capacity`}
                        minPlaceholder={tFilter(
                          "specifications.capacity.min.placeholder",
                        )}
                        min={value.min}
                        onMinChange={(_value) =>
                          setValue({ ...value, min: _value })
                        }
                        maxPlaceholder={tFilter(
                          "specifications.capacity.max.placeholder",
                        )}
                        max={value.max}
                        onMaxChange={(_value) =>
                          setValue({ ...value, max: _value })
                        }
                      />
                    </FieldContent>
                    <FieldError errors={error} />
                  </Field>
                )}
              />
              <Controller
                control={control}
                name="transmissions"
                render={({
                  field: { value, onChange: setValue },
                  fieldState: { invalid, error },
                }) => (
                  <Field>
                    <FieldLabel
                      aria-invalid={invalid}
                      htmlFor={`${id}-transmission`}
                      className="max-w-fit"
                    >
                      {tFilter("specifications.transmissions.label")}
                    </FieldLabel>
                    <FieldContent>
                      <FieldTags
                        ref={transmissionsRef}
                        id={`${id}-transmission`}
                        placeholder={tFilter(
                          "specifications.transmissions.placeholder",
                        )}
                        tags={value}
                        onTagsChange={(value) => setValue(value)}
                      />
                    </FieldContent>
                    <FieldError errors={error} />
                  </Field>
                )}
              />
              <Controller
                control={control}
                name="fuels"
                render={({
                  field: { value, onChange: setValue },
                  fieldState: { invalid, error },
                }) => (
                  <Field>
                    <FieldLabel
                      aria-invalid={invalid}
                      htmlFor={`${id}-fuels`}
                      className="max-w-fit"
                    >
                      {tFilter("specifications.fuels.label")}
                    </FieldLabel>
                    <FieldContent>
                      <FieldTags
                        ref={fuelsRef}
                        id={`${id}-fuels`}
                        placeholder={tFilter(
                          "specifications.fuels.placeholder",
                        )}
                        tags={value}
                        onTagsChange={(value) => setValue(value)}
                      />
                    </FieldContent>
                    <FieldError errors={error} />
                  </Field>
                )}
              />
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
                        isInvalid={invalid}
                        minPlaceholder={tFilter(
                          "pricing.price.min.placeholder",
                        )}
                        min={price.min}
                        onMinChange={(value) => {
                          setValue({ ...price, min: value });
                          if (isSubmitted) trigger("discount");
                        }}
                        maxPlaceholder={tFilter(
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
                        isInvalid={invalid}
                        minPlaceholder={tFilter(
                          "pricing.discount.min.placeholder",
                        )}
                        min={discount.min}
                        onMinChange={(value) =>
                          setValue({ ...discount, min: value })
                        }
                        maxPlaceholder={tFilter(
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
