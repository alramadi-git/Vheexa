import { IVehiclesContext } from "@/data-access/interfaces";
import { TVehicle } from "@/data-access/modules";

class VehiclesContext implements IVehiclesContext {
  GetManyAsync(): Promise<unknown> {
    throw new Error("Method not implemented.");
  }
  GetOneAsync(id: TVehicle["ID"]): Promise<unknown> {
    throw new Error("Method not implemented.");
  }
}

export { VehiclesContext };
