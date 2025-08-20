using API.DTOs.Helpers;

namespace API.DTOs;

public class UserAddDTO
{
    public static DataAccess.Repositories.UserRepository.Add ToDataAccessUserSchema(UserAddDTO user)
    {
        return new DataAccess.Repositories.UserRepository.Add
        {
            Image =
            user.Image == null ? null : new DataAccess.helpers.Add.Image
            {
                URL = user.Image.URL,
                Alternate = user.Image.Alternate,
            },

            Address = new DataAccess.helpers.Add.Address
            {
                URL = user.Address.URL,

                Country = user.Address.Country,
                City = user.Address.City,
                Street = user.Address.Street
            },

            FirstName = user.FirstName,
            MidName = user.MidName,
            LastName = user.LastName,

            DateOfBirth = user.DateOfBirth,

            PhoneNumber = user.PhoneNumber,

            Email = user.Email,
            Password = user.Password
        };
    }

    public ImageAddDTO? Image;

    public required AddressAddDTO Address;

    public required string FirstName;
    public required string MidName;
    public required string LastName;

    public DateOnly DateOfBirth;

    public required string PhoneNumber;

    public required string Email;
    public required string Password;
}

public class UserDTO
{
    public int ID;

    public ImageDTO? Image;
    public required AddressDTO Address;

    public required string FirstName;
    public required string MidName;
    public required string LastName;

    public required float AverageRates;

    public DateOnly DateOfBirth;

    public required string PhoneNumber;

    public required string Email;

    public bool IsDeleted;
    public DateTime DeletedAt;

    public DateTime CreatedAt;
    public DateTime UpdatedAt;
}

public class UserUpdateDTO
{
    public static DataAccess.Repositories.UserRepository.Update ToDataAccessUserSchema(UserUpdateDTO user)
    {
        return new DataAccess.Repositories.UserRepository.Update
        {
            Image =
            user.Image == null ? null : new DataAccess.helpers.Update.Image
            {
                URL = user.Image.URL,
                Alternate = user.Image.Alternate,
            },

            Address = new DataAccess.helpers.Update.Address
            {
                URL = user.Address.URL,

                Country = user.Address.Country,
                City = user.Address.City,
                Street = user.Address.Street
            },

            FirstName = user.FirstName,
            MidName = user.MidName,
            LastName = user.LastName,

            DateOfBirth = user.DateOfBirth,

            PhoneNumber = user.PhoneNumber,

            Email = user.Email,
        };
    }

    public required ImageUpdateDTO Image;
    public required AddressUpdateDTO Address;

    public required string FirstName;
    public required string MidName;
    public required string LastName;

    public required DateOnly DateOfBirth;

    public required string PhoneNumber;

    public required string Email;
}
