import { tResponseOne, tResponseMany } from "./../../types/response";
import { tVehicle } from "./../types/vehicle";

class VehicleService {
  public static async GetOne(uuid: string): Promise<tResponseOne<tVehicle>> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/user/vehicles/${uuid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseBody = await response.json();

    if (response.ok === false) return responseBody;
    return responseBody;
  }

  public static async GetMany(): Promise<tResponseMany<tVehicle>> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/user/vehicles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseBody: tResponseMany<tVehicle> = await response.json();

    if (response.ok === false) return responseBody;
    return responseBody;
  }
}

export { VehicleService };
