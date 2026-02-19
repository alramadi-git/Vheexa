using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

using Microsoft.Extensions.Options;

using Microsoft.IdentityModel.Tokens;

using Database.Options;

namespace Database.Helpers;

public class ClsAccessTokenHelper<TJwtOptions> where TJwtOptions : ClsAbstractAccessTokenOptions
{
    private readonly TJwtOptions _Options;
    public ClsAccessTokenHelper(IOptions<TJwtOptions> options)
    {
        _Options = options.Value;
    }

    public string Generate(IEnumerable<Claim> claims)
    {
        var signingCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_Options.SecretKey)), SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
             _Options.Issuer,
            _Options.Audience,
            claims,
            null,
            // DateTime.UtcNow.AddMinutes(_Options.Expires),
            DateTime.UtcNow.AddSeconds(5), // TO_REMOVE
            signingCredentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}