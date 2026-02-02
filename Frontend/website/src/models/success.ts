type tSuccessModel<tData> = {
  data: tData;
};

type tPaginatedSuccessModel<tData> = {
  data: tData[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
  };
};

export type { tSuccessModel, tPaginatedSuccessModel };
