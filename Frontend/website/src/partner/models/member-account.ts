import { tNullable } from "@/types/nullish";

import { tImageModel } from "../../models/image";

import { ePermissionModel } from "./enums/permission";

type tMemberAccountModel = {
  uuid: string;
  partner: {
    uuid: string;
    logo: tNullable<tImageModel>;
    banner: tNullable<tImageModel>;
    handle: string;
    organizationName: string;
    phoneNumber: string;
    email: string;
  };
  role: {
    name: string;
    permissions: ePermissionModel[];
  };
  avatar: tNullable<tImageModel>;
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
};

export type { tMemberAccountModel };
