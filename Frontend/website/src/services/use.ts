"use client";

import { ZodError } from "zod";

import { tErrorService } from "@/services/error";

import { tSuccessService, tPaginatedService } from "@/services/success";
import { AxiosError } from "axios";

export default function useService() {
  async function globalCatch<tData>(
    callback: () => Promise<tSuccessService<tData>>,
  ): Promise<tSuccessService<tData>>;
  async function globalCatch<tData>(
    callback: () => Promise<tPaginatedService<tData>>,
  ): Promise<tPaginatedService<tData>>;
  async function globalCatch<tData>(
    callback: () => Promise<tSuccessService<tData> | tPaginatedService<tData>>,
  ): Promise<
    tSuccessService<tData> | tPaginatedService<tData> | tErrorService
  > {
    try {
      return await callback();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        return {
          isSuccess: false,
          message: "Validation error. Please check your input and try again."
        };
      }

      if (error instanceof AxiosError) {
        return {
          isSuccess: false,
          message: error.message 
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
