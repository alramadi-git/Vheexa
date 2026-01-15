"use client";

import { tAccountModel } from "@/models/partner/account";

import useLocalStorageState from "use-local-storage-state";
import { deleteCookie } from "cookies-next/client";

export default function useAccount() {
  const [account, setAccount, { removeItem: removeAccount }] =
    useLocalStorageState("member-account");

  function login(account: tAccountModel) {
    if (account !== undefined) return;

    setAccount(account);
  }

  function logout() {
    if (account === undefined) return;

    removeAccount();
    deleteCookie("partner-token");
  }

  return {
    account,
    login,
    logout,
  };
}
