"use client";

import { useTranslations } from "next-intl";

import useVehicleModels from "@/hooks/partner/vehicle-models";

import {
  tVehicleModelCreate,
  zVehicleModelCreate,
} from "@/validations/partner/vehicle-model-create";

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
import { FieldDatePicker } from "@/components/locals/blocks/fields";

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
  const { control, handleSubmit } = useForm<tVehicleModelCreate>({
    resolver: zodResolver(zVehicleModelCreate),
  });

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
          <FieldGroup className="grid-cols-3">
            <Controller
              control={control}
              name="name"
              render={(controller) => (
                <Field>
                  <FieldLabel htmlFor={tAddNew("form.name.id")}>
                    {tAddNew("form.name.label")}
                  </FieldLabel>
                  <FieldContent>
                    <Input
                      {...controller.field}
                      id={tAddNew("form.name.id")}
                      placeholder={tAddNew("form.name.placeholder")}
                    />
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
                  <FieldLabel htmlFor={tAddNew("form.manufacturer.id")}>
                    {tAddNew("form.manufacturer.label")}
                  </FieldLabel>
                  <FieldContent>
                    <Input
                      {...controller.field}
                      id={tAddNew("form.manufacturer.id")}
                      placeholder={tAddNew("form.manufacturer.placeholder")}
                    />
                  </FieldContent>
                  <FieldError errors={[controller.fieldState.error]} />
                </Field>
              )}
            />
            <Controller
              control={control}
              name="modelYear"
              render={(controller) => (
                <Field>
                  <FieldLabel htmlFor={tAddNew("form.model-year.id")}>
                    {tAddNew("form.model-year.label")}
                  </FieldLabel>
                  <FieldContent>
                    <FieldDatePicker
                      controller={controller}
                      inputProps={{
                        placeholder: tAddNew("form.model-year.placeholder"),
                      }}
                    />
                  </FieldContent>
                  <FieldError errors={[controller.fieldState.error]} />
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
