import { tNullable } from "@/types/nullish";

import { tImageModel } from "../image";

type tPartnerModel = {
  uuid: string;
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
