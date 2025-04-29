import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import Pagination from "../components/pagination";
import styles from "./ordenDePago.module.css";

export default function OrdenDePago() {
    const [currentPage, setCurrentPage] = useState(1);
    const [proveedores, setProveedores] = useState([]);
    const [facturas, setFacturas] = useState([]);
    const [selectedIndices, setSelectedIndices] = useState([]);
    const navigate = useNavigate();

    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentFacturas = facturas.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(facturas.length / itemsPerPage);

    useEffect(() => {
        // Obtener proveedores desde el backend
        fetch('https://localhost:7149/api/Proveedores')
            .then(res => res.json())
            .then(data => setProveedores(data))
            .catch(err => {
                console.error("Error cargando proveedores:", err);
                setProveedores([]);
            });

        // Obtener facturas desde el backend
        fetch('https://localhost:7149/api/Factura')
            .then(res => res.json())
            .then(data => setFacturas(data))
            .catch(err => {
                console.error("Error cargando facturas:", err);
                setFacturas([]);
            });
    }, []);

    const handleCheckboxChange = (globalIndex) => {
        setSelectedIndices(prev => {
            if (prev.includes(globalIndex)) {
                return prev.filter(i => i !== globalIndex);
            }
            return [...prev, globalIndex];
        });
    };

    const generarOrden = () => {
        const seleccionadas = selectedIndices.map(i => facturas[i]);
        navigate('/generarOrdenDePago', { state: { facturas: seleccionadas } });
    };

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <Header title="Orden de Pago" />
                <form className={styles.form}>
                    <div className={styles.inputDiv}>
                        <label>Proveedor:</label>
                        <input list="proveedores" className={styles.input} />
                        <datalist id='proveedores'>
                            {proveedores.map((prov, index) => (
                                <option key={index} value={prov.nombre} />
                            ))}
                        </datalist>
                    </div>
                    <div className={styles.inputDiv}>
                        <label>Desde:</label>
                        <input type="date" className={styles.input} />
                    </div>
                    <div className={styles.inputDiv}>
                        <label>Hasta:</label>
                        <input type="date" className={styles.input} />
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
                            <th>Aplica</th>
                            <th>Acción</th>

                        </tr>
                    </thead>
                    <tbody>
                        {currentFacturas.map((fac, i) => {
                            const globalIndex = startIndex + i;
                            const checked = selectedIndices.includes(globalIndex);
                            return (
                                <tr key={fac.id || globalIndex}>
                                    <td>{fac.proveedor.nombre}</td>
                                    <td>{fac.fecha_exp}</td>
                                    <td>{fac.nro_factura}</td>
                                    <td>{fac.total}</td>
                                    <td>{fac.saldo}</td>
                                    <td>{fac.aplica}</td>
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
