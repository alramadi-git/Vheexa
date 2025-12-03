using Database.Entities;

namespace Database.DTOs.User;

public class UserDTO
{
    public Guid UUID { get; set; }
    public ImageDTO? Avatar { get; set; }
    public LocationDTO Location { get; set; }
    public string Username { get; set; }
    public DateOnly DateOfBirth { get; set; }
    public string PhoneNumber { get; set; }
    public string Email { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }

    public UserDTO(UserEntity user)
    {
        UUID = user.Human.UUID;
        Avatar = user.Human.Avatar == null
        ? null
        : new ImageDTO(user.Human.Avatar);
        Location = new LocationDTO(user.Human.Location);
        Username = user.Human.Username;
        DateOfBirth = user.Human.Birthday;
        PhoneNumber = user.Human.PhoneNumber;
        Email = user.Human.Email;
        UpdatedAt = user.UpdatedAt;
        CreatedAt = user.CreatedAt;
    }
}