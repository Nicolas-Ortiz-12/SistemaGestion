using BackenAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackenAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaisController : ControllerBase
    {
        private readonly DbBancoContext _context;

        public PaisController(DbBancoContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetPaises()
        {
            return Ok(await _context.Paises.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPais([FromRoute] int id)
        {
            var pais = await _context.Paises.FindAsync(id);
            if (pais == null) return NotFound();
            return Ok(pais);
        }

        [HttpPost]
        public async Task<IActionResult> CreatePais([FromForm] string nombre)
        {
            if (string.IsNullOrEmpty(nombre))
            {
                return BadRequest("El nombre del país es obligatorio.");
            }

            var pais = new Pais
            {
                Nombre = nombre,
            };

            _context.Paises.Add(pais);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPais", new { id = pais.IdPais }, pais);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePais(
            [FromRoute] int id,
            [FromForm] int idPais,
            [FromForm] string nombre)
        {
            if (id != idPais)
                return BadRequest("El ID no coincide con el objeto enviado.");

            var pais = await _context.Paises.FindAsync(id);
            if (pais == null) return NotFound();

            pais.Nombre = nombre;

            _context.Entry(pais).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePais([FromRoute] int id)
        {
            var pais = await _context.Paises.FindAsync(id);
            if (pais == null) return NotFound();

            _context.Paises.Remove(pais);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
