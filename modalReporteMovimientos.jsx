import React, { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import styles from './modalReportes.module.css';

export default function ModalReporteMovimientos({ onClose }) {
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [cuenta, setCuenta] = useState('');

  const generarPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('REPORTE DE MOVIMIENTOS', 70, 15);

    doc.setFontSize(12);
    doc.text(`Cuenta: ${cuenta || 'Todas'}`, 14, 30);
    doc.text(`Rango de fechas: ${fechaInicio} a ${fechaFin}`, 14, 38);

    const datosMuestra = [
      ['2024-01-02', 'Compra en Tienda X', '500.000 Gs', cuenta || 'Cuenta 1'],
      ['2024-01-05', 'Depósito Cliente', '1.000.000 Gs', cuenta || 'Cuenta 1'],
      ['2024-01-10', 'Pago de servicio', '300.000 Gs', cuenta || 'Cuenta 2'],
    ];

    autoTable(doc, {
      startY: 50,
      head: [['Fecha', 'Descripción', 'Monto', 'Cuenta']],
      body: datosMuestra,
    });

    doc.text('Total ingresos: 1.000.000 Gs', 14, doc.lastAutoTable.finalY + 10);
    doc.text('Total egresos: 800.000 Gs', 14, doc.lastAutoTable.finalY + 18);
    doc.text('Saldo final: 200.000 Gs', 14, doc.lastAutoTable.finalY + 26);

    doc.output('dataurlnewwindow'); // Abre el PDF en nueva pestaña
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generarPDF(); // Generar el PDF de muestra
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Generar Reporte de Movimientos</h2>
        <form className={styles.conciliacionForm} onSubmit={handleSubmit}>
          <div>
            <label>Fecha de inicio:</label>
            <input
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Fecha de fin:</label>
            <input
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Filtrar por cuenta (opcional):</label>
            <input
              type="text"
              placeholder="Ej: Cuenta 1"
              value={cuenta}
              onChange={(e) => setCuenta(e.target.value)}
            />
          </div>

          <button type="submit">Descargar Reporte</button>
        </form>

        <button className={styles.closeButton} onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}
