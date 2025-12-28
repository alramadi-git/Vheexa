"use client";

import { useLocale, useTranslations } from "next-intl";

import { eLocale } from "@/i18n/routing";
import { ClsDateFormatter } from "@/libraries/date-formatter";
import { ClsMonyFormatter, eCurrency } from "@/libraries/mony-formatter";

import { useId, useMemo, useState } from "react";

import { ClsVehicleModelService } from "@/services/partner/vehicle-model";

import {
  eVehicleModelCategoryModel,
  eVehicleModelStatusModel,
} from "@/models/partner/vehicle-model";
import {
  tVehicleModelCreateForm,
  zVehicleModelCreateForm,
} from "@/validations/partner/vehicle-model";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  LuChevronDown,
  LuGripVertical,
  LuPlus,
  LuTrash,
  LuX,
} from "react-icons/lu";

import {
  Tabs as ShadcnTabs,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/tabs";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/dialog";

import { Section, Intro } from "@/components/locals/blocks/typography";
import { Description, Title } from "../../../blocks/typographies";

import { Button } from "@/components/shadcn/button";
import { Separator } from "@/components/shadcn/separator";

import VehicleModels from "./vehicle-models/vehicle-models";
import VehicleInstances from "./vehicle-instances/vehicle-instances";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/shadcn/field";
import { Input } from "@/components/shadcn/input";
import { NumberField } from "@/components/shadcn/number-field";
import {
  FieldFileUpload,
  FieldNumber,
} from "@/components/locals/blocks/fields";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";
import { Textarea } from "@/components/shadcn/textarea";
import { SearchableSelect } from "@/components/locals/blocks/selects";
import { Badge } from "@/components/shadcn/badge";
import { ColorCreator } from "@/components/locals/blocks/color-pickers";
import { FullHDImage } from "@/components/locals/blocks/images";
import {
  Sortable,
  SortableContent,
  SortableItem,
  SortableItemHandle,
  SortableOverlay,
} from "@/components/shadcn/sortable";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table";
import { cn } from "@/utilities/cn";

export default function Vehicles() {
  const tVehicles = useTranslations(
    "app.partner.dashboard.vehicles.page.vehicles",
  );

  const [tap, setTap] = useState<string>(tVehicles("vehicle-models.label"));

  return (
    <Section className="h-fullscreen">
      <ShadcnTabs asChild value={tap} onValueChange={setTap}>
        <Card>
          <CardContent className="block space-y-3">
            <CardHeader className="flex items-center justify-between px-0">
              <Intro className="space-y-0.5">
                <CardTitle>
                  <Title heading="h1">{tVehicles("title")}</Title>
                </CardTitle>
                <CardDescription>
                  <Description>{tVehicles("description")}</Description>
                </CardDescription>
              </Intro>

              <div className="flex flex-col gap-3">
                <TabsList>
                  <TabsTrigger value={tVehicles("vehicle-models.label")}>
                    {tVehicles("vehicle-models.label")}
                  </TabsTrigger>
                  <TabsTrigger value={tVehicles("vehicle-instances.label")}>
                    {tVehicles("vehicle-instances.label")}
                  </TabsTrigger>
                </TabsList>

                {tap === tVehicles("vehicle-models.label") && (
                  <AddNewVehicleModel />
                )}
              </div>
            </CardHeader>

            {/* <VehicleModels /> */}
            <VehicleInstances />
          </CardContent>
        </Card>
      </ShadcnTabs>
    </Section>
  );
}

type tEnumOption = {
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

function AddNewVehicleModel() {
  const id = useId();
  const locale = useLocale() as eLocale;

  const clsDateFormatter = new ClsDateFormatter(locale);
  const clsMonyFormatter = new ClsMonyFormatter(locale, eCurrency[locale]);

  const clsVehicleModelService = new ClsVehicleModelService();

  const tAddNew = useTranslations(
    "app.partner.dashboard.vehicles.page.vehicles.vehicle-models.content.add-new",
  );

  const {
    control,
    formState,
    watch,
    setValue,
    trigger,
    reset: handleReset,
    handleSubmit,
  } = useForm<tVehicleModelCreateForm>({
    defaultValues: {
      name: "",
      description: "",
      tags: "",
      modelYear: 1980,
      category: eVehicleModelCategoryModel.car,
      manufacturer: "",
      capacity: 1,
      transmission: "",
      fuel: "",
      colors: [],
      thumbnail: undefined,
      gallery: [],
      price: 1,
      discount: 0,
      status: eVehicleModelStatusModel.active,
    },
    resolver: zodResolver(zVehicleModelCreateForm),
  });
  const colors = useFieldArray({
    control: control,
    name: "colors",
  });

  const category = watch("category");
  const categories: tEnumOption[] = tAddNew.raw(
    "form.information.category.categories",
  );

  const manufacturers: tManufacturer["manufacturers"] = useMemo(
    () =>
      (
        tAddNew.raw(
          "form.information.manufacturer.manufacturers",
        ) as tManufacturer[]
      ).find((manufacturer) => manufacturer.value === category)
        ?.manufacturers ?? [],
    [tAddNew, category],
  );
  const transmissions: tTransmission["transmissions"] = useMemo(
    () =>
      (
        tAddNew.raw("form.specs.transmission.transmissions") as tTransmission[]
      ).find((manufacturer) => manufacturer.value === category)
        ?.transmissions ?? [],
    [tAddNew, category],
  );
  const fuels: tFuel["fuels"] = useMemo(
    () =>
      (tAddNew.raw("form.specs.fuel.fuels") as tFuel[]).find(
        (manufacturer) => manufacturer.value === category,
      )?.fuels ?? [],
    [tAddNew, category],
  );

  const statuses: tEnumOption[] = tAddNew.raw("form.status.statuses");

  const galleryHeaders: string[] = tAddNew.raw(
    "form.media.gallery.table.headers",
  );

  function reset(): void {
    handleReset();
  }

  function submit(data: tVehicleModelCreateForm): void {
    clsVehicleModelService.addAsync(data);
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
        className="h-[calc(100vh-2rem)] min-w-[calc(100vw-2rem)] overflow-auto"
      >
        <DialogHeader className="gap-0.5">
          <DialogTitle className="text-3xl">{tAddNew("title")}</DialogTitle>
          <DialogDescription className="text-base">
            {tAddNew("description")}
          </DialogDescription>
        </DialogHeader>
        <Separator className="mt-1 mb-6" />

        <form
          className="grid grow gap-6 2xl:grid-cols-3"
          onSubmit={handleSubmit(submit)}
          onReset={reset}
        >
          <div className="2xl:col-span-2">
            <FieldSet className="grid grid-cols-3 gap-6">
              <FieldGroup className="flex justify-between">
                <Controller
                  control={control}
                  name="name"
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor={`${id}-name`} className="w-fit">
                        {tAddNew("form.information.name.label")}
                      </FieldLabel>
                      <FieldContent>
                        <Input
                          {...field}
                          required
                          id={`${id}-name`}
                          placeholder={tAddNew(
                            "form.information.name.placeholder",
                          )}
                        />
                      </FieldContent>
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />
                <Controller
                  control={control}
                  name="modelYear"
                  render={({
                    field: { onChange: setValue, ...field },
                    fieldState,
                  }) => (
                    <Field>
                      <FieldLabel htmlFor="model-year">
                        {tAddNew("form.information.model-year.label")}
                      </FieldLabel>
                      <FieldContent>
                        <FieldNumber
                          {...field}
                          aria-invalid={fieldState.invalid}
                          required
                          id={`${id}-model-year`}
                          onValueChange={(number) => setValue(number ?? 0)}
                        />
                      </FieldContent>
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />
                <Controller
                  control={control}
                  name="category"
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor="category">
                        {tAddNew("form.information.category.label")}
                      </FieldLabel>
                      <FieldContent>
                        <Select
                          value={field.value.toString()}
                          onValueChange={(value) => {
                            setValue("manufacturer", "");
                            setValue("transmission", "");
                            setValue("fuel", "");

                            if (formState.isSubmitted) {
                              trigger("manufacturer");
                              trigger("transmission");
                              trigger("fuel");
                            }

                            field.onChange(Number(value));
                          }}
                        >
                          <SelectTrigger id="category" className="w-full">
                            <SelectValue />
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
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />
                <Controller
                  control={control}
                  name="manufacturer"
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor="manufacturer">
                        {tAddNew("form.information.manufacturer.label")}
                      </FieldLabel>
                      <FieldContent>
                        <SearchableSelect
                          triggerRender={() => (
                            <Button
                              id="manufacturer"
                              role="combobox"
                              variant="outline"
                              className="bg-background hover:bg-background border-input w-full justify-start rounded px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
                            >
                              {field.value === "" ? (
                                <span className="text-muted-foreground truncate">
                                  {tAddNew(
                                    "form.information.manufacturer.placeholder",
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
                              "form.information.manufacturer.placeholder",
                            ),
                          }}
                          onSelect={field.onChange}
                          list={manufacturers}
                          itemRender={(item) => (
                            <button className="w-full">{item.value}</button>
                          )}
                          whenNoResultRender={() =>
                            manufacturers.length === 0
                              ? tAddNew(
                                  "form.information.manufacturer.when-invalid-category",
                                )
                              : tAddNew(
                                  "form.information.manufacturer.when-no-result",
                                )
                          }
                        />
                      </FieldContent>
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />
              </FieldGroup>

              <FieldGroup className="col-span-2 flex flex-col">
                <Controller
                  control={control}
                  name="description"
                  render={({ field, fieldState }) => (
                    <Field className="grow">
                      <FieldLabel
                        htmlFor={`${id}-description`}
                        className="w-fit"
                      >
                        {tAddNew("form.information.description.label")}
                      </FieldLabel>
                      <FieldContent>
                        <Textarea
                          {...field}
                          required
                          id={`${id}-description`}
                          placeholder={tAddNew(
                            "form.information.description.placeholder",
                          )}
                          className="h-full resize-none"
                        />
                      </FieldContent>
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />
                <Controller
                  control={control}
                  name="tags"
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor={`${id}-tags`} className="w-fit">
                        {tAddNew("form.information.tags.label")}
                      </FieldLabel>
                      <FieldContent>
                        <Input
                          {...field}
                          required
                          id={`${id}-tags`}
                          placeholder={tAddNew(
                            "form.information.tags.placeholder",
                          )}
                        />
                      </FieldContent>
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />
              </FieldGroup>
            </FieldSet>

            <FieldSet>
              <FieldGroup className="grid-cols-2">
                <Controller
                  control={control}
                  name="capacity"
                  render={({
                    field: { onChange: setValue, ...field },
                    fieldState,
                  }) => (
                    <Field>
                      <Field>
                        <FieldLabel
                          htmlFor={`${id}-capacity`}
                          className="w-fit"
                        >
                          {tAddNew("form.specs.capacity.label")}
                        </FieldLabel>
                        <FieldContent>
                          <FieldNumber
                            {...field}
                            required
                            aria-invalid={fieldState.invalid}
                            id={`${id}-capacity`}
                            onValueChange={(number) => setValue(number ?? 0)}
                          />
                        </FieldContent>
                        <FieldError errors={[fieldState.error]} />
                      </Field>
                    </Field>
                  )}
                />
                <Controller
                  control={control}
                  name="transmission"
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel
                        htmlFor={`${id}-transmission`}
                        className="w-fit"
                      >
                        {tAddNew("form.specs.transmission.label")}
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
                                  {tAddNew("form.specs.fuel.placeholder")}
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
                              "form.specs.transmission.placeholder",
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
                                  "form.specs.transmission.when-invalid-category",
                                )
                              : tAddNew(
                                  "form.specs.transmission.when-no-result",
                                )
                          }
                        />
                      </FieldContent>
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />
                <Controller
                  control={control}
                  name="fuel"
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor="fuel">
                        {tAddNew("form.specs.fuel.label")}
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
                                  {tAddNew("form.specs.fuel.placeholder")}
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
                            placeholder: tAddNew("form.specs.fuel.placeholder"),
                          }}
                          onSelect={field.onChange}
                          list={fuels}
                          itemRender={(item) => (
                            <button className="w-full">{item.value}</button>
                          )}
                          whenNoResultRender={() =>
                            fuels.length === 0
                              ? tAddNew("form.specs.fuel.when-invalid-category")
                              : tAddNew("form.specs.fuel.when-no-result")
                          }
                        />
                      </FieldContent>
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />
                <Controller
                  control={control}
                  name="colors"
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor="colors">
                        {tAddNew("form.specs.colors.label")}
                      </FieldLabel>
                      <FieldContent className="flex flex-row items-center justify-between rounded border ps-3">
                        {field.value.length === 0 ? (
                          <span className="text-muted-foreground truncate">
                            {tAddNew("form.specs.colors.placeholder")}
                          </span>
                        ) : (
                          <ul className="flex items-center gap-2 overflow-x-auto ps-px">
                            {field.value.map((color, index) => (
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
                        )}

                        <ColorCreator
                          id="colors"
                          onSave={(value) => colors.append(value)}
                        />
                      </FieldContent>
                      <FieldError errors={[fieldState.error]} />
                      <ul className="flex gap-3 overflow-x-auto">
                        {formState.errors.colors?.map?.((error, index) => (
                          <li key={index} className="truncate">
                            <FieldError errors={[error?.name]} />
                            <FieldError errors={[error?.tags]} />
                          </li>
                        ))}
                      </ul>
                    </Field>
                  )}
                />
              </FieldGroup>
            </FieldSet>
          </div>

          <FieldSet>
            <FieldGroup>
              <Controller
                control={control}
                name="thumbnail"
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="thumbnail">
                      {tAddNew("form.media.thumbnail.label")}
                    </FieldLabel>
                    <FieldContent>
                      {field.value ? (
                        <div className="relative rounded p-px">
                          <FullHDImage
                            src={URL.createObjectURL(field.value)}
                            alt={field.value.name}
                            className="dark:bg-sidebar-border h-68 rounded bg-black object-contain brightness-75"
                          />
                          <button
                            type="button"
                            className="light:text-white absolute top-2 right-2"
                            onClick={() => field.onChange(undefined)}
                          >
                            <LuX size={24} />
                          </button>
                        </div>
                      ) : (
                        <FieldFileUpload
                          id="thumbnail"
                          accept="image/*"
                          value={field.value === undefined ? [] : [field.value]}
                          onValueChange={(files) => field.onChange(files[0])}
                          maxFiles={1}
                        />
                      )}
                    </FieldContent>
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
              <Controller
                control={control}
                name="gallery"
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="gallery">
                      {tAddNew("form.media.gallery.label")}
                    </FieldLabel>
                    <FieldContent>
                      <Sortable
                        value={field.value}
                        onValueChange={(value) => field.onChange(value)}
                        getItemValue={(value) => value.lastModified}
                        orientation="mixed"
                      >
                        <Table className="rounded-none border">
                          <TableHeader
                            className={cn({
                              hidden: field.value.length === 0,
                            })}
                          >
                            <TableRow className="bg-accent/50">
                              {galleryHeaders.map((header) => (
                                <TableHead
                                  key={header}
                                  className="bg-transparent"
                                >
                                  {header}
                                </TableHead>
                              ))}
                            </TableRow>
                          </TableHeader>
                          <SortableContent asChild>
                            <TableBody>
                              {field.value.map((file) => (
                                <SortableItem
                                  asChild
                                  key={file.lastModified}
                                  value={file.lastModified}
                                >
                                  <TableRow>
                                    <TableCell className="w-[50px]">
                                      <SortableItemHandle asChild>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="size-8"
                                        >
                                          <LuGripVertical className="h-4 w-4" />
                                        </Button>
                                      </SortableItemHandle>
                                    </TableCell>
                                    <TableCell className="font-medium">
                                      {file.name}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                      {tAddNew(
                                        "form.media.gallery.table.cells.file-size",
                                        {
                                          size: (file.size / 1024).toFixed(2),
                                        },
                                      )}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                      {clsDateFormatter.format(
                                        new Date(file.lastModified),
                                      )}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                      <Button
                                        variant="ghost"
                                        type="button"
                                        className="hover:text-destructive"
                                        onClick={() =>
                                          field.onChange(
                                            field.value.filter(
                                              (f) => f.name !== file.name,
                                            ),
                                          )
                                        }
                                      >
                                        <LuTrash />
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                </SortableItem>
                              ))}
                            </TableBody>
                          </SortableContent>
                          <TableFooter>
                            <TableRow>
                              <TableCell colSpan={5}>
                                <FieldFileUpload
                                  multiple
                                  id="images"
                                  accept="image/*"
                                  maxFiles={25}
                                  className={cn({
                                    "cursor-not-allowed opacity-50":
                                      field.value.length === 25,
                                  })}
                                  disabled={field.value.length === 25}
                                  value={field.value}
                                  onValueChange={field.onChange}
                                />
                              </TableCell>
                            </TableRow>
                          </TableFooter>
                        </Table>
                        <SortableOverlay>
                          <div className="bg-primary/10 size-full rounded" />
                        </SortableOverlay>
                      </Sortable>
                    </FieldContent>
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
            </FieldGroup>
          </FieldSet>

          <FieldGroup className="grid-cols-4 2xl:col-span-3">
            <FieldSet className="col-span-2">
              <FieldGroup className="grid-cols-2">
                <Controller
                  control={control}
                  name="price"
                  render={({
                    field: { onChange: setValue, ...field },
                    fieldState,
                  }) => (
                    <Field>
                      <Field>
                        <FieldLabel htmlFor="price">
                          {tAddNew("form.pricing.price.label")}
                        </FieldLabel>
                        <FieldContent>
                          <FieldNumber
                            {...field}
                            required
                            aria-invalid={fieldState.invalid}
                            id={`${id}-price`}
                            onValueChange={(number) => setValue(number ?? 0)}
                          />
                        </FieldContent>
                        <FieldError errors={[fieldState.error]} />
                      </Field>
                    </Field>
                  )}
                />
                <Controller
                  control={control}
                  name="discount"
                  render={({
                    field: { onChange: setValue, ...field },
                    fieldState,
                  }) => (
                    <Field>
                      <Field>
                        <FieldLabel htmlFor="discount">
                          {tAddNew("form.pricing.discount.label")}
                        </FieldLabel>
                        <FieldContent>
                          <FieldNumber
                            {...field}
                            required
                            aria-invalid={fieldState.invalid}
                            id={`${id}-discount`}
                            onValueChange={(number) => setValue(number ?? 0)}
                          />
                        </FieldContent>
                        <FieldError errors={[fieldState.error]} />
                      </Field>
                    </Field>
                  )}
                />
              </FieldGroup>
            </FieldSet>
          </FieldGroup>

          <Controller
            control={control}
            name="status"
            render={({
              field: { value, onChange: setValue, ...field },
              fieldState,
            }) => (
              <Field>
                <FieldLabel htmlFor={`${id}-status`} className="w-fit">
                  {tAddNew("form.status.label")}
                </FieldLabel>
                <FieldContent>
                  <Select
                    {...field}
                    value={value.toString()}
                    onValueChange={(value) => setValue(Number(value))}
                  >
                    <SelectTrigger id={`${id}-status`} className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem
                          key={status.value}
                          value={status.value.toString()}
                        >
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FieldContent>
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
          <FieldSet>
            <FieldGroup className="grid-cols-2">
              <Button variant="outline" type="reset">
                {tAddNew("form.actions.reset")}
              </Button>
              <Button type="submit">{tAddNew("form.actions.submit")}</Button>
            </FieldGroup>
          </FieldSet>
        </form>
      </DialogContent>
    </Dialog>
  );
}
