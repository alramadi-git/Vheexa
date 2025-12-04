import type { tNullable } from "@/types/nullish";
import type { tPartnerModel } from "@/models/partner/partner";

import { clsImage } from "./image";

class clsPartner {
  public uuid: string;

  public logo: tNullable<clsImage>;
  public banner: tNullable<clsImage>;

  public handle: string;
  public name: string;

  public phoneNumber: string;
  public email: string;

  public updatedAt: Date;
  public createdAt: Date;

  public constructor(partner: tPartnerModel) {
    this.uuid = partner.uuid;

    this.logo = partner.logo;
    this.banner = partner.banner;

    this.handle = partner.handle;
    this.name = partner.name;

    this.phoneNumber = partner.phoneNumber;
    this.email = partner.email;

    this.updatedAt = new Date(partner.updatedAt);
    this.createdAt = new Date(partner.createdAt);
  }
}

export { clsPartner };
