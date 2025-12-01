import { tNullable } from "@/types/nullish";
import { tMemberModel } from "@/models/[partner]/member";

import { create } from "zustand";

type tUseAccountStore = {
  account: tNullable<tMemberModel>;
  login: (account: tMemberModel) => void;
  logout: () => void;
};

const useAccountStore = create<tUseAccountStore>((set, get) => {
  return {
    account: null,

    login: (account: tMemberModel) => {
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
