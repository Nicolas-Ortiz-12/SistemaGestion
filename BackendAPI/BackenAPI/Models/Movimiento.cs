
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackenAPI.Models
{

    public class Movimiento
    {
        public int IdMovi { get; set; }
        public int IdCuenta { get; set; }
        public int IdTran { get; set; }
        public DateTime Fecha { get; set; }
        public int Monto { get; set; }
        public long CtaDestino { get; set; }
        public required string Beneficiario { get; set; }
        public string Concepto { get; set; } = null!;
        public string Motivo { get; set; } = null!;
        public char TipoMov { get; set; }

        [ForeignKey(nameof(IdCuenta))] // De esta forma se referencia mejor la clave foranea 
        public Cuenta Cuenta { get; set; }
        [ForeignKey(nameof(IdTran))] //Referenciamos de mejor manera la clave foranea 
        public required Transaccion Transaccion { get; set; }
    }
}
