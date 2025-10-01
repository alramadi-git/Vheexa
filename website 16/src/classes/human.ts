import { Image, Location } from "./entities";

abstract class Human {
  public ID: string;

  public Avatar: Image;

  public Location: Location;

  public FirstName: string;
  public MidName: string;
  public LastName: string;

  public DateOfBirth: Date;

  public PhoneNumber: string;

  public Email: string;

  public UpdatedAt: Date;
  public CreatedAt: Date;

  constructor(
    id: string,
    avatar: Image,
    location: Location,
    firstName: string,
    midName: string,
    lastName: string,
    dateOfBirth: Date,
    phoneNumber: string,
    email: string,
    updatedAt: Date,
    createdAt: Date,
  ) {
    this.ID = id;

    this.Location = location;

    this.Avatar = avatar;

    this.FirstName = firstName;
    this.MidName = midName;
    this.LastName = lastName;

    this.DateOfBirth = dateOfBirth;

    this.PhoneNumber = phoneNumber;

    this.Email = email;

    this.UpdatedAt = updatedAt;
    this.CreatedAt = createdAt;
  }
}

export { Human };
