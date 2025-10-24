"use client";

import { useEffect } from "react";
import useAccountStore from "../_stores/account-store";

import { deleteCookie, getCookie } from "cookies-next/client";

export default function useAccount() {
  const account = useAccountStore((store) => store.account);

  const login = useAccountStore((store) => store.login);
  const logoutStore = useAccountStore((store) => store.logout);

  useEffect(() => {
    const cookie = getCookie("account");
    if (cookie === undefined) return;

    const cookieAccount = JSON.parse(cookie);
    login(cookieAccount);
  }, [login]);

  function logout() {
    if (account === undefined) return;

    deleteCookie("account");
    deleteCookie("token");

    logoutStore();
  }

  return {
    account,
    login,
    logout,
  };
}
