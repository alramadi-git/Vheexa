namespace API.Partner.Inputs;

public class ClsRefreshTokenCredentialsInput
{
    public required Guid Uuid { get; set; }
    public required Guid PartnerUuid { get; set; }
    public required Database.Partner.Enums.PERMISSION[] Permissions { get; set; }
    public required string RefreshToken { get; set; }
}