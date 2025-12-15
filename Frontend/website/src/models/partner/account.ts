import { tAccountModel } from "../account";

import { tMemberModel } from "./member";
import { tPartnerModel } from "./partner";

type tPartnerAccountModel = tAccountModel<{
  partner: tPartnerModel;
  member: tMemberModel;
}>;

export type { tPartnerAccountModel };
