namespace BackenAPI.Models
{
    public class Transaccion
    {
        public int IdTran { get; set; }
        public string Nombre { get; set; }

        public ICollection<Movimiento> Movimientos { get; set; }
    }
}
