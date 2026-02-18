using Microsoft.AspNetCore.Mvc;

using System.Security.Claims;

using API.User.Options;

using API.Helpers;

using API.Dtos;
using Microsoft.AspNetCore.Authorization;

namespace API.User.Controllers;

[ApiController]
[Route("api/user/authentication")]
public class ClsAuthenticationController : Controller
{
    private readonly Business.User.Services.ClsAuthenticationService _AuthenticationService;
    private readonly ClsJwtHelper<ClsJwtOptions> _JwtHelper;


    public ClsAuthenticationController(Business.User.Services.ClsAuthenticationService authenticationService, ClsJwtHelper<ClsJwtOptions> jwtHelper)
    {
        _AuthenticationService = authenticationService;
        _JwtHelper = jwtHelper;
    }

    [HttpPost("register")]
    public async Task<ActionResult<ClsAccountDto<Database.User.Models.ClsUserAccountModel>>> RegisterAsync([FromForm] Business.User.Inputs.ClsRegisterCredentialsInput registerCredentials)
    {
        var userAccount = await _AuthenticationService.RegisterAsync(registerCredentials);

        var claims = new Claim[]
        {
            new Claim("Uuid", userAccount.Account.Uuid.ToString()),
        };

        var accessToken = _JwtHelper.Generate(claims);
        var account = new ClsAccountDto<Database.User.Models.ClsUserAccountModel>
        {
            Account = userAccount.Account,
            AccessToken = accessToken,
            RefreshToken = userAccount.RefreshToken
        };

        return Created(string.Empty, account);
    }

    [HttpPost("login")]
    public async Task<ActionResult<ClsAccountDto<Database.User.Models.ClsUserAccountModel>>> LoginAsync([FromBody] Business.Inputs.ClsLoginCredentialsInput credentials)
    {
        var userAccount = await _AuthenticationService.LoginAsync(credentials);

        var claims = new Claim[]
        {
            new Claim("Uuid", userAccount.Account.Uuid.ToString()),
        };

        var accessToken = _JwtHelper.Generate(claims);
        var account = new ClsAccountDto<Database.User.Models.ClsUserAccountModel>
        {
            Account = userAccount.Account,
            AccessToken = accessToken,
            RefreshToken = userAccount.RefreshToken
        };

        return Ok(account);
    }
    [HttpPost("refresh-token")]

    public async Task<ActionResult<ClsTokensDto>> RefreshTokenAsync([FromBody] Business.User.Inputs.ClsRefreshTokenCredentialsInput credentials)
    {
        var refreshToken = await _AuthenticationService.RefreshTokenAsync(credentials);

        var claims = new Claim[]
        {
            new Claim("Uuid", credentials.Uuid.ToString()),
        };

        var tokensDto = new ClsTokensDto
        {
            AccessToken = _JwtHelper.Generate(claims),
            RefreshToken = refreshToken
        };
        return Ok(tokensDto);
    }
    [HttpPost("logout")]
    [Authorize(AuthenticationSchemes = "Users")]

    public async Task<ActionResult> LogoutAsync([FromBody] Business.User.Inputs.ClsLogoutCredentialsInput credentials)
    {
        await _AuthenticationService.LogoutAsync(credentials, new Database.User.Contexts.ClsUserContext
        {
            Uuid = new Guid(User.FindFirst("Uuid")!.Value),
        });

        return Ok();
    }
}