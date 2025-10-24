using Database.Entities;

namespace Database.User.DTOs;

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

    public UserDTO(UserEntity userEntity)
    {
        UUID = userEntity.Human.UUID;

        Avatar = userEntity.Human.Avatar == null
        ? null
        : new ImageDTO(userEntity.Human.Avatar);
        Location = new LocationDTO(userEntity.Human.Location);

        Username = userEntity.Human.Username;
        DateOfBirth = userEntity.Human.DateOfBirth;

        PhoneNumber = userEntity.Human.PhoneNumber;
        Email = userEntity.Human.Email;

        UpdatedAt = userEntity.UpdatedAt;
        CreatedAt = userEntity.CreatedAt;
    }
}