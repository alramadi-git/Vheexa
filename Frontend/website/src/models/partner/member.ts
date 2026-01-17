import { tNullable } from "@/types/nullish";

enum eMemberStatusModel {
  active,
  inactive,
}

type tMemberModel = {
  uuid: string;
  avatar: tNullable<string>;
  role: {
    name: string;
    permissions: string[];
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
  status: eMemberStatusModel;
  updatedAt: string;
  createdAt: string;
};

export { eMemberStatusModel };
export type { tMemberModel };
