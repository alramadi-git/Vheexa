import { tAccountModel } from "../general/account";

import { tMemberModel } from "./member";
import { tPartnerModel } from "./partner";

type tMemberAccountModel = tAccountModel<{
  partner: tPartnerModel;
  member: tMemberModel;
}>;

export type { tMemberAccountModel };
