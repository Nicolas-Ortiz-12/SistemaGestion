import React, { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import styles from './modalReportes.module.css';

export default function ModalReporteCheques({ onClose }) {
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [estado, setEstado] = useState('');

    const generarPDF = async () => {
        try {
            const url = new URL('https://localhost:7149/api/Movimiento/cheques');

            if (fechaInicio) url.searchParams.append('fechaInicio', fechaInicio);
            if (fechaFin) url.searchParams.append('fechaFin', fechaFin);
            if (estado) url.searchParams.append('estado', estado);

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Error al obtener los cheques: ${response.statusText}`);
            }

            const data = await response.json();

            const doc = new jsPDF();
            doc.setFontSize(16);
            doc.text('REPORTE DE CHEQUES', 70, 15);

            doc.setFontSize(12);
            doc.text(`Rango de fechas: ${fechaInicio} a ${fechaFin}`, 14, 30);
            doc.text(`Estado: ${estado || 'Todos'}`, 14, 38);

            const tabla = data.map(cheque => ([
                new Date(cheque.fecha).toLocaleDateString(), // convertir fecha
                `Cheque #${cheque.idMovi}`,
                `${cheque.monto.toLocaleString('es-PY')} Gs`,
                cheque.estado
            ]));

            autoTable(doc, {
                startY: 45,
                head: [['Fecha', 'Cheque', 'Monto', 'Estado']],
                body: tabla
            });

            doc.output('dataurlnewwindow');
        } catch (error) {
            console.error(error);
            alert('Error al generar el PDF. Verifica los filtros y que el backend esté activo.');
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
                <h2 className={styles.modalTitle}>Reporte de Cheques</h2>
                <form className={styles.conciliacionForm} onSubmit={handleSubmit}>
                    <label>Fecha Desde</label>
                    <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} required />

                    <label>Fecha Hasta</label>
                    <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} required />

                    <label>Estado del Cheque</label>
                    <select value={estado} onChange={(e) => setEstado(e.target.value)}>
                        <option value="">Todos</option>
                        <option value="Emitido">Emitido</option>
                        <option value="Conciliado">Conciliado</option>
                        <option value="Expirado">Expirado</option>
                    </select>

                    <button type="submit">Generar Reporte</button>
                </form>
                <button className={styles.closeButton} onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
}
