using Microsoft.AspNetCore.Mvc;

using API.DTOs;

namespace API.Controllers;

[ApiController]
[Route("api/users")]
public class UsersController : Controller
{

    private readonly ILogger<UsersController> _Logger;

    public UsersController(ILogger<UsersController> logger)
    {
        _Logger = logger;
    }

    [HttpPost]
    public async Task<ActionResult> AddOneAsync([FromBody] UserAddDTO newUser)
    {
        return Ok();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult> GetOneAsync(int id)
    {
        return Ok();
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateOneAsync(int id, UserUpdateDTO updatedData)
    {
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteOneAsync(int id)
    {
        return Ok();
    }

    [HttpGet]
    public async Task<ActionResult> GetManyAsync(float fake)
    {
        return Ok();
    }
}