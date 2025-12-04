import { tNullable } from "@/types/nullish";

import { tImageModel } from "../general/image";
import { tLocationModel } from "../general/location";

type tUserModel = {
  uuid: string;
  avatar: tNullable<tImageModel>;
  location: tLocationModel;
  username: string;
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
  updatedAt: string;
  createdAt: string;
};

export type { tUserModel };
