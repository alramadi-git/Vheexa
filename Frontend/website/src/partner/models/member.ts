import { tNullable } from "@/types/nullish";

import { tImageModel } from "../../models/image";

import { ePermissionModel } from "./enums/permission";
import { eStatusModel } from "./enums/status";

type tMemberModel = {
  uuid: string;
  avatar: tNullable<tImageModel>;
  role: {
    name: string;
    permissions: ePermissionModel[];
  };
  branch: {
    location: {
      country: string;
      city: string;
      street: string;
      latitude: number;
      longitude: number;
    };
    name: string;
    phoneNumber: string;
    email: string;
  };
  username: string;
  email: string;
  status: eStatusModel;
  updatedAt: string;
  createdAt: string;
};

export type { tMemberModel };
