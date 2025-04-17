namespace BackenAPI.Models
{
    public partial class Facturas
    {
        public int id_factura { get; set; }
        public int nro_factura { get; set; }

        public int id_prov { get; set; }
        public int total { get; set; }
        public int saldo { get; set; }
        public int aplica { get; set; }
        public DateOnly fecha_exp { get; set; }

        // clave foranea de proveedor // Se agrego required

        public required Proveedores Proveedor { get; set; }
    }
}
