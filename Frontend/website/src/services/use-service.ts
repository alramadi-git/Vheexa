"use client";

import { ZodError } from "zod";

import { ClsFetch } from "@/libraries/fetch";

import { tUndefinable } from "@/types/nullish";

import { eHttpStatusCode } from "./enums/http-status-code";

import { ClsErrorService, tErrorService } from "./error";

import { tSuccessService, tPaginatedSuccessService } from "./success";

export default function useService() {
  const clsFetch = new ClsFetch(process.env.NEXT_PUBLIC_BACKEND_API!);
  async function _catch<tData>(
    callback: () => Promise<tSuccessService<tData>>,
  ): Promise<tSuccessService<tData>>;
  async function _catch<tData>(
    callback: () => Promise<tPaginatedSuccessService<tData>>,
  ): Promise<tPaginatedSuccessService<tData>>;
  async function _catch<tData>(
    callback: () => Promise<
      tSuccessService<tData> | tPaginatedSuccessService<tData>
    >,
  ): Promise<
    tSuccessService<tData> | tPaginatedSuccessService<tData> | tErrorService
  > {
    try {
      return await callback();
    } catch (error: unknown) {
      let message: string =
        error instanceof ZodError
          ? "Validation error."
          : error instanceof Error
            ? error.message
            : "Something went wrong.";

      let httpStatusCode: tUndefinable<eHttpStatusCode> =
        error instanceof ZodError
          ? eHttpStatusCode.BAD_REQUEST
          : error instanceof ClsErrorService
            ? error.httpStatusCode
            : undefined;

      if (
        message === "Access token is expired." ||
        message === "Access token is missing."
      ) {
        try {
          const response = await clsFetch.get(
            "/partner/authentication/refresh",
          );

          if (!response.ok) {
            return {
              isSuccess: false,
              message: await response.text(),
              httpStatusCode: response.status,
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

          httpStatusCode =
            error instanceof ZodError
              ? eHttpStatusCode.BAD_REQUEST
              : error instanceof ClsErrorService
                ? error.httpStatusCode
                : undefined;
        }
      }

      return {
        isSuccess: false,
        message: message,
        httpStatusCode: httpStatusCode,
      };
    }
  }

  return {
    fetch: clsFetch,
    catch: _catch,
  };
}
