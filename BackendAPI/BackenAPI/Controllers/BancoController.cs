using BackenAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackenAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BancoController : ControllerBase
    {
        private readonly DbBancoContext _context;

        public BancoController(DbBancoContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetBancos()
        {
            return Ok(await _context.Bancos.Include(b => b.Pais).ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBanco([FromRoute] int id)
        {
            var banco = await _context.Bancos.Include(b => b.Pais).FirstOrDefaultAsync(b => b.IdBancos == id);
            if (banco == null) return NotFound();
            return Ok(banco);
        }

        [HttpPost]
        public async Task<IActionResult> CreateBanco(
            [FromForm] string nombre,
            [FromForm] string direccion,
            [FromForm] int paisId)
        {
            // Retrieve the Pais entity based on the provided paisId
            var pais = await _context.Paises.FindAsync(paisId);
            if (pais == null) return NotFound("El país especificado no existe.");

            // Create the Banco object with the required properties
            var banco = new Banco
            {
                Nombre = nombre,
                Direccion = direccion,
                Pais = pais // Set the required 'Pais' property
            };

            _context.Bancos.Add(banco);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBanco), new { id = banco.IdBancos }, banco);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBanco(
            [FromRoute] int id,
            [FromForm] string nombre,
            [FromForm] string direccion,
            [FromForm] int paisId)
        {
            var banco = await _context.Bancos.Include(b => b.Pais).FirstOrDefaultAsync(b => b.IdBancos == id);
            if (banco == null) return NotFound();

            // Retrieve the Pais entity based on the provided paisId
            var pais = await _context.Paises.FindAsync(paisId);
            if (pais == null) return NotFound("El país especificado no existe.");

            banco.Nombre = nombre;
            banco.Direccion = direccion;
            banco.Pais = pais; // Update the required 'Pais' property

            _context.Entry(banco).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBanco([FromRoute] int id)
        {
            var banco = await _context.Bancos.FindAsync(id);
            if (banco == null) return NotFound();

            _context.Bancos.Remove(banco);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
