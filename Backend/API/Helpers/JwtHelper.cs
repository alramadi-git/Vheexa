using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

using System.Text;
using System.Security.Claims;

using API.Options;
using Microsoft.Extensions.Options;

namespace API.Helpers;

public class ClsJwtHelper<TJwtOptions> where TJwtOptions : ClsAbstractJwtOptions
{
    private readonly TJwtOptions _Options;
    public ClsJwtHelper(IOptions<TJwtOptions> options)
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
            DateTime.Now.AddMinutes(_Options.Expires),
            signingCredentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}