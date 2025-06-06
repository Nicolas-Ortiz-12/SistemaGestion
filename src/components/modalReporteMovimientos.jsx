import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import styles from './modalreportes.module.css';

export default function ModalReporteMovimientos({ onClose }) {
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [cuenta, setCuenta] = useState('');
  const [cuentasDisponibles, setCuentasDisponibles] = useState([]);

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

      const filtrados = data
        .filter(m => {
          const fechaValida =
            (!fechaInicio || m.fecha >= fechaInicio) &&
            (!fechaFin || m.fecha <= fechaFin);
          const cuentaValida =
            !cuenta || m.idCuenta === parseInt(cuenta);
          return fechaValida && cuentaValida;
        })
        .sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

      generarPDF(filtrados);
      onClose();
    } catch (error) {
      console.error('Error al generar el reporte:', error);
    }
  };

  const generarPDF = (movimientos) => {
    const doc = new jsPDF();
    const cuentaInfo = cuentasDisponibles.find(c => c.idCuenta === parseInt(cuenta));

    doc.setFontSize(16);
    doc.text('REPORTE DE MOVIMIENTOS BANCARIOS', 50, 15);

    doc.setFontSize(12);
    doc.text(`Titular: ${cuentaInfo?.nombre || '---'}`, 14, 30);
    doc.text(`Cuenta: ${cuentaInfo?.nroCuenta || '---'}`, 14, 37);
    doc.text(`Tipo de cuenta: ${cuentaInfo?.tCuenta || '---'}`, 14, 44);
    doc.text(`Rango de fechas: ${fechaInicio || '---'} a ${fechaFin || '---'}`, 14, 51);
    doc.text(`Moneda: Guaraníes (Gs)`, 14, 58);

    let saldo = 0;
    const datosTabla = movimientos.map(m => {
      const tipoTexto = m.transaccion.tipoMov === 'D' ? 'Débito' : 'Crédito';
      saldo += (m.transaccion.tipoMov === 'D' ? -m.monto : m.monto);

      return [
        m.fecha,
        m.concepto,
        tipoTexto,
        `${m.monto.toLocaleString()} Gs`,
        `${saldo.toLocaleString()} Gs`
      ];
    });

    autoTable(doc, {
      startY: 70,
      head: [['Fecha', 'Descripción', 'Tipo de Movimiento', 'Monto', 'Saldo Disponible']],
      body: datosTabla,
      styles: {
        fontSize: 10,
        halign: 'center'
      },
      headStyles: {
        fillColor: [40, 40, 40],
        textColor: [255, 255, 255]
      },
      columnStyles: {
        1: { halign: 'left' },
        3: { halign: 'right' },
        4: { halign: 'right' }
      }
    });

    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(`Emitido el: ${new Date().toLocaleDateString()}`, 14, 290);
      doc.text(`Página ${i} de ${totalPages}`, 160, 290);
    }

    doc.output('dataurlnewwindow');
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Generar Reporte de Movimientos</h2>
        <form onSubmit={handleSubmit} className={styles.conciliacionForm}>
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
        <button onClick={onClose} className={styles.closeButton}>
          Cerrar
        </button>
      </div>
    </div>
  );
}
