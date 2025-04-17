using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackenAPI.Models;

namespace BackenAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdenDePagoController : ControllerBase
    {
        private readonly DbBancoContext _context;

        public OrdenDePagoController(DbBancoContext context)
        {
            _context = context;
        }

        // GET: api/OrdenDePago
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrdenDePago>>> GetOrdenes()
        {
            return await _context.Set<OrdenDePago>()
                .Include(o => o.Factura)
                .Include(o => o.Movimiento)
                .ToListAsync();
        }

        // GET: api/OrdenDePago/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrdenDePago>> GetOrden(int id)
        {
            var orden = await _context.Set<OrdenDePago>()
                .Include(o => o.Factura)
                .Include(o => o.Movimiento)
                .FirstOrDefaultAsync(o => o.IdOrden == id);

            if (orden == null)
                return NotFound();

            return orden;
        }

        // POST: api/OrdenDePago
        [HttpPost]
        public async Task<ActionResult<OrdenDePago>> PostOrden(OrdenDePago orden)
        {
            _context.Set<OrdenDePago>().Add(orden);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOrden), new { id = orden.IdOrden }, orden);
        }

        // PUT: api/OrdenDePago/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrden(int id, OrdenDePago orden)
        {
            if (id != orden.IdOrden)
                return BadRequest();

            _context.Entry(orden).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Set<OrdenDePago>().Any(e => e.IdOrden == id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }
    }
}