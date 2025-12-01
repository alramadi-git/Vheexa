using Database.Entities;

namespace Database.DTOs;

public class PartnerDTO
{
    public Guid UUID { get; set; }

    public ImageDTO? Logo { get; set; }
    public ImageDTO? Banner { get; set; }

    public string Handle { get; set; }
    public string Name { get; set; }

    public string PhoneNumber { get; set; }
    public string Email { get; set; }

    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }

    public PartnerDTO(PartnerEntity partnerEntity)
    {
        UUID = partnerEntity.UUID;

        Logo = partnerEntity.Logo == null
        ? null
        : new ImageDTO(partnerEntity.Logo);
        Banner = partnerEntity.Banner == null
        ? null
        : new ImageDTO(partnerEntity.Banner);

        Handle = partnerEntity.Handle;
        Name = partnerEntity.Name;

        PhoneNumber = partnerEntity.PhoneNumber;
        Email = partnerEntity.Email;

        UpdatedAt = partnerEntity.UpdatedAt;
        CreatedAt = partnerEntity.CreatedAt;
    }
}