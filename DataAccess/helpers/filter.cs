namespace DataAccess.helpers;

public static class Filters
{
    public class Pagination
    {
        public enum TAKE_RANGE : int
        {
            VARY_LOW = 10,
            LOW = 25,
            MEDIUM = 50,
            HIGH = 75,
            VERY_HIGH = 100,

        }
        public int Skip = 0;
        public TAKE_RANGE Take = TAKE_RANGE.VERY_HIGH;
    }

    public class Address
    {
        public string? Country;
        public string? City;
        public string? Street;
    }

    public class User
    {
        public string? FirstName;
        public string? MidName;
        public string? LastName;

        public Address? Address;

        public float? MinAverageRates;
        public float? MaxAverageRates;

        public DateOnly? MinDateOfBirth;
        public DateOnly? MaxDateOfBirth;

        public string? Email;

        public string? PhoneNumber;

        public bool IsDeleted = false;
        public DateTime? DeletedBefore;
        public DateTime? DeletedAt;
        public DateTime? DeletedAfter;

        public DateTime? UpdatedBefore;
        public DateTime? UpdatedAt;
        public DateTime? UpdatedAfter;

        public DateTime? CreatedBefore;
        public DateTime? CreatedAt;
        public DateTime? CreatedAfter;

        public required Pagination pagination;
    }
}
