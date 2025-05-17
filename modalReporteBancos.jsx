import React, { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import styles from './modalReportes.module.css';

export default function ModalReporteBancos({ onClose }) {
  const [cuenta, setCuenta] = useState('');

  const generarPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('REPORTE DE CUENTA BANCARIA', 60, 15);

    doc.setFontSize(12);
    doc.text(`Cuenta Bancaria: ${cuenta}`, 14, 30);

    const datosMuestra = [
      ['2024-02-01', 'Transferencia entrante', '1.200.000 Gs'],
      ['2024-02-05', 'Pago proveedor', '-800.000 Gs'],
      ['2024-02-10', 'Depósito', '500.000 Gs'],
    ];

    autoTable(doc, {
      startY: 45,
      head: [['Fecha', 'Movimiento', 'Monto']],
      body: datosMuestra,
    });

    doc.text('Saldo actual: 900.000 Gs', 14, doc.lastAutoTable.finalY + 10);

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
        <h2 className={styles.modalTitle}>Generar Reporte de Bancos</h2>
        <form className={styles.conciliacionForm} onSubmit={handleSubmit}>
          <div>
            <label>Cuenta Bancaria:</label>
            <input
              type="text"
              value={cuenta}
              onChange={(e) => setCuenta(e.target.value)}
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
