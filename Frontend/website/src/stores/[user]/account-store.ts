import { tNullable } from "@/types/nullish";
import { tUserModel } from "@/models/[user]/user";

import { create } from "zustand";

type tUseAccountStore = {
  account: tNullable<tUserModel>;
  login: (account: tUserModel) => void;
  logout: () => void;
};

const useAccountStore = create<tUseAccountStore>((set, get) => {
  return {
    account: null,

    login: (account: tUserModel) => {
      if (get().account !== null) return;

      set({ account });
    },

    logout: () => {
      if (get().account === null) return;

      set({ account: null });
    },
  };
});

export default useAccountStore;
