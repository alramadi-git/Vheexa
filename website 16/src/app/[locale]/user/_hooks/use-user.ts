"use client";

import { tUndefinable } from "@/types/nullish";
import { tUser } from "@/app/api/user/_types/user";

import { useEffect, useState } from "react";
import { getCookie, deleteCookie } from "cookies-next/client";

export default function useUser() {
  const [user, setUser] = useState<tUndefinable<tUser>>(undefined);

  useEffect(() => {
    const cookie = getCookie("user");
    if (cookie === undefined) return;

    const parsedCookie: tUser = JSON.parse(cookie);
    setUser(parsedCookie);
  }, []);

  function logout() {
    if (user === undefined) return;

    deleteCookie("token");
    deleteCookie("user");
    setUser(undefined);
  }

  return { user, logout };
}
