
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackenAPI.Models
{
    public class Cuenta
    {
        [Key]
        public int IdCuenta { get; set; }

        [ForeignKey(nameof(IdBancos))] // De esta forma se referencia mejor la clave foranea 
        public int IdBancos { get; set; }

        public required string Nombre { get; set; }
        public required string TCuenta { get; set; }
        public long NroCuenta { get; set; }
        public int Saldo { get; set; }

        public required Banco Banco { get; set; }
    }
}