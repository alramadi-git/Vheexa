import "reflect-metadata";

import { Expose, Type } from "class-transformer";
import { Image } from "@/classes/image";

class Partner {
  @Expose() public readonly ID: string;

  @Expose() @Type(() => Image) public readonly Logo: Image;
  @Expose() @Type(() => Image) public readonly Banner: Image;

  @Expose() public readonly Handle: string;
  @Expose() public readonly Name: string;

  @Expose() public readonly PhoneNumber: string;
  @Expose() public readonly Email: string;

  @Expose() @Type(() => Date) public readonly UpdatedAt: Date;
  @Expose() @Type(() => Date) public readonly CreatedAt: Date;

  constructor(
    id: string,
    logo: Image,
    banner: Image,
    handle: string,
    name: string,
    phoneNumber: string,
    email: string,
    updatedAt: Date,
    createdAt: Date,
  ) {
    this.ID = id;

    this.Logo = logo;
    this.Banner = banner;

    this.Handle = handle;
    this.Name = name;

    this.PhoneNumber = phoneNumber;

    this.Email = email;

    this.UpdatedAt = updatedAt;
    this.CreatedAt = createdAt;
  }
}

export { Partner };
