"use client";

import {
  eVehicleModelCategoryModel,
  eVehicleModelStatusModel,
} from "@/models/partner/vehicle-model";

import { eLocale } from "@/i18n/routing";

import { useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";

import useVehicleModels from "@/hooks/partner/vehicle-models";

import { ClsDateFormatter } from "@/libraries/date-formatter";
import { eCurrency, ClsMonyFormatter } from "@/libraries/mony-formatter";

import {
  tVehicleModelCreateForm,
  zVehicleModelCreateForm,
} from "@/validations/partner/vehicle-model-create-form";

import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/utilities/cn";

import {
  LuChevronDown,
  LuGripVertical,
  LuPlus,
  LuTrash,
  LuX,
} from "react-icons/lu";

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
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/components/shadcn/number-field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";
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

import { Separator } from "@/components/shadcn/separator";
import { Badge } from "@/components/shadcn/badge";
import { ScrollArea } from "@/components/shadcn/scroll-area";
import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import { Textarea } from "@/components/shadcn/textarea";

import VehicleModelTable from "./table";
import { Pagination } from "@/components/locals/blocks/pagination";

import { SearchableSelect } from "@/components/locals/blocks/selects";
import { FieldFileUpload } from "@/components/locals/blocks/fields";
import { ColorCreator } from "@/components/locals/blocks/color-pickers";

import { FullHDImage } from "@/components/locals/blocks/images";

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

export default function VehicleModels() {
  const data = useVehicleModels();
  const tVehicleModels = useTranslations(
    "app.partner.dashboard.vehicles.page.vehicles.vehicle-models",
  );

  return (
    <TabsContent value={tVehicleModels("label")} className="space-y-3">
      <AddNew />
      <VehicleModelTable data={data} />
      {data.result?.isSuccess && (
        <Pagination pagination={data.result.pagination} />
      )}
    </TabsContent>
  );
}

function AddNew() {
  const locale = useLocale() as eLocale;

  const clsDateFormatter = new ClsDateFormatter(locale);
  const clsMonyFormatter = new ClsMonyFormatter(locale, eCurrency[locale]);

  const tAddNew = useTranslations(
    "app.partner.dashboard.vehicles.page.vehicles.vehicle-models.add-new",
  );

  const { control, formState, watch, setValue, trigger, reset, handleSubmit } =
    useForm<tVehicleModelCreateForm>({
      defaultValues: {
        name: "", // info
        description: "", // info
        tags: "", // info
        modelYear: 1980, // info
        category: eVehicleModelCategoryModel.car, // info
        manufacturer: "", // info
        capacity: 1, // specs
        transmission: "", // specs
        fuel: "", // specs
        colors: [], // specs
        thumbnail: undefined, // media
        images: [], // media
        price: 1, // prices
        discount: 0, // prices
        status: eVehicleModelStatusModel.active, // statues,
      },
      resolver: zodResolver(zVehicleModelCreateForm),
    });

  const category = watch("category");
  const categories: tEnumOption[] = useMemo(
    () => tAddNew.raw("form.info.category.categories"),
    [tAddNew],
  );

  const manufacturers: tManufacturer["manufacturers"] = useMemo(
    () =>
      (
        tAddNew.raw("form.info.manufacturer.manufacturers") as tManufacturer[]
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

  const colors = useFieldArray({
    control: control,
    name: "colors",
  });

  const statuses: tEnumOption[] = useMemo(
    () => tAddNew.raw("form.status.statuses"),
    [tAddNew],
  );

  const imageTableHeaders: string[] = tAddNew.raw(
    "form.media.images.table.headers",
  );

  function onSubmit(data: tVehicleModelCreateForm): void {}

  function onReset(): void {
    reset();
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
        className="h-[calc(100vh-2rem)] min-w-[calc(100vw-2rem)] p-0"
      >
        <ScrollArea className="overflow-hidden p-12">
          <DialogHeader>
            <DialogTitle className="text-4xl">{tAddNew("title")}</DialogTitle>
            <DialogDescription className="text-lg">
              {tAddNew("description")}
            </DialogDescription>
          </DialogHeader>
          <Separator className="mt-1 mb-6" />

          <form
            className="grid grow gap-6 2xl:grid-cols-3"
            onSubmit={handleSubmit(onSubmit)}
            onReset={onReset}
          >
            <FieldGroup className="2xl:col-span-2">
              <FieldSet className="grid grid-cols-3 gap-6">
                <FieldGroup className="flex justify-between">
                  <Controller
                    control={control}
                    name="name"
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="name">
                          {tAddNew("form.info.name.label")}
                        </FieldLabel>
                        <FieldContent>
                          <Input
                            {...field}
                            required
                            id="name"
                            placeholder={tAddNew("form.info.name.placeholder")}
                          />
                        </FieldContent>
                        <FieldError errors={[fieldState.error]} />
                      </Field>
                    )}
                  />
                  <Controller
                    control={control}
                    name="modelYear"
                    render={({ field: { onChange, ...field }, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="model-year">
                          {tAddNew("form.info.model-year.label")}
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
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="category">
                          {tAddNew("form.info.category.label")}
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
                          {tAddNew("form.info.manufacturer.label")}
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
                                      "form.info.manufacturer.when-no-value",
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
                                "form.info.manufacturer.when-no-value",
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
                                    "form.info.manufacturer.when-invalid-category",
                                  )
                                : tAddNew(
                                    "form.info.manufacturer.when-no-result",
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
                        <FieldLabel htmlFor="description">
                          {tAddNew("form.info.description.label")}
                        </FieldLabel>
                        <FieldContent>
                          <Textarea
                            {...field}
                            required
                            id="description"
                            placeholder={tAddNew(
                              "form.info.description.placeholder",
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
                        <FieldLabel htmlFor="tags">
                          {tAddNew("form.info.tags.label")}
                        </FieldLabel>
                        <FieldContent>
                          <Input {...field} required id="tags" />
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
                    render={({ field: { onChange, ...field }, fieldState }) => (
                      <Field>
                        <Field>
                          <FieldLabel htmlFor="capacity">
                            {tAddNew("form.specs.capacity.label")}
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
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="transmission">
                          {tAddNew("form.specs.transmission.label")}
                        </FieldLabel>
                        <FieldContent>
                          <SearchableSelect
                            triggerRender={() => (
                              <Button
                                id="transmission"
                                role="combobox"
                                variant="outline"
                                className="bg-background hover:bg-background border-input w-full justify-start rounded px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
                              >
                                {field.value === "" ? (
                                  <span className="text-muted-foreground truncate">
                                    {tAddNew("form.specs.fuel.when-no-value")}
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
                                "form.specs.transmission.when-no-value",
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
                                    {tAddNew("form.specs.fuel.when-no-value")}
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
                                "form.specs.fuel.when-no-value",
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
                                    "form.specs.fuel.when-invalid-category",
                                  )
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
            </FieldGroup>

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
                            value={
                              field.value === undefined ? [] : [field.value]
                            }
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
                  name="images"
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor="images">
                        {tAddNew("form.media.images.label")}
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
                                {imageTableHeaders.map((header) => (
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
                                    key={file.lastModified}
                                    value={file.lastModified}
                                    asChild
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
                                          "form.media.images.table.cells.file-size",
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
                    render={({ field: { onChange, ...field }, fieldState }) => (
                      <Field>
                        <Field>
                          <FieldLabel htmlFor="price">
                            {tAddNew("form.pricing.price.label")}
                          </FieldLabel>
                          <FieldContent>
                            <NumberField
                              {...field}
                              id="price"
                              format={clsMonyFormatter.options}
                              onValueChange={(value) => {
                                onChange(value);
                                if (formState.isSubmitted) trigger("discount");
                              }}
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
                    name="discount"
                    render={({ field: { onChange, ...field }, fieldState }) => (
                      <Field>
                        <Field>
                          <FieldLabel htmlFor="discount">
                            {tAddNew("form.pricing.discount.label")}
                          </FieldLabel>
                          <FieldContent>
                            <NumberField
                              {...field}
                              id="discount"
                              format={clsMonyFormatter.options}
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
                </FieldGroup>
              </FieldSet>

              <Controller
                control={control}
                name="status"
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="status">
                      {tAddNew("form.status.label")}
                    </FieldLabel>
                    <FieldContent>
                      <Select
                        value={field.value.toString()}
                        onValueChange={(value) => field.onChange(Number(value))}
                      >
                        <SelectTrigger id="status" className="w-full">
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

              <FieldGroup className="grid-cols-2">
                <Button type="submit" className="mt-auto">
                  submit
                </Button>
                <Button type="reset" className="mt-auto">
                  Reset
                </Button>
              </FieldGroup>
            </FieldGroup>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
