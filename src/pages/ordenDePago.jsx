import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import Pagination from '../components/pagination';
import styles from './ordenDePago.module.css';

export default function OrdenDePago() {
    const [activeTab, setActiveTab] = useState('buscar');

    // Búsqueda de facturas
    const [ruc, setRuc] = useState('');
    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');
    const [facturasFiltradas, setFacturasFiltradas] = useState([]);
    const [selectedIndices, setSelectedIndices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    // Órdenes generadas
    const [ordenesGeneradas, setOrdenesGeneradas] = useState([]);
    const [fechaGenDesde, setFechaGenDesde] = useState('');
    const [fechaGenHasta, setFechaGenHasta] = useState('');

    // Datos auxiliares: movimientos, transacciones y cuentas
    const [movimientos, setMovimientos] = useState([]);
    const [transacciones, setTransacciones] = useState([]);
    const [cuentas, setCuentas] = useState([]);

    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const formatoFecha = isoDate => new Date(isoDate).toLocaleDateString('es-PY');
    const navigate = useNavigate();

    // Cargar datos auxiliares al montar
    useEffect(() => {
        fetch('https://localhost:7149/api/Movimiento')
            .then(res => res.json())
            .then(setMovimientos)
            .catch(() => setMovimientos([]));

        fetch('https://localhost:7149/api/Transaccion')
            .then(res => res.json())
            .then(setTransacciones)
            .catch(() => setTransacciones([]));

        fetch('https://localhost:7149/api/Cuenta')
            .then(res => res.json())
            .then(setCuentas)
            .catch(() => setCuentas([]));
    }, []);

    // Cargar órdenes en pestaña Generadas
    useEffect(() => {
        if (activeTab !== 'generadas') return;
        const desde = fechaGenDesde || '1900-01-01';
        const hasta = fechaGenHasta || new Date().toISOString().slice(0, 10);

        fetch(`https://localhost:7149/api/OrdenDePago/por-fechas?fechaInicio=${desde}&fechaFin=${hasta}`)
            .then(res => res.json())
            .then(setOrdenesGeneradas)
            .catch(() => setOrdenesGeneradas([]));
    }, [activeTab, fechaGenDesde, fechaGenHasta]);

    // Manejo de búsqueda
    const handleBuscar = async e => {
        e.preventDefault();
        if (!ruc) return alert('Ingrese RUC');
        try {
            const res = await fetch(`https://localhost:7149/api/Factura/ruc/${ruc}`);
            const data = await res.json();
            const filtradas = data.filter(fac => {
                const f = new Date(fac.fecha_exp);
                const d = fechaDesde ? new Date(fechaDesde) : null;
                const h = fechaHasta ? new Date(fechaHasta) : null;
                return fac.saldo > 0 && (!d || f >= d) && (!h || f <= h);
            });
            setFacturasFiltradas(filtradas);
            setSelectedIndices([]);
            setCurrentPage(1);
        } catch {
            setFacturasFiltradas([]);
        }
    };

    const handleCheckboxChange = idx => {
        setSelectedIndices(prev =>
            prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
        );
    };

    const generarOrden = () => {
        const seleccionadas = selectedIndices.map(i => facturasFiltradas[i]);
        const proveedor = seleccionadas[0]?.proveedor?.nombre || '';
        navigate('/generarOrdenDePago', { state: { facturas: seleccionadas, proveedor } });
    };

    // Combina movimiento con sus transacción y cuenta
    const getMovimiento = ord => {
        let mov = ord.movimiento || movimientos.find(m => m.idMovi === ord.idMovi) || {};
        const tran = mov.idTran ? transacciones.find(t => t.idTran === mov.idTran) : null;
        const cta = mov.idCuenta ? cuentas.find(c => c.idCuenta === mov.idCuenta) : null;
        return { ...mov, transaccion: tran, cuenta: cta };
    };

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <Header title="Orden de Pago" />
                <div className={styles.tabs}>
                    <button onClick={() => setActiveTab('buscar')} className={`${styles.tabButton} ${activeTab === 'buscar' ? styles.active : ''}`}>Buscar / Generar</button>
                    <button onClick={() => setActiveTab('generadas')} className={`${styles.tabButton} ${activeTab === 'generadas' ? styles.active : ''}`}>Órdenes Generadas</button>
                </div>

                {activeTab === 'buscar' ? (
                    <>
                        <form onSubmit={handleBuscar} className={styles.form}>
                            <div className={styles.inputDiv}>
                                <label>RUC:</label>
                                <input type="text"
                                    value={ruc}
                                    onChange={e => setRuc(e.target.value)}
                                    className={styles.input} />
                            </div>
                            <div className={styles.inputDiv}>
                                <label>Desde:</label>
                                <input type="date"
                                    value={fechaDesde}
                                    onChange={e => setFechaDesde(e.target.value)}
                                    className={styles.input} />
                            </div>
                            <div className={styles.inputDiv}>
                                <label>Hasta:</label>
                                <input type="date"
                                    value={fechaHasta}
                                    onChange={e => setFechaHasta(e.target.value)}
                                    className={styles.input} />
                            </div>
                            <button type="submit" className={styles.boton}>Buscar</button>
                        </form>
                        <h2 className={styles.texto}>Facturas Pendientes</h2>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Proveedor</th>
                                    <th>Fecha</th>
                                    <th>Nro.</th>
                                    <th>Total</th>
                                    <th>Saldo</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>{facturasFiltradas.slice(startIndex, startIndex + itemsPerPage).map((fac, i) => {
                                const idx = startIndex + i;
                                return (<tr key={idx}>
                                    <td>{fac.proveedor.nombre}</td>
                                    <td>{formatoFecha(fac.fecha_exp)}</td>
                                    <td>{fac.nro_factura}</td>
                                    <td>{fac.total}</td>
                                    <td>{fac.saldo}</td>
                                    <td><input type="checkbox"
                                        checked={selectedIndices.includes(idx)}
                                        onChange={() => handleCheckboxChange(idx)} /></td>
                                </tr>);
                            })}</tbody>
                        </table>
                        <Pagination currentPage={currentPage} totalPages={Math.ceil(facturasFiltradas.length / itemsPerPage)} onPageChange={setCurrentPage} />
                        <button onClick={generarOrden} className={styles.buttonGenerar}>Generar Orden</button>
                    </>
                ) : (
                    <>
                        <h2 className={styles.texto}>Órdenes Generadas</h2>
                        <div className={styles.inputDiv}>
                            <label>Desde:</label>
                            <input type="date"
                                value={fechaGenDesde}
                                onChange={e => setFechaGenDesde(e.target.value)}
                                className={styles.input} />
                        </div>
                        <div className={styles.inputDiv}>
                            <label>Hasta:</label>
                            <input type="date"
                                value={fechaGenHasta}
                                onChange={e => setFechaGenHasta(e.target.value)}
                                className={styles.input} />
                        </div>
                        {ordenesGeneradas.length === 0 ? <p>No hay órdenes en este rango.</p> : (
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Nro Orden</th>
                                        <th>Proveedor</th>
                                        <th>Fecha</th>
                                        <th># Facturas</th>
                                        <th>Monto</th>
                                        <th>Método Pago</th>
                                        <th>Nro Cuenta</th>
                                    </tr>
                                </thead>
                                <tbody>{ordenesGeneradas.map((ord, i) => {
                                    const m = getMovimiento(ord);
                                    return (<tr key={i}>
                                        <td>{ord.nroOrden}</td>
                                        <td>{ord.facturas[0]?.proveedor.nombre}</td>
                                        <td>{formatoFecha(m.fecha)}</td><td>{ord.facturas.length}</td>
                                        <td>{m.monto}</td><td>{m.transaccion?.nombre || '—'}</td>
                                        <td>{m.cuenta?.nroCuenta || m.ctaDestino}</td>
                                    </tr>);
                                })}</tbody>
                            </table>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}
