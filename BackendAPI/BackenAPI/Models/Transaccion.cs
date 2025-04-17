namespace BackenAPI.Models
{
    public class Transaccion
    {
        public int IdTran { get; set; }

        // Se agrego required
        public required string Nombre { get; set; }

        public ICollection<Movimiento> Movimientos { get; set; }
    }
}
