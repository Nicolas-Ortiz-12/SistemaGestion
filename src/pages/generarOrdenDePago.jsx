import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/header';
import styles from '../pages/generarOrdenDePago.module.css';

export default function GenerarOrdenDePago() {
    const location = useLocation();
    const navigate = useNavigate();
    const facturas = location.state?.facturas || [];
    const proveedorInicial = location.state?.proveedor || '';

    const [proveedor, setProveedor] = useState(proveedorInicial);
    const [nroPago, setNroPago] = useState('');
    const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
    const [importeTotal, setImporteTotal] = useState(0);

    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
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

    // Calcular importe total de facturas
    useEffect(() => {
        const total = facturas.reduce((sum, f) => sum + f.aplica, 0);
        setImporteTotal(total);
    }, [facturas]);

    // Cargar pagos ya guardados (si se edita)
    useEffect(() => {
        fetchPagos();
    }, []);

    const fetchPagos = async () => {
        try {
            const res = await fetch('https://localhost:7149/api/OrdenDePago');
            if (!res.ok) throw new Error('Error al obtener pagos');
            const data = await res.json();
            setPagos(data);
        } catch (err) {
            console.error(err);
            alert('No se pudieron cargar los pagos.');
        }
    };

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

    // Guarda pago en BD y en estado
    const savePago = async () => {
        const pagoObj = {
            fecha: modalFields.fechaEmision,
            tipo: modalType === 'transferencia' ? 'Transferencia' : 'Cheque',
            cuenta: modalType === 'transferencia' ? modalFields.cuentaDestino : modalFields.banco,
            monto: parseFloat(modalFields.monto),
            referencia: modalType === 'transferencia' ? modalFields.numeroTransferencia : modalFields.numeroCheque,
            concepto: modalFields.concepto
        };
        try {
            const res = await fetch('https://localhost:7149/api/OrdenDePago', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pagoObj)
            });
            if (!res.ok) throw new Error('Error al guardar pago');
            const newPago = await res.json();
            setPagos(prev => [...prev, newPago]);
            closeModal();
        } catch (err) {
            console.error(err);
            alert('No se pudo guardar el pago.');
        }
    };

    // Eliminar pago de BD y estado
    const deletePago = async id => {
        try {
            const res = await fetch(`/api/pagos/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Error al eliminar pago');
            setPagos(prev => prev.filter(p => p.id !== id));
        } catch (err) {
            console.error(err);
            alert('No se pudo eliminar el pago.');
        }
    };

    // Generar orden y guardar en BD
    const generarOrden = async () => {
        const ordenObj = {
            proveedor,
            nroPago,
            fecha,
            importeTotal,
            facturas,
            pagos
        };
        try {
            const res = await fetch('/api/ordenes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ordenObj)
            });
            if (!res.ok) throw new Error('Error al generar orden');
            const orden = await res.json();
            alert(`Orden ${orden.id} generada correctamente.`);
            navigate(`/ordenes/${orden.id}`);
        } catch (err) {
            console.error(err);
            alert('No se pudo generar la orden.');
        }
    };

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <Header title="Detalle Orden De Pago" />

                <form className={styles.formHeader} onSubmit={e => e.preventDefault()}>
                    <div className={styles.inputGroup}>
                        <label>Proveedor</label>
                        <input value={proveedor} readOnly />
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
                                <td>{f.fecha_exp}</td>
                                <td>{f.nro_factura}</td>
                                <td>{formatNumber(f.total)}</td>
                                <td>{formatNumber(f.saldo)}</td>
                                <td>{formatNumber(f.aplica)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

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
                                            <input name="nroReferencia" value={modalFields.nroReferencia} onChange={handleFieldChange} />
                                        </div>
                                        <div className={styles.formRow}>
                                            <label>Nro. Transferencia:</label>
                                            <input name="numeroTransferencia" value={modalFields.numeroTransferencia} onChange={handleFieldChange} />
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
                                            <label>Cuenta Destino:</label>
                                            <input name="cuentaDestino" value={modalFields.cuentaDestino} onChange={handleFieldChange} />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className={styles.formRow}>
                                            <label>Banco:</label>
                                            <input name="banco" value={modalFields.banco} onChange={handleFieldChange} />
                                        </div>
                                        <div className={styles.formRow}>
                                            <label>Nro. Cheque:</label>
                                            <input name="numeroCheque" value={modalFields.numeroCheque} onChange={handleFieldChange} />
                                        </div>
                                    </>
                                )}

                                <div className={styles.formRow}>
                                    <label>Concepto:</label>
                                    <input name="concepto" value={modalFields.concepto} onChange={handleFieldChange} />
                                </div>

                                <div className={styles.formRow}>
                                    <button className={styles.btnGuardar} onClick={savePago}>Guardar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

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
                        {pagos.map(p => (
                            <tr key={p.id}>
                                <td>{p.fecha}</td>
                                <td>{p.tipo}</td>
                                <td>{p.cuenta}</td>
                                <td>{formatNumber(p.monto)}</td>
                                <td>
                                    <button onClick={() => deletePago(p.id)}>🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Acciones finales */}
                <div className={styles.actions}>
                    <button className={styles.buttonVolver} onClick={() => navigate(-1)}>Volver</button>
                    <button className={styles.buttonGenerar} onClick={generarOrden}>Generar Orden</button>
                </div>
            </main>
        </div>
    );
}
