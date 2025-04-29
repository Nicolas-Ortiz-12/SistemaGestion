// src/pages/MovimientosBancarios.jsx
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/header'
import agregarMovimientoImg from "../img/agregarMovimiento.png"
import TabSelector from '../components/tab.jsx'
import Pagination from '../components/pagination.jsx';
import ModalMovimiento from "../components/modalMovimientos.jsx";
import styles from '../pages/movimientosBancarios.module.css'


const movimientosData = [
    { referencia: 'Pago de Seguro contra Incendios', fecha: '24/03/20', debe: '', haber: '1.500.000', tipo: 'Cheque', estado: 'Emitido' },
    { referencia: 'Alquiler de Salón de Eventos', fecha: '23/03/20', debe: '8.000.000', haber: '', tipo: 'Transferencia', estado: 'Emitido' },
    { referencia: 'Pago de Obras en Planta Baja', fecha: '22/03/20', debe: '', haber: '2.800.000', tipo: 'Cheque', estado: 'Emitido' },
    { referencia: 'Pago de Almuerzo de Empleados', fecha: '21/03/20', debe: '', haber: '300.000', tipo: 'Transferencia', estado: 'Emitido' },
    { referencia: 'Pago de Reparación Inmobiliaria', fecha: '20/03/20', debe: '', haber: '500.000', tipo: 'Transferencia', estado: 'Emitido' },
    { referencia: 'Cobro de Alquiler de Quincho', fecha: '19/03/20', debe: '1.400.000', haber: '', tipo: 'Transferencia', estado: 'Emitido' },
    { referencia: 'Pago a Proveedor', fecha: '18/03/20', debe: '', haber: '1.300.000', tipo: 'Cheque', estado: 'Conciliado' },
    { referencia: 'Compra de torta de cumpleaños', fecha: '17/03/20', debe: '', haber: '80.000', tipo: 'Transferencia', estado: 'Emitido' },
]
const conciliacionesData = [
    { referencia: '009', fechaEmision: '24/03/2024', fechaConciliacion: '', monto: '2.200.000' },
    { referencia: '008', fechaEmision: '23/03/2024', fechaConciliacion: '29/03/2024', monto: '1.000.000' },
    { referencia: '007', fechaEmision: '22/03/2024', fechaConciliacion: '28/03/2024', monto: '2.800.000' },
    { referencia: '006', fechaEmision: '21/03/2024', fechaConciliacion: '26/03/2024', monto: '3.000.000' },
    { referencia: '005', fechaEmision: '20/03/2024', fechaConciliacion: '24/03/2024', monto: '1.540.000' },
    { referencia: '004', fechaEmision: '19/03/2024', fechaConciliacion: '22/03/2024', monto: '800.000' },
    { referencia: '003', fechaEmision: '18/03/2024', fechaConciliacion: '21/03/2024', monto: '150.000' },
    { referencia: '002', fechaEmision: '17/03/2024', fechaConciliacion: '19/03/2024', monto: '950.000' },
    { referencia: '009', fechaEmision: '24/03/2024', fechaConciliacion: '', monto: '2.200.000' },
    { referencia: '008', fechaEmision: '23/03/2024', fechaConciliacion: '29/03/2024', monto: '1.000.000' },
    { referencia: '007', fechaEmision: '22/03/2024', fechaConciliacion: '28/03/2024', monto: '2.800.000' },
    { referencia: '006', fechaEmision: '21/03/2024', fechaConciliacion: '26/03/2024', monto: '3.000.000' },
    { referencia: '005', fechaEmision: '20/03/2024', fechaConciliacion: '24/03/2024', monto: '1.540.000' },
    { referencia: '004', fechaEmision: '19/03/2024', fechaConciliacion: '22/03/2024', monto: '800.000' },
    { referencia: '003', fechaEmision: '18/03/2024', fechaConciliacion: '21/03/2024', monto: '150.000' },
    { referencia: '002', fechaEmision: '17/03/2024', fechaConciliacion: '19/03/2024', monto: '950.000' },
]

