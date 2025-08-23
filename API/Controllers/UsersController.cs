using Microsoft.AspNetCore.Mvc;

using Business.Services;

namespace API.Controllers;

[ApiController]
[Route("api/users")]
public class UsersController : Controller
{

    private readonly ILogger<UsersController> _Logger;
    private readonly UserService _UserService;

    public UsersController(ILogger<UsersController> logger, UserService userService)
    {
        _Logger = logger;
        _UserService = userService;
    }

    [HttpPost]
    public async Task<ActionResult> AddOneAsync([FromBody] DataAccess.Modules.Adds.UserAdd newUser)
    {
        try
        {
            await _UserService.AddOneAsync(newUser);

            return Ok();
        }
        catch (Exception)
        {
            return BadRequest();
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<DataAccess.Modules.DTOs.UserDTO>> GetOneAsync(int id)
    {
        try
        {
            var user = await _UserService.GetOneAsync(id);

            return Ok(user);
        }
        catch (Exception)
        {
            return BadRequest();
        }
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<bool>> UpdateOneAsync(int id, [FromBody] DataAccess.Modules.Updates.UserUpdate updatedData)
    {
        try
        {
            await _UserService.UpdateOneAsync(id, updatedData);

            return Ok();
        }
        catch (Exception)
        {
            return BadRequest();
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<bool>> DeleteOneAsync(int id)
    {
        try
        {
            await _UserService.DeleteOneAsync(id);

            return Ok(true);
        }
        catch (Exception)
        {
            return BadRequest();
        }
    }

    // [HttpGet]
    // public async Task<ActionResult> GetManyAsync()
    // {
    //     return Ok();
    // }
}