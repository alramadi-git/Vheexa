"use client";

import { z } from "zod";
import {
  tVehicleFilters,
  zVehicleFilters,
} from "@/app/[locale]/user/_services/vehicle/vehicle";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form as ReactHookForm,
} from "@/components/shadcn/form";
import { Card } from "@/components/shadcn/card";
import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import { Checkbox } from "@/components/shadcn/checkbox";
import { useSearchParams } from "@/hooks/use-search-params";

export default function Filters() {
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
      hasDiscount: Boolean(searchParams.getOne("hasDiscount")) ?? false,
    },
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
      filtersArray.push(["hasDiscount", filters.hasDiscount.toString()]);

    searchParams.clear();
    searchParams.setMany(filtersArray);
    searchParams.apply();
  }

  return (
    <Card className="relative min-h-full w-1/4 rounded-md">
      <ReactHookForm {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="sticky top-[125px] left-0 space-y-8 p-6"
        >
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Search</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Search your vehicle..."
                    type="text"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* <div className="col-span-6">
            <FormField
              control={form.control}
              name=""
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="m@example.com">
                        m@example.com
                      </SelectItem>
                      <SelectItem value="m@google.com">
                        m@google.com
                      </SelectItem>
                      <SelectItem value="m@support.com">
                        m@support.com
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    You can manage email addresses in your email settings.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div> */}

          <FormField
            control={form.control}
            name="transmission"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transmission</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Automatic, Manual etc..."
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fuel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fuel</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Gasoline, Diesel etc..."
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="minCapacity"
                render={({ field: { onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Min Capacity</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === "") {
                            onChange(undefined);
                            return;
                          }

                          if (Number.isNaN(value)) return;

                          onChange(Number(value));
                        }}
                        placeholder="Set min capacity"
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-6">
              <FormField
                control={form.control}
                name="maxCapacity"
                render={({ field: { onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Max Capacity</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === "") {
                            onChange(undefined);
                            return;
                          }

                          if (Number.isNaN(value)) return;

                          onChange(Number(value));
                        }}
                        placeholder="Set max capacity"
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="minPrice"
                render={({ field: { onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Min Price</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === "") {
                            onChange(undefined);
                            return;
                          }

                          if (Number.isNaN(value)) return;

                          onChange(Number(value));
                        }}
                        placeholder="Set min price"
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-6">
              <FormField
                control={form.control}
                name="maxPrice"
                render={({ field: { onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Max Price</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === "") {
                            onChange(undefined);
                            return;
                          }

                          if (Number.isNaN(value)) return;

                          onChange(Number(value));
                        }}
                        placeholder="Set max price"
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="hasDiscount"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Only show vehicles with discounts</FormLabel>
                  <FormDescription>
                    When checked, only show vehicles with discounts, otherwise
                    show all
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" variant="outline" className="w-full">
            Apply
          </Button>
        </form>
      </ReactHookForm>
    </Card>
  );
}
