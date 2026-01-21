"use client";

import useAuthenticationService from "@/services/partner/authentication";

import useToken from "./token";

import {
  useSetCookie,
  useGetCookie,
  useDeleteCookie
} from "cookies-next/client";

import { zAccount } from "@/validations/partner/account";

import { tAccountModel } from "@/models/partner/account";

import { tRegisterCredentials } from "@/validations/partner/authentication-credentials";
import { tLoginCredentials } from "@/validations/credentials";

import { tResponseOneService } from "@/services/service";
import { eDuration } from "@/enums/duration";

export default function useAccount() {
  const { setToken, removeToken } = useToken();

  const setCookie = useSetCookie();
  const getCookie = useGetCookie();
  const deleteCookie = useDeleteCookie();

  const account = getCookie("member-account");

  function setAccount(account: tAccountModel, token: string, rememberMe: boolean): boolean {
    removeAccount();

    if (!setToken(token, rememberMe)) {
      return false;
    };

    const parsedAccount = zAccount.safeParse(account);
    if (!parsedAccount.success) {
      removeToken();
      return false;
    }

    setCookie("member-account", JSON.stringify(account), {
      secure: true,
      priority: "high",
      sameSite: "strict",
      maxAge: rememberMe ? eDuration.month : eDuration.day
    });

    return true;
  }

  function removeAccount() {
    removeToken();
    deleteCookie("member-account");
  }


  const authenticationService = useAuthenticationService();

  async function register(
    credentials: tRegisterCredentials,
  ): Promise<tResponseOneService<null>> {
    const response = await authenticationService.register(credentials);
    if (!response.isSuccess) {
      return response;
    }

    const { account, token } = response.data;

    if (!setAccount(account, token, credentials.rememberMe)) {
      throw new Error("Account or token is invalid.");
    };

    return {
      isSuccess: true,
      data: null,
    };
  }

  async function login(
    credentials: tLoginCredentials,
  ): Promise<tResponseOneService<null>> {
    const response = await authenticationService.login(credentials);
    if (!response.isSuccess) {
      return response;
    }

    const { account, token } = response.data;

    if (!setAccount(account, token, credentials.rememberMe)) {
      throw new Error("Account or token is invalid.");
    };

    return {
      isSuccess: true,
      data: null,
    };
  }

  async function logout(): Promise<tResponseOneService<null>> {
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
