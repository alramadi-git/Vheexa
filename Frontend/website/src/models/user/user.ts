import { tNullable } from "@/types/nullish";
import { tImageModel } from "@/models/user/image";
import { tLocationModel } from "@/models/user/location";

type tUserModel = {
  uuid: string;

  avatar: tNullable<tImageModel>;
  location: tLocationModel;

  username: string;
  dateOfBirth: string;

  phoneNumber: string;
  email: string;

  updatedAt: string; // Date
  createdAt: string; // Date
};

export type { tUserModel };
