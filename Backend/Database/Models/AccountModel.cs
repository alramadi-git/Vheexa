namespace Database.Models;

public class ClsAccountModel<TAccount>
{
    public TAccount Account { get; set; }
    public string AccessToken { get; set; }
    public string RefreshToken { get; set; }
}