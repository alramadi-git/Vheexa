import type { TFile } from "@/app/[locale]/(dashboard)/_types/file";

type TFolder = {
  label: string;

  folders: Array<TFolder>;
  files: Array<TFile>;
};

export type { TFolder };
