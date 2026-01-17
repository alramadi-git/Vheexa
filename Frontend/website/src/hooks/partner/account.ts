"use client";

import { useEffect } from "react";
import useAuthenticationService from "@/services/partner/authentication";

import useToken from "./token";
import useLocalStorageState from "use-local-storage-state";

import { zAccount } from "@/validations/partner/account";

import { tAccountModel } from "@/models/partner/account";

import { tRegisterCredentials } from "@/validations/partner/authentication-credentials";
import { tLoginCredentials } from "@/validations/credentials";

import { tResponseOneService } from "@/services/service";

export default function useAccount() {
  const { setToken, removeToken } = useToken();
  const [account, setAccount, { removeItem: removeAccount }] =
    useLocalStorageState<tAccountModel>("member-account");

  useEffect(() => {
    if (account === undefined) {
      return;
    }

    const parsedAccount = zAccount.safeParse(account);
    if (parsedAccount.success) {
      return;
    }

    removeAccount();
    removeToken();
  }, [account]);

  const authenticationService = useAuthenticationService();

  async function register(
    credentials: tRegisterCredentials,
  ): Promise<tResponseOneService<null>> {
    const response = await authenticationService.register(credentials);
    if (!response.isSuccess) {
      return response;
    }

    const { account, token } = response.data;
    setAccount(account);
    setToken(token);

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
    setAccount(account);
    setToken(token);

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
    removeToken();

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
