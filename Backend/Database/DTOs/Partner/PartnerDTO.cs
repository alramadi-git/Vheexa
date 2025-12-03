using Database.Entities;

namespace Database.DTOs.Partner;

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

    public PartnerDTO(PartnerEntity partner)
    {
        UUID = partner.UUID;
        Logo = partner.Logo == null
        ? null
        : new ImageDTO(partner.Logo);
        Banner = partner.Banner == null
        ? null
        : new ImageDTO(partner.Banner);
        Handle = partner.Handle;
        Name = partner.Name;
        PhoneNumber = partner.PhoneNumber;
        Email = partner.Email;
        UpdatedAt = partner.UpdatedAt;
        CreatedAt = partner.CreatedAt;
    }
}