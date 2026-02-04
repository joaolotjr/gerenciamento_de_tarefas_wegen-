using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class TesteController : ControllerBase {
    [HttpGet]
    public IActionResult Get() => Ok("API está online!");
}