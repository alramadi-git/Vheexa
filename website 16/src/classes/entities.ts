class Image_ {
  public URL: string;

  constructor(URL: string) {
    this.URL = URL;
  }
}

class Location_ {
  public ID: number;
  
  public Country: string;
  public City: string;
  public Street: string;

  public Latitude: number;
  public Longitude: number;

  constructor(
    ID: number,
    country: string,
    city: string,
    street: string,
    latitude: number,
    longitude: number,
  ) {
    this.ID = ID;

    this.Country = country;
    this.City = city;
    this.Street = street;

    this.Latitude = latitude;
    this.Longitude = longitude;
  }
}
