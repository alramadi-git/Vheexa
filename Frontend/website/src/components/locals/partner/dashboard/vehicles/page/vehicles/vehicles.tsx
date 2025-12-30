"use client";

import { tNullable, tUndefinable } from "@/types/nullish";

import { useLocale, useTranslations } from "next-intl";

import { eLocale } from "@/i18n/routing";
import { ClsDateFormatter } from "@/libraries/date-formatter";

import { useRouter } from "@/i18n/navigation";
import { useId, useMemo, useRef, useState } from "react";

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

import { ClsVehicleModelService } from "@/services/partner/vehicle-model";

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

import { Section, Intro, Toast } from "@/components/locals/blocks/typography";
import { Description, Title } from "../../../blocks/typographies";

import { Button } from "@/components/shadcn/button";
import { Separator } from "@/components/shadcn/separator";

import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/shadcn/field";
import {
  FieldDatePicker,
  FieldFileUpload,
  FieldNumber,
  FieldTags,
  tFieldDatePickerRef,
  tFileUploadRef,
} from "@/components/locals/blocks/fields";
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
import { SearchableSelect } from "@/components/locals/blocks/selects";
import { ColorCreator } from "@/components/locals/blocks/color-pickers";

import { Input } from "@/components/shadcn/input";
import { Textarea } from "@/components/shadcn/textarea";
import { Badge } from "@/components/shadcn/badge";
import { FullHDImage } from "@/components/locals/blocks/images";

import { cn } from "@/utilities/cn";
import { toast } from "sonner";

