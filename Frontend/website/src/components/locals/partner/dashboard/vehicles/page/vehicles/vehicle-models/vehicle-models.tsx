"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";

import useVehicleModels from "@/hooks/partner/vehicle-models";

import {
  tVehicleModelCreate,
  zVehicleModelCreate,
} from "@/validations/partner/vehicle-model-create";

import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LuChevronDown, LuPlus, LuX } from "react-icons/lu";

import { TabsContent } from "@/components/shadcn/tabs";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/shadcn/dialog";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
  FieldSet,
} from "@/components/shadcn/field";
import { Separator } from "@/components/shadcn/separator";

import { Input } from "@/components/shadcn/input";
import { Button } from "@/components/shadcn/button";

import Table from "./table";
import { Pagination } from "@/components/locals/blocks/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";
import {
  eVehicleModelCategoryModel,
  eVehicleModelStatusModel,
} from "@/models/partner/vehicle-model";
import { Textarea } from "@/components/shadcn/textarea";
import { SearchableSelect } from "@/components/locals/blocks/selects";
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/components/shadcn/number-field";
import { ColorCreator } from "@/components/locals/blocks/color-pickers";
import { Badge } from "@/components/shadcn/badge";

type tCategory = {
  value: number;
  label: string;
};

type tManufacturer = {
  value: number;
  manufacturers: {
    key: string;
    value: string;
  }[];
};

type tTransmission = {
  value: number;
  transmissions: {
    key: string;
    value: string;
  }[];
};

type tFuel = {
  value: number;
  fuels: {
    key: string;
    value: string;
  }[];
};

export default function VehicleModels() {
  const data = useVehicleModels();
  const tVehicleModels = useTranslations(
    "app.partner.dashboard.vehicles.page.vehicles.vehicle-models",
  );

  return (
    <TabsContent value={tVehicleModels("label")} className="space-y-3">
      <AddNew />
      <Table data={data} />
      {data.result?.isSuccess && (
        <Pagination pagination={data.result.pagination} />
      )}
    </TabsContent>
  );
}

