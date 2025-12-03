import { tMemberModel } from "./member";
import { tHistoryModel } from "./history";

type tMemberHistoryModel = {
  uuid: string;
  member: tMemberModel;
  history: tHistoryModel;
  createdAt: string;
};

export type { tMemberHistoryModel };
