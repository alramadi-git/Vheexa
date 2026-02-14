"use client";

import { ZodError } from "zod";

import { ClsFetch } from "@/libraries/fetch";

import { tUndefinable } from "@/types/nullish";

import { eServiceRole } from "@/services/enums/service-role";
import { eHttpStatusCode } from "@/services/enums/http-status-code";

import { ClsErrorService, tErrorService } from "@/services/error";

import { tSuccessService, tPaginatedService } from "@/services/success";

type tUseServiceProps = {
  serviceRole: eServiceRole;
};
export default function useService({ serviceRole }: tUseServiceProps) {
  const clsFetch = new ClsFetch(process.env.NEXT_PUBLIC_BACKEND_API!);
  async function _catch<tData>(
    callback: () => Promise<tSuccessService<tData>>,
  ): Promise<tSuccessService<tData>>;
  async function _catch<tData>(
    callback: () => Promise<tPaginatedService<tData>>,
  ): Promise<tPaginatedService<tData>>;
  async function _catch<tData>(
    callback: () => Promise<
      tSuccessService<tData> | tPaginatedService<tData>
    >,
  ): Promise<
    tSuccessService<tData> | tPaginatedService<tData> | tErrorService
  > {
    try {
      return await callback();
    } catch (error: unknown) {
      console.error(error);

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
        let base: string;
        switch (serviceRole) {
          case eServiceRole.Partner: {
            base = "partner";
            break;
          }
          case eServiceRole.User: {
            base = "user";
            break;
          }
        }

        try {
          const response = await clsFetch.get(
            `/${base}/authentication/refresh`,
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
