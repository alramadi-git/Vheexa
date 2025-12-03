using Database.Entities;

namespace Database.DTOs;

public class AbstractHumanDTO
{
    public Guid UUID { get; set; }

    public ImageDTO? Avatar { get; set; }
    public LocationDTO Location { get; set; }

    public string Username { get; set; }
    public DateOnly DateOfBirth { get; set; }

    public string PhoneNumber { get; set; }
    public string Email { get; set; }

    public AbstractHumanDTO(HumanEntity humanEntity)
    {
        UUID = humanEntity.UUID;

        Avatar = humanEntity.Avatar == null
        ? null
        : new ImageDTO(humanEntity.Avatar);
        Location = new LocationDTO(humanEntity.Location);

        Username = humanEntity.Username;
        DateOfBirth = humanEntity.Birthday;

        PhoneNumber = humanEntity.PhoneNumber;
        Email = humanEntity.Email;
    }
}