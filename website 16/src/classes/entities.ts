class Image {
  public ID: string;

  public URL: string;

  constructor(id: string, url: string) {
    this.ID = id;

    this.URL = url;
  }
}

class Location {
  public ID: string;

  public Country: string;
  public City: string;
  public Street: string;

  public Latitude: number;
  public Longitude: number;

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

export { Image, Location };
