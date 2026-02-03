namespace API.Dtos;

public class ClsAccountDto<TAccount>
{
    public TAccount Account { get; set; }
    public string Token { get; set; }
}