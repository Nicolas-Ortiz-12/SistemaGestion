import React, { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import styles from './modalReportes.module.css';

export default function ModalReporteOrdenPago({ onClose }) {
    const [desde, setDesde] = useState('');
    const [hasta, setHasta] = useState('');
    const [proveedor, setProveedor] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const generarPDF = (ordenes) => {
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text('Reporte de Órdenes de Pago', 14, 20);

        doc.setFontSize(12);
        doc.text(`Desde: ${desde || '-'}    Hasta: ${hasta || '-'}`, 14, 30);
        doc.text(`Proveedor (RUC): ${proveedor || '-'}`, 14, 38);

        const columns = ['Nro Orden', 'Fecha', 'Proveedor', 'Total', 'Método'];
        const data = ordenes.map(orden => {
            const fecha = orden.movimiento?.fecha || '-';
            const metodo = orden.movimiento?.metodoPago || '-';
            const nombreProveedor = orden.facturas[0]?.proveedor?.nombre || '-';
            const total = orden.facturas.reduce((sum, f) => sum + f.total, 0);
            return [orden.nroOrden, fecha, nombreProveedor, `Gs. ${total.toLocaleString()}`, metodo];
        });

        autoTable(doc, {
            head: [columns],
            body: data,
            startY: 45,
        });

        const pdfUrl = doc.output('bloburl');
        window.open(pdfUrl, '_blank');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!desde || !hasta || !proveedor) {
            setError('Por favor complete todos los campos');
            return;
        }

        setLoading(true);
        try {
            const url = `https://localhost:7149/api/OrdenDePago/por-fechas-ruc?fechaInicio=${desde}&fechaFin=${hasta}&ruc=${proveedor}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('No se encontraron datos o hubo un error en el servidor.');
            }
            const data = await response.json();
            generarPDF(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
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

                    <label>RUC del Proveedor</label>
                    <input
                        type="text"
                        name="proveedor"
                        placeholder="RUC del proveedor"
                        value={proveedor}
                        onChange={(e) => setProveedor(e.target.value)}
                    />

                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button type="submit" disabled={loading}>
                        {loading ? 'Generando...' : 'Generar Reporte'}
                    </button>
                </form>
                <button className={styles.closeButton} onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
}