function AddNew() {
  const tAddNew = useTranslations(
    "app.partner.dashboard.vehicles.page.vehicles.vehicle-models.add-new",
  );
  const { control, watch, setValue, handleSubmit } =
    useForm<tVehicleModelCreate>({
      defaultValues: {
        thumbnail: "",
        images: [],
        name: "", // info
        description: "", // info
        category: eVehicleModelCategoryModel.car, // info
        manufacturer: "", // info
        modelYear: 1980, // info
        capacity: 0, // specs
        transmission: "", // specs
        fuel: "", // specs
        colors: [],
        price: 0,
        discount: 0,
        tags: "", // info
        status: eVehicleModelStatusModel.active,
      },
      resolver: zodResolver(zVehicleModelCreate),
    });

  const category = watch("category");
  const categories: tCategory[] = tAddNew.raw("form.category.categories");

  const manufacturers: tManufacturer["manufacturers"] = useMemo(
    () =>
      (tAddNew.raw("form.manufacturer.manufacturers") as tManufacturer[]).find(
        (manufacturer) => manufacturer.value === category,
      )?.manufacturers ?? [],
    [tAddNew, category],
  );
  const transmissions: tTransmission["transmissions"] = useMemo(
    () =>
      (tAddNew.raw("form.transmission.transmissions") as tTransmission[]).find(
        (manufacturer) => manufacturer.value === category,
      )?.transmissions ?? [],
    [tAddNew, category],
  );
  const fuels: tFuel["fuels"] = useMemo(
    () =>
      (tAddNew.raw("form.fuel.fuels") as tFuel[]).find(
        (manufacturer) => manufacturer.value === category,
      )?.fuels ?? [],
    [tAddNew, category],
  );

  const colors = useFieldArray({
    control: control,
    name: "colors",
  });
  console.log(colors.fields);

  function onSubmit(data: tVehicleModelCreate) {
    console.log(data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <LuPlus />
          {tAddNew("trigger")}
        </Button>
      </DialogTrigger>
      <DialogContent
        showCloseButton
        className="flex h-[calc(100vh-2rem)] min-w-[calc(100vw-2rem)] flex-col"
      >
        <DialogHeader>
          <DialogTitle className="text-4xl">{tAddNew("title")}</DialogTitle>
          <DialogDescription className="text-lg">
            {tAddNew("description")}
          </DialogDescription>
        </DialogHeader>
        <Separator />

        <form
          className="mt-6 grid grow gap-6 2xl:grid-cols-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-6 2xl:col-span-2">
            <FieldSet className="grid grid-cols-3 gap-6">
              <FieldGroup className="flex">
                <Controller
                  control={control}
                  name="name"
                  render={(controller) => (
                    <Field>
                      <FieldLabel htmlFor="name">
                        {tAddNew("form.name.label")}
                      </FieldLabel>
                      <FieldContent>
                        <Input
                          {...controller.field}
                          required
                          id="name"
                          placeholder={tAddNew("form.name.placeholder")}
                        />
                      </FieldContent>
                      <FieldError errors={[controller.fieldState.error]} />
                    </Field>
                  )}
                />

                <Controller
                  control={control}
                  name="modelYear"
                  render={({ field: { onChange, ...field }, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor="model-year">
                        {tAddNew("form.model-year.label")}
                      </FieldLabel>
                      <FieldContent>
                        <NumberField
                          {...field}
                          id="model-year"
                          onValueChange={onChange}
                        >
                          <NumberFieldGroup>
                            <NumberFieldDecrement />
                            <NumberFieldInput />
                            <NumberFieldIncrement />
                          </NumberFieldGroup>
                        </NumberField>
                      </FieldContent>
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />

                <Controller
                  control={control}
                  name="category"
                  render={(controller) => (
                    <Field>
                      <FieldLabel htmlFor="category">
                        {tAddNew("form.category.label")}
                      </FieldLabel>
                      <FieldContent>
                        <Select
                          value={controller.field.value.toString()}
                          onValueChange={(value) => {
                            setValue("manufacturer", "");
                            setValue("transmission", "");
                            setValue("fuel", "");
                            controller.field.onChange(Number(value));
                          }}
                        >
                          <SelectTrigger id="category" className="w-full">
                            <SelectValue
                              placeholder={tAddNew("form.category.placeholder")}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem
                                key={category.value}
                                value={category.value.toString()}
                              >
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FieldContent>
                      <FieldError errors={[controller.fieldState.error]} />
                    </Field>
                  )}
                />
                <Controller
                  control={control}
                  name="manufacturer"
                  render={(controller) => (
                    <Field>
                      <FieldLabel htmlFor="manufacturer">
                        {tAddNew("form.manufacturer.label")}
                      </FieldLabel>
                      <FieldContent>
                        <SearchableSelect
                          triggerRender={() => (
                            <Button
                              role="combobox"
                              variant="outline"
                              className="bg-background hover:bg-background border-input w-full justify-start rounded px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
                            >
                              {controller.field.value === "" ? (
                                <span className="text-muted-foreground truncate">
                                  {tAddNew("form.manufacturer.when-no-value")}
                                </span>
                              ) : (
                                controller.field.value
                              )}
                              <LuChevronDown
                                size={16}
                                className="text-muted-foreground/80 ms-auto shrink-0"
                              />
                            </Button>
                          )}
                          value={controller.field.value}
                          inputProps={{
                            placeholder: tAddNew(
                              "form.manufacturer.when-no-value",
                            ),
                          }}
                          onSelect={controller.field.onChange}
                          list={manufacturers}
                          itemRender={(item) => (
                            <button className="w-full">{item.value}</button>
                          )}
                          whenNoResultRender={() =>
                            manufacturers.length === 0
                              ? tAddNew(
                                  "form.manufacturer.when-invalid-category",
                                )
                              : tAddNew("form.manufacturer.when-no-result")
                          }
                        />
                      </FieldContent>
                      <FieldError errors={[controller.fieldState.error]} />
                    </Field>
                  )}
                />
              </FieldGroup>

              <FieldGroup className="col-span-2 flex flex-col">
                <Controller
                  control={control}
                  name="description"
                  render={(controller) => (
                    <Field className="grow">
                      <FieldLabel htmlFor="description">
                        {tAddNew("form.description.label")}
                      </FieldLabel>
                      <FieldContent>
                        <Textarea
                          {...controller.field}
                          required
                          id="description"
                          placeholder={tAddNew("form.description.placeholder")}
                          className="h-full resize-none"
                        />
                      </FieldContent>
                      <FieldError errors={[controller.fieldState.error]} />
                    </Field>
                  )}
                />

                <Controller
                  control={control}
                  name="tags"
                  render={(controller) => (
                    <Field>
                      <FieldLabel htmlFor="tags">
                        {tAddNew("form.tags.label")}
                      </FieldLabel>
                      <FieldContent>
                        <Input {...controller.field} required id="tags" />
                      </FieldContent>
                      <FieldError errors={[controller.fieldState.error]} />
                    </Field>
                  )}
                />
              </FieldGroup>
            </FieldSet>

            <FieldSet className="grid grid-cols-2 gap-6">
              <Controller
                control={control}
                name="capacity"
                render={({ field: { onChange, ...field }, fieldState }) => (
                  <Field>
                    <Field>
                      <FieldLabel htmlFor="capacity">
                        {tAddNew("form.capacity.label")}
                      </FieldLabel>
                      <FieldContent>
                        <NumberField
                          {...field}
                          id="capacity"
                          onValueChange={onChange}
                        >
                          <NumberFieldGroup>
                            <NumberFieldDecrement />
                            <NumberFieldInput />
                            <NumberFieldIncrement />
                          </NumberFieldGroup>
                        </NumberField>
                      </FieldContent>
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  </Field>
                )}
              />
              <Controller
                control={control}
                name="transmission"
                render={(controller) => (
                  <Field>
                    <FieldLabel htmlFor="transmission">
                      {tAddNew("form.transmission.label")}
                    </FieldLabel>
                    <FieldContent>
                      <SearchableSelect
                        triggerRender={() => (
                          <Button
                            role="combobox"
                            variant="outline"
                            className="bg-background hover:bg-background border-input w-full justify-start rounded px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
                          >
                            {controller.field.value === "" ? (
                              <span className="text-muted-foreground truncate">
                                {tAddNew("form.fuel.when-no-value")}
                              </span>
                            ) : (
                              controller.field.value
                            )}
                            <LuChevronDown
                              size={16}
                              className="text-muted-foreground/80 ms-auto shrink-0"
                            />
                          </Button>
                        )}
                        value={controller.field.value}
                        inputProps={{
                          placeholder: tAddNew(
                            "form.transmission.when-no-value",
                          ),
                        }}
                        onSelect={controller.field.onChange}
                        list={transmissions}
                        itemRender={(item) => (
                          <button className="w-full">{item.value}</button>
                        )}
                        whenNoResultRender={() =>
                          transmissions.length === 0
                            ? tAddNew("form.transmission.when-invalid-category")
                            : tAddNew("form.transmission.when-no-result")
                        }
                      />
                    </FieldContent>
                    <FieldError errors={[controller.fieldState.error]} />
                  </Field>
                )}
              />
              <Controller
                control={control}
                name="fuel"
                render={(controller) => (
                  <Field>
                    <FieldLabel htmlFor="fuel">
                      {tAddNew("form.fuel.label")}
                    </FieldLabel>
                    <FieldContent>
                      <SearchableSelect
                        triggerRender={() => (
                          <Button
                            role="combobox"
                            variant="outline"
                            className="bg-background hover:bg-background border-input w-full justify-start rounded px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
                          >
                            {controller.field.value === "" ? (
                              <span className="text-muted-foreground truncate">
                                {tAddNew("form.fuel.when-no-value")}
                              </span>
                            ) : (
                              controller.field.value
                            )}
                            <LuChevronDown
                              size={16}
                              className="text-muted-foreground/80 ms-auto shrink-0"
                            />
                          </Button>
                        )}
                        value={controller.field.value}
                        inputProps={{
                          placeholder: tAddNew("form.fuel.when-no-value"),
                        }}
                        onSelect={controller.field.onChange}
                        list={fuels}
                        itemRender={(item) => (
                          <button className="w-full">{item.value}</button>
                        )}
                        whenNoResultRender={() =>
                          fuels.length === 0
                            ? tAddNew("form.fuel.when-invalid-category")
                            : tAddNew("form.fuel.when-no-result")
                        }
                      />
                    </FieldContent>
                    <FieldError errors={[controller.fieldState.error]} />
                  </Field>
                )}
              />

              <Controller
                control={control}
                name="colors"
                render={(controller) => (
                  <Field>
                    <FieldLabel htmlFor="colors">
                      {tAddNew("form.colors.label")}
                    </FieldLabel>
                    <FieldContent className="flex flex-row items-center justify-between rounded border ps-3">
                      <ul className="flex items-center gap-2 overflow-x-auto ps-px">
                        {controller.field.value.map((color, index) => (
                          <li key={index}>
                            <Badge
                              variant="outline"
                              style={{ color: color.hexCode }}
                              className="border-muted-foreground text-shadow-primary inline-flex items-center gap-2 border font-bold uppercase text-shadow-2xs"
                            >
                              {color.name
                                .split(" ")
                                .map((chunk) => chunk.at(0))
                                .join("")}

                              <button
                                type="button"
                                className="border-primary text-primary rounded border p-px"
                                onClick={() => {
                                  colors.remove(index);
                                }}
                              >
                                <LuX />
                              </button>
                            </Badge>
                          </li>
                        ))}
                      </ul>
                      <ColorCreator
                        id="colors"
                        onSave={(value) => {
                          colors.append(value);
                          console.log(value);
                        }}
                      />
                    </FieldContent>
                    <FieldError errors={[controller.fieldState.error]} />
                  </Field>
                )}
              />
            </FieldSet>
          </div>
          <button type="submit">submit</button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
