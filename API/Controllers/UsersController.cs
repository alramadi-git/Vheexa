using Microsoft.AspNetCore.Mvc;

using API.DTOs;
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
    public async Task<ActionResult<bool>> AddOneAsync([FromBody] UserAddDTO newUser)
    {
        await _UserService.AddOneAsync(UserAddDTO.ToDataAccessUserAddEntity(newUser));
        return Ok();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<UserDTO>> GetOneAsync(int id)
    {
        var user = new UserDTO(await _UserService.GetOneAsync(id));
        return Ok(user);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<bool>> UpdateOneAsync(int id, [FromBody] UserUpdateDTO updatedData)
    {
        await _UserService.UpdateOneAsync(id, UserUpdateDTO.ToDataAccessUserUpdateEntity(updatedData));
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<bool>> DeleteOneAsync(int id)
    {
        await _UserService.DeleteOneAsync(id);
        return Ok(true);
    }

    // [HttpGet]
    // public async Task<ActionResult> GetManyAsync()
    // {
    //     return Ok();
    // }
}