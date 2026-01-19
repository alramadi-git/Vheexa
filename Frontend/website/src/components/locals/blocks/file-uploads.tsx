"use client";

import { forwardRef, useState, useImperativeHandle, useCallback } from "react";

import { eLocale } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";

import { toast } from "sonner";
import { Toast } from "./toasts";

import { LuGripVertical, LuTrash, LuUpload } from "react-icons/lu";

import {
  FileUpload,
  FileUploadDropzone,
  FileUploadTrigger,
} from "@/components/shadcn/file-upload";

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

import { tNullish, tUndefinable } from "@/types/nullish";

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
  ({ id, isInvalid, defaultValue, onValueChange: onValueChangeProp }, ref) => {
    const tFileUpload = useTranslations("components.fields.file-upload");

    const [value, setValue] = useState<[] | [File]>(
      defaultValue ? [defaultValue] : [],
    );

    function imperativeSetValue(value: tUndefinable<File>) {
      setValue(value ? [value] : []);
    }

    function imperativeReset(defaultValue?: File) {
      setValue(defaultValue ? [defaultValue] : []);
    }

    useImperativeHandle(ref, () => ({
      setValue: imperativeSetValue,
      reset: imperativeReset,
    }));

    const changeValue = useCallback(
      (file: File) => {
        setValue([file]);
        onValueChangeProp?.(file);
      },
      [setValue, onValueChangeProp],
    );

    const onValueChange = useCallback(
      (files: File[]): void => changeValue(files.at(-1)!),
      [changeValue],
    );

    const onFileReject = useCallback((file: File, message: string) => {
      toast.custom(() => <Toast variant="destructive" label={message} />);
    }, []);

    return (
      <FileUpload
        accept="image/*"
        value={value}
        onValueChange={onValueChange}
        onFileReject={onFileReject}
      >
        <FileUploadDropzone
          aria-invalid={isInvalid}
          className="aria-invalid:border-destructive aria-invalid:ring-destructive/20 size-full space-y-1 text-center"
        >
          <LuUpload
            aria-invalid={isInvalid}
            size={46}
            className="aria-invalid:border-destructive text-muted-foreground aria-invalid:text-destructive/80 rounded-full border p-2.5"
          />
          <p
            aria-invalid={isInvalid}
            className="aria-invalid:text-destructive max-w-fll line-clamp-1 text-sm font-medium"
          >
            {tFileUpload("title")}
          </p>
          <p
            aria-invalid={isInvalid}
            className="aria-invalid:text-destructive/80 text-muted-foreground line-clamp-1 text-xs"
          >
            {value.length !== 0 ? value[0].name : tFileUpload("subtitle")}
          </p>
          <FileUploadTrigger asChild>
            <Button
              id={id}
              aria-invalid={isInvalid}
              variant="outline"
              size="sm"
              className="mt-2 line-clamp-1 max-w-full text-wrap"
            >
              {tFileUpload("trigger")}
            </Button>
          </FileUploadTrigger>
        </FileUploadDropzone>
      </FileUpload>
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
    { id, isInvalid, defaultValues = [], onValuesChange: onValuesChangeProp },
    ref,
  ) => {
    const locale = useLocale() as eLocale;
    const clsDateFormatter = new ClsDateFormatter(locale);

    const tFileUploads = useTranslations("components.fields.file-uploads");
    const headers: string[] = tFileUploads.raw("table.headers");

    const [values, setValues] = useState<File[]>(defaultValues);

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

    const changeValues = useCallback(
      (files: File[]): void => {
        setValues(files);
        onValuesChangeProp?.(files);
      },
      [setValues, onValuesChangeProp],
    );

    const onFileReject = useCallback((file: File, message: string): void => {
      toast.custom(() => <Toast variant="destructive" label={message} />);
    }, []);

    const onFileValidate = useCallback(
      (file: File): tNullish<string> => {
        if (values.find((value) => value.name === file.name))
          return tFileUploads("when-duplicates");

        return null;
      },
      [values, tFileUploads],
    );

    return (
      <Sortable
        orientation="mixed"
        value={values}
        getItemValue={(value) => value.name}
        onValueChange={(values) => changeValues([...values])}
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
                    <TableCell className="w-[50px]">
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
                        onClick={() =>
                          changeValues(
                            values.filter(({ name }) => name !== value.name),
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
                <FileUpload
                  id={id}
                  disabled={values.length === 25}
                  multiple
                  maxFiles={25}
                  accept="image/*"
                  value={values}
                  onFileValidate={onFileValidate}
                  onFileReject={onFileReject}
                  onValueChange={changeValues}
                >
                  <FileUploadDropzone
                    aria-invalid={isInvalid}
                    className="aria-invalid:border-destructive aria-invalid:ring-destructive/20 size-full space-y-1 text-center"
                  >
                    <LuUpload
                      aria-invalid={isInvalid}
                      size={46}
                      className="aria-invalid:border-destructive text-muted-foreground aria-invalid:text-destructive/80 rounded-full border p-2.5"
                    />
                    <p
                      aria-invalid={isInvalid}
                      className="aria-invalid:text-destructive max-w-fll line-clamp-1 text-sm font-medium"
                    >
                      {tFileUploads("title")}
                    </p>
                    <p
                      aria-invalid={isInvalid}
                      className="aria-invalid:text-destructive/80 text-muted-foreground line-clamp-1 text-xs"
                    >
                      {tFileUploads("subtitle")}
                    </p>
                    <FileUploadTrigger asChild>
                      <Button
                        id={id}
                        aria-invalid={isInvalid}
                        variant="outline"
                        size="sm"
                        className="mt-2 line-clamp-1 max-w-full text-wrap"
                      >
                        {tFileUploads("trigger")}
                      </Button>
                    </FileUploadTrigger>
                  </FileUploadDropzone>
                </FileUpload>
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
