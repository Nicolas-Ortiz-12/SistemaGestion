using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackenAPI.Models;
using BackenAPI.Models;

namespace BackenAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConciliacionController : ControllerBase
    {
        private readonly DbBancoContext _context;

        public ConciliacionController(DbBancoContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Conciliacion>>> GetConciliaciones()
        {
            return await _context.Conciliaciones
                .Include(c => c.Movimiento)
                    .ThenInclude(m => m.Cuenta)
                .Include(c => c.Movimiento)
                    .ThenInclude(m => m.Transaccion)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Conciliacion>> GetConciliacion(int id)
        {
            var conciliacion = await _context.Conciliaciones
                .Include(c => c.Movimiento)
                    .ThenInclude(m => m.Cuenta)
                .Include(c => c.Movimiento)
                    .ThenInclude(m => m.Transaccion)
                .FirstOrDefaultAsync(c => c.IdCon == id);

            if (conciliacion == null)
                return NotFound();

            return conciliacion;
        }

        [HttpPost]
        public async Task<ActionResult<Conciliacion>> PostConciliacion(Conciliacion conciliacion)
        {
            _context.Conciliaciones.Add(conciliacion);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetConciliacion), new { id = conciliacion.IdCon }, conciliacion);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutConciliacion(int id, Conciliacion conciliacion)
        {
            if (id != conciliacion.IdCon)
                return BadRequest();

            _context.Entry(conciliacion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Conciliaciones.Any(c => c.IdCon == id))
                    return NotFound();

                throw;
            }

            return NoContent();
        }
    }
}