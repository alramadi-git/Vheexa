"use client";

import { z } from "zod";
import { tVehicleFilters, zVehicleFilters } from "@/services/user/vehicle";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useTranslations } from "next-intl";
import { useSearchParams } from "@/hooks/use-search-params";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/shadcn/field";
import { Card } from "@/components/shadcn/card";
import { Input } from "@/components/shadcn/input";
import { Checkbox } from "@/components/shadcn/checkbox";
import { Button } from "@/components/shadcn/button";

export default function Filters() {
  const t = useTranslations("app.user.vehicles.page.products.form");
  const searchParams = useSearchParams();

  const minCapacity = Number(searchParams.getOne("minCapacity"));
  const maxCapacity = Number(searchParams.getOne("maxCapacity"));
  const minPrice = Number(searchParams.getOne("minPrice"));
  const maxPrice = Number(searchParams.getOne("maxPrice"));

  const form = useForm<tVehicleFilters>({
    defaultValues: {
      search: searchParams.getOne("search") ?? "",
      transmission: searchParams.getOne("transmission") ?? "",
      fuel: searchParams.getOne("fuel") ?? "",
      minCapacity: Number.isNaN(minCapacity) ? 0 : minCapacity,
      maxCapacity: Number.isNaN(maxCapacity) ? 0 : maxCapacity,
      minPrice: Number.isNaN(minPrice) ? 0 : minPrice,
      maxPrice: Number.isNaN(maxPrice) ? 0 : maxPrice,
      hasDiscount: Boolean(searchParams.getOne("hasDiscount")),
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    resolver: zodResolver(zVehicleFilters),
  });

  function onSubmit(filters: z.infer<typeof zVehicleFilters>) {
    const filtersArray: Array<[string, string]> = [];

    if (filters.search !== "") filtersArray.push(["search", filters.search]);
    if (filters.transmission !== "")
      filtersArray.push(["transmission", filters.transmission]);
    if (filters.fuel !== "") filtersArray.push(["fuel", filters.fuel]);
    if (filters.minCapacity > 0)
      filtersArray.push(["minCapacity", filters.minCapacity.toString()]);
    if (filters.maxCapacity > 0)
      filtersArray.push(["maxCapacity", filters.maxCapacity.toString()]);
    if (filters.minPrice > 0)
      filtersArray.push(["minPrice", filters.minPrice.toString()]);
    if (filters.maxPrice > 0)
      filtersArray.push(["maxPrice", filters.maxPrice.toString()]);
    if (filters.hasDiscount)
      filtersArray.push(["hasDiscount", filters.hasDiscount ? "1" : "0"]);

    searchParams.clear();
    searchParams.setMany(filtersArray);
    searchParams.apply();
  }

  return (
    <Card className="relative min-h-full w-1/4  rounded-md">
      <form
        className="sticky top-[128px] left-0 space-y-8 p-6"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Controller
          control={form.control}
          name="search"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="search">{t("search.label")}</FieldLabel>
              <Input
                {...field}
                id="search"
                type="search"
                placeholder={t("search.placeholder")}
                autoComplete="off"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="transmission"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="transmission">
                {t("transmission.label")}
              </FieldLabel>
              <Input
                {...field}
                id="transmission"
                type="search"
                placeholder={t("transmission.placeholder")}
                autoComplete="off"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="fuel"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="fuel">{t("fuel.label")}</FieldLabel>
              <Input
                {...field}
                id="fuel"
                type="search"
                placeholder={t("fuel.placeholder")}
                autoComplete="off"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <Controller
              control={form.control}
              name="minCapacity"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="min-capacity">
                    {t("min-capacity.label")}
                  </FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    id="min-capacity"
                    type="number"
                    placeholder={t("min-capacity.placeholder")}
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="col-span-6">
            <Controller
              control={form.control}
              name="maxCapacity"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="max-capacity">
                    {t("max-capacity.label")}
                  </FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    id="max-capacity"
                    type="number"
                    placeholder={t("max-capacity.placeholder")}
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <Controller
              control={form.control}
              name="minPrice"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="min-price">
                    {t("min-price.label")}
                  </FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    id="min-price"
                    type="number"
                    placeholder={t("min-price.placeholder")}
                    autoComplete="off"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="col-span-6">
            <Controller
              control={form.control}
              name="maxPrice"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="max-price">
                    {t("max-price.label")}
                  </FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    id="max-price"
                    type="number"
                    placeholder={t("max-price.placeholder")}
                    autoComplete="off"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
        </div>

        <Controller
          control={form.control}
          name="hasDiscount"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex gap-3">
                <Checkbox
                  id="has-discount"
                  aria-invalid={fieldState.invalid}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <div className="space-y-1 leading-none">
                  <FieldLabel htmlFor="has-discount">
                    {t("has-discount.label")}
                  </FieldLabel>
                  <FieldDescription>
                    {t("has-discount.description")}
                  </FieldDescription>
                </div>
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button type="submit" variant="outline" className="w-full">
          Apply
        </Button>
      </form>
    </Card>
  );
}
