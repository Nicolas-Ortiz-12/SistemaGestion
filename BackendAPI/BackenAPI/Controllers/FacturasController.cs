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
    public class FacturaController : ControllerBase
    {
        private readonly DbBancoContext _context;

        public FacturaController(DbBancoContext context)
        {
            _context = context;
        }

        // GET: api/factura
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Facturas>>> GetFacturas()
        {
            return await _context.Facturas
                .Include(f => f.Proveedor) // Trae los datos del proveedor
                .ToListAsync();
        }

        // GET: api/factura
        [HttpGet("{id}")]
        public async Task<ActionResult<Facturas>> GetFactura(int id)
        {
            var factura = await _context.Facturas
                .Include(f => f.Proveedor)
                .FirstOrDefaultAsync(f => f.id_factura == id);

            if (factura == null)
                return NotFound();

            return factura;
        }

        // POST: api/factura
        [HttpPost]
        public async Task<ActionResult<Facturas>> PostFactura(Facturas factura)
        {
            // Validar que el proveedor exista
            var proveedor = await _context.Proveedores.FindAsync(factura.id_prov);
            if (proveedor == null)
            {
                return BadRequest($"No existe un proveedor con ID {factura.id_prov}");
            }

            _context.Facturas.Add(factura);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetFactura), new { id = factura.id_factura }, factura);
        }

        // PUT: api/factura
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFactura(int id, Facturas factura)
        {
            if (id != factura.id_factura)
            {
                return BadRequest("El ID de la factura no coincide.");
            }

            // El proveedor debe existir 
            var proveedor = await _context.Proveedores.FindAsync(factura.id_prov);
            if (proveedor == null)
            {
                return BadRequest($"No existe un proveedor con ID {factura.id_prov}");
            }

            _context.Entry(factura).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FacturaExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        private bool FacturaExists(int id)
        {
            return _context.Facturas.Any(e => e.id_factura == id);
        }
    }

}
