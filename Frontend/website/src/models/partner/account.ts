import { tNullable } from "@/types/nullish";
import { ePermission } from "@/validations/partner/role";


type tAccountModel = {
  uuid: string;
  partner: {
    uuid: string;
    logo: tNullable<string>;
    banner: tNullable<string>;
    handle: string;
    name: string;
    phoneNumber: string;
    email: string;
  };
  avatar: tNullable<string>;
  role: {
    name: string;
    permissions: ePermission[];
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
};

export type { tAccountModel };
