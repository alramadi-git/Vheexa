import { create } from "zustand";

import { tNullable } from "@/types/nullish";
import { tAccountModel } from "@/models/partner/account";

type tUseAccountStore = {
  account: tNullable<tAccountModel["account"]>;
  login: (account: tAccountModel["account"]) => void;
  logout: () => void;
};

const useAccountStore = create<tUseAccountStore>((set, get) => {
  return {
    account: null,
    login: (account: tAccountModel["account"]) => {
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
