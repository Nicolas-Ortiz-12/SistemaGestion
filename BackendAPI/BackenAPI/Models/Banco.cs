using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackenAPI.Models
{
    public class Banco
    {
        [Key]
        public int IdBancos { get; set; }

        [ForeignKey("Pais")]
        public int IdPais { get; set; }

        public required string Nombre { get; set; }
        public required string Direccion { get; set; }

        public required Pais Pais { get; set; }
       
    }
}