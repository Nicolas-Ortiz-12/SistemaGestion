import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/header';
import styles from '../pages/generarOrdenDePago.module.css';

export default function GenerarOrdenDePago() {
    const location = useLocation();
    const navigate = useNavigate();
    const facturas = location.state?.facturas || [];
    const proveedorInicial = location.state?.proveedor || '';

    const [proveedor] = useState(proveedorInicial);
    const [nroPago, setNroPago] = useState('');
    const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
    const [importeTotal, setImporteTotal] = useState(
        facturas.reduce((sum, f) => sum + parseFloat(f.total || 0), 0)
    );

    // Movimientos locales para esta orden
    const [movimientos, setMovimientos] = useState([]);

    // Modal
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(''); // 'transferencia'|'cheque'
    const [modalFields, setModalFields] = useState({
        IdMovi: null,
        Fecha: new Date().toISOString().split('T')[0],
        Monto: '',
        CtaDestino: '',
        Beneficiario: proveedorInicial,
        Concepto: '',
        Motivo: '',
        Estado: '',
        IdCuenta: '1', // Ajusta según tu cuenta origen
        IdTran: '' // 1=Transferencia,2=Cheque
    });

    // Abre modal en modo crear o editar
    const openModal = (type, mov = null) => {
        setModalType(type);
        if (mov) {
            // editar
            setModalFields({ ...mov, IdMovi: mov.idMovi });
        } else {
            // nuevo
            setModalFields({
                IdMovi: null,
                Fecha: new Date().toISOString().split('T')[0],
                Monto: '',
                CtaDestino: '',
                Beneficiario: proveedor,
                Concepto: '',
                Motivo: '',
                Estado: '',
                IdCuenta: '1',
                IdTran: type === 'transferencia' ? '1' : '2'
            });
        }
        setShowModal(true);
    };

    const closeModal = () => setShowModal(false);

    const handleFieldChange = e => {
        const { name, value } = e.target;
        setModalFields(prev => ({ ...prev, [name]: value }));
    };

    // Guarda o actualiza un movimiento solo localmente y en API
    const saveMovimiento = async () => {
        const payload = {
            fecha: modalFields.Fecha,
            monto: parseFloat(modalFields.Monto),
            ctaDestino: modalFields.CtaDestino,
            beneficiario: modalFields.Beneficiario,
            concepto: modalFields.Concepto,
            motivo: modalFields.Motivo,
            estado: modalFields.Estado,
            idCuenta: parseInt(modalFields.IdCuenta, 10),
            idTran: parseInt(modalFields.IdTran, 10)
        };

        try {
            let res, data;
            if (modalFields.IdMovi) {
                // editar
                res = await fetch(
                    `https://localhost:7149/api/Movimiento/${modalFields.IdMovi}`,
                    {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    }
                );
                if (!res.ok) throw new Error();
                data = { ...modalFields }; // mantener valores locales
                setMovimientos(movs => movs.map(m => (m.IdMovi === data.IdMovi ? data : m)));
            } else {
                // crear
                res = await fetch('https://localhost:7149/api/Movimiento', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (!res.ok) throw new Error();
                data = await res.json();
                setMovimientos(movs => [...movs, data]);
            }
            closeModal();
        } catch {
            alert('Error al guardar el movimiento.');
        }
    };

    // Elimina un movimiento localmente y API
    const deleteMovimiento = async id => {
        if (!window.confirm('¿Eliminar este movimiento?')) return;
        try {
            const res = await fetch(
                `https://localhost:7149/api/Movimiento/${id}`,
                { method: 'DELETE' }
            );
            if (!res.ok) throw new Error();
            setMovimientos(movs => movs.filter(m => m.idMovi !== id));
        } catch {
            alert('No se pudo eliminar.');
        }
    };

    // Generar la orden completa (envía facturas + movimientos locales)
    const generarOrden = async () => {
        if (movimientos.length === 0) {
            alert('Debes registrar al menos un movimiento de pago.');
            return;
        }
        const dto = {
            NroOrden: nroPago,
            MovimientoIds: movimientos.map(m => m.idMovi),
            FacturaIds: facturas.map(f => f.id_factura)
        };
        try {
            const res = await fetch('https://localhost:7149/api/OrdenDePago', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dto)
            });
            if (!res.ok) throw new Error();
            const orden = await res.json();
            alert(`Orden ${orden.idOrden} generada`);
            navigate(`/ordenes/${orden.idOrden}`);
        } catch {
            alert('No se pudo generar la orden.');
        }
    };

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <Header title="Detalle Orden De Pago" />

                {/* Cabecera */}
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
                        <input
                            type="date"
                            value={fecha}
                            onChange={e => setFecha(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Importe total</label>
                        <input readOnly value={importeTotal} />
                    </div>
                </form>

                {/* Facturas */}
                <h2 className={styles.sectionTitle}>Facturas A Pagar</h2>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>N°Factura</th>
                            <th>Total</th>
                            <th>Saldo</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {facturas.map((f, i) => (
                            <tr key={i}>
                                <td>{f.fecha_exp}</td>
                                <td>{f.nro_factura}</td>
                                <td>{f.total}</td>
                                <td>{f.saldo}</td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Métodos de pago */}
                <div className={styles.metodoContainer}>
                    <h2>Método De Pago</h2>
                    <button
                        onClick={() => openModal('transferencia')}
                        className={styles.btn}
                    >
                        Transferencia
                    </button>
                    <button onClick={() => openModal('cheque')} className={styles.btn}>
                        Cheque
                    </button>
                </div>

                {/* Modal Crear/Editar */}
                {showModal && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modal}>
                            <div className={styles.modalHeader}>
                                <h3>{modalFields.IdMovi ? 'Editar' : 'Nuevo'} {modalType}</h3>
                                <button onClick={closeModal}>×</button>
                            </div>
                            <div className={styles.modalContent}>
                                {['Fecha', 'Monto', 'CtaDestino', 'Beneficiario', 'Concepto', 'Motivo', 'Estado'].map(name => (
                                    <div key={name} className={styles.formRow}>
                                        <label>{name}:</label>
                                        <input
                                            type={name === 'Fecha' ? 'date' : 'text'}
                                            name={name}
                                            value={modalFields[name]}
                                            onChange={handleFieldChange}
                                        />
                                    </div>
                                ))}
                                <div className={styles.formRow}>
                                    <button onClick={saveMovimiento}>Guardar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Listado de pagos (solo los movimientos cargados) */}
                <h2 className={styles.sectionTitle}>Pagos Registrados</h2>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Monto</th>
                            <th>Cuenta</th>
                            <th>Concepto</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movimientos.map(m => (
                            <tr key={m.idMovi}>
                                <td>{m.fecha}</td>
                                <td>{m.monto}</td>
                                <td>{m.ctaDestino || m.nroCuenta}</td>
                                <td>{m.concepto}</td>
                                <td>
                                    <button onClick={() => openModal(m.idTran === 1 ? 'transferencia' : 'cheque', m)}>
                                        ✏️
                                    </button>
                                    <button onClick={() => deleteMovimiento(m.idMovi)}>🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Generar orden */}
                <div className={styles.actions}>
                    <button onClick={() => navigate(-1)}>Volver</button>
                    <button onClick={generarOrden}>Generar Orden</button>
                </div>
            </main>
        </div>
    );
}
