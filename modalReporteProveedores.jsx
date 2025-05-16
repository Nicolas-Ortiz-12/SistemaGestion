import React, { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import styles from './modalReportes.module.css';

export default function ModalReporteProveedores({ onClose }) {
  const [cedula, setCedula] = useState('');

  const generarPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('REPORTE DE PROVEEDOR', 70, 15);

    doc.setFontSize(12);
    doc.text(`Cédula del Proveedor: ${cedula}`, 14, 30);

    const datosMuestra = [
      ['2024-03-01', 'Factura N°123', '500.000 Gs', 'Pagado'],
      ['2024-03-10', 'Factura N°124', '600.000 Gs', 'Pendiente'],
      ['2024-03-15', 'Factura N°125', '400.000 Gs', 'Pagado'],
    ];

    autoTable(doc, {
      startY: 45,
      head: [['Fecha', 'Factura', 'Monto', 'Estado']],
      body: datosMuestra,
    });

    doc.text('Total facturado: 1.500.000 Gs', 14, doc.lastAutoTable.finalY + 10);
    doc.text('Total pagado: 900.000 Gs', 14, doc.lastAutoTable.finalY + 18);
    doc.text('Pendiente de pago: 600.000 Gs', 14, doc.lastAutoTable.finalY + 26);

    doc.output('dataurlnewwindow');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generarPDF();
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Generar Reporte de Proveedores</h2>
        <form className={styles.conciliacionForm} onSubmit={handleSubmit}>
          <div>
            <label>Cédula del Proveedor:</label>
            <input
              type="text"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
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
