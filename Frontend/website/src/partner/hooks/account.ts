"use client";

import { useState, useEffect } from "react";

import {
  useSetCookie,
  useGetCookie,
  useDeleteCookie,
} from "cookies-next/client";

import useAccountService from "@/partner/services/account";

import { eDuration } from "@/enums/duration";

import { tAccountModel } from "@/models/account";
import { tMemberAccountModel } from "../models/member-account";

import { tTokensModel } from "@/models/tokens";

export default function useAccount() {
  const setCookie = useSetCookie();
  const getCookie = useGetCookie();
  const deleteCookie = useDeleteCookie();

  const [account, setAccount] = useState<tAccountModel<tMemberAccountModel>>();

  useEffect(() => {
    const account = getCookie("member-account");
    const accessToken = getCookie("member-access-token");
    const refreshToken = getCookie("member-refresh-token");

    if (account && accessToken && refreshToken) {
      setAccount({
        account: JSON.parse(account),
        refreshToken: refreshToken,
        accessToken: accessToken,
      });
    }
  }, [getCookie]);

  function onRefreshToken(tokens: tTokensModel): void {
    setCookie("member-access-token", tokens.accessToken, {
      secure: true,
      priority: "high",
      sameSite: "strict",
      maxAge: eDuration.day * 7,
    });

    setCookie("member-refresh-token", tokens.refreshToken, {
      secure: true,
      priority: "high",
      sameSite: "strict",
      maxAge: eDuration.day * 7,
    });

    setAccount((prev) => {
      return {
        account: prev!.account,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      };
    });
  }

  function onLogout(): void {
    deleteCookie("member-account");
    deleteCookie("member-access-token");
    deleteCookie("member-refresh-token");

    setAccount(undefined);
  }

  const accountService = useAccountService();
  async function refreshTokens(): Promise<tTokensModel | null> {
    const response = await accountService.refreshTokens({
      uuid: account!.account.uuid,
      refreshToken: account!.refreshToken,
    });

    if (!response.isSuccess) {
      return null;
    }

    onRefreshToken(response.data);
    return response.data;
  }

  async function logout(): Promise<void> {
    const response = await accountService.logout(
      {
        refreshToken: account!.refreshToken,
      },
      account!.accessToken,
    );

    if (!response.isSuccess && response.message === "Expired access token") {
      const tokens = await refreshTokens();
      await accountService.logout(
        {
          refreshToken: tokens!.refreshToken,
        },
        tokens!.accessToken,
      );
    }

    onLogout();
  }

  if (account === undefined) return undefined;
  return {
    account: account,
    refreshTokens,
    logout,
  };
}
