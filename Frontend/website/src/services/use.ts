"use client";

import { ZodError } from "zod";
import { AxiosError } from "axios";

import { tSuccessService, tPaginatedService } from "@/services/success";
import { tErrorService } from "@/services/error";

export default function useService() {
  async function globalCatch<gtData>(
    callback: () => Promise<tSuccessService<gtData>>,
  ): Promise<tSuccessService<gtData> | tErrorService>;
  async function globalCatch<gtData>(
    callback: () => Promise<tPaginatedService<gtData>>,
  ): Promise<tPaginatedService<gtData> | tErrorService>;
  async function globalCatch<gtData>(
    callback: () => Promise<
      tSuccessService<gtData> | tPaginatedService<gtData>
    >,
  ): Promise<
    tSuccessService<gtData> | tPaginatedService<gtData> | tErrorService
  > {
    try {
      return await callback();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        return {
          isSuccess: false,
          message: "Validation error. Please check your input and try again.",
        };
      }

      if (error instanceof AxiosError) {
        return {
          isSuccess: false,
          message: error.message,
        };
      }

      if (error instanceof Error) {
        return {
          isSuccess: false,
          message: error.message,
        };
      }

      return {
        isSuccess: false,
        message: "An unknown error occurred. Please try again later.",
      };
    }
  }

  return {
    globalCatch,
  };
}
