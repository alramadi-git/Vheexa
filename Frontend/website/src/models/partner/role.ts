enum eRoleStatusModel {
  active,
  inactive,
}

type tRoleModel = {
  uuid: string;
  name: string;
  permissions: string[];
  assignedCount: number;
  status: eRoleStatusModel;
  createdAt: string;
  updatedAt: string;
};

export { eRoleStatusModel };
export type { tRoleModel };
