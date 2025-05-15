import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/header'
import agregarMovimientoImg from "../img/agregarMovimiento.png"
import TabSelector from '../components/tab.jsx'
import Pagination from '../components/pagination.jsx'
import ModalMovimiento from "../components/modalMovimientos.jsx"
import styles from '../pages/movimientosBancarios.module.css'

export default function MovimientosBancarios() {
    const { state } = useLocation()
    const navigate = useNavigate()

    if (!state?.bank) {
        useEffect(() => {
            navigate('/listaDeBancos')
        }, [state, navigate])
        return null
    }

    const [cuenta, setCuenta] = useState({ saldo: 0 })
    const [errorCuenta, setErrorCuenta] = useState(null)
    const [movimientos, setMovimientos] = useState([])
    const [errorMov, setErrorMov] = useState(null)

    const [conciliaciones, setConciliaciones] = useState([])
    const [errorConc, setErrorConc] = useState(null)

    const [activeTab, setActiveTab] = useState('movimientos')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPageMov = 5
    const itemsPerPageCon = 10

    const [concFecha, setConcFecha] = useState(new Date().toISOString().slice(0, 10))
    const [concSaldoAnt, setConcSaldoAnt] = useState('')
    const [concSaldo2do, setConcSaldo2do] = useState('')
    const [concSaldoAct, setConcSaldoAct] = useState(0)
    const [selectedConcMovs, setSelectedConcMovs] = useState([])

    const [isModalOpen, setModalOpen] = useState(false)

    const formatDate = isoDate => new Date(isoDate).toLocaleDateString('es-ES')

    const fetchMovimientos = async () => {
        setErrorMov(null)
        try {
            const resp = await fetch(
                `https://localhost:7149/api/Movimiento/cuenta/${state.account.idCuenta}`
            )
            if (!resp.ok) throw new Error('Error al cargar movimientos')
            const data = await resp.json()
            setMovimientos(data)
        } catch (err) {
            setErrorMov(err.message)
        }
    }

    const fetchCuenta = async () => {
        setErrorCuenta(null)
        try {
            const resp = await fetch(`https://localhost:7149/api/Cuenta/${state.account.idCuenta}`)
            if (!resp.ok) throw new Error('Error al cargar la cuenta')
            const data = await resp.json()
            setCuenta(data)
        } catch (err) {
            setErrorCuenta(err.message)
        }
    }

    const fetchConciliaciones = async () => {
        setErrorConc(null)
        try {
            const resp = await fetch(`https://localhost:7149/api/Movimiento/pendientes/${state.account.idCuenta}`)
            if (!resp.ok) throw new Error('Error al cargar conciliaciones pendientes')
            const data = await resp.json()
            setConciliaciones(data)
        } catch (err) {
            setErrorConc(err.message)
        }
    }

    useEffect(() => {
        if (activeTab === 'movimientos') fetchMovimientos()
    }, [activeTab, state.account.id])

    useEffect(() => {
        fetchCuenta()
    }, [state.account.idCuenta])

    useEffect(() => {
        if (activeTab === 'conciliaciones') fetchConciliaciones()
    }, [activeTab, state.account.id])

    useEffect(() => {
        const sum = selectedConcMovs.reduce((acc, mov) => acc + mov.monto, 0)
        setConcSaldoAct(sum)
    }, [selectedConcMovs])

    const handleSelectConc = (mov, checked) => {
        if (checked) {
            setSelectedConcMovs(prev => [...prev, mov])
        } else {
            setSelectedConcMovs(prev => prev.filter(m => m.idMovi !== mov.idMovi))
        }
    }

    const handleConciliar = async () => {
        const saldo2 = parseFloat(concSaldo2do)
        if (isNaN(saldo2)) {
            alert('Ingrese un valor numérico en Saldo 2do Edo. Cta.')
            return
        }

        if (saldo2 !== concSaldoAct) {
            alert('El Saldo 2do Edo. Cta debe ser igual al Saldo Actual para conciliar')
            return
        }

        const payload = {
            cuentaId: state.account.idCuenta,
            fechaConciliacion: concFecha,
            movimientos: selectedConcMovs.map(m => m.idMovi)
        }
        console.log('Payload:', payload)

        try {
            const resp = await fetch('https://localhost:7149/api/Movimiento/conciliar', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            if (!resp.ok) {
                const errorText = await resp.text()
                throw new Error(`Error al conciliar: ${errorText}`)
            }

            alert('Conciliación realizada con éxito.')

            // Limpiar formulario y recargar conciliaciones
            setSelectedConcMovs([])
            setConcSaldoAnt('')
            setConcSaldo2do('')
            setConcSaldoAct(0)
            fetchConciliaciones()

        } catch (err) {
            alert(`Error: ${err.message}`)
        }
    }

    const handleSaveMovimiento = savedMov => {
        if (savedMov.transaccion.tipoMov === 'Cheque' || savedMov.transaccion.nombre.toLowerCase().includes('cheque')) {
            savedMov.estado = 'Pendiente'
        }
        setMovimientos(prev => [savedMov, ...prev])
        setCurrentPage(1)
        fetchCuenta()
    }

    const startMov = (currentPage - 1) * itemsPerPageMov
    const pageMov = movimientos.slice(startMov, startMov + itemsPerPageMov)
    const totalPagesMov = Math.ceil(movimientos.length / itemsPerPageMov)

    const startCon = (currentPage - 1) * itemsPerPageCon
    const pageCon = conciliaciones.slice(startCon, startCon + itemsPerPageCon)
    const totalPagesCon = Math.ceil(conciliaciones.length / itemsPerPageCon)

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <Header title={`${state.bank.nombre} – ${state.account.tCuenta}`}>
                    <button onClick={() => setModalOpen(true)}>
                        <img src={agregarMovimientoImg} width={70} alt="Agregar movimiento" />
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
                                {errorCuenta ? '—' : state.account.saldo.toLocaleString('es-PY') + '₲'}
                            </div>
                        </div>

                        <h2 className={styles.sectionTitle}>Últimos Movimientos Bancarios</h2>

                        {errorMov && <p className={styles.error}>{errorMov}</p>}

                        {!errorMov && (
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
                                    value={concSaldoAct.toLocaleString('es-PY')}
                                    readOnly
                                    placeholder="0.00"
                                />
                            </div>
                            <button onClick={handleConciliar}>Conciliar</button>
                        </div>

                        <h2 className={styles.sectionTitle}>Pendientes de Conciliación</h2>

                        {errorConc && <p className={styles.error}>{errorConc}</p>}

                        {!errorConc && (
                            <>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>REFERENCIA</th>
                                            <th></th>
                                            <th>FECHA EMISIÓN</th>
                                            <th>FECHA CONCILIACIÓN</th>
                                            <th>MONTO</th>
                                            <th>ESTADO</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pageCon.map((c, i) => (
                                            <tr key={i}>
                                                <td>{c.idMovi}</td>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedConcMovs.some(m => m.idMovi === c.idMovi)}
                                                        onChange={e => handleSelectConc(c, e.target.checked)}
                                                    />
                                                </td>
                                                <td>{formatDate(c.fecha)}</td>
                                                <td>{c.fechaConciliacion || '—'}</td>
                                                <td>{c.monto.toLocaleString('es-PY')}</td>
                                                <td>{c.estado}</td>
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
                    </>
                )}
            </main>
        </div>
    )
}
