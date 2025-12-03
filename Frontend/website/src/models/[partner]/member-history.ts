import { tHistoryModel } from "../history";

import { tMemberModel } from "./member";

type tMemberHistoryModel = tHistoryModel & {
  member: tMemberModel;
  createdAt: string;
};

export type { tMemberHistoryModel };
