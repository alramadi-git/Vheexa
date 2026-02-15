using Microsoft.AspNetCore.Mvc;

using System.Security.Claims;

using API.Partner.Options;
using API.Helpers;

using API.Dtos;

namespace API.Partner.Controllers;

[ApiController]
[Route("api/partner/authentication")]
public class ClsAuthenticationController : Controller
{
    private readonly Business.Partner.Services.ClsAuthenticationService _AuthenticationService;
    private readonly ClsJwtHelper<ClsJwtOptions> _JwtHelper;


    public ClsAuthenticationController(Business.Partner.Services.ClsAuthenticationService authenticationService, ClsJwtHelper<ClsJwtOptions> jwtHelper)
    {
        _AuthenticationService = authenticationService;
        _JwtHelper = jwtHelper;
    }

    [HttpPost("register")]
    public async Task<ActionResult<ClsAccountDto<Database.Partner.Models.ClsMemberAccountModel>>> RegisterAsync([FromBody] Business.Partner.Inputs.ClsRegisterCredentialsInput registerCredentials)
    {
        var memberAccount = await _AuthenticationService.RegisterAsync(registerCredentials);
        var claims = new List<Claim>
        {
            new Claim("Uuid", memberAccount.Uuid.ToString()),
            new Claim("PartnerUuid", memberAccount.Partner.Uuid.ToString()),

        };
        claims.AddRange(memberAccount.Role.Permissions
            .Select(permission => new Claim("Permissions", permission.ToString())));

        var account = new ClsAccountDto<Database.Partner.Models.ClsMemberAccountModel>
        {
            Account = memberAccount,
            Token = _JwtHelper.Generate(claims)
        };

        return Created(string.Empty, account);
    }

    [HttpPost("login")]
    public async Task<ActionResult<ClsAccountDto<Database.Partner.Models.ClsMemberAccountModel>>> LoginAsync([FromBody] Business.Inputs.ClsLoginCredentialsInput loginCredentials)
    {
        var memberAccount = await _AuthenticationService.LoginAsync(loginCredentials);
        var claims = new List<Claim>
        {
            new Claim("Uuid", memberAccount.Uuid.ToString()),
            new Claim("PartnerUuid", memberAccount.Partner.Uuid.ToString()),

        };
        claims.AddRange(memberAccount.Role.Permissions
            .Select(permission => new Claim("Permissions", permission.ToString())));

        var account = new ClsAccountDto<Database.Partner.Models.ClsMemberAccountModel>
        {
            Account = memberAccount,
            Token = _JwtHelper.Generate(claims)
        };

        return Ok(account);
    }

}