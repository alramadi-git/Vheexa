import { tHumanModel } from "../human";

type tUserModel = tHumanModel & {
  updatedAt: string;
  createdAt: string;
};

export type { tUserModel };
