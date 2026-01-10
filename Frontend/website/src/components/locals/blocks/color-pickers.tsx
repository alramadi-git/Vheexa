"use client";

import { useTranslations } from "next-intl";

import {
  ComponentProps,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";

import { IoColorPalette, IoColorPaletteOutline } from "react-icons/io5";
import { LuX } from "react-icons/lu";

import {
  ColorPicker as ShadcnColorPicker,
  ColorPickerTrigger,
  ColorPickerContent,
  ColorPickerArea,
  ColorPickerHueSlider,
  ColorPickerAlphaSlider,
  ColorPickerInput,
} from "@/components/shadcn/color-picker";

import {
  TagsInputRoot,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemText,
  TagsInputItemDelete,
} from "@diceui/tags-input";

import { Input } from "@/components/shadcn/input";
import { Button } from "@/components/shadcn/button";
import { Badge } from "@/components/shadcn/badge";

type tColor = {
  hexCode: string;
  name: string;
  tags: string[];
};

type tFieldColorPickersRef = {
  setValue: (value: tColor[]) => void;
  reset: (defaultValue?: tColor[]) => void;
};

type tFieldColorPickers = {
  id?: string;
  isInvalid?: boolean;
  defaultValues?: tColor[];
  onValuesChange?: (values: tColor[]) => void;
};

const FieldColorPickers = forwardRef<tFieldColorPickersRef, tFieldColorPickers>(
  ({ id, isInvalid, defaultValues = [], onValuesChange }, ref) => {
    const tColorPicker = useTranslations("components.fields.color-picker");

    const [hexCode, setHexCode] = useState<string>("#000000");
    const [name, setName] = useState<string>("");
    const [tags, setTags] = useState<string[]>([]);

    const [values, setValues] = useState<tColor[]>(defaultValues);

    function imperativeSetValue(values: tColor[]) {
      setValues(values);
    }

    function imperativeReset(defaultValue: tColor[] = []) {
      setValues(defaultValue);
    }

    useImperativeHandle(ref, () => ({
      setValue: imperativeSetValue,
      reset: imperativeReset,
    }));

    function remove(index: number) {
      const newValues = values.filter((_, idx) => idx !== index);

      setValues(newValues);
      onValuesChange?.(newValues);
    }

    function reset() {
      setHexCode("#000000");
      setName("");
      setTags([]);
    }

    function save(color: tColor) {
      const newValues = [...values, color];
      reset();

      setValues(newValues);
      onValuesChange?.(newValues);
    }

    return (
      <div
        aria-invalid={isInvalid}
        className="aria-invalid:border-destructive flex items-center justify-between rounded border px-3 py-1"
      >
        {values.length === 0 ? (
          <span
            aria-invalid={isInvalid}
            className="aria-invalid:text-destructive/80 text-muted-foreground truncate text-sm"
          >
            {tColorPicker("placeholder")}
          </span>
        ) : (
          <ul className="flex flex-wrap items-center gap-2">
            {values.map((color, index) => (
              <li
                key={index}
                style={{ background: color.hexCode }}
                className="size-6 rounded-full border-2"
              >
                <button
                  type="button"
                  className="inline-flex size-full items-center justify-center"
                  onClick={() => remove(index)}
                >
                  <LuX size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}
        <ShadcnColorPicker value={hexCode} onValueChange={setHexCode}>
          <ColorPickerTrigger asChild>
            <Button
              id={id}
              aria-invalid={isInvalid}
              variant="ghost"
              size="icon"
              className="size-7"
            >
              <IoColorPaletteOutline className="size-5" />
            </Button>
          </ColorPickerTrigger>
          <ColorPickerContent align="start" className="w-100">
            <ColorPickerArea />
            <div className="flex flex-1 flex-col gap-2">
              <ColorPickerHueSlider />
              <ColorPickerAlphaSlider />
            </div>
            <div className="flex items-center gap-2">
              <ColorPickerInput />
              <Button onClick={reset} className="grow">
                {tColorPicker("content.reset")}
              </Button>
              <Button
                onClick={() =>
                  save({
                    hexCode,
                    name,
                    tags,
                  })
                }
                className="grow"
              >
                {tColorPicker("content.save")}
              </Button>
            </div>
            <Input
              placeholder={tColorPicker("content.name.placeholder")}
              value={name}
              onChange={(a) => setName(a.currentTarget.value)}
            />
            <TagsInputRoot
              editable
              className="flex flex-col gap-2"
              value={tags}
              onValueChange={setTags}
            >
              <div className="border-input bg-background flex flex-wrap items-center gap-1.5 rounded border px-2.5 py-1 text-sm focus-within:ring-1 focus-within:ring-zinc-500 disabled:cursor-not-allowed disabled:opacity-50 dark:focus-within:ring-zinc-400">
                {tags.map((tag) => (
                  <TagsInputItem
                    key={tag}
                    value={tag}
                    className="inline-flex max-w-[calc(100%-8px)] items-center gap-1.5 rounded border bg-transparent px-2.5 py-1 text-sm focus:outline-hidden data-disabled:cursor-not-allowed data-disabled:opacity-50 data-editable:select-none data-editing:bg-transparent data-editing:ring-1 data-editing:ring-zinc-500 dark:data-editing:ring-zinc-400 [&:not([data-editing])]:pr-1.5 [&[data-highlighted]:not([data-editing])]:bg-zinc-200 [&[data-highlighted]:not([data-editing])]:text-black dark:[&[data-highlighted]:not([data-editing])]:bg-zinc-800 dark:[&[data-highlighted]:not([data-editing])]:text-white"
                  >
                    <TagsInputItemText className="truncate" />
                    <TagsInputItemDelete className="size-4 shrink-0 rounded opacity-70 ring-offset-zinc-950 transition-opacity hover:opacity-100">
                      <LuX size={16} />
                    </TagsInputItemDelete>
                  </TagsInputItem>
                ))}
                <TagsInputInput
                  placeholder={tColorPicker("content.tags.placeholder")}
                  className="flex-1 bg-transparent outline-hidden placeholder:text-zinc-500 disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder:text-zinc-400"
                />
              </div>
            </TagsInputRoot>
          </ColorPickerContent>
        </ShadcnColorPicker>
      </div>
    );
  },
);

FieldColorPickers.displayName = "FieldColorPickers";

export type { tFieldColorPickersRef };
export { FieldColorPickers };
