import "reflect-metadata";

import { Expose, Type, Transform } from "class-transformer";

import z4 from "zod/v4";
import { Partner } from "@/classes/partner";
import { Image } from "@/classes/image";

class Manufacturer {
  @Expose() public readonly UUID: string;
  @Expose() @Type(() => Image) public readonly Logo: Image;

  @Expose() public readonly Name: string;

  public constructor(uuid: string, logo: Image, name: string) {
    this.UUID = uuid;
    this.Logo = logo;

    this.Name = name;
  }
}

class Color {
  @Expose() public readonly UUID: string;

  @Expose() public readonly Name: string;
  @Expose() public readonly HexCode: string;

  public constructor(uuid: string, name: string, hexCode: string) {
    this.UUID = uuid;

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

  @Expose() public readonly Transmission: string;
  @Expose() public readonly Fuel: string;
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
    transmission: string,
    fuel: string,
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

    this.Transmission = transmission;
    this.Fuel = fuel;
    this.Capacity = capacity;

    this.Price = price;
    this.Discount = discount;

    this.Tags = tags;

    this.UpdatedAt = updatedAt;
    this.CreatedAt = createdAt;
  }

  public HasDiscount(): boolean {
    return this.Discount > 0;
  }
  public DiscountedPrice(): number {
    const discountAmount = this.Price * this.Discount;
    return this.Price - discountAmount;
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
