import vehicles from "@/services/vehicle/vehicles.json";

import type { TUndefinable } from "@/types/nullish";
import type { IService } from "@/services/interfaces/iservice";

import { Pagination, SuccessMany } from "@/classes/api";
import { Location } from "@/classes/location";
import {
  FiltrationQuery,
  PaginationQuery,
} from "@/services/classes/filtration";

class CategoryQuery {
  public readonly ID: string;
  public readonly Label: string;

  public constructor(id: string, label: string) {
    this.ID = id;
    this.Label = label;
  }
}

class SortingQuery {
  public readonly ID: string;
  public readonly Label: string;

  public constructor(id: string, label: string) {
    this.ID = id;
    this.Label = label;
  }
}

class VehicleFiltrationQuery extends FiltrationQuery {
  public readonly Search: TUndefinable<string>;
  public readonly Category: TUndefinable<CategoryQuery>;
  public readonly Sorting: TUndefinable<SortingQuery>;

  public readonly PickupDate: TUndefinable<Date>;
  public readonly DropoffDate: TUndefinable<Date>;

  public readonly PickUpLocation: TUndefinable<Location>;
  public readonly DropoffLocation: TUndefinable<Location>;

  public constructor(
    pagination: PaginationQuery,
    search?: TUndefinable<string>,
    category?: TUndefinable<CategoryQuery>,
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

  public static GetMany(filtration: VehicleFiltrationQuery) {
    return new SuccessMany(vehicles, new Pagination(1, 10, 10));
  }
}

export { CategoryQuery, SortingQuery, VehicleFiltrationQuery, VehicleService };
