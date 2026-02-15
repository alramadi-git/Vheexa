using Database.Models;

namespace Database.User.Models;

public class ClsUserAccountModel
{
    public Guid Uuid { get; set; }
    public ClsImageModel? Avatar { get; set; }
    public ClsLocationModel Location { get; set; }
    public string Username { get; set; }
    public DateOnly Birthday { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
}