type tPaginationModel = {
  page: number;
  pageSize: number;
  totalItems: number;
};

type tSuccessOneModel<tData> = {
  data: tData;
};

type tSuccessManyModel<tData> = {
  data: tData[];
  pagination: tPaginationModel;
};

export type { tPaginationModel, tSuccessOneModel, tSuccessManyModel };
