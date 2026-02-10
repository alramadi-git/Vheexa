"use client";

import { useEffect, useState } from "react";

import useToken from "./token";

import {
  useSetCookie,
  useGetCookie,
  useDeleteCookie,
} from "cookies-next/client";

import useAuthenticationService from "@/user/services/authentication";

import { tUserAccount, zUserAccount } from "@/user/validators/user-account";

import { tRegisterCredentials } from "@/user/validators/authentication";
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

  const [account, setA] = useState<tNullable<tUserAccount>>(null);

  useEffect(() => {
    try {
      const user: tNullable<unknown> = JSON.parse(
        getCookie("user-account") ?? "null",
      );

      setA(zUserAccount.parse(user));
    } catch {}
  }, [getCookie]);

  function setAccount(
    account: tUserAccount,
    token: string,
    rememberMe: boolean,
  ): boolean {
    removeAccount();

    if (!setToken(token, rememberMe)) {
      return false;
    }

    const parsedAccount = zUserAccount.safeParse(account);
    if (!parsedAccount.success) {
      removeToken();
      return false;
    }

    setCookie("user-account", JSON.stringify(account), {
      secure: true,
      priority: "high",
      sameSite: "strict",
      maxAge: rememberMe ? eDuration.month : eDuration.day,
    });

    setA(account);

    return true;
  }

  function removeAccount() {
    removeToken();
    deleteCookie("user-account");

    setA(null);
  }

  const authenticationService = useAuthenticationService();

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
    account,
    register,
    login,
    logout,
  };
}
