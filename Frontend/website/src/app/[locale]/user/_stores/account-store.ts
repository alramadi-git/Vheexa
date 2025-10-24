import { tUserModel } from "@/models/user/user";
import { tUndefinable } from "@/types/nullish";

import { create } from "zustand";

type tUseAccountStore = {
  account: tUndefinable<tUserModel>;
  login: (account: tUserModel) => void;
  logout: () => void;
};

const useAccountStore = create<tUseAccountStore>((set, get) => {
  return {
    account: undefined,

    login: (account: tUserModel) => {
      if (get().account !== undefined) return;

      set({ account });
    },
    logout: () => {
      if (get().account === undefined) return;

      set({ account: undefined });
    },
  };
});

export default useAccountStore;
