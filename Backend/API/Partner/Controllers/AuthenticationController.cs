using Microsoft.AspNetCore.Mvc;

namespace API.Partner.Controllers;

[ApiController]
[Route("api/partner/authentication")]
public class ClsAuthenticationController : Controller
{
    private readonly Business.Partner.Services.ClsAuthenticationService _AuthenticationService;


    public ClsAuthenticationController(Business.Partner.Services.ClsAuthenticationService authenticationService)
    {
        _AuthenticationService = authenticationService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<Database.Models.ClsAccountModel<Database.Partner.Models.ClsMemberAccountModel>>> RegisterAsync([FromForm] Business.Partner.Inputs.ClsRegisterCredentialsInput credentials)
    {
        var memberModel = await _AuthenticationService.RegisterAsync(credentials);

        return Created(string.Empty, memberModel);
    }
    [HttpPost("login")]
    public async Task<ActionResult<Database.Models.ClsAccountModel<Database.Partner.Models.ClsMemberAccountModel>>> LoginAsync([FromBody] Business.Inputs.ClsLoginCredentialsInput credentials)
    {
        var memberModel = await _AuthenticationService.LoginAsync(credentials);

        return Ok(memberModel);
    }
}