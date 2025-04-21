using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackenAPI.Models
{
    public class Banco
    {
        [Key]
        public int IdBancos { get; set; }

        [ForeignKey(nameof(IdPais))] // De esta forma se referencia mejor la clave foranea 
        public int IdPais { get; set; }

        public required string Nombre { get; set; }
        public required string Direccion { get; set; }

        public required Pais Pais { get; set; }
       
    }
}