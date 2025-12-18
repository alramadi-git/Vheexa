import { tPaginationModel } from "@/models/pagination";

import { ClsFetch } from "@/libraries/fetch";

type tSuccessOneService<tData> = {
  isSuccess: true;
  data: tData;
};
type tSuccessManyService<tData> = {
  isSuccess: true;
  data: tData[];
  pagination: tPaginationModel;
};

type tResponseOneService<tData> = tSuccessOneService<tData> | tFailedService;
type tResponseManyService<tData> = tSuccessManyService<tData> | tFailedService;

type tFailedService = {
  isSuccess: false;
  message: string;
};

abstract class ClsAbstractService {
  protected readonly _fetch = new ClsFetch(
    process.env.NEXT_PUBLIC_BASE_DOMAIN!,
    "/api",
  );

  protected async _catchAsync<tData>(
    callback: () => Promise<tSuccessOneService<tData>>,
  ): Promise<tResponseOneService<tData>>;
  protected async _catchAsync<tData>(
    callback: () => Promise<tSuccessManyService<tData>>,
  ): Promise<tResponseManyService<tData>>;
  protected async _catchAsync<tData>(
    callback: () => Promise<
      tResponseOneService<tData> | tResponseManyService<tData>
    >,
  ): Promise<tResponseOneService<tData> | tResponseManyService<tData>> {
    try {
      return await callback();
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Something went wrong.";
      return { isSuccess: false, message: message };
    }
  }
}

export type {
  tSuccessOneService,
  tSuccessManyService,
  tResponseOneService,
  tResponseManyService,
  tFailedService,
};
export { ClsAbstractService };
