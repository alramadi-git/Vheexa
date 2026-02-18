namespace Database.Entities;

public class ClsMemberRefreshTokenEntity
{
    public Guid Uuid { get; set; }
    public Guid MemberUuid { get; set; }
    public ClsMemberEntity Member { get; set; }
    public Guid RefreshTokenUuid { get; set; }
    public ClsRefreshTokenEntity RefreshToken { get; set; }
}