"use client";

import {
  useId,
  useState,
  forwardRef,
  useImperativeHandle,
  Fragment,
} from "react";

import { eLocale } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";

import { useDropzone, FileRejection } from "react-dropzone";

import { tUndefinable, tNullable } from "@/types/nullish";

import { cn } from "@/utilities/cn";

import { toast } from "sonner";
import { Toast } from "./toasts";

import { LuGripVertical, LuTrash, LuUpload } from "react-icons/lu";

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

import { Button } from "@/components/shadcn/button";

import { ClsDateFormatter } from "@/libraries/date-formatter";

type tFieldFileUploadRef = {
  setValue: (value: tUndefinable<File>) => void;
  reset: (defaultValue?: File) => void;
};
type tFieldFileUploadProps = {
  id?: string;
  isInvalid?: boolean;
  defaultValue?: File;
  onValueChange?: (value: tUndefinable<File>) => void;
};

const FieldFileUpload = forwardRef<tFieldFileUploadRef, tFieldFileUploadProps>(
  (
    { id: idProp, isInvalid, defaultValue, onValueChange: onValueChangeProp },
    ref,
  ) => {
    const tFileUpload = useTranslations("components.fields.file-upload");

    const id = useId();
    const { isDragActive, getRootProps, getInputProps } = useDropzone({
      noClick: true,
      multiple: false,
      maxFiles: 1,
      accept: { "images/*": [".png", ".jpg", ".jpeg"] },
      onDrop: onValueChange,
    });

    const [value, setValue] = useState<tNullable<File>>(defaultValue ?? null);

    function imperativeSetValue(value: tUndefinable<File>) {
      setValue(value ?? null);
    }

    function imperativeReset(defaultValue?: File) {
      setValue(defaultValue ?? null);
    }

    useImperativeHandle(ref, () => ({
      setValue: imperativeSetValue,
      reset: imperativeReset,
    }));

    function onError(fileRejections: FileRejection[]) {
      fileRejections.forEach(({ file, errors }) => {
        toast.custom(() => (
          <Toast variant="destructive" label={file.name}>
            {errors.length <= 1 ? (
              errors[0].message
            ) : (
              <ul className="list-inside list-disc ps-1">
                {errors.map((error) => (
                  <li key={error.code}>{error.message}</li>
                ))}
                {errors.map((error) => (
                  <li key={error.code}>{error.message}</li>
                ))}
                {errors.map((error) => (
                  <li key={error.code}>{error.message}</li>
                ))}
              </ul>
            )}
          </Toast>
        ));
      });
    }

    function onValueChange(
      acceptedFiles: File[],
      fileRejections: FileRejection[],
    ) {
      onError(fileRejections);

      const file = acceptedFiles[0] ?? value;

      setValue(file);
      onValueChangeProp?.(file);
    }

    return (
      <div
        aria-invalid={isInvalid}
        className={cn(
          "aria-invalid:border-destructive border-border flex size-full flex-col items-center justify-center gap-3 rounded border-2 border-dashed p-8 duration-200",
          {
            "aria-invalid:bg-destructive/10 bg-border/60": isDragActive,
            "bg-border/60": isDragActive,
          },
        )}
        {...getRootProps()}
      >
        <div
          aria-invalid={isInvalid}
          className="aria-invalid:border-destructive/20 border-muted rounded-full border-2 p-3"
        >
          <LuUpload
            aria-invalid={isInvalid}
            className="aria-invalid:text-destructive/80 text-muted-foreground size-5"
          />
        </div>
        <div className="space-y-1 text-center">
          {value ? (
            <Fragment>
              <p
                aria-invalid={isInvalid}
                className="aria-invalid:text-destructive text-primary font-medium"
              >
                {value.name}
              </p>
              <p
                aria-invalid={isInvalid}
                className="aria-invalid:text-destructive/80 text-muted-foreground text-sm font-medium"
              >
                {tFileUpload("title")}{" "}
                {tFileUpload.rich("help", {
                  trigger: (chunk) => (
                    <label
                      aria-invalid={isInvalid}
                      htmlFor={idProp ?? id}
                      className="aria-invalid:text-destructive text-primary cursor-pointer hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {chunk}
                    </label>
                  ),
                })}
              </p>
            </Fragment>
          ) : (
            <Fragment>
              <p
                aria-invalid={isInvalid}
                className="aria-invalid:text-destructive text-primary font-medium"
              >
                {tFileUpload("title")}
              </p>
              <p
                aria-invalid={isInvalid}
                className="aria-invalid:text-destructive/80 text-muted-foreground text-sm font-medium"
              >
                {tFileUpload.rich("help", {
                  trigger: (chunk) => (
                    <label
                      aria-invalid={isInvalid}
                      htmlFor={idProp ?? id}
                      className="aria-invalid:text-destructive text-primary cursor-pointer hover:underline"
                      onClick={(e) => e.stopPropagation()} // Prevent triggering handleBoxClick
                    >
                      {chunk}
                    </label>
                  ),
                })}
              </p>
            </Fragment>
          )}
        </div>
        <input id={idProp ?? id} className="hidden" {...getInputProps()} />
      </div>
    );
  },
);

FieldFileUpload.displayName = "FieldFileUpload";

type tFieldFileUploadsRef = {
  setValues: (values: File[]) => void;
  reset: (defaultValues?: File[]) => void;
};
type tFieldFileUploadsProps = {
  id?: string;
  isInvalid?: boolean;
  defaultValues?: File[];
  onValuesChange?: (value: File[]) => void;
};

const FieldFileUploads = forwardRef<
  tFieldFileUploadsRef,
  tFieldFileUploadsProps
