namespace Database.Entities;

public class ClsMemberRefreshTokenEntity
{
    public Guid Uuid { get; set; }
    public Guid UserUuid { get; set; }
    public Guid RefreshTokenUuid { get; set; }
}