namespace Database.Partner.Inputs;

public class ClsRefreshTokenCredentialsInput
{
    public required Guid Uuid { get; set; }
    public required string RefreshToken { get; set; }
}