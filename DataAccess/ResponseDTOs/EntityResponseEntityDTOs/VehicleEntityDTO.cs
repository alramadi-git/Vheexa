using DataAccess.Entities;

namespace DataAccess.ResponseDTOs.EntityResponseEntityDTOs;

public class VehicleEntityDTO
{
    public int ID { get; set; }
    public int PartnerID { get; set; }

    public ImageEntityDTO? Thumbnail { get; set; }
    public IEnumerable<VehicleImageEntityDTO>? Images { get; set; }

    public IEnumerable<VehicleInstanceEntityDTO>? Instances { get; set; }

    public string Name { get; set; }
    public string Description { get; set; }

    public VEHICLE_CATEGORY_OPTION_ENTITY Category { get; set; }

    public string Manufacturer { get; set; }
    public DateOnly ManufacturingYear { get; set; }

    public short Capacity { get; set; }

    public string[] Tags { get; set; }

    public decimal Price { get; set; }
    public float Discount { get; set; }

    public bool IsPublished { get; set; }

    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }

    public VehicleEntityDTO(VehicleEntity vehicle, IEnumerable<VehicleImageEntity> images, IEnumerable<VehicleInstanceEntity> instances)
    {
        ID = vehicle.ID;
        PartnerID = vehicle.PartnerID;

        Thumbnail = vehicle.Thumbnail != null ? new ImageEntityDTO(vehicle.Thumbnail) : null;
        Images = images != null && images.Any()
            ? images.Select(image => new VehicleImageEntityDTO(image)).ToArray()
            : null;

        Instances = instances != null && instances.Any()
            ? instances.Select(instance => new VehicleInstanceEntityDTO(instance)).ToArray()
            : null;

        Name = vehicle.Name;
        Description = vehicle.Description;

        Category = vehicle.Category;

        Manufacturer = vehicle.Manufacturer;
        ManufacturingYear = vehicle.ManufacturingYear;

        Capacity = vehicle.Capacity;

        Tags = vehicle.Tags;

        Price = vehicle.Price;
        Discount = vehicle.Discount;

        IsPublished = vehicle.IsPublished;

        IsDeleted = vehicle.IsDeleted;
        DeletedAt = vehicle.DeletedAt;

        UpdatedAt = vehicle.UpdatedAt;
        CreatedAt = vehicle.CreatedAt;
    }
}