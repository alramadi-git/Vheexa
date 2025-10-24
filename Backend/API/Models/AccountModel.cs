
namespace API.Models;

public class AccountModel<TAccount>
{
    public TAccount Account { get; set; }
    public string Token { get; set; }

    public AccountModel(TAccount account, string token)
    {
        Account = account;
        Token = token;
    }
}