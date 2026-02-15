using Microsoft.AspNetCore.Mvc;

using System.Security.Claims;

using API.User.Options;
using API.Helpers;

using API.Dtos;

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
    public async Task<ActionResult<ClsAccountDto<Database.User.Models.ClsUserAccountModel>>> RegisterAsync([FromBody] Business.User.Inputs.ClsRegisterCredentialsInput registerCredentials)
    {
        var userAccount = await _AuthenticationService.RegisterAsync(registerCredentials);
        var claims = new List<Claim>
        {
            new Claim("Uuid", userAccount.Uuid.ToString()),

        };

        var account = new ClsAccountDto<Database.User.Models.ClsUserAccountModel>
        {
            Account = userAccount,
            Token = _JwtHelper.Generate(claims)
        };

        return Created(string.Empty, account);
    }

    [HttpPost("login")]
    public async Task<ActionResult<ClsAccountDto<Database.User.Models.ClsUserAccountModel>>> LoginAsync([FromBody] Business.Inputs.ClsLoginCredentialsInput loginCredentials)
    {
        var userAccount = await _AuthenticationService.LoginAsync(loginCredentials);
        var claims = new List<Claim>
        {
            new Claim("Uuid", userAccount.Uuid.ToString()),
        };

        var account = new ClsAccountDto<Database.User.Models.ClsUserAccountModel>
        {
            Account = userAccount,
            Token = _JwtHelper.Generate(claims)
        };

        return Ok(account);
    }

}