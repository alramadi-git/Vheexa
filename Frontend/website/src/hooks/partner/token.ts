"use client";

import { tNullable } from "@/types/nullish";

import {
  useSetCookie,
  useGetCookie,
  useDeleteCookie,
} from "cookies-next/client";

import { eDuration } from "@/enums/duration";

import { zJwt } from "@/validations/jwt";

export default function useToken() {
  const setCookie = useSetCookie();
  const getCookie = useGetCookie();
  const deleteCookie = useDeleteCookie();

  const token: tNullable<string> = getCookie("member-access-token") ?? null;

  function setToken(token: string, rememberMe: boolean): boolean {
    removeToken();

    const parsedToken = zJwt.safeParse(token);
    if (!parsedToken.success) {
      return false;
    }

    setCookie("member-access-token", token, {
      secure: true,
      priority: "high",
      sameSite: "strict",
      maxAge: rememberMe ? eDuration.month : eDuration.day,
    });

    return true;
  }

  function removeToken() {
    deleteCookie("member-access-token");
  }

  return {
    token,
    setToken,
    removeToken,
  };
}