import VehicleModels from "./vehicle-models/vehicle-models";
import VehicleInstances from "./vehicle-instances/vehicle-instances";

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

            <VehicleModels />
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
  "select-placeholder": string;
  "search-placeholder": string;
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
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const marketLaunchRef = useRef<tNullable<tFieldDatePickerRef>>(null);
  const thumbnailRef = useRef<tNullable<tFileUploadRef>>(null);
  const galleryRef = useRef<tNullable<tFileUploadRef>>(null);

  const locale = useLocale() as eLocale;

  const clsDateFormatter = new ClsDateFormatter(locale);

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
      tags: [],
      marketLaunch: new Date(),
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

  const tAddNew = useTranslations(
    "app.partner.dashboard.vehicles.page.vehicles.vehicle-models.content.add-new",
  );

  const colors = useFieldArray({
    control: control,
    name: "colors",
  });

  const category = watch("category");
  const categories: tEnumOption[] = tAddNew.raw(
    "content.form.information.category.categories",
  );

  const manufacturers: tUndefinable<tManufacturer> = useMemo(
    () =>
      (
        tAddNew.raw(
          "content.form.information.manufacturer.manufacturers",
        ) as tManufacturer[]
      ).find((manufacturer) => manufacturer.value === category),
    [tAddNew, category],
  );
  const transmissions: tTransmission["transmissions"] = useMemo(
    () =>
      (
        tAddNew.raw(
          "content.form.specs.transmission.transmissions",
        ) as tTransmission[]
      ).find((manufacturer) => manufacturer.value === category)
        ?.transmissions ?? [],
    [tAddNew, category],
  );
  const fuels: tFuel["fuels"] = useMemo(
    () =>
      (tAddNew.raw("content.form.specs.fuel.fuels") as tFuel[]).find(
        (manufacturer) => manufacturer.value === category,
      )?.fuels ?? [],
    [tAddNew, category],
  );

  const statuses: tEnumOption[] = tAddNew.raw("content.form.status.statuses");

  const galleryHeaders: string[] = tAddNew.raw(
    "content.form.media.gallery.table.headers",
  );

  const clsVehicleModelService = new ClsVehicleModelService();

  function reset(): void {
    handleReset();

    marketLaunchRef.current?.reset(formState.defaultValues?.marketLaunch);

    thumbnailRef.current?.reset(
      formState.defaultValues?.thumbnail && [formState.defaultValues.thumbnail],
    );
    galleryRef.current?.reset(
      formState.defaultValues?.gallery as tUndefinable<File[]>,
    );
  }

  async function submit(data: tVehicleModelCreateForm): Promise<void> {
    const result = await clsVehicleModelService.addAsync(data);
    if (!result.isSuccess) {
      toast.custom(() => (
        <Toast
          variant="destructive"
          label={tAddNew("content.form.toasts.when-error")}
        />
      ));
      return;
    }

    toast.custom(() => (
      <Toast
        variant="success"
        label={tAddNew("content.form.toasts.when-success")}
      />
    ));

    setIsOpen(false);
    router.refresh();
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
          <DialogTitle className="text-3xl">
            {tAddNew("content.title")}
          </DialogTitle>
          <DialogDescription className="text-base">
            {tAddNew("content.description")}
          </DialogDescription>
        </DialogHeader>
        <Separator className="mt-1 mb-6" />

        <form
          className="grid grow gap-6 2xl:grid-cols-3"
          onReset={reset}
          onSubmit={handleSubmit(submit)}
        >
          <FieldGroup className="2xl:col-span-2">
            <FieldSet className="grid grid-cols-3 gap-6">
              <FieldGroup className="flex justify-between">
                <Controller
                  control={control}
                  name="name"
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel
                        aria-invalid={fieldState.invalid}
                        htmlFor={`${id}-name`}
                        className="max-w-fit"
                      >
                        {tAddNew("content.form.information.name.label")}
                      </FieldLabel>
                      <FieldContent>
                        <Input
                          {...field}
                          required
                          aria-invalid={fieldState.invalid}
                          id={`${id}-name`}
                          placeholder={tAddNew(
                            "content.form.information.name.placeholder",
                          )}
                        />
                      </FieldContent>
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />
                <Controller
                  control={control}
                  name="marketLaunch"
                  render={({
                    field: { value, onChange: setValue },
                    fieldState,
                  }) => (
                    <Field>
                      <FieldLabel
                        aria-invalid={fieldState.invalid}
                        htmlFor={`${id}-market-launch`}
                        className="max-w-fit"
                      >
                        {tAddNew(
                          "content.form.information.market-launch.label",
                        )}
                      </FieldLabel>
                      <FieldContent>
                        <FieldDatePicker
                          ref={marketLaunchRef}
                          aria-invalid={fieldState.invalid}
                          isRequired
                          id={`${id}-market-launch`}
                          placeholder={tAddNew(
                            "content.form.information.market-launch.placeholder",
                          )}
                          value={value}
                          setValue={setValue}
                        />
                      </FieldContent>
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />
                <Controller
                  control={control}
                  name="category"
                  render={({
                    field: { value, onChange: setValue, ...field },
                    fieldState,
                  }) => (
                    <Field>
                      <FieldLabel
                        aria-invalid={fieldState.invalid}
                        htmlFor={`${id}-category`}
                        className="max-w-fit"
                      >
                        {tAddNew("content.form.information.category.label")}
                      </FieldLabel>
                      <FieldContent>
                        <Select
                          {...field}
                          value={value.toString()}
                          onValueChange={(value) => {
                            setValue("manufacturer", "");
                            setValue("transmission", "");
                            setValue("fuel", "");

                            if (formState.isSubmitted) {
                              trigger("manufacturer");
                              trigger("transmission");
                              trigger("fuel");
                            }

                            setValue(Number(value));
                          }}
                        >
                          <SelectTrigger
                            id={`${id}-category`}
                            className="w-full"
                          >
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
                      <FieldLabel
                        aria-invalid={fieldState.invalid}
                        htmlFor={`${id}-manufacturer`}
                        className="max-w-fit"
                      >
                        {tAddNew("content.form.information.manufacturer.label")}
                      </FieldLabel>
                      <FieldContent>
                        <SearchableSelect
                          triggerRender={() => (
                            <Button
                              id={`${id}-manufacturer`}
                              variant="outline"
                              className="bg-background hover:bg-background border-input w-full justify-start rounded px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
                            >
                              {field.value === "" ? (
                                <span className="text-muted-foreground truncate">
                                  {manufacturers?.["select-placeholder"]}
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
                            placeholder: manufacturers?.["search-placeholder"],
                          }}
                          onSelect={field.onChange}
                          list={manufacturers?.manufacturers ?? []}
                          itemRender={(item) => (
                            <button className="w-full">{item.value}</button>
                          )}
                          whenNoResultRender={() =>
                            tAddNew(
                              "content.form.information.manufacturer.when-no-result",
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
                        aria-invalid={fieldState.invalid}
                        htmlFor={`${id}-description`}
                        className="max-w-fit"
                      >
                        {tAddNew("content.form.information.description.label")}
                      </FieldLabel>
                      <FieldContent>
                        <Textarea
                          {...field}
                          required
                          id={`${id}-description`}
                          placeholder={tAddNew(
                            "content.form.information.description.placeholder",
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
                  render={({
                    field: { value, onChange: setValue },
                    fieldState,
                  }) => (
                    <Field>
                      <FieldLabel
                        aria-invalid={fieldState.invalid}
                        htmlFor={`${id}-tags`}
                        className="max-w-fit"
                      >
                        {tAddNew("content.form.information.tags.label")}
                      </FieldLabel>
                      <FieldContent>
                        <FieldTags
                          id={`${id}-tags`}
                          placeholder={tAddNew(
                            "content.form.information.tags.placeholder",
                          )}
                          tags={value}
                          onTagsChange={setValue}
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
                          {tAddNew("content.form.specs.capacity.label")}
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
                        {tAddNew("content.form.specs.transmission.label")}
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
                                  {tAddNew(
                                    "content.form.specs.fuel.placeholder",
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
                              "content.form.specs.transmission.placeholder",
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
                                  "content.form.specs.transmission.when-invalid-category",
                                )
                              : tAddNew(
                                  "content.form.specs.transmission.when-no-result",
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
                      <FieldLabel
                        aria-invalid={fieldState.invalid}
                        htmlFor="fuel"
                        className="max-w-fit"
                      >
                        {tAddNew("content.form.specs.fuel.label")}
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
                                  {tAddNew(
                                    "content.form.specs.fuel.placeholder",
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
                              "content.form.specs.fuel.placeholder",
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
                                  "content.form.specs.fuel.when-invalid-category",
                                )
                              : tAddNew(
                                  "content.form.specs.fuel.when-no-result",
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
                  name="colors"
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel
                        aria-invalid={fieldState.invalid}
                        htmlFor="colors"
                        className="max-w-fit"
                      >
                        {tAddNew("content.form.specs.colors.label")}
                      </FieldLabel>
                      <FieldContent className="flex flex-row items-center justify-between rounded border ps-3">
                        {field.value.length === 0 ? (
                          <span className="text-muted-foreground truncate">
                            {tAddNew("content.form.specs.colors.placeholder")}
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
          </FieldGroup>

          <FieldSet>
            <FieldGroup>
              <Controller
                control={control}
                name="thumbnail"
                render={({
                  field: { value, onChange: setValue },
                  fieldState,
                }) => (
                  <Field>
                    <FieldLabel
                      aria-invalid={fieldState.invalid}
                      htmlFor={`${id}-thumbnail`}
                      className="max-w-fit"
                    >
                      {tAddNew("content.form.media.thumbnail.label")}
                    </FieldLabel>
                    <FieldContent>
                      {value ? (
                        <div className="relative rounded p-px">
                          <FullHDImage
                            src={URL.createObjectURL(value)}
                            alt={value.name}
                            className="dark:bg-sidebar-border h-68 rounded bg-black object-contain brightness-75"
                          />
                          <button
                            type="button"
                            className="light:text-white absolute top-2 right-2"
                            onClick={() => {
                              setValue(undefined);
                              thumbnailRef.current?.changeValue([]);
                            }}
                          >
                            <LuX size={24} />
                          </button>
                        </div>
                      ) : (
                        <FieldFileUpload
                          aria-invalid={fieldState.invalid}
                          id={`${id}-thumbnail`}
                          accept="image/*"
                          maxFiles={1}
                          value={value === undefined ? [] : [value]}
                          setValue={(files) => setValue(files[0])}
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
                render={({
                  field: { value, onChange: setValue },
                  fieldState,
                }) => (
                  <Field>
                    <FieldLabel
                      aria-invalid={fieldState.invalid}
                      htmlFor={`${id}-gallery`}
                      className="max-w-fit"
                    >
                      {tAddNew("content.form.media.gallery.label")}
                    </FieldLabel>
                    <FieldContent>
                      <Sortable
                        orientation="mixed"
                        value={value}
                        getItemValue={(value) => value.name}
                        onValueChange={(value) => {
                          setValue(value);
                          galleryRef.current?.changeValue(value);
                        }}
                      >
                        <Table className="rounded-none border">
                          <TableHeader>
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
                              {value.map((file) => (
                                <SortableItem
                                  asChild
                                  key={file.name}
                                  value={file.name}
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
                                    <TableCell className="max-w-16 truncate font-medium">
                                      {file.name}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                      {tAddNew(
                                        "content.form.media.gallery.table.cells.file-size",
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
                                        aria-invalid
                                        variant="ghost"
                                        type="button"
                                        onClick={() => {
                                          const files = value.filter(
                                            (f) => f.name !== file.name,
                                          );

                                          setValue(files);
                                          galleryRef.current?.changeValue(
                                            files,
                                          );
                                        }}
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
                                  ref={galleryRef}
                                  id={`${id}-gallery`}
                                  accept="image/*"
                                  maxFiles={25}
                                  className={cn({
                                    "cursor-not-allowed opacity-50":
                                      value.length === 25,
                                  })}
                                  disabled={value.length === 25}
                                  value={value}
                                  setValue={setValue}
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

          <FieldSet className="2xl:col-span-3">
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
                      <FieldLabel
                        aria-invalid={fieldState.invalid}
                        htmlFor="price"
                        className="max-w-fit"
                      >
                        {tAddNew("content.form.pricing.price.label")}
                      </FieldLabel>
                      <FieldContent>
                        <FieldNumber
                          {...field}
                          aria-invalid={fieldState.invalid}
                          id={`${id}-price`}
                          onValueChange={(number) => {
                            setValue(number ?? 0);
                            trigger("discount");
                          }}
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
                      <FieldLabel
                        aria-invalid={fieldState.invalid}
                        htmlFor="discount"
                        className="max-w-fit"
                      >
                        {tAddNew("content.form.pricing.discount.label")}
                      </FieldLabel>
                      <FieldContent>
                        <FieldNumber
                          {...field}
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

          <Controller
            control={control}
            name="status"
            render={({
              field: { value, onChange: setValue, ...field },
              fieldState,
            }) => (
              <Field>
                <FieldLabel
                  aria-invalid={fieldState.invalid}
                  htmlFor={`${id}-status`}
                  className="max-w-fit"
                >
                  {tAddNew("content.form.status.label")}
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
                {tAddNew("content.form.actions.reset")}
              </Button>
              <Button type="submit">
                {tAddNew("content.form.actions.submit")}
              </Button>
            </FieldGroup>
          </FieldSet>
        </form>
      </DialogContent>
    </Dialog>
  );
}
