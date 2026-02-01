namespace API.Models;

public class ClsAccountModel<TAccount>
{
    public TAccount Account { get; set; }
    public string Token { get; set; }
}