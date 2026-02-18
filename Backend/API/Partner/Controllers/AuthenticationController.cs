using Microsoft.AspNetCore.Mvc;

using System.Security.Claims;

using API.Partner.Options;
using API.Helpers;

using API.Dtos;
using Microsoft.AspNetCore.Authorization;
using API.Partner.Inputs;

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
    public async Task<ActionResult<ClsAccountDto<Database.Partner.Models.ClsMemberAccountModel>>> RegisterAsync([FromForm] Business.Partner.Inputs.ClsRegisterCredentialsInput registerCredentials)
    {
        var memberAccount = await _AuthenticationService.RegisterAsync(registerCredentials);
        var claims = new List<Claim>
        {
            new Claim("Uuid", memberAccount.Account.Uuid.ToString()),
            new Claim("PartnerUuid", memberAccount.Account.Partner.Uuid.ToString()),
        };
        claims.AddRange(memberAccount.Account.Role.Permissions.Select(permission => new Claim("Permissions", permission.ToString())));

        var accessToken = _JwtHelper.Generate(claims);
        var account = new ClsAccountDto<Database.Partner.Models.ClsMemberAccountModel>
        {
            Account = memberAccount.Account,
            AccessToken = accessToken,
            RefreshToken = memberAccount.RefreshToken
        };

        return Created(string.Empty, account);
    }
    [HttpPost("login")]
    public async Task<ActionResult<ClsAccountDto<Database.Partner.Models.ClsMemberAccountModel>>> LoginAsync([FromBody] Business.Inputs.ClsLoginCredentialsInput loginCredentials)
    {
        var memberAccount = await _AuthenticationService.LoginAsync(loginCredentials);

        var claims = new List<Claim>
        {
            new Claim("Uuid", memberAccount.Account.Uuid.ToString()),
            new Claim("PartnerUuid", memberAccount.Account.Partner.Uuid.ToString()),
        };
        claims.AddRange(memberAccount.Account.Role.Permissions.Select(permission => new Claim("Permissions", permission.ToString())));

        var accessToken = _JwtHelper.Generate(claims);
        var account = new ClsAccountDto<Database.Partner.Models.ClsMemberAccountModel>
        {
            Account = memberAccount.Account,
            AccessToken = accessToken,
            RefreshToken = memberAccount.RefreshToken
        };

        return Ok(account);
    }
    [HttpPost("refresh-token")]
    public async Task<ActionResult<ClsTokensDto>> RefreshTokenAsync([FromBody] ClsRefreshTokenCredentialsInput credentials)
    {
        var refreshToken = await _AuthenticationService.RefreshTokenAsync(new Business.Partner.Inputs.ClsRefreshTokenCredentialsInput
        {
            Uuid = credentials.Uuid,
            RefreshToken = credentials.RefreshToken
        });

        var claims = new List<Claim>
        {
            new Claim("Uuid", credentials.Uuid.ToString()),
            new Claim("PartnerUuid", credentials.PartnerUuid.ToString()),
        };
        claims.AddRange(credentials.Permissions.Select(permission => new Claim("Permissions", permission.ToString())));

        var tokensDto = new ClsTokensDto
        {
            AccessToken = _JwtHelper.Generate(claims),
            RefreshToken = refreshToken
        };
        return Ok(tokensDto);
    }
    [HttpPost("logout")]
    [Authorize(AuthenticationSchemes = "Partners")]
    public async Task<ActionResult> LogoutAsync([FromBody] Business.Partner.Inputs.ClsLogoutCredentialsInput credentials)
    {
        await _AuthenticationService.LogoutAsync(credentials, new Database.Partner.Contexts.ClsMemberContext
        {
            Uuid = new Guid(User.FindFirst("Uuid")!.Value),
            PartnerUuid = new Guid(User.FindFirst("PartnerUuid")!.Value),
        });

        return Ok();
    }
}