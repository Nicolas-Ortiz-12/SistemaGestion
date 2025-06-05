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
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                throw new Error(`Error al obtener los cheques: ${response.statusText}`);
            }

            const data = await response.json();

            // Filtrar solo "Conciliado" o "Emitido" y con beneficiario válido
            const chequesFiltrados = data.filter(c =>
                (c.estado === 'Conciliado' || c.estado === 'Emitido') &&
                c.beneficiario &&
                c.beneficiario.trim().toLowerCase() !== 'null'
            );

            if (!chequesFiltrados.length) {
                alert('No hay cheques Conciliados o Emitidos válidos en el rango de fechas.');
                return;
            }

            const doc = new jsPDF({ orientation: 'portrait' });
            

            // Título principal
            doc.setFontSize(14);
            doc.text('REPORTE DE CHEQUES EMITIDOS / CONCILIADOS', 40, 15);
            // Periodo
            doc.setFontSize(11);
            doc.text(`Periodo: ${new Date(fechaInicio).toLocaleDateString()} al ${new Date(fechaFin).toLocaleDateString()}`, 14, 25);

            // Agrupar cheques por banco + número de cuenta
            const chequesPorBancoCuenta = chequesFiltrados.reduce((acc, cheque) => {
                const nombreBanco = cheque.cuenta?.banco?.nombre || 'Banco Desconocido';
                const numeroCuenta = cheque.cuenta?.nroCuenta || 'Sin Número';
                const tipoCuenta = cheque.cuenta?.tCuenta || " tipo desconocido"
                const clave = `${nombreBanco} - Cuenta: ${numeroCuenta} - Tipo Cuenta: ${tipoCuenta} ` ;

                if (!acc[clave]) acc[clave] = [];
                acc[clave].push(cheque);
                return acc;
            }, {});

            let currentY = 35;

            // Generar tabla por cada banco-cuenta
            Object.entries(chequesPorBancoCuenta).forEach(([tituloBancoCuenta, cheques], idx) => {
                if (idx > 0 && currentY + 40 > doc.internal.pageSize.getHeight()) {
                    doc.addPage();
                    currentY = 20;
                }

                doc.setFontSize(12);
                doc.text(`Banco: ${tituloBancoCuenta}`, 14, currentY);
                currentY += 5;

                const tablaBanco = cheques.map(cheque => ([
                    new Date(cheque.fecha).toLocaleDateString('es-PY'),
                    cheque.numeroCheque || `CHQ${String(cheque.idMovi).padStart(6, '0')}`,
                    cheque.beneficiario,
                    `Gs. ${cheque.monto.toLocaleString('es-PY')}`,
                    cheque.estado,
                ]));

                autoTable(doc, {
                    startY: currentY + 5,
                    head: [['Fecha', 'Nro Cheque', 'Beneficiario', 'Monto', 'Estado']],
                    body: tablaBanco,
                    styles: { fontSize: 9 },
                    headStyles: { fillColor: [220, 220, 220], halign: 'center' },
                    bodyStyles: { halign: 'center' },
                    margin: { top: 30 },
                    didDrawPage: (data) => {
                        const pageNumber = doc.internal.getNumberOfPages();
                        doc.setFontSize(9);
                        doc.text(`Página ${pageNumber}`, doc.internal.pageSize.getWidth() - 30, doc.internal.pageSize.getHeight() - 10);
                    }
                });

                currentY = doc.lastAutoTable.finalY + 10;
            });

            // Calcular resumen
            let totalEmitido = 0;
            let totalConciliado = 0;

            chequesFiltrados.forEach(chq => {
                totalEmitido += chq.monto;
                if (chq.estado === 'Conciliado') totalConciliado += chq.monto;
            });

            if (currentY + 30 > doc.internal.pageSize.getHeight()) {
                doc.addPage();
                currentY = 20;
            }

            doc.setFontSize(11);
            doc.text('Resumen:', 14, currentY);
            doc.text(`- Total emitido: Gs. ${totalEmitido.toLocaleString('es-PY')}`, 14, currentY + 7);
            doc.text(`- Total conciliado: Gs. ${totalConciliado.toLocaleString('es-PY')}`, 14, currentY + 14);

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
                    <input
                        type="date"
                        value={fechaInicio}
                        onChange={(e) => setFechaInicio(e.target.value)}
                        required
                    />

                    <label>Fecha Hasta</label>
                    <input
                        type="date"
                        value={fechaFin}
                        onChange={(e) => setFechaFin(e.target.value)}
                        required
                    />

                    <label>Estado del Cheque</label>
                    <select value={estado} onChange={(e) => setEstado(e.target.value)}>
                        <option value="">Todos</option>
                        <option value="Emitido">Emitido</option>
                        <option value="Conciliado">Conciliado</option>
                    </select>

                    <button type="submit">Generar Reporte</button>
                </form>
                <button className={styles.closeButton} onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
}
