namespace DataAccess.RequestDTOs.FiltersRequestDTOs;

public abstract class AbstractFiltersRequestDTO<TSortingOption> where TSortingOption : Enum
{
    public required AbstractSortingFiltersRequestDTO<TSortingOption> Sorting { get; set; }
    public required PaginationFiltersRequestDTO Pagination { get; set; }
}