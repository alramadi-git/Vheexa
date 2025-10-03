import { Manufacturer, Color, Category, Vehicle } from "@/classes/vehicle";
import { Partner } from "@/classes/partner";
import { Image } from "@/classes/image";
import { SuccessMany, Pagination } from "@/classes/api";

class VehicleService {
  private static readonly Vehicle: Vehicle = new Vehicle(
    crypto.randomUUID(),
    new Partner(
      crypto.randomUUID(),
      new Image(crypto.randomUUID(), "https://example.com/image1.jpg"),
      new Image(crypto.randomUUID(), "https://example.com/image1.jpg"),
      "partner",
      "partner",
      "+999 012 345 6789",
      "partner1@vheexa.com",
      new Date(),
      new Date(),
    ),
    new Image(crypto.randomUUID(), "https://example.com/image1.jpg"),
    [
      new Image(crypto.randomUUID(), "https://example.com/image1.jpg"),
      new Image(crypto.randomUUID(), "https://example.com/image2.jpg"),
      new Image(crypto.randomUUID(), "https://example.com/image3.jpg"),
    ],
    new Manufacturer(
      crypto.randomUUID(),
      new Image(crypto.randomUUID(), "https://example.com/image1.jpg"),
      "Manufacturer1",
    ),
    new Date(2010, 1, 1),
    [
      new Color(crypto.randomUUID(), "white", "#ffffff"),
      new Color(crypto.randomUUID(), "black", "#000000"),
    ],
    new Category(crypto.randomUUID(), "Category1"),
    "Vehicle",
    "Vehicle is a vehicle from the year 2010",
    5,
    10000,
    0,
    ["tag1", "tag2", "tag3"],
    new Date(),
    new Date(),
  );

  private static readonly Vehicles: Array<Vehicle> = Array.from(
    { length: 32 },
    () => this.Vehicle,
  );

  public static GetOne() {
    return this.Vehicle;
  }

  public static GetAll() {
    return new SuccessMany(this.Vehicles, new Pagination(1, 8, 32));
  }
}

export { VehicleService };
