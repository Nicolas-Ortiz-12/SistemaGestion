import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import Pagination from "../components/pagination";
import styles from "./ordenDePago.module.css";

export default function OrdenDePago() {
    const [currentPage, setCurrentPage] = useState(1);
    const [facturas, setFacturas] = useState([]);
    const [facturasFiltradas, setFacturasFiltradas] = useState([]);
    const [selectedIndices, setSelectedIndices] = useState([]);

    const [ruc, setRuc] = useState('');
    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');

    const navigate = useNavigate();
    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentFacturas = facturasFiltradas.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(facturasFiltradas.length / itemsPerPage);
    const formatDate = isoDate => new Date(isoDate).toLocaleDateString('es-PY')

    const handleBuscar = async (e) => {
        e.preventDefault();
        if (!ruc) {
            alert("Por favor, ingrese un RUC.");
            return;
        }

        try {
            const res = await fetch(`https://localhost:7149/api/Factura/ruc/${ruc}`);
            const data = await res.json();

            // Filtro por fecha si hay
            const filtradas = data.filter(fac => {
                const fecha = new Date(fac.fecha_exp);
                const desde = fechaDesde ? new Date(fechaDesde) : null;
                const hasta = fechaHasta ? new Date(fechaHasta) : null;
                const pendiente = fac.saldo > 0;
                return pendiente && (!desde || fecha >= desde) && (!hasta || fecha <= hasta);
            });

            setFacturas(data);
            setFacturasFiltradas(filtradas);
            setCurrentPage(1);
            setSelectedIndices([]);
        } catch (err) {
            console.error("Error cargando facturas por RUC:", err);
            setFacturas([]);
            setFacturasFiltradas([]);
        }
    };

    const handleCheckboxChange = (globalIndex) => {
        setSelectedIndices(prev => {
            if (prev.includes(globalIndex)) {
                return prev.filter(i => i !== globalIndex);
            }
            return [...prev, globalIndex];
        });
    };

    const generarOrden = () => {
        const seleccionadas = selectedIndices.map(i => facturasFiltradas[i]);
        const proveedorSeleccionado = seleccionadas[0]?.proveedor?.nombre || '';
        navigate('/generarOrdenDePago', {
            state: {
                facturas: seleccionadas,
                proveedor: proveedorSeleccionado
            }
        });
    };

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <Header title="Orden de Pago" />

                <form className={styles.form} onSubmit={handleBuscar}>
                    <div className={styles.inputDiv}>
                        <label>RUC del Proveedor:</label>
                        <input
                            type="text"
                            className={styles.input}
                            value={ruc}
                            onChange={(e) => setRuc(e.target.value)}
                        />
                    </div>

                    <div className={styles.inputDiv}>
                        <label>Desde:</label>
                        <input
                            type="date"
                            className={styles.input}
                            value={fechaDesde}
                            onChange={(e) => setFechaDesde(e.target.value)}
                        />
                    </div>

                    <div className={styles.inputDiv}>
                        <label>Hasta:</label>
                        <input
                            type="date"
                            className={styles.input}
                            value={fechaHasta}
                            onChange={(e) => setFechaHasta(e.target.value)}
                        />
                    </div>

                    <button type="submit" className={styles.boton}>Buscar</button>
                </form>

                <h2 className={styles.texto}>Facturas Pendientes a Pago</h2>

                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Fecha</th>
                            <th>Nro.</th>
                            <th>Total</th>
                            <th>Saldo</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentFacturas.map((fac, i) => {
                            const globalIndex = startIndex + i;
                            const checked = selectedIndices.includes(globalIndex);
                            return (
                                <tr key={fac.id || globalIndex}>
                                    <td>{fac.proveedor?.nombre}</td>
                                    <td>{formatDate(fac.fecha_exp)}</td>
                                    <td>{fac.nro_factura}</td>
                                    <td>{fac.total}</td>
                                    <td>{fac.saldo}</td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={checked}
                                            onChange={() => handleCheckboxChange(globalIndex)}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />

                <button
                    type="button"
                    className={styles.buttonGenerar}
                    onClick={generarOrden}
                >
                    Generar Orden de Pago
                </button>
            </main>
        </div>
    );
}
