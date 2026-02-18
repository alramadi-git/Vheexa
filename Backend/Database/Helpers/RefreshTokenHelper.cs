using System.Security.Cryptography;

using Microsoft.AspNetCore.Identity;

namespace Database.Helpers;

public class ClsRefreshTokenHelper
{
    public string Generate()
    {
        var randomNumber = new byte[32];
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }
    }

    public string Hash(string refreshToken)
    {
        return new PasswordHasher<object?>().HashPassword(null, refreshToken);
    }
    public PasswordVerificationResult Verify(string hashedRefreshToken, string refreshToken)
    {
        return new PasswordHasher<object?>().VerifyHashedPassword(null, hashedRefreshToken, refreshToken);
    }
}