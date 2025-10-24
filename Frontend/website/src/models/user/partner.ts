import { tNullable } from "@/types/nullish";
import { tImageModel } from "@/models/user/image";

type tPartnerModel = {
  uuid: string;

  logo: tNullable<tImageModel>;
  banner: tNullable<tImageModel>;

  handle: string;
  name: string;

  phoneNumber: string;
  email: string;

  updatedAt: string; //Date
  createdAt: string; //Date
};

export type { tPartnerModel };
