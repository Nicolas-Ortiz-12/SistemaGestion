import React, { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import styles from './modalReportes.module.css';

export default function ModalReporteOrdenPago({ onClose }) {
    const [desde, setDesde] = useState('');
    const [hasta, setHasta] = useState('');
    const [proveedor, setProveedor] = useState('');

    const generarPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text('Reporte de Órdenes de Pago', 14, 20);

        doc.setFontSize(12);
        doc.text(`Desde: ${desde || '-'}    Hasta: ${hasta || '-'}`, 14, 30);
        doc.text(`Proveedor: ${proveedor || '-'}`, 14, 38);

        const data = [
            ['123', '2024-07-01', 'Proveedor A', 'Gs. 5.000.000', 'Transferencia'],
            ['124', '2024-07-03', 'Proveedor B', 'Gs. 2.700.000', 'Cheque'],
            ['125', '2024-07-05', 'Proveedor A', 'Gs. 3.200.000', 'Transferencia'],
        ];

        const columns = ['Nro Orden', 'Fecha', 'Proveedor', 'Total', 'Método'];

        autoTable(doc, {
            head: [columns],
            body: data,
            startY: 45,
        });

        // Abre el PDF en una nueva pestaña sin descargar
        const pdfUrl = doc.output('bloburl');
        window.open(pdfUrl, '_blank');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        generarPDF();
        // Si querés cerrar el modal automáticamente, descomentá esta línea:
        // onClose();
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2 className={styles.modalTitle}>Reporte de Órdenes de Pago</h2>
                <form className={styles.conciliacionForm} onSubmit={handleSubmit}>
                    <label>Fecha Desde</label>
                    <input
                        type="date"
                        name="desde"
                        value={desde}
                        onChange={(e) => setDesde(e.target.value)}
                    />

                    <label>Fecha Hasta</label>
                    <input
                        type="date"
                        name="hasta"
                        value={hasta}
                        onChange={(e) => setHasta(e.target.value)}
                    />

                    <label>Proveedor</label>
                    <input
                        type="text"
                        name="proveedor"
                        placeholder="Nombre o RUC"
                        value={proveedor}
                        onChange={(e) => setProveedor(e.target.value)}
                    />

                    <button type="submit">Generar Reporte</button>
                </form>
                <button className={styles.closeButton} onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
}
