"use client";

import { z } from "zod";
import { tVehicleFilters, zVehicleFilters } from "@/services/user/vehicle-model";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { useTranslations } from "next-intl";
import { useQuery } from "@/hooks/query";

import { Card } from "@/components/shadcn/card";
import {
  Field,
  FieldGroup,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/shadcn/field";
import { Input } from "@/components/shadcn/input";
import { Checkbox } from "@/components/shadcn/checkbox";
import { Button } from "@/components/shadcn/button";

export default function Filters() {
  const searchParams = useQuery();
  const form = useForm<tVehicleFilters>({
    defaultValues: {
      search: searchParams.getOneOrDefault("search", ""),
      transmission: searchParams.getOneOrDefault("transmission", ""),
      fuel: searchParams.getOneOrDefault("fuel", ""),
      minCapacity: Number(searchParams.getOneOrDefault("minCapacity", "0")),
      maxCapacity: Number(searchParams.getOneOrDefault("maxCapacity", "0")),
      minPrice: Number(searchParams.getOneOrDefault("minPrice", "0")),
      maxPrice: Number(searchParams.getOneOrDefault("maxPrice", "0")),
      hasDiscount: Boolean(
        Number(searchParams.getOneOrDefault("hasDiscount", "0")),
      ),
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    resolver: zodResolver(zVehicleFilters),
  });

  const tForm = useTranslations("app.user.vehicles.page.products.form");

  function onSubmit(filters: z.infer<typeof zVehicleFilters>) {
    searchParams.clear();
    searchParams.setMany([
      ["search", filters.search],
      ["transmission", filters.transmission],
      ["fuel", filters.fuel],

      ["minCapacity", filters.minCapacity.toString()],
      ["maxCapacity", filters.maxCapacity.toString()],
      ["minPrice", filters.minPrice.toString()],
      ["maxPrice", filters.maxPrice.toString()],

      ["hasDiscount", filters.hasDiscount ? "1" : "0"],
    ]);

    searchParams.apply();
  }

  return (
    <Card className="rounded p-7">
      <form
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-7"
      >
        <FieldGroup className="lg:grid-cols-3">
          <Controller
            control={form.control}
            name="search"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="search">
                  {tForm("search.label")}
                </FieldLabel>
                <Input
                  {...field}
                  id="search"
                  type="search"
                  placeholder={tForm("search.placeholder")}
                  autoComplete="off"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="transmission"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="transmission">
                  {tForm("transmission.label")}
                </FieldLabel>
                <Input
                  {...field}
                  id="transmission"
                  type="search"
                  placeholder={tForm("transmission.placeholder")}
                  autoComplete="off"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="fuel"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="fuel">{tForm("fuel.label")}</FieldLabel>
                <Input
                  {...field}
                  id="fuel"
                  type="search"
                  placeholder={tForm("fuel.placeholder")}
                  autoComplete="off"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <FieldGroup className="sm:grid-cols-2 lg:grid-cols-4">
          <Controller
            control={form.control}
            name="minCapacity"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="min-capacity">
                  {tForm("min-capacity.label")}
                </FieldLabel>
                <Input
                  aria-invalid={fieldState.invalid}
                  id="min-capacity"
                  type="number"
                  placeholder={tForm("min-capacity.placeholder")}
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="maxCapacity"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="max-capacity">
                  {tForm("max-capacity.label")}
                </FieldLabel>
                <Input
                  aria-invalid={fieldState.invalid}
                  id="max-capacity"
                  type="number"
                  placeholder={tForm("max-capacity.placeholder")}
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="minPrice"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="min-price">
                  {tForm("min-price.label")}
                </FieldLabel>
                <Input
                  aria-invalid={fieldState.invalid}
                  id="min-price"
                  type="number"
                  placeholder={tForm("min-price.placeholder")}
                  autoComplete="off"
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="maxPrice"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="max-price">
                  {tForm("max-price.label")}
                </FieldLabel>
                <Input
                  aria-invalid={fieldState.invalid}
                  id="max-price"
                  type="number"
                  placeholder={tForm("max-price.placeholder")}
                  autoComplete="off"
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <FieldGroup className="lg:grid-cols-5">
          <Controller
            control={form.control}
            name="hasDiscount"
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="lg:col-span-2"
              >
                <div className="flex gap-3">
                  <Checkbox
                    id="has-discount"
                    aria-invalid={fieldState.invalid}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <div className="space-y-1 leading-none">
                    <FieldLabel htmlFor="has-discount">
                      {tForm("has-discount.label")}
                    </FieldLabel>
                    <FieldDescription>
                      {tForm("has-discount.description")}
                    </FieldDescription>
                  </div>
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Button
            type="submit"
            variant="outline"
            className="size-full text-base font-medium lg:col-span-3"
          >
            Apply
          </Button>
        </FieldGroup>
      </form>
    </Card>
  );
}
