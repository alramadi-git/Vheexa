import { tNullable } from "@/types/nullish";

import { ePermission } from "@/validations/partner/role";


type tAccountModel = {
  partner: {
    logo: tNullable<string>;
    banner: tNullable<string>;
    handle: string;
    organizationName: string;
    phoneNumber: string;
    email: string;
  };
  role: {
    name: string;
    permissions: ePermission[];
  };
  avatar: tNullable<string>;
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

export type { tAccountModel };
