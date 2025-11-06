using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace API.Configurations;

public class JwtSettings
{
    public int Lifetime { get; set; }
    public string Issuer { get; set; }
    public string Audience { get; set; }
    public string IssuerSigningKey { get; set; }

    public SymmetricSecurityKey SymmetricSecurityKey()
    {
        var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(IssuerSigningKey!));
        return symmetricSecurityKey;
    }
}