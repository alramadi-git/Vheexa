import vehicles from "@/services/vehicle/vehicles.json";

import type { TUndefinable } from "@/types/nullish";
import type { IService } from "@/services/interfaces/iservice";

import { Pagination, SuccessMany } from "@/classes/api";
import { Location } from "@/classes/location";
import { Category } from "@/classes/vehicle";
import { Filtration, PaginationQuery } from "@/services/classes/filtration";

class VehicleFiltration extends Filtration {
  public readonly Search: TUndefinable<string>;
  public readonly Category: TUndefinable<Category>;

  public readonly PickupDate: TUndefinable<Date>;
  public readonly DropoffDate: TUndefinable<Date>;

  public readonly PickUpLocation: TUndefinable<Location>;
  public readonly DropoffLocation: TUndefinable<Location>;

  public constructor(
    pagination: PaginationQuery,
    search?: TUndefinable<string>,
    category?: TUndefinable<Category>,
    pickupDate?: TUndefinable<Date>,
    dropoffDate?: TUndefinable<Date>,
    pickUpLocation?: TUndefinable<Location>,
    dropoffLocation?: TUndefinable<Location>,
  ) {
    super(pagination);

    this.Search = search;
    this.Category = category;

    this.PickupDate = pickupDate;
    this.DropoffDate = dropoffDate;

    this.PickUpLocation = pickUpLocation;
    this.DropoffLocation = dropoffLocation;
  }
}

class VehicleService implements IService {
  public static GetOne(id: string) {
    return vehicles.find((vehicle) => vehicle.ID === id);
  }

  public static GetMany(filtration: VehicleFiltration) {
    return new SuccessMany(vehicles, new Pagination(1, 10, 10));
  }
}

export { VehicleFiltration, VehicleService };
