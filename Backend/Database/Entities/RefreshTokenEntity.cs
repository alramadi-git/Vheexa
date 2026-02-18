namespace Database.Entities;

public class ClsRefreshTokenEntity
{
    public Guid Uuid { get; set; }
    public string RefreshToken { get; set; }
    public bool IsRevoked { get; set; }
    public DateTime ExpiresAt { get; set; }
    public DateTime CreatedAt { get; set; }
}