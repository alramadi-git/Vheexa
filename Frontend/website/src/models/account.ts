import { tHumanModel } from "./human";

type tAccountModel<tAccount extends tHumanModel> = {
  account: tAccount;
  token: string;
};

export type { tAccountModel };
