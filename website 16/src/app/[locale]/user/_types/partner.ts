import { tNullable } from "@/types/nullish";
import { tImage } from "./image";

type tPartner = {
  uuid: string;

  logo: tNullable<tImage>;
  banner: tNullable<tImage>;

  handle: string;
  name: string;

  phoneNumber: string;
  email: string;

  updatedAt: string; //Date
  createdAt: string; //Date
};

export type { tPartner };
