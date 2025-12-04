using Database.DTOs.Generals;
using Database.Entities;

namespace Database.DTOs.Abstracts;

public abstract class AbstractClsHumanDTO
{
    public ClsImageDTO? Avatar { get; set; }
    public ClsLocationDTO Location { get; set; }
    public string Username { get; set; }
    public DateOnly DateOfBirth { get; set; }
    public string PhoneNumber { get; set; }
    public string Email { get; set; }

    public AbstractClsHumanDTO(HumanEntity human)
    {
        Avatar = human.Avatar == null
        ? null
        : new ClsImageDTO(human.Avatar);
        Location = new ClsLocationDTO(human.Location);
        Username = human.Username;
        DateOfBirth = human.Birthday;
        PhoneNumber = human.PhoneNumber;
        Email = human.Email;
    }
}