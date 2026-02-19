"use client";

import { ZodError } from "zod";

import { ClsFetch } from "@/libraries/fetch";

import { tErrorService } from "@/services/error";

import { tSuccessService, tPaginatedService } from "@/services/success";

export default function useService() {
  const clsFetch = new ClsFetch(process.env.NEXT_PUBLIC_BACKEND_API!);
  async function _catch<tData>(
    callback: () => Promise<tSuccessService<tData>>,
  ): Promise<tSuccessService<tData>>;
  async function _catch<tData>(
    callback: () => Promise<tPaginatedService<tData>>,
  ): Promise<tPaginatedService<tData>>;
  async function _catch<tData>(
    callback: () => Promise<tSuccessService<tData> | tPaginatedService<tData>>,
  ): Promise<
    tSuccessService<tData> | tPaginatedService<tData> | tErrorService
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

      // if (message === "Unauthorized") {
      //   try {
      //     return await callback();
      //   } catch (error) {
      //     message =
      //       error instanceof ZodError
      //         ? "Validation error."
      //         : error instanceof Error
      //           ? error.message
      //           : "Something went wrong.";
      //   }
      // }

      return {
        isSuccess: false,
        message: message,
      };
    }
  }

  return {
    fetch: clsFetch,
    catch: _catch,
  };
}
