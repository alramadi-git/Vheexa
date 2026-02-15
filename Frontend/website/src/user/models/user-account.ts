import { tNullable } from "@/types/nullish";

import { tImageModel } from "@/models/image";

type tUserAccountModel = {
  uuid: string;
  avatar: tNullable<tImageModel>;
  location: {
    country: string;
    city: string;
    street: string;
    latitude: number;
    longitude: number;
  };
  username: string;
  birthday: Date;
  phoneNumber: string;
  email: string;
};

export type { tUserAccountModel };
