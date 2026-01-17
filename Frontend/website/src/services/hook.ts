"use client";

import {
  tSuccessOneService,
  tSuccessManyService,
  tResponseOneService,
  tResponseManyService,
} from "./service";

import { ZodError } from "zod";
import { ClsFetch } from "@/libraries/fetch";

export default function useService() {
  const clsFetch = new ClsFetch(process.env.NEXT_PUBLIC_BACKEND_API!);
  async function _catch<tData>(
    callback: () => Promise<tSuccessOneService<tData>>,
  ): Promise<tResponseOneService<tData>>;
  async function _catch<tData>(
    callback: () => Promise<tSuccessManyService<tData>>,
  ): Promise<tResponseManyService<tData>>;
  async function _catch<tData>(
    callback: () => Promise<
      tSuccessOneService<tData> | tSuccessManyService<tData>
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

      if (message === "Access token is expired.") {
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
  }
}
