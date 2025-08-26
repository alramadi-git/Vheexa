namespace DataAccess.RequestDTOs;

public abstract class AbstractGetManySettingsDTO<TFiltersRequestDTO, TSortingRequestDTO>
{
    public required TFiltersRequestDTO Filters { get; set; }
    public required TSortingRequestDTO Sorting { get; set; }
    public required PaginationRequestDTO Pagination { get; set; }
}