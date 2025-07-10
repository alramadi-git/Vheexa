import type { IContext } from "@/data-access/interfaces";
import type { TVehicle } from "@/data-access/modules";

interface IVehiclesContext extends IContext {
  GetManyAsync(): Promise<unknown>;
  GetOneAsync(id: TVehicle["ID"]): Promise<unknown>;
}

export type { IVehiclesContext };
