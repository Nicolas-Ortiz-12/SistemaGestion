import React, { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import styles from './modalReportes.module.css';

export default function ModalReporteCheques({ onClose }) {
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [estado, setEstado] = useState('');

    const generarPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text('REPORTE DE CHEQUES', 70, 15);

        doc.setFontSize(12);
        doc.text(`Rango de fechas: ${fechaInicio} a ${fechaFin}`, 14, 30);
        doc.text(`Estado: ${estado || 'Todos'}`, 14, 38);

        let datos = [];

        const chequesEmitidos = [
            ['2024-01-01', 'Cheque #001', '500.000 Gs', 'Emitido'],
            ['2024-01-03', 'Cheque #002', '700.000 Gs', 'Emitido']
        ];

        const chequesAnulados = [
            ['2024-01-02', 'Cheque #003', '300.000 Gs', 'Anulado']
        ];

        const chequesConciliados = [
            ['2024-01-04', 'Cheque #004', '800.000 Gs', 'Conciliado']
        ];

        if (estado === 'emitido') datos = chequesEmitidos;
        else if (estado === 'anulado') datos = chequesAnulados;
        else if (estado === 'conciliado') datos = chequesConciliados;
        else datos = [...chequesEmitidos, ...chequesAnulados, ...chequesConciliados];

        autoTable(doc, {
            startY: 45,
            head: [['Fecha', 'Cheque', 'Monto', 'Estado']],
            body: datos
        });

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
                <h2 className={styles.modalTitle}>Reporte de Cheques</h2>
                <form className={styles.conciliacionForm} onSubmit={handleSubmit}>
                    <label>Fecha Desde</label>
                    <input type="date" name="desde" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} required />

                    <label>Fecha Hasta</label>
                    <input type="date" name="hasta" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} required />

                    <label>Estado del Cheque</label>
                    <select name="estado" value={estado} onChange={(e) => setEstado(e.target.value)}>
                        <option value="">Todos</option>
                        <option value="emitido">Emitido</option>
                        <option value="conciliado">Conciliado</option>
                        <option value="anulado">Anulado</option>
                    </select>

                    <button type="submit">Generar Reporte</button>
                </form>
                <button className={styles.closeButton} onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
}
