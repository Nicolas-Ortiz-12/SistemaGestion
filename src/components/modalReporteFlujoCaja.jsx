import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import styles from './modalReportes.module.css';

export default function ModalReporteFlujoCaja({ onClose }) {
  const [desde, setDesde] = useState('');
  const [hasta, setHasta] = useState('');
  const [cuenta, setCuenta] = useState('');

  const generarPDF = async () => {
    try {
      const params = {
        fechaInicio: desde,
        fechaFin: hasta,
      };
      if (cuenta) {
        params.nroCuenta = cuenta;
      }

      const response = await axios.get('https://localhost:7149/api/Movimiento/flujo-de-caja', { params });

      const movimientos = response.data;

      // Agrupar movimientos por fecha
      const resumenPorFecha = {};
      movimientos.forEach((mov) => {
        const fecha = mov.fecha;
        if (!resumenPorFecha[fecha]) {
          resumenPorFecha[fecha] = { ingresos: 0, egresos: 0 };
        }

        if (mov.tipo === 'Crédito') {
          resumenPorFecha[fecha].ingresos += mov.monto;
        } else {
          resumenPorFecha[fecha].egresos += mov.monto;
        }
      });

      const datosFlujoCaja = [];
      let saldoAcumulado = 0;

      Object.keys(resumenPorFecha)
        .sort()
        .forEach((fecha) => {
          const { ingresos, egresos } = resumenPorFecha[fecha];
          const saldoNeto = ingresos - egresos;
          saldoAcumulado += saldoNeto;

          datosFlujoCaja.push([
            fecha,
            `${ingresos.toLocaleString()} Gs`,
            `${egresos.toLocaleString()} Gs`,
            `${saldoNeto.toLocaleString()} Gs`,
          ]);
        });

      // Generar el PDF
      const doc = new jsPDF();

      doc.setFontSize(16);
      doc.text('REPORTE DE FLUJO DE CUENTA', 60, 15);

      doc.setFontSize(12);
      doc.text(`Desde: ${desde || '-'}     Hasta: ${hasta || '-'}`, 14, 30);
      doc.text(`Cuenta Bancaria: ${cuenta || 'Todas'}`, 14, 37);

      autoTable(doc, {
        startY: 45,
        head: [['Fecha', 'Ingresos', 'Egresos', 'Saldo Neto']],
        body: datosFlujoCaja,
      });

      const finalY = doc.lastAutoTable.finalY + 10;
      doc.text(`Total neto del periodo: ${saldoAcumulado.toLocaleString()} Gs`, 14, finalY);

      doc.output('dataurlnewwindow');
    } catch (error) {
      console.error('Error generando el reporte:', error);
      alert('No se pudo generar el reporte. Verifique los datos o la conexión con el servidor.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generarPDF();
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Reporte de Flujo de Cuenta</h2>
        <form className={styles.conciliacionForm} onSubmit={handleSubmit}>
          <label>Fecha Desde</label>
          <input
            type="date"
            value={desde}
            onChange={(e) => setDesde(e.target.value)}
            required
          />

          <label>Fecha Hasta</label>
          <input
            type="date"
            value={hasta}
            onChange={(e) => setHasta(e.target.value)}
            required
          />

          <label>Cuenta Bancaria (NroCuenta)</label>
          <input
            type="text"
            value={cuenta}
            onChange={(e) => setCuenta(e.target.value)}
            placeholder="Ej: 123456789"
          />

          <button type="submit">Generar Reporte</button>
        </form>
        <button className={styles.closeButton} onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}
