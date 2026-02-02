import { eStatusModel } from "./enums/status";

type tBranchModel = {
  uuid: string;
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
  memberCount: number;
  status: eStatusModel;
  updatedAt: string;
  createdAt: string;
};

export type { tBranchModel };
