using DataAccess.Entities;

namespace DataAccess.RequestDTOs.FiltrationRequestDTOs;
public enum VEHICLE_SORTING_OPTION_REQUEST_DTO
{
    CREATION,
    MODIFICATION,
    PUBLICATION,
    DISCOUNT,
    PRICE,
    CAPACITY,
    MANUFACTURING_YEAR,
    MANUFACTURER,
    CATEGORY,
    NAME
}

public class VehicleSortingRequestDTO : AbstractSortingFiltrationRequestDTO<VEHICLE_SORTING_OPTION_REQUEST_DTO>;

public class VehicleFiltrationRequestDTO
: AbstractFiltrationRequestDTO<VEHICLE_SORTING_OPTION_REQUEST_DTO>
{
    public string? Name { get; set; }
    public string? Description { get; set; }

    public VEHICLE_CATEGORY_OPTION_ENTITY? Category { get; set; }
    
    public string? Manufacturer { get; set; }

    public DateOnly? MinManufacturingYear { get; set; }
    public DateOnly? MaxManufacturingYear { get; set; }

    public short? MinCapacity { get; set; }
    public short? MaxCapacity { get; set; }

    public string[]? Tags { get; set; }

    public decimal? MinPrice { get; set; }
    public decimal? MaxPrice { get; set; }

    public float? MinDiscount { get; set; }
    public float? MaxDiscount { get; set; }

    public required bool IsPublished { get; set; }

    public required bool IsDeleted { get; set; }

    public DateTime? DeletedBefore { get; set; }
    public DateTime? DeletedAt { get; set; }
    public DateTime? DeletedAfter { get; set; }

    public DateTime? UpdatedBefore { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public DateTime? UpdatedAfter { get; set; }

    public DateTime? CreatedBefore { get; set; }
    public DateTime? CreatedAt { get; set; }
    public DateTime? CreatedAfter { get; set; }
}