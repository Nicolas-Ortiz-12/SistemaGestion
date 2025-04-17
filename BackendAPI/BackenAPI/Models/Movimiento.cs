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
        public string Beneficiario { get; set; }
        public string Concepto { get; set; }
        public string Motivo { get; set; }
        public char TipoMov { get; set; }

        public Cuenta Cuenta { get; set; }
        public Transaccion Transaccion { get; set; }
        public Conciliacion Conciliacion { get; set; }
    }

}
