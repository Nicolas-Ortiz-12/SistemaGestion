using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace BackenAPI.Models
{

    public class Conciliacion
    {
        public int IdCon { get; set; }
        public int IdMovi { get; set; }
        public DateTime FechaConciliacion { get; set; }

        [ForeignKey(nameof(IdMovi))] // De esta forma se referencia mejor la clave foranea 
        public required Movimiento Movimiento { get; set; } 
    }
}
