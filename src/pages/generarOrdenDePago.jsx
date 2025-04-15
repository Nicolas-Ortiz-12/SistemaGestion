import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/header';
import styles from '../pages/generarOrdenDepago.module.css';

export default function GenerarOrdenDePago() {
    const location = useLocation();
    const navigate = useNavigate();
    const facturas = location.state?.facturas || [];

    // Encabezado
    const [proveedor, setProveedor] = useState('');
    const [nroPago, setNroPago] = useState('');
    const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
    const [importeTotal, setImporteTotal] = useState(0);

    // Modal y pagos
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(''); // 'transferencia' | 'cheque'
    const [modalFields, setModalFields] = useState({
        fechaEmision: new Date().toISOString().split('T')[0],
        nroReferencia: '',
        numeroTransferencia: '',
        correlativo: false,
        monto: '',
        cuentaDestino: '',
        concepto: '',
        banco: '',
        numeroCheque: ''
    });
    const [pagos, setPagos] = useState([]);

    useEffect(() => {
        const total = facturas.reduce((sum, f) => {
            const num = parseInt(f.aplica.replace(/\./g, ''), 10) || 0;
            return sum + num;
        }, 0);
        setImporteTotal(total);
    }, [facturas]);

    const formatNumber = num =>
        num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    const openModal = type => {
        setModalType(type);
        setModalFields({
            fechaEmision: new Date().toISOString().split('T')[0],
            nroReferencia: '',
            numeroTransferencia: '',
            correlativo: false,
            monto: '',
            cuentaDestino: '',
            concepto: '',
            banco: '',
            numeroCheque: ''
        });
        setShowModal(true);
    };

    const closeModal = () => setShowModal(false);

    const handleFieldChange = e => {
        const { name, value, type, checked } = e.target;
        setModalFields(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const savePago = () => {
        const pago = {
            fecha: modalFields.fechaEmision,
            tipo: modalType === 'transferencia' ? 'Transferencia' : 'Cheque',
            cuenta: modalType === 'transferencia' ? modalFields.cuentaDestino : modalFields.banco,
            monto: modalFields.monto,
            referencia: modalType === 'transferencia' ? modalFields.numeroTransferencia : modalFields.numeroCheque,
            concepto: modalFields.concepto
        };
        setPagos(prev => [...prev, pago]);
        setShowModal(false);
    };

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <Header title="Detalle Orden De Pago" />

                {/* Encabezado */}
                <form className={styles.formHeader} onSubmit={e => e.preventDefault()}>
                    <div className={styles.inputGroup}>
                        <label>Proveedor</label>
                        <input value={proveedor} onChange={e => setProveedor(e.target.value)} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Nro. Pago</label>
                        <input value={nroPago} onChange={e => setNroPago(e.target.value)} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Fecha</label>
                        <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Importe total</label>
                        <input readOnly value={formatNumber(importeTotal)} />
                    </div>
                </form>

                {/* Facturas seleccionadas */}
                <h2 className={styles.sectionTitle}>Facturas A Pagar</h2>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>N°Factura</th>
                            <th>Total</th>
                            <th>Saldo</th>
                            <th>Aplica</th>
                        </tr>
                    </thead>
                    <tbody>
                        {facturas.map((f, idx) => (
                            <tr key={idx}>
                                <td>{f.fecha}</td>
                                <td>{f.nro}</td>
                                <td>{f.total}</td>
                                <td>{f.saldo}</td>
                                <td>{f.aplica}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Método de pago */}
                <div className={styles.metodoContainer}>
                    <h2>Método De Pago</h2>
                    <button type="button" className={styles.btnTransferencia} onClick={() => openModal('transferencia')}>
                        Transferencia
                    </button>
                    <button type="button" className={styles.btnCheques} onClick={() => openModal('cheque')}>
                        Cheques
                    </button>
                </div>

                {/* Modal */}
                {showModal && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modal}>
                            <div className={styles.modalHeader}>
                                <h3>{modalType === 'transferencia' ? 'Transferencia' : 'Cheque'}</h3>
                                <button className={styles.closeBtn} onClick={closeModal}>×</button>
                            </div>
                            <div className={styles.modalContent}>
                                <div className={styles.formRow}>
                                    <label>Fecha de Emisión:</label>
                                    <input
                                        type="date"
                                        name="fechaEmision"
                                        value={modalFields.fechaEmision}
                                        onChange={handleFieldChange}
                                    />
                                </div>

                                {modalType === 'transferencia' ? (
                                    <>
                                        <div className={styles.formRow}>
                                            <label>Nro. Referencia:</label>
                                            <input
                                                name="nroReferencia"
                                                value={modalFields.nroReferencia}
                                                onChange={handleFieldChange}
                                            />
                                        </div>
                                        <div className={styles.formRow}>
                                            <label>Nro. Transferencia:</label>
                                            <input
                                                name="numeroTransferencia"
                                                value={modalFields.numeroTransferencia}
                                                onChange={handleFieldChange}
                                            />
                                            <label className={styles.checkboxGroup}>
                                                <input
                                                    type="checkbox"
                                                    name="correlativo"
                                                    checked={modalFields.correlativo}
                                                    onChange={handleFieldChange}
                                                />
                                                Número Correlativo
                                            </label>
                                        </div>
                                        <div className={styles.formRow}>
                                            <label>Monto:</label>
                                            <input name="monto" value={modalFields.monto} onChange={handleFieldChange} />
                                        </div>
                                        <div className={styles.formRow}>
                                            <label>Cuenta de Destino:</label>
                                            <input name="cuentaDestino" value={modalFields.cuentaDestino} onChange={handleFieldChange} />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className={styles.formRow}>
                                            <label>Banco Emisor:</label>
                                            <input name="banco" value={modalFields.banco} onChange={handleFieldChange} />
                                        </div>
                                        <div className={styles.formRow}>
                                            <label>Nro. Cheque:</label>
                                            <input name="numeroCheque" value={modalFields.numeroCheque} onChange={handleFieldChange} />
                                        </div>
                                        <div className={styles.formRow}>
                                            <label>Monto:</label>
                                            <input name="monto" value={modalFields.monto} onChange={handleFieldChange} />
                                        </div>
                                    </>
                                )}

                                <div className={styles.formRow}>
                                    <label>Concepto:</label>
                                    <input name="concepto" value={modalFields.concepto} onChange={handleFieldChange} />
                                </div>
                            </div>
                            <div className={styles.modalFooter}>
                                <button className={styles.btnGuardar} onClick={savePago}>Guardar</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tabla de pagos */}
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Tipo de Pago</th>
                            <th>Cuenta Bancaria</th>
                            <th>Monto</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagos.map((p, i) => (
                            <tr key={i}>
                                <td>{p.fecha}</td>
                                <td>{p.tipo}</td>
                                <td>{p.cuenta}</td>
                                <td>{formatNumber(p.monto)}</td>
                                <td>
                                    <button onClick={() => setPagos(prev => prev.filter((_, idx) => idx !== i))}>
                                        🗑️
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Acciones finales */}
                <div className={styles.actions}>
                    <button className={styles.buttonVolver} onClick={() => navigate(-1)}>Volver</button>
                    <button className={styles.buttonGenerar}>Generar Orden</button>
                </div>
            </main>
        </div>
    );
}
