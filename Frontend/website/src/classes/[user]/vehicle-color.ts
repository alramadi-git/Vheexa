import type { tVehicleColorModel } from "@/models/vehicle-color";

class clsVehicleColor {
  public uuid: string;

  public name: string;
  public hexCode: string;

  public constructor(vehicleColor: tVehicleColorModel) {
    this.uuid = vehicleColor.uuid;

    this.name = vehicleColor.name;
    this.hexCode = vehicleColor.hexCode;
  }
}

export { clsVehicleColor };
