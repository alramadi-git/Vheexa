namespace Database.Entities;

public class ClsUserRefreshTokenEntity
{
    public Guid Uuid { get; set; }
    public Guid UserUuid { get; set; }
    public ClsUserEntity User { get; set; }
    public Guid RefreshTokenUuid { get; set; }
    public ClsRefreshTokenEntity RefreshToken { get; set; }
}