import "reflect-metadata";

import { Expose, Type, Transform } from "class-transformer";

import z4 from "zod/v4";
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

class Discount extends Number {
  private static _Validator = z4.number().min(0.0).max(1.0).default(0.0);
  public readonly Percentage: number;

  public constructor(value: number) {
    const result = Discount._Validator.safeParse(value);
    if (result.success === false) throw new Error(result.error.message);

    super(result.data);
    this.Percentage = 100 * result.data;
  }
}

class Price extends Number {
  public Discount: Discount;

  public constructor(value: number, discount: Discount) {
    super(value);
    this.Discount = discount;
  }

  public IsDiscounted(): boolean {
    return this.Discount.valueOf() !== 0.0;
  }

  public get Value(): number {
    return this.valueOf();
  }
  public Total(): number {
    if (this.IsDiscounted() === false) return this.valueOf();

    const discount = this.valueOf() * this.Discount.valueOf();
    return this.valueOf() - discount;
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

  @Expose()
  @Transform(({ obj }) => new Price(obj.Price, new Discount(obj.Discount)))
  public readonly Price: Price;

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
    price: Price,
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
