import "reflect-metadata";

import { Expose } from "class-transformer";

class Location {
  @Expose() public readonly ID: string;

  
  @Expose() public readonly Country: string;
  @Expose() public readonly City: string;
  @Expose() public readonly Street: string;

  @Expose() public readonly Latitude: number;
  @Expose() public readonly Longitude: number;

  constructor(
    id: string,
    country: string,
    city: string,
    street: string,
    latitude: number,
    longitude: number,
  ) {
    this.ID = id;

    this.Country = country;
    this.City = city;
    this.Street = street;

    this.Latitude = latitude;
    this.Longitude = longitude;
  }
}

export { Location };
