import { tNullable } from "@/types/nullish";

import { tImage } from "./image";
import { tLocation } from "./location";

type tUser = {
  uuid: string;

  avatar: tNullable<tImage>;
  location: tLocation;

  username: string;
  dateOfBirth: string; //Date

  phoneNumber: string;
  email: string;

  updatedAt: string; //Date
  createdAt: string; //Date
};

export type { tUser };
