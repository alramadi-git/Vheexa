import { tNullable } from "@/types/nullish";

import { tPartnerSettings } from "./partner-settings";
import { tImageModel } from "../image";

type tPartnerModel = {
  uuid: string;
  settings: tPartnerSettings;
  logo: tNullable<tImageModel>;
  banner: tNullable<tImageModel>;
  handle: string;
  name: string;
  phoneNumber: string;
  email: string;
  updatedAt: string;
  createdAt: string;
};

export type { tPartnerModel };
