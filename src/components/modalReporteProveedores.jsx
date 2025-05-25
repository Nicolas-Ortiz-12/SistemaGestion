import React, { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import styles from '../components/modalReportes.module.css';

export default function ModalReporteProveedores({ onClose }) {
  const [rucProveedor, setRucProveedor] = useState('');

  const generarPDF = async () => {
    try {
      const resp = await fetch(`https://localhost:7149/api/Factura/ruc/${rucProveedor}`);
      if (!resp.ok) throw new Error('No se pudo obtener la información para el RUC proporcionado');

      const facturas = await resp.json();

      if (!Array.isArray(facturas) || facturas.length === 0) {
        throw new Error('No se encontraron facturas para el RUC proporcionado');
      }

      const proveedor = facturas[0].proveedor;
      if (!proveedor) throw new Error('No se encontró información del proveedor');

      const doc = new jsPDF();

      doc.setFontSize(16);
      doc.text('REPORTE DE PROVEEDOR', 70, 15);

      doc.setFontSize(12);
      doc.text(`ID Proveedor: ${proveedor.id_prov}`, 14, 30);
      doc.text(`Nombre: ${proveedor.nombre}`, 14, 37);
      doc.text(`RUC: ${proveedor.ruc}`, 14, 44);
      doc.text(`Teléfono: ${proveedor.telefono}`, 14, 51);
      doc.text(`Correo: ${proveedor.correo}`, 14, 58);
      doc.text(`Dirección: ${proveedor.direccion}`, 14, 65);
      doc.text(`Actividad: ${proveedor.actividad}`, 14, 72);

      const datosTabla = facturas.map(f => [
        f.fecha_exp,
        `Factura N°${f.nro_factura}`,
        `${parseInt(f.total).toLocaleString()} Gs`,
        f.saldo === 0 ? 'Pagado' : 'Pendiente'
      ]);

      autoTable(doc, {
        startY: 80,
        head: [['Fecha', 'Factura', 'Total', 'Estado']],
        body: datosTabla
      });

      const totalFacturado = facturas.reduce((sum, f) => sum + f.total, 0);
      const totalPendiente = facturas.reduce((sum, f) => sum + f.saldo, 0);
      const totalPagado = totalFacturado - totalPendiente;

      const y = doc.lastAutoTable.finalY + 10;
      doc.text(`Total facturado: ${totalFacturado.toLocaleString()} Gs`, 14, y);
      doc.text(`Total pagado: ${totalPagado.toLocaleString()} Gs`, 14, y + 8);
      doc.text(`Pendiente de pago: ${totalPendiente.toLocaleString()} Gs`, 14, y + 16);

      // Puedes cambiar esto por doc.save() si prefieres descarga directa
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
        <h2 className={styles.modalTitle}>Generar Reporte de Proveedor</h2>
        <form className={styles.conciliacionForm} onSubmit={handleSubmit}>
          <div>
            <label>RUC del Proveedor:</label>
            <input
              type="text"
              value={rucProveedor}
              onChange={(e) => setRucProveedor(e.target.value)}
              required
            />
          </div>
          <button type="submit">Descargar Reporte</button>
        </form>
        <button className={styles.closeButton} onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}
