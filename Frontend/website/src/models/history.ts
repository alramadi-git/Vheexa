enum eHistoryActionModel {
  CREATE,
  UPDATE,
  DELETE,
}

enum eHistoryEntityModel {
  PARTNER,
  BRANCHES,
  ROLES,
  MEMBERS,
  VEHICLE_MODEL,
  VEHICLE_INSTANCE,
}

type tHistoryModel = {
  uuid: string;
  action: eHistoryActionModel;
  entity: eHistoryEntityModel;
  entityUuid: string;
  notes: string;
};

export { eHistoryActionModel, eHistoryEntityModel };
export type { tHistoryModel };
