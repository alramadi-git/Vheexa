using DataAccess.Entities;

namespace DataAccess.ResponseDTOs.EntityResponseEntityDTOs;

public class PartnerEntityDTO
{
    public int ID { get; set; }

    public ImageEntityDTO? Image { get; set; }

    public string Handle { get; set; }

    public string Name { get; set; }

    public string PhoneNumber { get; set; }

    public string Email { get; set; }

    public bool IsPublished { get; set; }

    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }

    public PartnerEntityDTO(PartnerEntity partner)
    {
        ID = partner.ID;

        Image = partner.Image != null
        ? new(partner.Image)
        : null;

        Handle = partner.Handle;

        Name = partner.Name;

        PhoneNumber = partner.PhoneNumber;

        Email = partner.Email;

        IsPublished = partner.IsPublished;

        IsDeleted = partner.IsDeleted;
        DeletedAt = partner.DeletedAt;

        UpdatedAt = partner.UpdatedAt;
        CreatedAt = partner.CreatedAt;
    }
}