export default function MovimientosBancarios() {
    const { state } = useLocation()
    const navigate = useNavigate()

    // pestaña activa: 'movimientos' | 'conciliaciones'
    const [activeTab, setActiveTab] = useState('movimientos')

    // paginación
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPageMov = 8;
    const itemsPerPageCon = 10;

    // estados para formulario de conciliación
    const [concFecha, setConcFecha] = useState(new Date().toISOString().slice(0, 10))
    const [concSaldoAnt, setConcSaldoAnt] = useState('')
    const [concSaldo2do, setConcSaldo2do] = useState('')
    const [concSaldoAct, setConcSaldoAct] = useState('')

    useEffect(() => {
        if (!state?.bank) navigate('/listaDeBancos', { replace: true })
    }, [state, navigate])

    if (!state?.bank) return null

    // para movimientos
    const startMov = (currentPage - 1) * itemsPerPageMov
    const pageMov = movimientosData.slice(startMov, startMov + itemsPerPageMov)
    const totalPagesMov = Math.ceil(movimientosData.length / itemsPerPageMov);

    // para conciliaciones
    const startCon = (currentPage - 1) * itemsPerPageCon
    const pageCon = conciliacionesData.slice(startCon, startCon + itemsPerPageCon)
    const totalPagesCon = Math.ceil(conciliacionesData.length / itemsPerPageCon);


    const [isModalOpen, setModalOpen] = useState(false);

    const name = state.bank.nombre;
    const type = state.account.tCuenta;
    const balance = state.account.saldo;
    return (

        <div className={styles.container}>
            <main className={styles.main}>
                <Header title={`${name} – ${type}`}>
                    <button onClick={() => setModalOpen(true)}>
                        <img src={agregarMovimientoImg} width={70} />
                    </button>
                </Header>

                <ModalMovimiento
                    isOpen={isModalOpen}
                    onClose={() => setModalOpen(false)}
                />


                {/* pestañas */}
                <div className={styles.tabs}>
                    <TabSelector activeTab={activeTab} onChange={setActiveTab} />
                </div>


                {activeTab === 'movimientos' && (
                    <>
                        <div className={styles.balanceCard}>
                            <div className={styles.balanceTitle}>
                                SALDO TOTAL<br />DE LA CUENTA
                            </div>
                            <div className={styles.balanceAmount}>
                                {balance.toLocaleString('es-PY')}₲
                            </div>
                        </div>

                        <h2 className={styles.sectionTitle}>
                            Últimos Movimientos Bancarios
                        </h2>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>REFERENCIA</th>
                                    <th>FECHA</th>
                                    <th>DEBE</th>
                                    <th>HABER</th>
                                    <th>TIPO</th>
                                    <th>ESTADO</th>
                                    <th>ACCIONES</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pageMov.map((m, i) => (
                                    <tr key={i}>
                                        <td>{m.referencia}</td>
                                        <td>{m.fecha}</td>
                                        <td>{m.debe}</td>
                                        <td>{m.haber}</td>
                                        <td>{m.tipo}</td>
                                        <td>{m.estado}</td>
                                        <td>
                                            <button className={styles.actionBtn}>📋</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPagesMov}
                            onPageChange={setCurrentPage}
                        />
                    </>
                )}

                {activeTab === 'conciliaciones' && (
                    <>
                        <div className={styles.conciliacionForm}>
                            <div>
                                <label>Fecha:</label>
                                <input
                                    type="date"
                                    value={concFecha}
                                    onChange={e => setConcFecha(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Saldo Anterior:</label>
                                <input
                                    type="text"
                                    value={concSaldoAnt}
                                    onChange={e => setConcSaldoAnt(e.target.value)}
                                    placeholder="0.00"
                                />
                            </div>
                            <div>
                                <label>Saldo 2do Edo. Cta:</label>
                                <input
                                    type="text"
                                    value={concSaldo2do}
                                    onChange={e => setConcSaldo2do(e.target.value)}
                                    placeholder="0.00"
                                />
                            </div>
                            <div>
                                <label>Saldo Actual:</label>
                                <input
                                    type="text"
                                    value={concSaldoAct}
                                    onChange={e => setConcSaldoAct(e.target.value)}
                                    placeholder="0.00"
                                />
                            </div>
                            <button>Conciliar</button>
                        </div>

                        <h2 className={styles.sectionTitle}>Listado de Conciliaciones</h2>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>REFERENCIA</th>
                                    <th></th>
                                    <th>FECHA EMISIÓN</th>
                                    <th>FECHA CONCILIACIÓN</th>
                                    <th>MONTO</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pageCon.map((c, i) => (
                                    <tr key={i}>
                                        <td>{c.referencia}</td>
                                        <td>
                                            <input type="checkbox" />
                                        </td>
                                        <td>{c.fechaEmision}</td>
                                        <td>{c.fechaConciliacion || '—'}</td>
                                        <td>{c.monto}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPagesCon}
                            onPageChange={setCurrentPage}
                        />
                    </>
                )}
            </main>
        </div >
    )
}
