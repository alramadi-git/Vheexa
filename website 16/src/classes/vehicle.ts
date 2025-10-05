import "reflect-metadata";

import { Expose, Type } from "class-transformer";

import { Partner } from "@/classes/partner";
import { Image } from "@/classes/image";

class Manufacturer {
  @Expose() public readonly ID: string;
  @Expose() @Type(() => Image) public readonly Logo: Image;

  @Expose() public readonly Name: string;

  public constructor(id: string, logo: Image, name: string) {
    this.ID = id;
    this.Logo = logo;

    this.Name = name;
  }
}

class Color {
  @Expose() public readonly ID: string;

  @Expose() public readonly Name: string;
  @Expose() public readonly HexCode: string;

  public constructor(id: string, name: string, hexCode: string) {
    this.ID = id;

    this.Name = name;
    this.HexCode = hexCode;
  }
}

class Vehicle {
  @Expose() public readonly ID: string;
  @Expose() @Type(() => Partner) public readonly Partner: Partner;

  @Expose() @Type(() => Image) public readonly Thumbnail: Image;

  @Expose() @Type(() => Image) public readonly Images: Array<Image>;

  @Expose()
  @Type(() => Manufacturer)
  public readonly Manufacturer: Manufacturer;
  @Expose() @Type(() => Date) public readonly ManufacturingYear: Date;

  @Expose() public readonly Name: string;
  @Expose() public readonly Description: string;

  @Expose() @Type(() => Color) public readonly Colors: Array<Color>;

  @Expose() public readonly Category: string;

  @Expose() public readonly Capacity: number;

  @Expose() public readonly Price: number;
  @Expose() public readonly Discount: number;

  @Expose() public readonly Tags: Array<string>;

  @Expose() @Type(() => Date) public readonly UpdatedAt: Date;
  @Expose() @Type(() => Date) public readonly CreatedAt: Date;

  public constructor(
    id: string,
    partner: Partner,
    thumbnail: Image,
    images: Array<Image>,
    manufacturer: Manufacturer,
    manufacturingYear: Date,
    colors: Array<Color>,
    category: string,
    name: string,
    description: string,
    capacity: number,
    price: number,
    discount: number,
    tags: Array<string>,
    updatedAt: Date,
    createdAt: Date,
  ) {
    this.ID = id;
    this.Partner = partner;

    this.Thumbnail = thumbnail;
    this.Images = images;

    this.Manufacturer = manufacturer;
    this.ManufacturingYear = manufacturingYear;

    this.Colors = colors;

    this.Category = category;

    this.Name = name;
    this.Description = description;

    this.Capacity = capacity;

    this.Price = price;
    this.Discount = discount;

    this.Tags = tags;

    this.UpdatedAt = updatedAt;
    this.CreatedAt = createdAt;
  }
}

class VehicleInstance {
  @Expose() public readonly ID: string;
  @Expose() @Type(() => Vehicle) public readonly Vehicle: Vehicle;

  @Expose() @Type(() => Color) public readonly Color: Color;

  @Expose() @Type(() => Date) public readonly UpdateAt: Date;
  @Expose() @Type(() => Date) public readonly CreatedAt: Date;

  public constructor(
    id: string,
    vehicle: Vehicle,
    color: Color,
    updateAt: Date,
    createdAt: Date,
  ) {
    this.ID = id;
    this.Vehicle = vehicle;

    this.Color = color;

    this.UpdateAt = updateAt;
    this.CreatedAt = createdAt;
  }
}

export { Manufacturer, Color, Vehicle, VehicleInstance };
