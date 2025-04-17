
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackenAPI.Models;

namespace BackenAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly Models.DbBancoContext _context;

        public UsuariosController(Models.DbBancoContext context)
        {
            _context = context;
        }

        // GET: api/Usuarios
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Usuario>>> GetUsuarios()
        {
            return await _context.Usuarios.ToListAsync();
        }

        // GET: api/Usuarios/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> GetUsuario(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);

            if (usuario == null)
            {
                return NotFound();
            }

            return usuario;
        }

        // PUT: api/Usuarios/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsuario(
            int id,
            [FromForm] string nombre,
            [FromForm] string password)
        {
            if (id <= 0)
            {
                return BadRequest("ID inválido.");
            }

            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null)
            {
                return NotFound();
            }

            usuario.Nombre = nombre;

            if (!string.IsNullOrEmpty(password))
            {
                usuario.Password = BCrypt.Net.BCrypt.HashPassword(password);
            }

            _context.Entry(usuario).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsuarioExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Usuarios
        [HttpPost]
        public async Task<ActionResult<Usuario>> PostUsuario(
            [FromForm] string nombre,
            [FromForm] string password)
        {
            if (string.IsNullOrWhiteSpace(nombre) || string.IsNullOrWhiteSpace(password))
            {
                return BadRequest("Nombre y contraseña son requeridos.");
            }

            if (password.Length < 6)
            {
                return BadRequest("La contraseña debe tener al menos 6 caracteres.");
            }

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(password);

            var nuevoUsuario = new Usuario
            {
                Nombre = nombre,
                Password = hashedPassword
            };

            _context.Usuarios.Add(nuevoUsuario);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUsuario", new { id = nuevoUsuario.Id }, nuevoUsuario);
        }

        // DELETE: api/Usuarios/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsuario(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null)
            {
                return NotFound();
            }

            _context.Usuarios.Remove(usuario);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UsuarioExists(int id)
        {
            return _context.Usuarios.Any(e => e.Id == id);
        }
    }
}
