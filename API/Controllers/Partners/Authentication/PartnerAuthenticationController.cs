using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Users.Authentication;

[ApiController]
[Route("api/users/authentication")]
public class PartnerAuthenticationController : Controller
{
    private readonly ILogger<AdminUserController> _Logger;

    public PartnerAuthenticationController(ILogger<AdminUserController> logger)
    {
        _Logger = logger;
    }

    [HttpPost("signin")]
    public async Task<ActionResult> SigninAsync([FromBody] object credentials)
    {
        try
        {
            return Ok();
        }
        catch (Exception)
        {
            return BadRequest();
        }
    }

    [HttpPost("signup")]
    public async Task<ActionResult> SingupAsync([FromBody] object newUser)
    {
        try
        {
            return Ok();
        }
        catch (Exception)
        {
            return BadRequest();
        }
    }
}