import { ClsFetch } from "@/libraries/fetch";

import { tPaginationModel } from "@/models/pagination";
import { ZodError } from "zod";

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
        error instanceof ZodError
          ? "Validation error."
          : error instanceof Error
            ? error.message
            : "Something went wrong.";

      if (message === "Access token is expired." || message === "Access token is missing.") {
        try {
          const response = await this._fetch.get(
            "/partner/authentication/refresh",
          );

          if (!response.ok) {
            return {
              isSuccess: false,
              message: await response.text(),
            };
          }

          return await callback();
        } catch (error: unknown) {
          message =
            error instanceof ZodError
              ? "Validation error."
              : error instanceof Error
                ? error.message
                : "Something went wrong.";
        }
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
