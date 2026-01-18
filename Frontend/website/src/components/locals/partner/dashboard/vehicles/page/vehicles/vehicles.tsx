"use client";

import { tUndefinable } from "@/types/nullish";

import { useTranslations } from "next-intl";

import { useRouter } from "@/i18n/navigation";
import { useId, useRef, useState } from "react";

import { eVehicleModelStatusModel } from "@/models/partner/vehicle-model";

import {
  tVehicleModelCreate,
  zVehicleModelCreate,
} from "@/validations/partner/vehicle-model";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import useVehicleModelService from "@/services/partner/vehicle-model";

import { LuCheck, LuPlus } from "react-icons/lu";

import { toast } from "sonner";
import { Toast } from "@/components/locals/blocks/toasts";

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

import { Section, Intro } from "@/components/locals/blocks/typography";
import { Description, Title } from "../../../blocks/typographies";

import VehicleModels from "./vehicle-models/vehicle-models";
import VehicleInstances from "./vehicle-instances/vehicle-instances";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/dialog";

import { Button } from "@/components/shadcn/button";
import { Separator } from "@/components/shadcn/separator";

import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/components/shadcn/field";

import {
  tFieldDatePickerRef,
  FieldTags,
  FieldNumber,
  FieldDatePicker,
} from "@/components/locals/blocks/fields";

import {
  tOption,
  tFieldSelectRef,
  tFieldFreeSelectRef,
  FieldSelect,
  FieldFreeSelect,
} from "@/components/locals/blocks/selects";

import {
  tFieldFileUploadRef,
  tFieldFileUploadsRef,
  FieldFileUpload,
  FieldFileUploads,
} from "@/components/locals/blocks/file-uploads";

import { Input } from "@/components/shadcn/input";
import { Textarea } from "@/components/shadcn/textarea";
import {
  FieldColorPickers,
  tFieldColorPickersRef,
} from "@/components/locals/blocks/color-pickers";

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

type tGroup = {
  value: string;
  placeholder: string;
  "search-placeholder": string;
  options: string[];
};

