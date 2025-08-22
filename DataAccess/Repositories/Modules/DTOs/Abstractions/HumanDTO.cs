using DataAccess.Entities;

namespace DataAccess.Repositories.Modules.DTOs.Abstractions;

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

        Address = new AddressDTO(human!.Address!);

        FirstName = human.FirstName;
        MidName = human.MidName;
        LastName = human.LastName;

        DateOfBirth = human.DateOfBirth;

        PhoneNumber = human.PhoneNumber;

        Email = human.Email;
    }
}
