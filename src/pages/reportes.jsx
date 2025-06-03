// Reportes.jsx
import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import styles from './reportes.module.css';
import reportesImg from '../img/reportes.png';
import ModalReporteFlujoCaja from '../components/modalReporteFlujoCaja';
import ModalReporteProveedores from '../components/modalReporteProveedores';
import ModalReporteMovimientos from '../components/modalReporteMovimientos';
import ModalReporteCheques from '../components/modalReporteCheques';
import ModalReporteOrdenPago from '../components/modalReporteOrdenPago';

export default function Reportes() {
    const [reportes, setReportes] = useState([]);
    const [modalAbierto, setModalAbierto] = useState(null);

    const formatDate = isoDate => new Date(isoDate).toLocaleDateString('es-PY')

    useEffect(() => {
        const datosEjemplo = [
            { nombre: 'Reporte Flujo De Cuenta', fecha: '2024-08-01', tipo: 'PDF' },
            { nombre: 'Reporte de Proveedores', fecha: '2024-08-03', tipo: 'PDF' },
            { nombre: 'Movimientos Bancarios', fecha: '2024-08-05', tipo: 'PDF' },
            { nombre: 'Reporte de Cheques', fecha: '2024-08-07', tipo: 'PDF' },
            { nombre: 'Reporte de Órdenes de Pago', fecha: '2024-08-08', tipo: 'PDF' }
        ];
        setReportes(datosEjemplo);
    }, []);

    const abrirModal = (nombre) => {
        if (nombre.includes('Cuenta') && !nombre.includes('Movimientos')) {
            setModalAbierto('Caja');
        } else if (nombre.includes('Proveedores')) {
            setModalAbierto('proveedores');
        } else if (nombre.includes('Movimientos')) {
            setModalAbierto('movimientos');
        } else if (nombre.includes('Cheques')) {
            setModalAbierto('cheques');
        } else if (nombre.includes('Órdenes') || nombre.includes('Ordenes')) {
            setModalAbierto('ordenes');
        }
    };

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <Header title="Reportes" />

                <div className={styles.contenido}>
                    <h2 className={styles.titulo}>Generar reportes</h2>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Fecha</th>
                                <th>Tipo</th>
                                <th>Generar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportes.map((r, index) => (
                                <tr key={index}>
                                    <td>{r.nombre}</td>
                                    <td>{formatDate(r.fecha)}</td>
                                    <td>{r.tipo}</td>
                                    <td>
                                        <button onClick={() => abrirModal(r.nombre)} className={styles.boton}>Generar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {modalAbierto === 'Caja' && <ModalReporteFlujoCaja onClose={() => setModalAbierto(null)} />}
                {modalAbierto === 'proveedores' && <ModalReporteProveedores onClose={() => setModalAbierto(null)} />}
                {modalAbierto === 'movimientos' && <ModalReporteMovimientos onClose={() => setModalAbierto(null)} />}
                {modalAbierto === 'cheques' && <ModalReporteCheques onClose={() => setModalAbierto(null)} />}
                {modalAbierto === 'ordenes' && <ModalReporteOrdenPago onClose={() => setModalAbierto(null)} />}
            </main>
        </div>
    );
}
