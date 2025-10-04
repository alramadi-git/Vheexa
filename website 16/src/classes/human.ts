import "reflect-metadata";

import { Expose, Type } from "class-transformer";

import { Image } from "@/classes/image";
import { Location } from "@/classes/location";

abstract class Human {
  @Expose() public readonly ID: string;

  @Expose() @Type(() => Image) public readonly Avatar: Image;

  @Expose() @Type(() => Location) public readonly Location: Location;

  @Expose() public readonly FirstName: string;
  @Expose() public readonly MidName: string;
  @Expose() public readonly LastName: string;

  @Expose() public readonly DateOfBirth: Date;

  @Expose() public readonly PhoneNumber: string;

  @Expose() public readonly Email: string;

  @Expose() @Type(() => Date) public readonly UpdatedAt: Date;
  @Expose() @Type(() => Date) public readonly CreatedAt: Date;

  constructor(
    id: string,
    avatar: Image,
    location: Location,
    firstName: string,
    midName: string,
    lastName: string,
    dateOfBirth: Date,
    phoneNumber: string,
    email: string,
    updatedAt: Date,
    createdAt: Date,
  ) {
    this.ID = id;

    this.Location = location;

    this.Avatar = avatar;

    this.FirstName = firstName;
    this.MidName = midName;
    this.LastName = lastName;

    this.DateOfBirth = dateOfBirth;

    this.PhoneNumber = phoneNumber;

    this.Email = email;

    this.UpdatedAt = updatedAt;
    this.CreatedAt = createdAt;
  }
}

export { Human };
