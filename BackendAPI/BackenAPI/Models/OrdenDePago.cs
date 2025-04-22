using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BackenAPI.Models
{
    public class OrdenDePago
    {
        public int IdOrden { get; set; }

        public int IdFactura { get; set; }

        public int IdMovi { get; set; }

        public string NroOrden { get; set; } = string.Empty;

        [ForeignKey(nameof(IdFactura))]// De esta forma se referencia mejor la clave foranea 
        public required Facturas Factura { get; set; }

        [ForeignKey(nameof(IdMovi))] // De esta forma se referencia mejor la clave foranea 
        public required Movimiento Movimiento { get; set; }
    }
}


