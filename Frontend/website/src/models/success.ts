type tSuccessModel<tData> = {
  data: tData;
};

type tPaginationModel = {
  page: number;
  pageSize: number;
  totalItems: number;
};
type tPaginationSuccessModel<tData> = {
  data: tData[];
  pagination: tPaginationModel;
};

export type { tSuccessModel, tPaginationModel, tPaginationSuccessModel };
