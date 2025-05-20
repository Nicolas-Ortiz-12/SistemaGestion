// Reportes.jsx
import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import styles from './reportes.module.css';
import reportesImg from '../img/reportes.png';
import ModalReporteBancos from '../components/modalReporteBancos';
import ModalReporteProveedores from '../components/modalReporteProveedores';
import ModalReporteMovimientos from '../components/modalReporteMovimientos';


export default function Reportes() {
    const [reportes, setReportes] = useState([]);
    const [modalAbierto, setModalAbierto] = useState(null);

    useEffect(() => {
        const datosEjemplo = [
            { nombre: 'Reporte de Bancos', fecha: '2024-08-01', tipo: 'PDF' },
            { nombre: 'Reporte de Proveedores', fecha: '2024-08-03', tipo: 'PDF' },
            { nombre: 'Movimientos Bancarios', fecha: '2024-08-05', tipo: 'PDF' }
        ];
        setReportes(datosEjemplo);
    }, []);

    const abrirModal = (nombre) => {
        if (nombre.includes('Bancos') && !nombre.includes('Movimientos')) {
            setModalAbierto('bancos');
        } else if (nombre.includes('Proveedores')) {
            setModalAbierto('proveedores');
        } else if (nombre.includes('Movimientos')) {
            setModalAbierto('movimientos');
        }
    };

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <Header title="Reportes">
                    
                </Header>

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
                                    <td>{r.fecha}</td>
                                    <td>{r.tipo}</td>
                                    <td>
                                        <button onClick={() => abrirModal(r.nombre)} className={styles.boton}>Generar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {modalAbierto === 'bancos' && <ModalReporteBancos onClose={() => setModalAbierto(null)} />}
                {modalAbierto === 'proveedores' && <ModalReporteProveedores onClose={() => setModalAbierto(null)} />}
                {modalAbierto === 'movimientos' && <ModalReporteMovimientos onClose={() => setModalAbierto(null)} />}
            </main>
        </div>
    );
}
