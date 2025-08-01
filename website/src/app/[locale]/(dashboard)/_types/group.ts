import type { TFile } from "@/app/[locale]/(dashboard)/_types/file";
import type { TFolder } from "@/app/[locale]/(dashboard)/_types/folder";

type TGroup = {
  title: string;

  folders: Array<TFolder>;
  files: Array<TFile>;
};

export type { TGroup };
