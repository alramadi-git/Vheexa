"use client";

import { eDuration } from "@/enums/duration";

import { useSetCookie } from "cookies-next/client";

import useAuthenticationService from "@/partner/services/authentication";

import { tRegisterCredentials } from "@/partner/validators/authentication";
import { tLoginCredentials } from "@/validators/authentication";

import { tAccountModel } from "@/models/account";
import { tMemberAccountModel } from "../models/member-account";

export default function useAuthentication() {
  const setCookie = useSetCookie();

  function onLogin(account: tAccountModel<tMemberAccountModel>): void {
    setCookie("member-account", JSON.stringify(account.account), {
      secure: true,
      priority: "high",
      sameSite: "strict",
      maxAge: eDuration.day * 7,
    });

    setCookie("member-access-token", account.accessToken, {
      secure: true,
      priority: "high",
      sameSite: "strict",
      maxAge: eDuration.day * 7,
    });

    setCookie("member-refresh-token", account.refreshToken, {
      secure: true,
      priority: "high",
      sameSite: "strict",
      maxAge: eDuration.day * 7,
    });
  }

  const authenticationService = useAuthenticationService();

  async function register(credentials: tRegisterCredentials): Promise<boolean> {
    const response = await authenticationService.register(credentials);
    if (!response.isSuccess) {
      return false;
    }

    onLogin(response.data);
    return true;
  }

  async function login(credentials: tLoginCredentials): Promise<boolean> {
    const response = await authenticationService.login(credentials);
    if (!response.isSuccess) {
      return false;
    }

    onLogin(response.data);
    return true;
  }

  return {
    register,
    login,
  };
}
