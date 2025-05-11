import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/header'
import agregarMovimientoImg from "../img/agregarMovimiento.png"
import TabSelector from '../components/tab.jsx'
import Pagination from '../components/pagination.jsx'
import ModalMovimiento from "../components/modalMovimientos.jsx"
import styles from '../pages/movimientosBancarios.module.css'

// Datos estáticos de conciliaciones (se mantiene igual)
const conciliacionesData = [
    { referencia: '009', fechaEmision: '24/03/2024', fechaConciliacion: '', monto: '2.200.000' },
    { referencia: '008', fechaEmision: '23/03/2024', fechaConciliacion: '29/03/2024', monto: '1.000.000' },
    { referencia: '007', fechaEmision: '22/03/2024', fechaConciliacion: '28/03/2024', monto: '2.800.000' },
    { referencia: '006', fechaEmision: '21/03/2024', fechaConciliacion: '26/03/2024', monto: '3.000.000' },
    { referencia: '005', fechaEmision: '20/03/2024', fechaConciliacion: '24/03/2024', monto: '1.540.000' },
    { referencia: '004', fechaEmision: '19/03/2024', fechaConciliacion: '22/03/2024', monto: '800.000' },
    { referencia: '003', fechaEmision: '18/03/2024', fechaConciliacion: '21/03/2024', monto: '150.000' },
    { referencia: '002', fechaEmision: '17/03/2024', fechaConciliacion: '19/03/2024', monto: '950.000' }
]

export default function MovimientosBancarios() {
    const { state } = useLocation()
    const navigate = useNavigate()

    // Si no viene el banco, redirigimos
    if (!state?.bank) {
        useEffect(() => {
            navigate('/listaDeBancos', { replace: true })
        }, [state, navigate])
        return null
    }

    // ---- Estados ----
    // Cuenta completa (trae saldo)
    const [cuenta, setCuenta] = useState({ saldo: 0 })
    const [loadingCuenta, setLoadingCuenta] = useState(false)
    const [errorCuenta, setErrorCuenta] = useState(null)

    // Movimientos
    const [movimientos, setMovimientos] = useState([])
    const [loadingMov, setLoadingMov] = useState(false)
    const [errorMov, setErrorMov] = useState(null)

    // Paginación y pestañas
    const [activeTab, setActiveTab] = useState('movimientos')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPageMov = 5
    const itemsPerPageCon = 10

    // Conciliaciones
    const [concFecha, setConcFecha] = useState(new Date().toISOString().slice(0, 10))
    const [concSaldoAnt, setConcSaldoAnt] = useState('')
    const [concSaldo2do, setConcSaldo2do] = useState('')
    const [concSaldoAct, setConcSaldoAct] = useState('')

    // Modal de nuevo movimiento
    const [isModalOpen, setModalOpen] = useState(false)

    // ---- Helpers ----
    const formatDate = isoDate => new Date(isoDate).toLocaleDateString('es-ES')

    // ---- Fetch de movimientos ----
    const fetchMovimientos = async () => {
        setLoadingMov(true)
        setErrorMov(null)
        try {
            const resp = await fetch(`https://localhost:7149/api/Movimiento?cuentaId=${state.account.id}`)
            if (!resp.ok) throw new Error('Error al cargar movimientos')
            const data = await resp.json()
            setMovimientos(data)
        } catch (err) {
            setErrorMov(err.message)
        } finally {
            setLoadingMov(false)
        }
    }

    // ---- Fetch de cuenta (incl. saldo) ----
    const fetchCuenta = async () => {
        setLoadingCuenta(true)
        setErrorCuenta(null)
        try {
            const resp = await fetch(`https://localhost:7149/api/Cuenta/${state.account.idCuenta}`)
            if (!resp.ok) throw new Error('Error al cargar la cuenta')
            const data = await resp.json()
            setCuenta(data)
        } catch (err) {
            setErrorCuenta(err.message)
        } finally {
            setLoadingCuenta(false)
        }
    }

    // ---- Effects ----
    // Al cambiar de tab, recargar movimientos
    useEffect(() => {
        if (activeTab === 'movimientos') {
            fetchMovimientos()
        }
    }, [activeTab, state.account.id])

    // Al montar y cada vez que cambie idCuenta, recargar cuenta
    useEffect(() => {
        fetchCuenta()
    }, [state.account.idCuenta])

    // ---- Manejo de nuevo movimiento ----
    const handleSaveMovimiento = savedMov => {
        // Insertar al inicio de la tabla
        setMovimientos(prev => [savedMov, ...prev])
        setCurrentPage(1)
        // Refrescar saldo desde API
        fetchCuenta()
    }

    // ---- Paginación ----
    const startMov = (currentPage - 1) * itemsPerPageMov
    const pageMov = movimientos.slice(startMov, startMov + itemsPerPageMov)
    const totalPagesMov = Math.ceil(movimientos.length / itemsPerPageMov)

    const startCon = (currentPage - 1) * itemsPerPageCon
    const pageCon = conciliacionesData.slice(startCon, startCon + itemsPerPageCon)
    const totalPagesCon = Math.ceil(conciliacionesData.length / itemsPerPageCon)

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <Header title={`${state.bank.nombre} – ${state.account.tCuenta}`}>
                    <button onClick={() => setModalOpen(true)}>
                        <img src={agregarMovimientoImg} width={70} />
                    </button>
                </Header>

                <ModalMovimiento
                    isOpen={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    accountId={state.account.idCuenta}
                    onSave={handleSaveMovimiento}
                />

                <div className={styles.tabs}>
                    <TabSelector
                        activeTab={activeTab}
                        onChange={tab => { setActiveTab(tab); setCurrentPage(1) }}
                    />
                </div>

                {activeTab === 'movimientos' && (
                    <>
                        <div className={styles.balanceCard}>
                            <div className={styles.balanceTitle}>
                                SALDO TOTAL<br />DE LA CUENTA
                            </div>
                            <div className={styles.balanceAmount}>
                                {loadingCuenta
                                    ? 'Cargando...'
                                    : errorCuenta
                                        ? '—'
                                        : cuenta.saldo.toLocaleString('es-PY') + '₲'
                                }
                            </div>
                        </div>

                        <h2 className={styles.sectionTitle}>Últimos Movimientos Bancarios</h2>

                        {loadingMov && <p>Cargando movimientos...</p>}
                        {errorMov && <p className={styles.error}>{errorMov}</p>}

                        {!loadingMov && !errorMov && (
                            <>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>Concepto</th>
                                            <th>Fecha</th>
                                            <th>Debe</th>
                                            <th>Haber</th>
                                            <th>Transacción</th>
                                            <th>Estado</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pageMov.map((m, i) => (
                                            <tr key={i}>
                                                <td>{m.concepto}</td>
                                                <td>{formatDate(m.fecha)}</td>
                                                <td>{m.transaccion.tipoMov === 'D' ? m.monto.toLocaleString('es-PY') : ''}</td>
                                                <td>{m.transaccion.tipoMov === 'C' ? m.monto.toLocaleString('es-PY') : ''}</td>
                                                <td>{m.transaccion.nombre.trim()}</td>
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
                                        <td><input type="checkbox" /></td>
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
        </div>
    )
}
