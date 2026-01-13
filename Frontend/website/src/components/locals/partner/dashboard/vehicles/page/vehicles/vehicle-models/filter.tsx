"use client";

import { useId, useRef, useEffect } from "react";

import { useQuery } from "@/hooks/query";

import {
  tVehicleModelFilter,
  zVehicleModelFilter,
} from "@/validations/partner/vehicle-model";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { eLocale } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";

import { eCurrency, ClsMonyFormatter } from "@/libraries/mony-formatter";

import { LuCheck } from "react-icons/lu";

import { Card, CardContent } from "@/components/shadcn/card";

import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/components/shadcn/field";

import {
  tFieldTagsRef,
  tFieldNumberMinMaxRef,
  FieldSearch,
  FieldTags,
  FieldNumberMinMax,
} from "@/components/locals/blocks/fields";

import {
  tGroup,
  tOption,
  tFieldSelectRef,
  tFieldMultiSelectRef,
  FieldSelect,
  FieldMultiSelect,
} from "@/components/locals/blocks/selects";

import { Button } from "@/components/shadcn/button";

export default function Filter() {
  const id = useId();
  const query = useQuery();

  const locale = useLocale() as eLocale;
  const clsMonyFormatter = new ClsMonyFormatter(locale, eCurrency[locale]);

  const tFilter = useTranslations(
    "app.partner.dashboard.vehicles.page.vehicles.vehicle-models.content.filter",
  );

  const {
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

  const categoriesRef = useRef<tFieldMultiSelectRef<tOption>>(null);

  const capacityRef = useRef<tFieldNumberMinMaxRef>(null);
  const transmissionsRef = useRef<tFieldTagsRef>(null);
  const fuelsRef = useRef<tFieldTagsRef>(null);

  const priceRef = useRef<tFieldNumberMinMaxRef>(null);
  const discountRef = useRef<tFieldNumberMinMaxRef>(null);

  const statusRef = useRef<tFieldSelectRef<tOption>>(null);

  const categoryGroup: tGroup<tOption> = {
    value: "0",
    options: tFilter.raw("categories.categories"),
  };

  const statuses: tOption[] = tFilter.raw("status.statuses");

  useEffect(() => {
    const [
      searchQuery,
      categoriesQuery,
      priceMinQuery,
      priceMaxQuery,
      discountMinQuery,
      discountMaxQuery,
      statusQuery,
    ] = [
      query.get("filter.search"),
      query.getAll("filter.categories"),
      query.get("filter.price.min"),
      query.get("filter.price.max"),
      query.get("filter.discount.min"),
      query.get("filter.discount.max"),
      query.get("filter.status"),
    ];

    const [
      search,
      categories,
      priceMin,
      priceMax,
      discountMin,
      discountMax,
      status,
    ] = [
      searchQuery !== null ? searchQuery : undefined,
      categoriesQuery !== null
        ? categoriesQuery.map((category) => Number(category))
        : [],
      priceMinQuery !== null ? Number(priceMinQuery) : undefined,
      priceMaxQuery !== null ? Number(priceMaxQuery) : undefined,
      discountMinQuery !== null ? Number(discountMinQuery) : undefined,
      discountMaxQuery !== null ? Number(discountMaxQuery) : undefined,
      statusQuery !== null ? Number(discountMaxQuery) : undefined,
    ];

    setValue("search", search);

    setValue("categories", categories);
    categoriesRef.current?.setValue(
      categoryGroup.options.filter((category) =>
        categories.includes(Number(category.value)),
      ),
    );

    setValue("price.min", priceMin);
    setValue("price.max", priceMax);

    setValue("discount.min", discountMin);
    setValue("discount.max", discountMax);

    setValue("status", status);
    statusRef.current?.setValue(
      statuses.find((_status) => _status.value === status?.toString()),
    );
  }, []);

  function reset() {
    handleReset();

    categoriesRef.current?.reset();

    capacityRef.current?.reset();
    transmissionsRef.current?.reset();
    fuelsRef.current?.reset();

    priceRef.current?.reset();
    discountRef.current?.reset();

    statusRef.current?.reset();
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
                    {tFilter("search.label")}
                  </FieldLabel>
                  <FieldContent>
                    <FieldSearch
                      {...field}
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
                    {tFilter("categories.label")}
                  </FieldLabel>
                  <FieldContent>
                    <FieldMultiSelect<tGroup<tOption>, tOption>
                      id={`${id}-categories`}
                      ref={categoriesRef}
                      isInvalid={invalid}
                      placeholder={tFilter("categories.placeholder")}
                      searchPlaceholder={tFilter(
                        "categories.search-placeholder",
                      )}
                      groups={[categoryGroup]}
                      groupRender={() => ""}
                      optionRender={(option, isSelected) => (
                        <button
                          type="button"
                          className="w-full justify-between"
                        >
                          {option.label}
                          {isSelected && <LuCheck className="size-4" />}
                        </button>
                      )}
                      onToggle={(values) =>
                        setValue(values.map(({ value }) => Number(value)))
                      }
                    />
                  </FieldContent>
                  <FieldError errors={error} />
                </Field>
              )}
            />
          </FieldGroup>

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
                    {tFilter("capacity.label")}
                  </FieldLabel>
                  <FieldContent>
                    <FieldNumberMinMax
                      ref={capacityRef}
                      isInvalid={invalid}
                      id={`${id}-capacity`}
                      minPlaceholder={tFilter("capacity.min.placeholder")}
                      min={value.min}
                      onMinChange={(_value) =>
                        setValue({ ...value, min: _value })
                      }
                      maxPlaceholder={tFilter("capacity.max.placeholder")}
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
                    {tFilter("transmissions.label")}
                  </FieldLabel>
                  <FieldContent>
                    <FieldTags
                      ref={transmissionsRef}
                      id={`${id}-transmission`}
                      placeholder={tFilter("transmissions.placeholder")}
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
                    {tFilter("fuels.label")}
                  </FieldLabel>
                  <FieldContent>
                    <FieldTags
                      ref={fuelsRef}
                      id={`${id}-fuels`}
                      placeholder={tFilter("fuels.placeholder")}
                      tags={value}
                      onTagsChange={(value) => setValue(value)}
                    />
                  </FieldContent>
                  <FieldError errors={error} />
                </Field>
              )}
            />
          </FieldGroup>

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
                    {tFilter("price.label")}
                  </FieldLabel>
                  <FieldContent>
                    <FieldNumberMinMax
                      ref={priceRef}
                      id={`${id}-price`}
                      isInvalid={invalid}
                      minPlaceholder={tFilter("price.min.placeholder")}
                      min={price.min}
                      onMinChange={(value) => {
                        setValue({ ...price, min: value });
                        if (isSubmitted) trigger("discount");
                      }}
                      maxPlaceholder={tFilter("price.max.placeholder")}
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
                    {tFilter("discount.label")}
                  </FieldLabel>
                  <FieldContent>
                    <FieldNumberMinMax
                      ref={discountRef}
                      id={`${id}-discount`}
                      isInvalid={invalid}
                      minPlaceholder={tFilter("discount.min.placeholder")}
                      min={discount.min}
                      onMinChange={(value) =>
                        setValue({ ...discount, min: value })
                      }
                      maxPlaceholder={tFilter("discount.max.placeholder")}
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
