namespace DataAccess.helpers;

public static class Filters
{
    public class Pagination
    {

        public int Skip = 0;
        public int Take = 10;
    }

    public class Address
    {
        public string? Country;
        public string? City;
        public string? Street;
    }

    public class Human
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

        public required Pagination pagination;
    }
}
