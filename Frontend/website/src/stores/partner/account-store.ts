import { create } from "zustand";

import { tNullable } from "@/types/nullish";
import { tPartnerAccountModel } from "@/models/partner/account";

type tUseAccountStore = {
  account: tNullable<tPartnerAccountModel["account"]>;
  login: (account: tPartnerAccountModel["account"]) => void;
  logout: () => void;
};

const useAccountStore = create<tUseAccountStore>((set, get) => {
  return {
    account: null,
    login: (account: tPartnerAccountModel["account"]) => {
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
