using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/admins/partners")]
public class AdminPartnerController : Controller
{
    private readonly ILogger<AdminPartnerController> _Logger;

    public AdminPartnerController(ILogger<AdminPartnerController> logger)
    {
        _Logger = logger;
    }

    [HttpPost]
    public async Task<ActionResult> AddOneAsync([FromBody] object newPartner)
    {
        try
        {
            return Created();
        }
        catch (Exception)
        {
            return BadRequest();
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult> GetOneAsync(int id)
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

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateOneAsync(int id, [FromBody] object updatedData)
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

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteOneAsync(int id)
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

    [HttpGet]
    public async Task<ActionResult> GetManyAsync([FromQuery] object filters, [FromQuery] object sorting, [FromQuery] object pagination)
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