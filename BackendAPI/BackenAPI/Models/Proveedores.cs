namespace BackenAPI.Models
{
 
    public partial class Proveedores
    {
        public int id_prov { get; set; }

        public string Nombre { get; set; } = null!;

        public string ruc { get; set; } = null!;

        public string correo { get; set; } = null!;

        public int telefono { get; set; }

        //Un proveedor puede tener muchas facturas asociadas
        public virtual ICollection<Facturas> Facturas { get; set; } = new List<Facturas>();
    }
}
