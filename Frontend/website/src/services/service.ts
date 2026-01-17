import { tPaginationModel } from "@/models/pagination";

import { ClsFetch } from "@/libraries/fetch";
import { ClsAuthenticationService } from "./partner/authentication";

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
    process.env.NEXT_PUBLIC_BACKEND_API!,
  );

  protected async _catch<tData>(
    callback: () => Promise<tSuccessOneService<tData>>,
  ): Promise<tResponseOneService<tData>>;
  protected async _catch<tData>(
    callback: () => Promise<tSuccessManyService<tData>>,
  ): Promise<tResponseManyService<tData>>;
  protected async _catch<tData>(
    callback: () => Promise<
      tResponseOneService<tData> | tResponseManyService<tData>
    >,
  ): Promise<tResponseOneService<tData> | tResponseManyService<tData>> {
    try {
      return await callback();
    } catch (error: unknown) {
      let message =
        error instanceof Error ? error.message : "Something went wrong.";

      if (message === "Access token missing or expired.")
        try {
          const response: Response = await this._fetch.get(
            "/partner/authentication/refresh",
          );
          if (!response.ok) return { isSuccess: false, message: message };

          return await callback();
        } catch (error: unknown) {
          if (
            error instanceof Error &&
            error.message !== "Refresh token missing or expired."
          )
            message = error.message;
        }

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
