import { Image } from "./image";

class Partner {
  ID: string;

  Banner: Image;
  Logo: Image;

  Handle: string;
  Name: string;

  PhoneNumber: string;
  Email: string;

  UpdatedAt: Date;
  CreatedAt: Date;

  constructor(
    id: string,
    banner: Image,
    logo: Image,
    handle: string,
    name: string,
    phoneNumber: string,
    email: string,
    updatedAt: Date,
    createdAt: Date,
  ) {
    this.ID = id;

    this.Banner = banner;
    this.Logo = logo;

    this.Handle = handle;
    this.Name = name;

    this.PhoneNumber = phoneNumber;

    this.Email = email;

    this.UpdatedAt = updatedAt;
    this.CreatedAt = createdAt;
  }
}

export { Partner };
