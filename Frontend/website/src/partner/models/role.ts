import { eStatusModel } from "./enums/status";

type tRoleModel = {
  uuid: string;
  name: string;
  permissions: {
    uuid: string;
    name: string;
  }[];
  assignedCount: number;
  status: eStatusModel;
  createdAt: string;
  updatedAt: string;
};

export type { tRoleModel };
