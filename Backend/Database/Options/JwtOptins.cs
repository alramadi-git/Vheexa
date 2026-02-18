namespace Database.Options;

public abstract class ClsAbstractAccessTokenOptions
{
    public string Issuer { get; set; }
    public string Audience { get; set; }
    public int Expires { get; set; }
    public string SecretKey { get; set; }
}