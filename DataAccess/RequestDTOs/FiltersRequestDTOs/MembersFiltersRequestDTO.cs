namespace DataAccess.RequestDTOs.FiltersRequestDTOs;

public enum MEMBER_SORTING_OPTION_REQUEST_DTO
{
    CREATION,
    MODIFICATION,
    DELETION,
    DATE_OF_BIRTH,
    FULL_NAME,
}

public class MemberSortingRequestDTO : AbstractSortingFiltersRequestDTO<MEMBER_SORTING_OPTION_REQUEST_DTO>;

public class MemberFiltrationRequestDTO : AbstractHumanFiltrationRequestDTO<MEMBER_SORTING_OPTION_REQUEST_DTO>
{
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