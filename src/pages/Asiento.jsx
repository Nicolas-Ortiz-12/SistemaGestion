import React, { useEffect, useState } from 'react';
import styles from './Asiento.module.css';

export default function Asiento() {
    const [asientos, setAsientos] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const asientosPorPagina = 3;

    useEffect(() => {
        fetch('https://localhost:7149/api/AsientosContables')
            .then(response => {
                if (!response.ok) throw new Error('Error al obtener los datos');
                return response.json();
            })
            .then(data => setAsientos(data))
            .catch(error => console.error('Error al obtener los asientos:', error));
    }, []);

    const totalPaginas = Math.ceil(asientos.length / asientosPorPagina);
    const indiceInicio = (paginaActual - 1) * asientosPorPagina;
    const asientosPaginados = asientos.slice(indiceInicio, indiceInicio + asientosPorPagina);

    const irPaginaAnterior = () => {
        if (paginaActual > 1) setPaginaActual(paginaActual - 1);
    };

    const irPaginaSiguiente = () => {
        if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
    };

    return (
        <div className={styles.asientoContainer}>
            <div className={styles.asientoHeaderContainer}>
                <h2 className={styles.asientoHeaderTitle}>Asiento Contable</h2>
            </div>


            {asientosPaginados.map(asiento => {
                let saldo = 0;
                let totalDebe = 0;
                let totalHaber = 0;

                const detallesConSaldo = asiento.detalles.map(detalle => {
                    saldo += detalle.debe - detalle.haber;
                    totalDebe += detalle.debe;
                    totalHaber += detalle.haber;
                    return { ...detalle, saldo: saldo };
                });

                return (
                    <div key={asiento.id} className={styles.asientoBlock}>
                        <table className={styles.asientoTable}>
                            <thead>
                                <tr>
                                    <th colSpan="5" className={styles.asientoHeader}>
                                        <div><strong>Asiento:</strong> {asiento.nroAsiento} | <strong>Fecha:</strong> {new Date(asiento.fecha).toLocaleDateString()}</div>
                                        <div><strong>Referencia:</strong> {asiento.referencia}</div>
                                        <div><strong>Descripción:</strong> {asiento.descripcion}</div>
                                    </th>
                                </tr>
                                <tr>

                                    <th>Fecha</th>
                                    <th>Concepto</th>
                                    <th>Debe</th>
                                    <th>Haber</th>
                                    <th>Saldo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {detallesConSaldo.map(detalle => (
                                    <tr key={detalle.id}>
                                        <td>{new Date(asiento.fecha).toLocaleDateString()}</td>
                                        <td>{detalle.cuenta}</td>
                                        <td>{detalle.debe.toLocaleString()}</td>
                                        <td>{detalle.haber.toLocaleString()}</td>
                                        <td>{detalle.saldo.toLocaleString()}</td>
                                    </tr>
                                ))}
                                <tr className={styles.totalesRow}>
                                    <td colSpan="2"><strong>Totales</strong></td>
                                    <td><strong>{totalDebe.toLocaleString()}</strong></td>
                                    <td><strong>{totalHaber.toLocaleString()}</strong></td>
                                    <td><strong>{saldo.toLocaleString()}</strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                );
            })}

            <div className={styles.paginacion}>
                <button onClick={irPaginaAnterior} disabled={paginaActual === 1}>Anterior</button>
                <span>Página {paginaActual} de {totalPaginas}</span>
                <button onClick={irPaginaSiguiente} disabled={paginaActual === totalPaginas}>Siguiente</button>
            </div>
        </div>
    );
}
