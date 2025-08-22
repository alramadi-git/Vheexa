using DataAccess.Entities;
using DataAccess.Repositories.Modules.DTOs;

namespace API.DTOs;

public abstract class HumanAddDTO
{
    public ImageAddDTO? Image { get; set; }

    public required AddressAddDTO Address { get; set; }

    public required string FirstName { get; set; }
    public required string MidName { get; set; }
    public required string LastName { get; set; }

    public DateOnly DateOfBirth { get; set; }

    public required string PhoneNumber { get; set; }

    public required string Email { get; set; }
    public required string Password { get; set; }
}

public abstract class HumanDTO
{
    public int ID { get; set; }

    public ImageDTO? Image { get; set; }
    public AddressDTO Address { get; set; }

    public string FirstName { get; set; }
    public string MidName { get; set; }
    public string LastName { get; set; }


    public DateOnly DateOfBirth { get; set; }

    public string PhoneNumber { get; set; }

    public string Email { get; set; }

    public HumanDTO(HumanEntity human)
    {
        ID = human.ID;

        Image = human.Image == null ? null : new ImageDTO(human.Image);

        Address = new AddressDTO(human.Address!);

        FirstName = human.FirstName;
        MidName = human.MidName;
        LastName = human.LastName;

        DateOfBirth = human.DateOfBirth;

        PhoneNumber = human.PhoneNumber;
        Email = human.Email;
    }
}

public abstract class HumanUpdateDTO
{
    public ImageUpdateDTO? Image { get; set; }
    public required AddressUpdateDTO Address { get; set; }

    public required string FirstName { get; set; }
    public required string MidName { get; set; }
    public required string LastName { get; set; }

    public DateOnly DateOfBirth { get; set; }

    public required string PhoneNumber { get; set; }

    public required string Email { get; set; }
}
