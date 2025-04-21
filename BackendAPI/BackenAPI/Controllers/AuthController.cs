using BackenAPI.Models;
using BackenAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly JwtService _jwtService;
    private readonly BackenAPI.Models.DbBancoContext _context;

    public AuthController(JwtService jwtService, BackenAPI.Models.DbBancoContext context)
    {
        _jwtService = jwtService;
        _context = context;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromForm] string usuario, [FromForm] string password)
    {
        // Buscar al usuario por nombre
        var user = await _context.Usuarios
            .FirstOrDefaultAsync(u => u.Nombre == usuario);

        // Verificar si el usuario existe y si la contraseña es correcta
        if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.Password))
        {
            return Unauthorized(new { message = "Usuario o contraseña incorrectos." });
        }

        // Generar el token JWT
        var token = _jwtService.GenerateToken(user.Nombre);

        return Ok(new { Token = token, id = user.Id });
    }
}


