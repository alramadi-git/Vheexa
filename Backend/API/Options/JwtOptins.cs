namespace API.Options;

public abstract class ClsAbstractJwtOptions
{
    public string Issuer { get; set; }
    public string Audience { get; set; }
    public int Expires { get; set; }
    public string SecretKey { get; set; }
}