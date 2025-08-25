using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.PartnersControllers;

[ApiController]
[Route("api/partners")]
public class PartnerController : Controller
{
    private readonly ILogger<PartnerController> _Logger;

    public PartnerController(ILogger<PartnerController> logger)
    {
        _Logger = logger;
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
}