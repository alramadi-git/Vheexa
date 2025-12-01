import { tRoleModel as tBaseRoleModel } from "../role";

type tRoleModel = Omit<tBaseRoleModel, "uuid" | "updatedAt" | "createdAt"> & {
  uuid: string;
  isPublished: boolean;
  updatedAt: string;
  createdAt: string;
};

export type { tRoleModel };
