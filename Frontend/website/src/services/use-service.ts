"use client";

import { ZodError } from "zod";

import { ClsFetch } from "@/libraries/fetch";

import { tSuccessService, tPaginatedSuccessService } from "./success";
import { tErrorService } from "./error";

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
      // TODO: change the return to satisfy tErrorService instead of normal {
      // isSuccess: boolean,
      // message: string
      // }
      
      let message =
        error instanceof ZodError
          ? "Validation error."
          : error instanceof Error
            ? error.message
            : "Something went wrong.";

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

  return {
    fetch: clsFetch,
    catch: _catch,
  };
}
