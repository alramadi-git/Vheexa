using DataAccess.Repositories.Modules.Filters.Abstractions;

namespace DataAccess.Repositories.Modules.Filters;

public class User : Human
{
    public float? MinAverageRates { get; set; }
    public float? MaxAverageRates { get; set; }

    public bool IsDeleted { get; set; } = false;
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