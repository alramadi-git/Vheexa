namespace DataAccess.helpers;

public static class Add
{
    public class Image
    {
        public required string URL;
        public required string Alternate;
    }

    public class Address
    {
        public required string URL;

        public required string Country;
        public required string City;
        public required string Street;
    }

    public class Human
    {
        public Image? Image;
        public required Address Address;

        public required string FirstName;
        public required string MidName;
        public required string LastName;

        public required DateOnly DateOfBirth;

        public required string PhoneNumber;

        public required string Email;
        public required string Password;
    }
}