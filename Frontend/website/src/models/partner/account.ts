import { tNullable } from "@/types/nullish";
import { tMemberModel } from "./member";
import { tImageModel } from "../image";

type tAccountModel = {
  partner: {
    uuid: string;
    logo: tNullable<tImageModel>;
    banner: tNullable<tImageModel>;
    handle: string;
    name: string;
    phoneNumber: string;
    email: string;
    updatedAt: string;
    createdAt: string;
  };
  member: tMemberModel;
};

export type { tAccountModel };
