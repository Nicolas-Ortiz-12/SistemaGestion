using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackenAPI.Models;


namespace backendAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransaccionController : ControllerBase
    {
        private readonly DbBancoContext _context;

        public TransaccionController(DbBancoContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transaccion>>> GetTransacciones()
        {
            return await _context.Transacciones
                .Include(t => t.Movimientos)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Transaccion>> GetTransaccion(int id)
        {
            var transaccion = await _context.Transacciones
                .Include(t => t.Movimientos)
                .FirstOrDefaultAsync(t => t.IdTran == id);

            if (transaccion == null)
                return NotFound();

            return transaccion;
        }

        [HttpPost]
        public async Task<ActionResult<Transaccion>> PostTransaccion(Transaccion transaccion)
        {
            _context.Transacciones.Add(transaccion);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTransaccion), new { id = transaccion.IdTran }, transaccion);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTransaccion(int id, Transaccion transaccion)
        {
            if (id != transaccion.IdTran)
                return BadRequest();

            _context.Entry(transaccion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Transacciones.Any(t => t.IdTran == id))
                    return NotFound();

                throw;
            }

            return NoContent();
        }
    }
}