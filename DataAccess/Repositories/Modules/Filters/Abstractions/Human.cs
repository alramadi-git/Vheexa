namespace DataAccess.Repositories.Modules.Filters.Abstractions;

public abstract class Human
{
    public string? FirstName { get; set; }
    public string? MidName { get; set; }
    public string? LastName { get; set; }

    public Address? Address { get; set; }


    public DateOnly? MinDateOfBirth { get; set; }
    public DateOnly? MaxDateOfBirth { get; set; }

    public string? Email { get; set; }

    public string? PhoneNumber { get; set; }
}
