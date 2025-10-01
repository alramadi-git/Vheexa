import { Partner } from "./partner";
import { Image } from "./entities";

class Manufacturer {
  public ID: string;
  public Logo: Image;

  public Name: string;

  public constructor(id: string, logo: Image, name: string) {
    this.ID = id;
    this.Logo = logo;

    this.Name = name;
  }
}

class Color {
  public ID: string;

  public Name: string;
  public HexCode: string;

  public constructor(id: string, name: string, hexCode: string) {
    this.ID = id;

    this.Name = name;
    this.HexCode = hexCode;
  }
}

class Category {
  public ID: string;
  public Name: string;

  public constructor(id: string, name: string) {
    this.ID = id;
    this.Name = name;
  }
}

class Vehicle {
  public ID: string;
  public Partner: Partner;

  public Thumbnail: Image;
  public Images: Array<Image>;

  public Manufacturer: Manufacturer;
  public ManufacturingYear: Date;

  public Name: string;
  public Description: string;

  public Colors: Array<Color>;

  public Category: Category;

  public Capacity: number;

  public Price: number;
  public Discount: number;

  public Tags: Array<string>;

  public UpdatedAt: Date;
  public CreatedAt: Date;

  public constructor(
    id: string,
    partner: Partner,
    thumbnail: Image,
    images: Array<Image>,
    manufacturer: Manufacturer,
    manufacturingYear: Date,
    colors: Array<Color>,
    category: Category,
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

enum VEHICLE_INSTANCE_STATUS {
  AVAILABLE = "available",
  UNAVAILABLE = "unavailable",
}
class VehicleInstance {
  public ID: string;
  public Vehicle: Vehicle;

  public Color: Color;

  public Status: VEHICLE_INSTANCE_STATUS;

  public UpdateAt: Date;
  public CreatedAt: Date;

  public constructor(
    id: string,
    vehicle: Vehicle,
    color: Color,
    status: VEHICLE_INSTANCE_STATUS,
    updateAt: Date,
    createdAt: Date,
  ) {
    this.ID = id;
    this.Vehicle = vehicle;

    this.Color = color;

    this.Status = status;

    this.UpdateAt = updateAt;
    this.CreatedAt = createdAt;
  }
}

export { Vehicle, VehicleInstance };
