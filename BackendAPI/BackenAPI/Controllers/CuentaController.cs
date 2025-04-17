using BackenAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackenAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CuentaController : ControllerBase
    {
        private readonly DbBancoContext _context;

        public CuentaController(DbBancoContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetCuentas()
        {
            var cuentas = await _context.Cuentas
                .Include(c => c.Banco)
                    .ThenInclude(b => b.Pais) // esto trae también el país
                .ToListAsync();

            return Ok(cuentas);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCuenta([FromRoute] int id)
        {
            var cuenta = await _context.Cuentas
                .Include(c => c.Banco)
                .FirstOrDefaultAsync(c => c.IdCuenta == id);

            if (cuenta == null) return NotFound();
            return Ok(cuenta);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCuenta(
            [FromForm] int numero,
            [FromForm] int saldo,
            [FromForm] string nombre,
            [FromForm] string tCuenta,
            [FromForm] int bancoId)
        {
            var banco = await _context.Bancos.FindAsync(bancoId);
            if (banco == null) return BadRequest("Banco no encontrado.");

            var cuenta = new Cuenta
            {
                NroCuenta = numero,
                Saldo = saldo,
                Nombre = nombre,
                TCuenta = tCuenta,
                Banco = banco
            };

            _context.Cuentas.Add(cuenta);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCuentas), new { id = cuenta.IdCuenta }, cuenta);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCuenta(
            [FromRoute] int id,
            [FromForm] int numero,
            [FromForm] int saldo,
            [FromForm] string nombre,
            [FromForm] string tCuenta,
            [FromForm] int bancoId)
        {
            var cuenta = await _context.Cuentas.Include(c => c.Banco).FirstOrDefaultAsync(c => c.IdCuenta == id);
            if (cuenta == null) return NotFound();

            var banco = await _context.Bancos.FindAsync(bancoId);
            if (banco == null) return BadRequest("Banco no encontrado.");

            cuenta.NroCuenta = numero;
            cuenta.Saldo = saldo;
            cuenta.Nombre = nombre;
            cuenta.TCuenta = tCuenta;
            cuenta.Banco = banco;

            _context.Entry(cuenta).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCuenta([FromRoute] int id)
        {
            var cuenta = await _context.Cuentas.FindAsync(id);
            if (cuenta == null) return NotFound();

            _context.Cuentas.Remove(cuenta);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
