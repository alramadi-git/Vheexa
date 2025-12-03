import { tNullable } from "@/types/nullish";

import { tImageModel } from "./image";
import { tLocationModel } from "./location";

type tHumanModel = {
  uuid: string;
  avatar: tNullable<tImageModel>;
  location: tLocationModel;
  username: string;
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
};

export type { tHumanModel };
