import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import styles from './modalReportes.module.css';

export default function ModalReporteMovimientos({ onClose }) {
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [cuenta, setCuenta] = useState('');
  const [cuentasDisponibles, setCuentasDisponibles] = useState([]);

  // Obtener todas las cuentas al cargar el componente
  useEffect(() => {
    const obtenerCuentas = async () => {
      try {
        const resp = await fetch('https://localhost:7149/api/Cuenta');
        if (!resp.ok) throw new Error('Error al obtener cuentas');
        const data = await resp.json();
        setCuentasDisponibles(data);
      } catch (error) {
        console.error('Error al cargar cuentas:', error);
      }
    };

    obtenerCuentas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resp = await fetch('https://localhost:7149/api/Movimiento');
      if (!resp.ok) throw new Error('Error al obtener movimientos');
      const data = await resp.json();

      const filtrados = data.filter(m => {
        const fechaValida =
          (!fechaInicio || m.fecha >= fechaInicio) &&
          (!fechaFin || m.fecha <= fechaFin);
        const cuentaValida =
          !cuenta || m.idCuenta === parseInt(cuenta);
        return fechaValida && cuentaValida;
      });

      generarPDF(filtrados);
      onClose();
    } catch (error) {
      console.error('Error al generar el reporte:', error);
    }
  };

  const generarPDF = (datos) => {
    const doc = new jsPDF();

    const cuentaInfo = cuentasDisponibles.find(c => c.idCuenta === parseInt(cuenta));

    doc.setFontSize(16);
    doc.text('REPORTE DE MOVIMIENTOS', 70, 15);

    doc.setFontSize(12);
    doc.text(`Cuenta: ${cuentaInfo?.nroCuenta || '---'}`, 14, 30);
    doc.text(`Titular: ${cuentaInfo?.nombre || '---'}`, 14, 37);
    doc.text(`Tipo de Cuenta: ${cuentaInfo?.tCuenta || '---'}`, 14, 44);
    doc.text(`Rango de fechas: ${fechaInicio || '---'} a ${fechaFin || '---'}`, 14, 51);
    doc.text(`Moneda: Guaraníes (Gs)`, 14, 58);

    const datosTabla = datos.map(m => [
      m.fecha,
      m.concepto,
      `${m.monto.toLocaleString()} Gs`,
      m.cuenta?.nroCuenta || '---'
    ]);

    autoTable(doc, {
      startY: 70,
      head: [['Fecha', 'Descripción', 'Monto', 'Cuenta']],
      body: datosTabla
    });

    const total = datos.reduce((sum, m) => sum + m.monto, 0);
    doc.text(`Total: ${total.toLocaleString()} Gs`, 14, doc.lastAutoTable.finalY + 10);

    doc.output('dataurlnewwindow');
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
            <select
              value={cuenta}
              onChange={(e) => setCuenta(e.target.value)}
            >
              <option value="">Todas las cuentas</option>
              {cuentasDisponibles.map(c => (
                <option key={c.idCuenta} value={c.idCuenta}>
                  {c.nombre} - {c.nroCuenta}
                </option>
              ))}
            </select>
          </div>
          

          <button type="submit">Descargar Reporte</button>
        </form>

        <button className={styles.closeButton} onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}
