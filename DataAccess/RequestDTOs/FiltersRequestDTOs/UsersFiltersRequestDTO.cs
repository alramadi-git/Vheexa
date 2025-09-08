namespace DataAccess.RequestDTOs.FiltersRequestDTOs;

public enum USER_SORTING_OPTION_REQUEST_DTO
{
    CREATION,
    MODIFICATION,
    DELETION,
    AVERAGE_RATES,
    DATE_OF_BIRTH,
    FULL_NAME,
}

public class UserSortingRequestDTO : AbstractSortingFiltersRequestDTO<USER_SORTING_OPTION_REQUEST_DTO>;

public class UsersFiltersRequestDTO : AbstractHumanFiltrationRequestDTO<USER_SORTING_OPTION_REQUEST_DTO>
{
    public float? MinAverageRates { get; set; }
    public float? MaxAverageRates { get; set; }

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