>(
  (
    {
      id: idProp,
      isInvalid,
      defaultValues = [],
      onValuesChange: onValuesChangeProp,
    },
    ref,
  ) => {
    const id = useId();
    const { isDragActive, getRootProps, getInputProps } = useDropzone({
      noClick: true,

      accept: { "images/*": [".png", ".jpg", ".jpeg"] },
      onDrop: onValueChange,
    });

    const [values, setValues] = useState<File[]>(defaultValues);

    const locale = useLocale() as eLocale;
    const clsDateFormatter = new ClsDateFormatter(locale);

    const tFileUploads = useTranslations("components.fields.file-uploads");
    const headers: string[] = tFileUploads.raw("table.headers");

    function imperativeSetValues(values: File[]) {
      setValues(values);
    }

    function imperativeReset(defaultValues: File[] = []) {
      setValues(defaultValues);
    }

    useImperativeHandle(ref, () => ({
      setValues: imperativeSetValues,
      reset: imperativeReset,
    }));

    function onError(fileRejections: FileRejection[]) {
      fileRejections.forEach(({ file, errors }) => {
        toast.custom(() => (
          <Toast variant="destructive" label={file.name}>
            {errors.length <= 1 ? (
              errors[0].message
            ) : (
              <ul className="list-inside list-disc ps-1">
                {errors.map((error) => (
                  <li key={error.code}>{error.message}</li>
                ))}
                {errors.map((error) => (
                  <li key={error.code}>{error.message}</li>
                ))}
                {errors.map((error) => (
                  <li key={error.code}>{error.message}</li>
                ))}
              </ul>
            )}
          </Toast>
        ));
      });
    }

    function onValueChange(
      acceptedFiles: File[],
      fileRejections: FileRejection[],
    ) {
      const valuesName = new Set(values.map((value) => value.name));

      const uniqueFiles = acceptedFiles.filter(
        (file) => !valuesName.has(file.name),
      );
      const repeatedFiles: FileRejection[] = acceptedFiles
        .filter((file) => valuesName.has(file.name))
        .map((file) => ({
          errors: [
            {
              code: tFileUploads("when-duplicates.code"),
              message: tFileUploads("when-duplicates.message"),
            },
          ],
          file,
        }));

      onError([...fileRejections, ...repeatedFiles]);

      const newValues = [...values, ...uniqueFiles];

      setValues(newValues);
      onValuesChangeProp?.(newValues);
    }

    function reorderValues(values: File[]) {
      setValues(values);
      onValuesChangeProp?.(values);
    }

    function removeValue(name: string) {
      const filteredValues = values.filter((value) => value.name !== name);

      setValues(filteredValues);
      onValuesChangeProp?.(filteredValues);
    }

    return (
      <Sortable
        orientation="mixed"
        value={values}
        getItemValue={(value) => value.name}
        onValueChange={reorderValues}
      >
        <Table className="rounded-none border">
          <TableHeader>
            <TableRow className="bg-accent/50">
              <TableHead />
              {headers.map((header) => (
                <TableHead key={header}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <SortableContent asChild>
            <TableBody>
              {values.map((value) => (
                <SortableItem asChild key={value.name} value={value.name}>
                  <TableRow>
                    <TableCell className="w-12.5">
                      <SortableItemHandle asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <LuGripVertical className="h-4 w-4" />
                        </Button>
                      </SortableItemHandle>
                    </TableCell>
                    <TableCell className="truncate font-medium">
                      {value.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {tFileUploads("table.cells.file-size", {
                        size: (value.size / 1024).toFixed(2),
                      })}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {clsDateFormatter.format(new Date(value.lastModified))}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      <Button
                        aria-invalid
                        variant="ghost"
                        size="icon"
                        onClick={() => removeValue(value.name)}
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
                <div
                  aria-invalid={isInvalid}
                  className={cn(
                    "aria-invalid:border-destructive border-border flex size-full flex-col items-center justify-center gap-3 rounded border-2 border-dashed p-8 duration-200",
                    {
                      "aria-invalid:bg-destructive/10 bg-border/60":
                        isDragActive,
                      "bg-border/60": isDragActive,
                    },
                  )}
                  {...getRootProps()}
                >
                  <div
                    aria-invalid={isInvalid}
                    className="aria-invalid:border-destructive/20 border-muted rounded-full border-2 p-3"
                  >
                    <LuUpload
                      aria-invalid={isInvalid}
                      className="aria-invalid:text-destructive/80 text-muted-foreground size-5"
                    />
                  </div>
                  <div className="space-y-1 text-center">
                    <p
                      aria-invalid={isInvalid}
                      className="aria-invalid:text-destructive text-primary font-medium"
                    >
                      {tFileUploads("title")}
                    </p>
                    <p
                      aria-invalid={isInvalid}
                      className="aria-invalid:text-destructive/80 text-muted-foreground text-sm font-medium"
                    >
                      {tFileUploads.rich("help", {
                        trigger: (chunk) => (
                          <label
                            aria-invalid={isInvalid}
                            htmlFor={idProp ?? id}
                            className="aria-invalid:text-destructive text-primary cursor-pointer hover:underline"
                            onClick={(e) => e.stopPropagation()} // Prevent triggering handleBoxClick
                          >
                            {chunk}
                          </label>
                        ),
                      })}
                    </p>
                  </div>
                  <input
                    id={idProp ?? id}
                    className="hidden"
                    {...getInputProps()}
                  />
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <SortableOverlay>
          <div className="bg-primary/10 size-full rounded" />
        </SortableOverlay>
      </Sortable>
    );
  },
);

FieldFileUploads.displayName = "FieldFileUploads";

export type { tFieldFileUploadRef, tFieldFileUploadsRef };
export { FieldFileUpload, FieldFileUploads };
