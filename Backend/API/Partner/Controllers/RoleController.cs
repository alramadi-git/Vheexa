using Microsoft.AspNetCore.Mvc;

using API.Models;

using Business.Inputs;
using Business.Partner.Inputs;

using Business.Partner.Services;

using Database.Partner.Models;

namespace API.Partner.Controllers;

[ApiController]
[Route("api/partner/roles")]
public class ClsAuthenticationController : Controller
{
    private readonly ClsRoleService _RoleService;

    public ClsAuthenticationController(ClsRoleService roleService)
    {
        _RoleService = roleService;
    }

    [HttpPost("")]
    public async Task<ActionResult> CreateOneAsync([FromBody] ClsRoleCreateInput role)
    {
        await _RoleService.CreateOneAsync(role, new Database.Partner.Contexts.ClsMemberContext
        {
            Uuid = new Guid(),
            PartnerUuid = new Guid(),
        });
    }

    [HttpGet("[uuid]")]
    public async Task<ActionResult> LoginAsync([FromBody] ClsLoginCredentialsInput credentials) { }

    [HttpDelete("[uuid]")]
    [HttpGet("")]
}