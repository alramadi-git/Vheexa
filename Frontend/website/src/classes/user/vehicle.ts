import type { tNullable } from "@/types/nullish";
import type { tVehicleModel } from "@/models/[user]/vehicle";

import { clsPartner } from "./partner";
import { clsImage } from "./image";
import { clsVehicleColor } from "./vehicle-color";

class clsVehicle {
  public uuid: string;

  public partner: clsPartner;

  public thumbnail: tNullable<clsImage>;
  public images: clsImage[];

  public colors: clsVehicleColor[];

  public name: string;
  public description: string;

  public manufacturer: string;
  public modelYear: Date;

  public transmission: string;
  public fuel: string;
  public capacity: number;

  public price: number;
  public discount: number;

  public tags: string[];

  public updatedAt: Date;
  public createdAt: Date;

  public constructor(vehicle: tVehicleModel) {
    this.uuid = vehicle.uuid;

    this.partner = new clsPartner(vehicle.partner);

    this.thumbnail =
      vehicle.thumbnail === null ? null : new clsImage(vehicle.thumbnail);
    this.images = vehicle.images.map((image) => new clsImage(image));

    this.colors = vehicle.colors.map(
      (vehicleColor) => new clsVehicleColor(vehicleColor),
    );

    this.name = vehicle.name;
    this.description = vehicle.description;

    this.manufacturer = vehicle.manufacturer;
    this.modelYear = new Date(vehicle.modelYear);

    this.transmission = vehicle.transmission;
    this.fuel = vehicle.fuel;
    this.capacity = vehicle.capacity;

    this.price = vehicle.price;
    this.discount = vehicle.discount;

    this.tags = vehicle.tags;

    this.updatedAt = new Date(vehicle.updatedAt);
    this.createdAt = new Date(vehicle.createdAt);
  }

  public isDiscounted(): boolean {
    return this.discount != 0;
  }

  public getNetPrice(): number {
    return this.price;
  }
  public getGrossPrice(): number {
    return this.price - (this.price * this.discount);
  }
}

export { clsVehicle };
