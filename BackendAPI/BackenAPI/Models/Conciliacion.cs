namespace BackenAPI.Models
{

    public class Conciliacion
    {
        public int IdCon { get; set; }
        public int IdMovi { get; set; }
        public DateTime FechaConciliacion { get; set; }

        // Se agrego required
        public required Movimiento Movimiento { get; set; } 
    }
}
