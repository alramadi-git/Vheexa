import { IVehiclesContext } from "@/data-access/interfaces";
import { Nullable } from "@/types";
import { TVehicle } from "../data-access/modules/vehicles";

class Vehicles {
  private static _Instance: Nullable<Vehicles>;
  public static Get(context: IVehiclesContext): Vehicles {
    if (Vehicles._Instance === null) Vehicles._Instance = new Vehicles(context);

    return Vehicles._Instance;
  }

  private readonly _Context: IVehiclesContext;

  private constructor(context: IVehiclesContext) {
    this._Context = context;
  }

  public async GetManyAsync(): ReturnType<typeof this._Context.GetManyAsync> {
    return this._Context.GetManyAsync();
  }

  public async GetOneAsync(
    id: TVehicle["ID"],
  ): ReturnType<typeof this._Context.GetOneAsync> {
    return this._Context.GetOneAsync(id);
  }
}

export { Vehicles };
