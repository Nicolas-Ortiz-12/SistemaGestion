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

        public Cuenta Cuenta { get; set; } = null!;
        public required Transaccion Transaccion { get; set; }

        //Se quito un campo 
    }

}
