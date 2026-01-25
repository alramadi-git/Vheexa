using Database.Partner.Enums;

namespace Database.Partner.DTOs;

public class ClsBranchFilterDTO
{
    public enum STATUS
    {
        ACTIVE,
        INACTIVE
    }
    public string? Search { get; set; }
    public STATUS? Status { get; set; }
}