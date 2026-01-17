"use client";

import { useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";

import { zJwt } from "@/validations/jwt";

export default function useToken() {
  const [token, setToken, { removeItem: removeToken }] =
    useLocalStorageState<string>("member-token");

  useEffect(() => {
    if (token === undefined) {
      return;
    }

    const parsedToken = zJwt.safeParse(token);
    if (parsedToken.success) {
      return;
    }

    removeToken();
  }, [token]);

  return {
    token,
    setToken,
    removeToken,
  };
}
