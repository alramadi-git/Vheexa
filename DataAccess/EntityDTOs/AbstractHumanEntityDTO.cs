using DataAccess.Entities;

namespace DataAccess.EntityDTOs;

public abstract class AbstractHumanEntityDTO
{
    public int ID { get; set; }

    public ImageEntityDTO? Image { get; set; }
    public AddressDTOEntity Address { get; set; }

    public string FirstName { get; set; }
    public string MidName { get; set; }
    public string LastName { get; set; }

    public DateOnly DateOfBirth { get; set; }

    public string PhoneNumber { get; set; }

    public string Email { get; set; }

    public AbstractHumanEntityDTO(HumanEntity human)
    {
        ID = human.ID;

        Image = human.Image == null ? null : new ImageEntityDTO(human.Image);

        Address = new AddressDTOEntity(human!.Address!);

        FirstName = human.FirstName;
        MidName = human.MidName;
        LastName = human.LastName;

        DateOfBirth = human.DateOfBirth;

        PhoneNumber = human.PhoneNumber;

        Email = human.Email;
    }
}