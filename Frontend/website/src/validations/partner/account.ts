import z from "zod";

import { zEmail } from "../authentication-credentials";

import { eMemberStatusModel } from "@/models/partner/member";
import { eRoleStatusModel } from "@/models/partner/role";
import { eBranchStatusModel } from "@/models/partner/branch";

const zAccount = z
  .object({
    uuid: z.uuid(),
    avatar: z.nullable(
      z.object({
        uuid: z.uuid(),
        url: z.url(),
      }),
    ),
    role: z.object({
      uuid: z.uuid(),
      name: z.string(),
      permissions: z.array(z.string()),
      status: z.enum(eRoleStatusModel),
      createdAt: z.date(),
      updatedAt: z.date(),
    }),
    branch: z.object({
      uuid: z.uuid(),
      location: z.object({
        uuid: z.uuid(),
        country: z.string(),
        city: z.string(),
        street: z.string(),
        latitude: z.number(),
        longitude: z.number(),
      }),
      name: z.string(),
      phoneNumber: z.string(),
      email: z.string(),
      status: z.enum(eBranchStatusModel, "invalid status."),
      createdAt: z.date(),
      updatedAt: z.date(),
    }),
    username: z.string(),
    email: zEmail,
    status: z.enum(eMemberStatusModel),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .strict();
type tAccount = z.infer<typeof zAccount>;

export type { tAccount as tMemberCreate };
export { zAccount as zMemberCreate };
