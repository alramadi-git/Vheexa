"use client";

import { useMemo } from "react";

import useToken from "./token";

import {
  useSetCookie,
  useGetCookie,
  useDeleteCookie,
} from "cookies-next/client";

import useAuthenticationService from "@/partner/services/authentication";

import {
  tMemberAccount,
  zMemberAccount,
} from "@/partner/validators/member-account";

import { tRegisterCredentials } from "@/partner/validators/authentication";
import { tLoginCredentials } from "@/validators/authentication";

import { tNullable } from "@/types/nullish";

import { eDuration } from "@/enums/duration";
import { tSuccessService } from "@/services/success";
import { tErrorService } from "@/services/error";

export default function useAccount() {
  const { setToken, removeToken } = useToken();

  const setCookie = useSetCookie();
  const getCookie = useGetCookie();
  const deleteCookie = useDeleteCookie();

  const authenticationService = useAuthenticationService();

  const account: tNullable<tMemberAccount> = useMemo(() => {
    try {
      return zMemberAccount.parse(
        JSON.parse(getCookie("member-account") ?? "null"),
      );
    } catch {
      return null;
    }
  }, [getCookie]);

  function setAccount(
    account: tMemberAccount,
    token: string,
    rememberMe: boolean,
  ): boolean {
    removeAccount();

    if (!setToken(token, rememberMe)) {
      return false;
    }

    const parsedAccount = zMemberAccount.safeParse(account);
    if (!parsedAccount.success) {
      removeToken();
      return false;
    }

    setCookie("member-account", JSON.stringify(account), {
      secure: true,
      priority: "high",
      sameSite: "strict",
      maxAge: rememberMe ? eDuration.month : eDuration.day,
    });

    return true;
  }

  function removeAccount() {
    removeToken();
    deleteCookie("member-account");
  }

  async function register(
    credentials: tRegisterCredentials,
  ): Promise<tSuccessService<null> | tErrorService> {
    const response = await authenticationService.register(credentials);
    if (!response.isSuccess) {
      return response;
    }

    const { account, token } = response.data;

    if (!setAccount(account, token, credentials.rememberMe)) {
      return {
        isSuccess: false,
        message: "Account or token is invalid.",
      };
    }

    return {
      isSuccess: true,
      data: null,
    };
  }

  async function login(
    credentials: tLoginCredentials,
  ): Promise<tSuccessService<null> | tErrorService> {
    const response = await authenticationService.login(credentials);
    if (!response.isSuccess) {
      return response;
    }

    const { account, token } = response.data;

    if (!setAccount(account, token, credentials.rememberMe)) {
      return {
        isSuccess: false,
        message: "Account or token is invalid.",
      };
    }

    return {
      isSuccess: true,
      data: null,
    };
  }

  async function logout(): Promise<tSuccessService<null> | tErrorService> {
    const response = await authenticationService.logout();
    if (!response.isSuccess) {
      return response;
    }

    removeAccount();
    return {
      isSuccess: true,
      data: null,
    };
  }

  return {
    account: account ?? null,
    register,
    login,
    logout,
  };
}
