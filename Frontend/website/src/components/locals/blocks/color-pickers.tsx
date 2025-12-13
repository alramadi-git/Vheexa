"use client";

import { useTranslations } from "next-intl";
import { ComponentProps, useRef, useState } from "react";

import { IoColorPalette } from "react-icons/io5";

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
import { LuX } from "react-icons/lu";
import { tNullable } from "@/types/nullish";

type tColorValue = {
  hexCode: string;
  name: string;
  tags: string[];
};
type tColorCreatorProps = ComponentProps<typeof ShadcnColorPicker> & {
  align?: "start" | "center" | "end";
  side?: "top" | "bottom" | "left" | "right";
  onSave: (value: tColorValue) => void;
};
function ColorCreator({
  id,
  side,
  align = "end",
  onSave,
  ...props
}: tColorCreatorProps) {
  const tColorCreator = useTranslations("components.colors.color-creator");

  const ref = useRef<tNullable<HTMLDivElement>>(null);

  const [colorValue, setColorValue] = useState<string>("#000000");
  const [colorName, setColorName] = useState<string>("");
  const [colorTags, setColorTags] = useState<string[]>([]);

  function onValueChange(value: string) {
    setColorValue(value);
  }

  function onClick() {
    onSave({
      hexCode: colorValue,
      name: colorName,
      tags: colorTags,
    });
  }

  return (
    <ShadcnColorPicker
      ref={ref}
      format="hex"
      defaultValue={colorValue}
      onValueChange={onValueChange}
      {...props}
    >
      <ColorPickerTrigger asChild>
        <Button
          id={id}
          variant="ghost"
          className="rounded-s-none"
          // onClick={() => setIsOpen(true)}
        >
          <IoColorPalette />
        </Button>
      </ColorPickerTrigger>
      <ColorPickerContent side={side} align={align} className="w-100">
        <ColorPickerArea />
        <div className="flex flex-1 flex-col gap-2">
          <ColorPickerHueSlider />
          <ColorPickerAlphaSlider />
        </div>
        <div className="flex items-center gap-2">
          <ColorPickerInput />
          <Button onClick={onClick} className="grow">
            {tColorCreator("content.save")}
          </Button>
        </div>
        <Input
          value={colorName}
          placeholder={tColorCreator("content.name.placeholder")}
          onChange={(a) => setColorName(a.currentTarget.value)}
        />
        <TagsInputRoot
          editable
          value={colorTags}
          onValueChange={setColorTags}
          className="flex flex-col gap-2"
        >
          <div className="border-input bg-background flex flex-wrap items-center gap-1.5 rounded border px-2.5 py-1 text-sm focus-within:ring-1 focus-within:ring-zinc-500 disabled:cursor-not-allowed disabled:opacity-50 dark:focus-within:ring-zinc-400">
            {colorTags.map((tag) => (
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
              placeholder={tColorCreator("content.tags.placeholder")}
              className="flex-1 bg-transparent outline-hidden placeholder:text-zinc-500 disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder:text-zinc-400"
            />
          </div>
        </TagsInputRoot>
      </ColorPickerContent>
    </ShadcnColorPicker>
  );
}

export { ColorCreator };
