using Database.DTOs.Generals;
using Database.Entities;

namespace Database.DTOs.Partner;

public class ClsPartnerDTO
{
    public Guid UUID { get; set; }
    public ClsImageDTO? Logo { get; set; }
    public ClsImageDTO? Banner { get; set; }
    public string Handle { get; set; }
    public string Name { get; set; }
    public string PhoneNumber { get; set; }
    public string Email { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }

    public ClsPartnerDTO(PartnerEntity partner)
    {
        UUID = partner.UUID;
        Logo = partner.Logo == null
        ? null
        : new ClsImageDTO(partner.Logo);
        Banner = partner.Banner == null
        ? null
        : new ClsImageDTO(partner.Banner);
        Handle = partner.Handle;
        Name = partner.Name;
        PhoneNumber = partner.PhoneNumber;
        Email = partner.Email;
        UpdatedAt = partner.UpdatedAt;
        CreatedAt = partner.CreatedAt;
    }
}