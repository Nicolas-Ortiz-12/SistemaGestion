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
    public class MovimientoController : ControllerBase
    {
        private readonly DbBancoContext _context;

        public MovimientoController(DbBancoContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Movimiento>>> GetMovimientos()
        {
            return await _context.Movimientos
                .Include(m => m.Cuenta)
                .Include(m => m.Transaccion)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Movimiento>> GetMovimiento(int id)
        {
            var movimiento = await _context.Movimientos
                .Include(m => m.Cuenta)
                .Include(m => m.Transaccion)
                .FirstOrDefaultAsync(m => m.IdMovi == id);

            if (movimiento == null)
                return NotFound();

            return movimiento;
        }

        [HttpPost]
        public async Task<ActionResult<Movimiento>> PostMovimiento(Movimiento movimiento)
        {
            _context.Movimientos.Add(movimiento);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMovimiento), new { id = movimiento.IdMovi }, movimiento);
        }
        
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMovimiento(int id, Movimiento movimiento)
        {
            if (id != movimiento.IdMovi)
                return BadRequest();

            _context.Entry(movimiento).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Movimientos.Any(m => m.IdMovi == id))
                    return NotFound();

                throw;
            }

            return NoContent();
        }
    }
}