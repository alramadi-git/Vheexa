"use client";

import {
  forwardRef,
  useState,
  useCallback,
  useImperativeHandle,
  ComponentProps,
} from "react";

import { eLocale } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";

import { toast } from "sonner";
import { Toast } from "./toasts";

import { LuGripVertical, LuUpload } from "react-icons/lu";

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
} from "@/components/shadcn/sortable";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table";

import { Button } from "@/components/shadcn/button";

import { tUndefinable } from "@/types/nullish";

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
  onValuesChange?: (values: File[]) => void;
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

    const tFileUpload = useTranslations("components.fields.file-uploads");
    const headers: string[] = tFileUpload.raw(
      "components.fields.file-uploads.table.headers",
    );

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

    const changeValue = useCallback(
      (files: File[]) => {
        setValues(files);
        onValuesChangeProp?.(files);
      },
      [setValues, onValuesChangeProp],
    );

    const onValuesChange = useCallback(
      (files: File[]): void => changeValue(files),
      [changeValue],
    );

    const onFileReject = useCallback((file: File, message: string) => {
      toast.custom(() => <Toast variant="destructive" label={message} />);
    }, []);

    return (
      <Sortable
        orientation="mixed"
        value={values}
        getItemValue={(value) => value.name}
        onValueChange={onValuesChange}
      >
        <Table className="rounded-none border">
          <TableHeader>
            <TableRow className="bg-accent/50">
              <TableHead className="bg-transparent" />
              {headers.map((header) => (
                <TableHead key={header} className="bg-transparent">
                  {header}
                </TableHead>
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
                    <TableCell className="max-w-16 truncate font-medium">
                      {value.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {tFileUpload("cells.file-size", {
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
                        type="button"
                        onClick={() => {
                          const files = value.filter(
                            (f) => f.name !== value.name,
                          );

                          setValue(files);
                          galleryRef.current?.changeValue(files);
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
                    "cursor-not-allowed opacity-50": value.length === 25,
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

      // <FileUpload
      //   value={values}
      //   onValueChange={onValueChange}
      //   onFileReject={onFileReject}
      // >
      //   <FileUploadDropzone
      //     aria-invalid={isInvalid}
      //     className="aria-invalid:border-destructive aria-invalid:ring-destructive/20 size-full space-y-1 text-center"
      //   >
      //     <LuUpload
      //       aria-invalid={isInvalid}
      //       size={46}
      //       className="aria-invalid:border-destructive text-muted-foreground aria-invalid:text-destructive/80 rounded-full border p-2.5"
      //     />
      //     <p
      //       aria-invalid={isInvalid}
      //       className="aria-invalid:text-destructive max-w-fll line-clamp-1 text-sm font-medium"
      //     >
      //       {tFileUpload("title")}
      //     </p>
      //     <p
      //       aria-invalid={isInvalid}
      //       className="aria-invalid:text-destructive/80 text-muted-foreground line-clamp-1 text-xs"
      //     >

      //     </p>
      //     <FileUploadTrigger asChild>
      //       <Button
      //         id={id}
      //         aria-invalid={isInvalid}
      //         variant="outline"
      //         size="sm"
      //         className="mt-2 line-clamp-1 max-w-full text-wrap"
      //       >
      //         {tFileUpload("trigger")}
      //       </Button>
      //     </FileUploadTrigger>
      //   </FileUploadDropzone>
      // </FileUpload>
    );
  },
);

FieldFileUploads.displayName = "FieldFileUploads";

export type { tFieldFileUploadRef, tFieldFileUploadsRef };
export { FieldFileUpload, FieldFileUploads };
