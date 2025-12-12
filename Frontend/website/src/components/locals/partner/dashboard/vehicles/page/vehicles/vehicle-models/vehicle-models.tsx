"use client";

import { useTranslations } from "next-intl";

import useVehicleModels from "@/hooks/partner/vehicle-models";

import {
  tVehicleModelCreate,
  zVehicleModelCreate,
} from "@/validations/partner/vehicle-model-create";

import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LuPlus } from "react-icons/lu";

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
  eVehicleModelFuelModel,
  eVehicleModelStatusModel,
  eVehicleModelTransmissionModel,
} from "@/models/partner/vehicle-model";
import { Textarea } from "@/components/shadcn/textarea";

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

type tCategory = {
  value: number;
  label: string;
};
type tManufacturer = {
  value: number;
  manufacturers: string[];
};

function AddNew() {
  const tAddNew = useTranslations(
    "app.partner.dashboard.vehicles.page.vehicles.vehicle-models.add-new",
  );
  const { control, watch, setValue, handleSubmit } =
    useForm<tVehicleModelCreate>({
      defaultValues: {
        thumbnail: "",
        images: [],
        name: "",
        description: "",
        category: eVehicleModelCategoryModel.car,
        manufacturer: "",
        modelYear: new Date().getFullYear(),
        capacity: 0,
        transmission: eVehicleModelTransmissionModel.manual,
        fuel: eVehicleModelFuelModel.petrol91,
        colors: [],
        price: 0,
        discount: 0,
        tags: "",
        status: eVehicleModelStatusModel.active,
      },
      resolver: zodResolver(zVehicleModelCreate),
    });
  const category = watch("category");

  const categories: tCategory[] = tAddNew.raw("form.category.categories");
  const manufactures: tManufacturer["manufacturers"] = useMemo(
    () =>
      (tAddNew.raw("form.manufacturer.manufacturers") as tManufacturer[]).find(
        (manufacturer) => manufacturer.value === category,
      )!.manufacturers,
    [tAddNew, category],
  );

  function onSubmit(data: tVehicleModelCreate) {}
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

        <form className="mt-6 grow" onSubmit={handleSubmit(onSubmit)}>
          <FieldSet className="grid grid-cols-3 gap-6">
            <FieldGroup>
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
                      <Input
                        {...field}
                        required
                        id="model-year"
                        type="number"
                        placeholder={tAddNew("form.model-year.placeholder")}
                        onChange={(e) => {
                          const value = Number(e.currentTarget.value);

                          if (Number.isNaN(value)) return;
                          onChange(value);
                        }}
                      />
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
                      <Select
                        value={controller.field.value}
                        onValueChange={controller.field.onChange}
                      >
                        <SelectTrigger id="manufacturer" className="w-full">
                          <SelectValue
                            placeholder={tAddNew(
                              "form.manufacturer.placeholder",
                            )}
                          />
                        </SelectTrigger>
                        <SelectContent className="h-86">
                          {manufactures.map((manufacturer) => (
                            <SelectItem key={manufacturer} value={manufacturer}>
                              {manufacturer}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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

          <button type="submit">submit</button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
