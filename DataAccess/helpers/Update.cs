namespace DataAccess.helpers;

public static class Update
{
    public class Image
    {
        public required string URL { get; set; }
        public required string Alternate { get; set; }
    }

    public class Address
    {
        public required string URL { get; set; }

        public required string Country { get; set; }
        public required string City { get; set; }
        public required string Street { get; set; }
    }

    public class Human
    {
        public Image? Image { get; set; }
        public required Address Address { get; set; }

        public required string FirstName { get; set; }
        public required string MidName { get; set; }
        public required string LastName { get; set; }

        public required DateOnly DateOfBirth { get; set; }

        public required string PhoneNumber { get; set; }

        public required string Email { get; set; }
    }
}