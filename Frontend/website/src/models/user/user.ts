import { tNullable } from "@/types/nullish";

type tUserModel = {
  uuid: string;
  avatar: tNullable<string>;
  location: {
    country: string;
    city: string;
    street: string;
    latitude: number;
    longitude: number;
  };
  username: string;
  birthday: string;
  phoneNumber: string;
  email: string;
  updatedAt: string;
  createdAt: string;
};

export type { tUserModel };
