"use client";

import {
  useSetCookie,
  useGetCookie,
  useDeleteCookie,
} from "cookies-next/client";

import { zJwt } from "@/validators/jwt";

import { tNullable } from "@/types/nullish";

import { eDuration } from "@/enums/duration";

export default function useToken() {
  const setCookie = useSetCookie();
  const getCookie = useGetCookie();
  const deleteCookie = useDeleteCookie();

  const token: tNullable<string> = getCookie("user-access-token") ?? null;

  function setToken(token: string, rememberMe: boolean): boolean {
    removeToken();

    const parsedToken = zJwt.safeParse(token);
    if (!parsedToken.success) {
      return false;
    }

    setCookie("user-access-token", token, {
      secure: true,
      priority: "high",
      sameSite: "strict",
      maxAge: rememberMe ? eDuration.month : eDuration.day,
    });

    return true;
  }

  function removeToken() {
    deleteCookie("user-access-token");
  }

  return {
    token,
    setToken,
    removeToken,
  };
}
