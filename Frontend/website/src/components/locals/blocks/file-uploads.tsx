"use client";

import {
  forwardRef,
  ReactNode,
  useState,
  useCallback,
  useImperativeHandle,
} from "react";

import { useTranslations } from "next-intl";

import { tUndefinable } from "@/types/nullish";

import { toast } from "sonner";
import { Toast } from "./toasts";

import { LuUpload, LuX } from "react-icons/lu";

import {
  FileUpload,
  FileUploadDropzone,
  FileUploadTrigger,
} from "@/components/shadcn/file-upload";

import { Button } from "@/components/shadcn/button";
import { FullHDImage } from "./images";
import { cn } from "@/utilities/cn";

type tFieldFileUploadRef = {
  setValue: (value: File) => void;
  reset: (defaultValue?: File) => void;
};
type tFieldFileUploadProps = {
  id?: string;
  isInvalid?: boolean;
  defaultValue?: File;
  imageClassName?: string;
  onValueChange?: (value: tUndefinable<File>) => void;
};

const FieldFileUpload = forwardRef<tFieldFileUploadRef, tFieldFileUploadProps>(
  (
    {
      id,
      isInvalid,
      defaultValue,
      imageClassName,
      onValueChange: onValueChangeProp,
    },
    ref,
  ) => {
    const tFileUpload = useTranslations("components.fields.file-upload");

    const [value, setValue] = useState<tUndefinable<File>>(defaultValue);

    function imperativeSetValue(value: tUndefinable<File>) {
      setValue(value);
    }

    function imperativeReset(defaultValue?: File) {
      setValue(defaultValue);
    }

    useImperativeHandle(ref, () => ({
      setValue: imperativeSetValue,
      reset: imperativeReset,
    }));

    const changeValue = useCallback(
      (file: tUndefinable<File>) => {
        setValue(file);
        onValueChangeProp?.(file);
      },
      [setValue, onValueChangeProp],
    );

    const onValueChange = useCallback(
      (files: File[]) => {
        const file: tUndefinable<File> = files[0];
        changeValue(file);
      },
      [changeValue],
    );

    const onFileReject = useCallback((file: File, message: string) => {
      toast.custom(() => <Toast variant="destructive" label={message} />);
    }, []);

    return (
      <FileUpload
        maxFiles={1}
        value={value ? [value] : []}
        onValueChange={onValueChange}
        onFileReject={onFileReject}
      >
        {value ? (
          <div className="border-input ring-input/20 aria-invalid:border-destructive aria-invalid:ring-destructive/20 relative rounded border-2 border-dashed p-1 ring">
            <FullHDImage
              src={URL.createObjectURL(value)}
              alt={value.name}
              className={cn(
                "mx-auto w-fit rounded object-contain brightness-65",
                imageClassName,
              )}
            />
            <button
              type="button"
              className="absolute top-0 left-0 inline-flex size-full items-center justify-center rounded text-white opacity-0 backdrop-blur-[1px] duration-100 hover:opacity-100"
              onClick={() => changeValue(undefined)}
            >
              <LuX className="size-1/2" />
            </button>
          </div>
        ) : (
          <FileUploadDropzone
            aria-invalid={isInvalid}
            className="aria-invalid:border-destructive aria-invalid:ring-destructive/20 size-full"
          >
            <div className="flex flex-col items-center gap-1 text-center">
              <div>
                <LuUpload
                  aria-invalid={isInvalid}
                  size={46}
                  className="aria-invalid:border-destructive text-muted-foreground aria-invalid:text-destructive/80 rounded-full border p-2.5"
                />
              </div>
              <p
                aria-invalid={isInvalid}
                className="aria-invalid:text-destructive text-sm font-medium"
              >
                {tFileUpload("title")}
              </p>
              <p
                aria-invalid={isInvalid}
                className="aria-invalid:text-destructive/80 text-muted-foreground text-xs"
              >
                {tFileUpload("subtitle")}
              </p>
            </div>
            <FileUploadTrigger asChild>
              <Button
                id={id}
                aria-invalid={isInvalid}
                variant="outline"
                size="sm"
                className="mt-2 w-fit"
              >
                {tFileUpload("trigger")}
              </Button>
            </FileUploadTrigger>
          </FileUploadDropzone>
        )}
      </FileUpload>
    );
  },
);

FieldFileUpload.displayName = "FieldFileUpload";

export type { tFieldFileUploadRef };
export { FieldFileUpload };
