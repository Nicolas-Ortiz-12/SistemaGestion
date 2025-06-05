import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import styles from '../components/modalReportes.module.css';

export default function ModalReporteProveedores({ onClose }) {
  const [rucProveedor, setRucProveedor] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [proveedores, setProveedores] = useState([]);

  // Cargar proveedores al iniciar
  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const resp = await fetch('https://localhost:7149/api/Proveedores');
        if (!resp.ok) throw new Error('Error al obtener proveedores');
        const data = await resp.json();
        setProveedores(data);
      } catch (error) {
        console.error('Error cargando proveedores:', error);
      }
    };
    fetchProveedores();
  }, []);

  const generarPDF = async () => {
    try {
      const resp = await fetch(`https://localhost:7149/api/Proveedores/ruc/${rucProveedor}?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
      if (!resp.ok) throw new Error('No se pudieron obtener los datos del proveedor');

      const proveedor = await resp.json();
      const facturas = proveedor.facturas || [];

      const doc = new jsPDF();
      doc.setFontSize(14);
      doc.text('REPORTE DETALLADO POR PROVEEDOR', 14, 15);

      let y = 25;

      // Calcular totales
      const totalFacturado = facturas.reduce((sum, f) => sum + f.total, 0);
      const totalPendiente = facturas.reduce((sum, f) => sum + f.saldo, 0);
      const totalPagado = totalFacturado - totalPendiente;

      // Info del proveedor
      doc.setFontSize(12);
      doc.text(`Código: ${proveedor.id_prov || ''}`, 14, y);
      doc.text(`Nombre: ${proveedor.nombre || ''}`, 60, y);
      doc.text(`RUC / NIT: ${proveedor.ruc || ''}`, 150, y);
      y += 7;

      doc.setFontSize(11);
      doc.text(`Total Facturas: $${totalFacturado.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, 14, y);
      doc.text(`Total Pagado: $${totalPagado.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, 80, y);
      doc.text(`Saldo Pendiente: $${totalPendiente.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, 150, y);
      y += 10;

      // Tabla de facturas
      const tablaFacturas = [];

      for (const f of facturas) {
        const estado = f.saldo === 0 ? 'Pagado' : 'Pendiente';
        const totalGs = `$${parseInt(f.total).toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

        tablaFacturas.push([
          f.fecha_exp,
          `Factura N°${f.nro_factura}`,
          totalGs,
          estado,
        ]);

        if (f.ordenesDePago && f.ordenesDePago.length > 0) {
          f.ordenesDePago.forEach(op => {
            if (op && op.movimiento) {
              tablaFacturas.push([
                op.movimiento.fecha || '',
                `   OP N°${op.nroOrden}`,
                `$${parseInt(op.movimiento.monto).toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
                op.movimiento.estado || ''
              ]);
            }
          });
        }
      }

      autoTable(doc, {
        startY: y,
        head: [['Fecha', 'Factura / Orden de Pago', 'Total', 'Estado']],
        body: tablaFacturas,
        styles: { fontSize: 9 },
        theme: 'striped',
        margin: { left: 14, right: 14 },
      });

      doc.output('dataurlnewwindow');
    } catch (error) {
      alert('Error al generar el reporte: ' + error.message);
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await generarPDF();
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Generar Reporte Detallado de Proveedores</h2>
        <form className={styles.conciliacionForm} onSubmit={handleSubmit}>
          <div>
            <label>RUC del Proveedor:</label>
            <select value={rucProveedor} onChange={(e) => setRucProveedor(e.target.value)} required>
              <option value="">Seleccione un proveedor</option>
              {proveedores.map((p) => (
                <option key={p.ruc} value={p.ruc}>{p.nombre} - {p.ruc}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Fecha Inicio:</label>
            <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} required />
          </div>

          <div>
            <label>Fecha Fin:</label>
            <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} required />
          </div>

          <button type="submit">Descargar Reporte</button>
        </form>
        <button className={styles.closeButton} onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}
