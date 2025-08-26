using DataAccess.Entities;

namespace DataAccess.EntityDTOs;

public class PartnerEntityDTO
{
    public int ID { get; set; }

    public string Handle { get; set; }

    public string Name { get; set; }

    public string PhoneNumber { get; set; }

    public string Email { get; set; }
    public string Password { get; set; }

    public float AverageRates { get; set; }

    public bool IsPublished { get; set; }

    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }

    public PartnerEntityDTO(PartnerEntity partner)
    {
        ID = partner.ID;

        Handle = partner.Handle;

        Name = partner.Name;

        PhoneNumber = partner.PhoneNumber;

        Email = partner.Email;
        Password = partner.Password;

        AverageRates = partner.AverageRates;

        IsPublished = partner.IsPublished;

        IsDeleted = partner.IsDeleted;
        DeletedAt = partner.DeletedAt;

        UpdatedAt = partner.UpdatedAt;
        CreatedAt = partner.CreatedAt;
    }
}