function AddNewVehicleModel() {
  const id = useId();
  const router = useRouter();

  const vehicleModelService = useVehicleModelService();

  const [isOpen, setIsOpen] = useState(false);

  const tAddNew = useTranslations(
    "app.partner.dashboard.vehicles.page.vehicles.vehicle-models.content.add-new",
  );


  const {
    formState,
    control,
    watch,
    trigger,
    reset: handleReset,
    handleSubmit,
  } = useForm<tVehicleModelCreate>({
    defaultValues: {
      gallery: [],
      name: "",
      description: "",
      marketLaunch: new Date(),
      capacity: 1,
      colors: [],
      price: 1,
      discount: 0,
      tags: [],
      status: eVehicleModelStatusModel.active,
    },
    resolver: zodResolver(zVehicleModelCreate),
  });

  const thumbnailRef = useRef<tFieldFileUploadRef>(null);
  const galleryRef = useRef<tFieldFileUploadsRef>(null);

  const categoryRef = useRef<tFieldSelectRef<tOption>>(null);

  const marketLaunchRef = useRef<tFieldDatePickerRef>(null);
  const manufacturerRef = useRef<tFieldFreeSelectRef>(null);

  const transmissionRef = useRef<tFieldSelectRef<tOption>>(null);
  const fuelRef = useRef<tFieldSelectRef<tOption>>(null);

  const colorsRef = useRef<tFieldColorPickersRef>(null);

  const statusRef = useRef<tFieldSelectRef<tOption>>(null);

  const category = watch("category");
  const categories: tOption[] = tAddNew.raw("content.form.category.categories");

  const manufacturers: tUndefinable<tGroup> = (
    tAddNew.raw("content.form.manufacturer.manufacturers") as tGroup[]
  ).find((manufacturer) => manufacturer.value === category?.toString());

  const transmissions: tUndefinable<tGroup> = (
    tAddNew.raw("content.form.transmission.transmissions") as tGroup[]
  ).find((manufacturer) => manufacturer.value === category?.toString());

  const fuels: tUndefinable<tGroup> = (
    tAddNew.raw("content.form.fuel.fuels") as tGroup[]
  ).find((manufacturer) => manufacturer.value === category?.toString());

  const statuses: tOption[] = tAddNew.raw("content.form.status.statuses");

  function reset(): void {
    handleReset();

    thumbnailRef.current?.reset();
    galleryRef.current?.reset();

    categoryRef.current?.reset();

    marketLaunchRef.current?.reset(formState.defaultValues?.marketLaunch);
    manufacturerRef.current?.reset();

    transmissionRef.current?.reset();
    fuelRef.current?.reset();

    colorsRef.current?.reset();

    statusRef.current?.reset(
      statuses.find(
        (status) =>
          status.value === formState.defaultValues?.status?.toString(),
      ),
    );
  }


  async function submit(data: tVehicleModelCreate): Promise<void> {
    const result = await vehicleModelService.create(data);
    if (!result.isSuccess) {
      toast.custom(() => (
        <Toast
          variant="destructive"
          label={tAddNew("content.form.actions.toasts.when-error")}
        />
      ));
      return;
    }

    toast.custom(() => (
      <Toast
        variant="success"
        label={tAddNew("content.form.actions.toasts.when-success")}
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
        className="flex h-[calc(100vh-2rem)] min-w-[calc(100vw-2rem)] flex-col overflow-auto"
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
          className="flex grow flex-col space-y-6"
          onReset={reset}
          onSubmit={handleSubmit(submit)}
        >
          <FieldGroup className="grid grid-cols-3 gap-6">
            <FieldGroup className="flex justify-between">
              <Controller
                control={control}
                name="name"
                render={({ field, fieldState: { invalid, error } }) => (
                  <Field>
                    <FieldLabel
                      aria-invalid={invalid}
                      htmlFor={`${id}-name`}
                      className="max-w-fit"
                    >
                      {tAddNew("content.form.name.label")}
                    </FieldLabel>
                    <FieldContent>
                      <Input
                        {...field}
                        required
                        id={`${id}-name`}
                        aria-invalid={invalid}
                        placeholder={tAddNew("content.form.name.placeholder")}
                      />
                    </FieldContent>
                    <FieldError errors={error} />
                  </Field>
                )}
              />
              <Controller
                control={control}
                name="marketLaunch"
                render={({
                  field: { value, onChange: setValue },
                  fieldState: { invalid, error },
                }) => (
                  <Field>
                    <FieldLabel
                      aria-invalid={invalid}
                      htmlFor={`${id}-market-launch`}
                      className="max-w-fit"
                    >
                      {tAddNew("content.form.market-launch.label")}
                    </FieldLabel>
                    <FieldContent>
                      <FieldDatePicker
                        ref={marketLaunchRef}
                        isRequired
                        id={`${id}-market-launch`}
                        aria-invalid={invalid}
                        placeholder={tAddNew(
                          "content.form.market-launch.placeholder",
                        )}
                        value={value}
                        setValue={setValue}
                      />
                    </FieldContent>
                    <FieldError errors={error} />
                  </Field>
                )}
              />
              <Controller
                control={control}
                name="category"
                render={({
                  field: { onChange: setValue },
                  fieldState: { invalid, error },
                }) => (
                  <Field>
                    <FieldLabel
                      aria-invalid={invalid}
                      htmlFor={`${id}-category`}
                      className="max-w-fit"
                    >
                      {tAddNew("content.form.category.label")}
                    </FieldLabel>
                    <FieldContent>
                      <FieldSelect<tOption>
                        ref={categoryRef}
                        id={`${id}-category`}
                        isInvalid={invalid}
                        placeholder={tAddNew(
                          "content.form.category.placeholder",
                        )}
                        onSelect={(option) =>
                          setValue(option && Number(option.value))
                        }
                        options={categories}
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
              <Controller
                control={control}
                name="manufacturer"
                render={({
                  field: { value, onChange: setValue },
                  fieldState: { invalid, error },
                }) => (
                  <Field>
                    <FieldLabel
                      aria-invalid={invalid}
                      htmlFor={`${id}-manufacturer`}
                      className="max-w-fit"
                    >
                      {tAddNew("content.form.manufacturer.label")}
                    </FieldLabel>
                    <FieldContent>
                      <FieldFreeSelect
                        ref={manufacturerRef}
                        id={`${id}-manufacturer`}
                        isInvalid={invalid}
                        placeholder={
                          manufacturers?.placeholder ??
                          tAddNew("content.form.manufacturer.placeholder")
                        }
                        searchPlaceholder={
                          manufacturers?.["search-placeholder"] ??
                          tAddNew(
                            "content.form.manufacturer.search-placeholder",
                          )
                        }
                        defaultValue={value}
                        onSelect={setValue}
                        options={manufacturers?.options ?? []}
                        optionRender={(option, isSelected) => (
                          <button type="button">
                            {option}
                            {isSelected && <LuCheck className="ms-auto" />}
                          </button>
                        )}
                      />
                    </FieldContent>
                    <FieldError errors={error} />
                  </Field>
                )}
              />
            </FieldGroup>

            <FieldGroup className="col-span-2 flex flex-col">
              <Controller
                control={control}
                name="description"
                render={({ field, fieldState: { invalid, error } }) => (
                  <Field className="grow">
                    <FieldLabel
                      aria-invalid={invalid}
                      htmlFor={`${id}-description`}
                      className="max-w-fit"
                    >
                      {tAddNew("content.form.description.label")}
                    </FieldLabel>
                    <FieldContent>
                      <Textarea
                        {...field}
                        required
                        id={`${id}-description`}
                        aria-invalid={invalid}
                        placeholder={tAddNew(
                          "content.form.description.placeholder",
                        )}
                        className="h-full resize-none"
                      />
                    </FieldContent>
                    <FieldError errors={error} />
                  </Field>
                )}
              />
              <Controller
                control={control}
                name="tags"
                render={({
                  field: { value, onChange: setValue },
                  fieldState: { invalid, error },
                }) => (
                  <Field>
                    <FieldLabel
                      aria-invalid={invalid}
                      htmlFor={`${id}-tags`}
                      className="max-w-fit"
                    >
                      {tAddNew("content.form.tags.label")}
                    </FieldLabel>
                    <FieldContent>
                      <FieldTags
                        id={`${id}-tags`}
                        placeholder={tAddNew("content.form.tags.placeholder")}
                        defaultValues={value}
                        onValuesChange={setValue}
                      />
                    </FieldContent>
                    <FieldError errors={error} />
                  </Field>
                )}
              />
            </FieldGroup>
          </FieldGroup>
          <FieldGroup className="grid-cols-2">
            <Controller
              control={control}
              name="capacity"
              render={({
                field: { onChange: setValue, ...field },
                fieldState: { invalid, error },
              }) => (
                <Field>
                  <Field>
                    <FieldLabel
                      aria-invalid={invalid}
                      htmlFor={`${id}-capacity`}
                      className="w-fit"
                    >
                      {tAddNew("content.form.capacity.label")}
                    </FieldLabel>
                    <FieldContent>
                      <FieldNumber
                        {...field}
                        required
                        id={`${id}-capacity`}
                        aria-invalid={invalid}
                        onValueChange={(number) => setValue(number ?? 0)}
                      />
                    </FieldContent>
                    <FieldError errors={error} />
                  </Field>
                </Field>
              )}
            />
            <Controller
              control={control}
              name="transmission"
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
                    {tAddNew("content.form.transmission.label")}
                  </FieldLabel>
                  <FieldContent>
                    <FieldFreeSelect
                      ref={manufacturerRef}
                      id={`${id}-transmission`}
                      isInvalid={invalid}
                      placeholder={
                        transmissions?.placeholder ??
                        tAddNew("content.form.transmission.placeholder")
                      }
                      searchPlaceholder={
                        transmissions?.["search-placeholder"] ??
                        tAddNew("content.form.transmission.search-placeholder")
                      }
                      defaultValue={value}
                      onSelect={setValue}
                      options={transmissions?.options ?? []}
                      optionRender={(option, isSelected) => (
                        <button type="button">
                          {option}
                          {isSelected && <LuCheck className="ms-auto" />}
                        </button>
                      )}
                    />
                  </FieldContent>
                  <FieldError errors={error} />
                </Field>
              )}
            />
            <Controller
              control={control}
              name="fuel"
              render={({
                field: { value, onChange: setValue },
                fieldState: { invalid, error },
              }) => (
                <Field>
                  <FieldLabel
                    aria-invalid={invalid}
                    htmlFor={`${id}-fuel`}
                    className="max-w-fit"
                  >
                    {tAddNew("content.form.fuel.label")}
                  </FieldLabel>
                  <FieldContent>
                    <FieldFreeSelect
                      ref={manufacturerRef}
                      id={`${id}-fuel`}
                      isInvalid={invalid}
                      placeholder={
                        fuels?.placeholder ??
                        tAddNew("content.form.fuel.placeholder")
                      }
                      searchPlaceholder={
                        fuels?.["search-placeholder"] ??
                        tAddNew("content.form.fuel.search-placeholder")
                      }
                      defaultValue={value}
                      onSelect={setValue}
                      options={fuels?.options ?? []}
                      optionRender={(option, isSelected) => (
                        <button type="button">
                          {option}
                          {isSelected && <LuCheck className="ms-auto" />}
                        </button>
                      )}
                    />
                  </FieldContent>
                  <FieldError errors={error} />
                </Field>
              )}
            />
            <Controller
              control={control}
              name="colors"
              render={({
                field: { onChange: setValues },
                fieldState: { invalid, error },
              }) => {
                return (
                  <Field>
                    <FieldLabel
                      aria-invalid={invalid}
                      htmlFor={`${id}-colors`}
                      className="max-w-fit"
                    >
                      {tAddNew("content.form.colors.label")}
                    </FieldLabel>
                    <FieldContent>
                      <FieldColorPickers
                        id={`${id}-colors`}
                        ref={colorsRef}
                        isInvalid={invalid}
                        onValuesChange={(values) => setValues(values)}
                      />
                    </FieldContent>
                    <FieldError
                      errors={
                        !Array.isArray(error)
                          ? error
                          : error.flatMap((error) => Object.values(error))
                      }
                    />
                  </Field>
                );
              }}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              control={control}
              name="thumbnail"
              render={({
                field: { value, onChange: setValue },
                fieldState: { invalid, error },
              }) => (
                <Field>
                  <FieldLabel
                    aria-invalid={invalid}
                    htmlFor={`${id}-thumbnail`}
                    className="max-w-fit"
                  >
                    {tAddNew("content.form.thumbnail.label")}
                  </FieldLabel>
                  <FieldContent>
                    <FieldFileUpload
                      ref={thumbnailRef}
                      id={`${id}-thumbnail`}
                      isInvalid={invalid}
                      defaultValue={value}
                      onValueChange={setValue}
                    />
                  </FieldContent>
                  <FieldError errors={error} />
                </Field>
              )}
            />
            <Controller
              control={control}
              name="gallery"
              render={({
                field: { value: values, onChange: setValues },
                fieldState: { invalid, error },
              }) => (
                <Field>
                  <FieldLabel
                    aria-invalid={invalid}
                    htmlFor={`${id}-gallery`}
                    className="max-w-fit"
                  >
                    {tAddNew("content.form.gallery.label")}
                  </FieldLabel>
                  <FieldContent>
                    <FieldFileUploads
                      id={`${id}-gallery`}
                      ref={galleryRef}
                      isInvalid={invalid}
                      defaultValues={values}
                      onValuesChange={setValues}
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
                field: { onChange: setValue, ...field },
                fieldState: { invalid, error },
              }) => (
                <Field>
                  <Field>
                    <FieldLabel
                      aria-invalid={invalid}
                      htmlFor={`${id}-price`}
                      className="max-w-fit"
                    >
                      {tAddNew("content.form.pricing.price.label")}
                    </FieldLabel>
                    <FieldContent>
                      <FieldNumber
                        {...field}
                        id={`${id}-price`}
                        aria-invalid={invalid}
                        onValueChange={(number) => {
                          setValue(number ?? 0);
                          if (formState.isSubmitted) trigger("discount");
                        }}
                      />
                    </FieldContent>
                    <FieldError errors={error} />
                  </Field>
                </Field>
              )}
            />
            <Controller
              control={control}
              name="discount"
              render={({
                field: { onChange: setValue, ...field },
                fieldState: { invalid, error },
              }) => (
                <Field>
                  <Field>
                    <FieldLabel
                      aria-invalid={invalid}
                      htmlFor={`${id}-discount`}
                      className="max-w-fit"
                    >
                      {tAddNew("content.form.pricing.discount.label")}
                    </FieldLabel>
                    <FieldContent>
                      <FieldNumber
                        {...field}
                        id={`${id}-discount`}
                        aria-invalid={invalid}
                        onValueChange={(number) => setValue(number ?? 0)}
                      />
                    </FieldContent>
                    <FieldError errors={error} />
                  </Field>
                </Field>
              )}
            />
          </FieldGroup>
          <Controller
            control={control}
            name="status"
            render={({
              field: { value, onChange: setValue },
              fieldState: { invalid, error },
            }) => (
              <Field>
                <FieldLabel
                  aria-invalid={invalid}
                  htmlFor={`${id}-status`}
                  className="max-w-fit"
                >
                  {tAddNew("content.form.status.label")}
                </FieldLabel>
                <FieldContent>
                  <FieldSelect<tOption>
                    ref={statusRef}
                    id={`${id}-status`}
                    isInvalid={invalid}
                    placeholder={tAddNew("content.form.status.placeholder")}
                    defaultValue={statuses.find(
                      (status) => status.value === value.toString(),
                    )}
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
          <FieldGroup className="mt-auto grid-cols-2">
            <Button variant="outline" type="reset">
              {tAddNew("content.form.actions.reset")}
            </Button>
            <Button type="submit">
              {tAddNew("content.form.actions.submit")}
            </Button>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
