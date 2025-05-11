import React, { useEffect, useState } from 'react';
import styles from '../components/modalMovimientos.module.css';



export default function AgregarTransaccion({ isOpen, onClose, accountId }) {
    const [tipoTransaccion, setTipoTransaccion] = useState('');
    const [tiposTransaccion, setTiposTransaccion] = useState([]);
    const [fecha, setFecha] = useState(new Date().toISOString().slice(0, 10));
    const [monto, setMonto] = useState('');
    const [cuentaDestino, setCuentaDestino] = useState('');
    const [beneficiario, setBeneficiario] = useState('');
    const [concepto, setConcepto] = useState('');
    const [motivo, setMotivo] = useState('');

    useEffect(() => {
        async function fetchTipos() {
            try {
                const resp = await fetch('https://localhost:7149/api/Transaccion');
                if (!resp.ok) throw new Error('Error al cargar tipos');
                const data = await resp.json();
                setTiposTransaccion(data);
            } catch (err) {
                console.error('Fetch tiposTransaccion:', err);
            }
        }
        fetchTipos();
    }, []);

    const handleSave = async () => {
        // Construir FormData para [FromForm]
        const formData = new FormData();
        formData.append('Monto', monto);
        formData.append('CtaDestino', cuentaDestino || 0);
        formData.append('Beneficiario', beneficiario || null);
        formData.append('Concepto', concepto);
        formData.append('Motivo', motivo);
        formData.append('Estado', 'Activo');
        formData.append('IdCuenta', accountId);
        formData.append('IdTran', tipoTransaccion);

        

        try {
            const resp = await fetch('https://localhost:7149/api/Movimiento', {
                method: 'POST',
                body: formData  // browser auto-sets multipart/form-data
            });
            if (!resp.ok) throw new Error(`Error ${resp.status}: No se guardó el movimiento`);
            console.log('Movimiento guardado correctamente');
            onClose();
        } catch (error) {
            console.error('Error al guardar Movimiento:', error);
        }
    };
    
    if (!isOpen) return null;

    const seleccion = tiposTransaccion.find(t => String(t.idTran) === tipoTransaccion);
    const nombreTipo = seleccion?.nombre;
    const showCuentaDestino = nombreTipo === 'Transferencia';
    const showBeneficiario = ['Transferencia', 'Emisión de cheque', 'Nota de crédito'].includes(nombreTipo);

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h2>Agregar Movimiento</h2>
                    
                </div>
                <div className={styles.form}>
                    {/* Tipo de transacción */}
                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label>Tipo de transacción</label>
                            <select
                                value={tipoTransaccion}
                                onChange={e => setTipoTransaccion(e.target.value)}
                                className={styles.select}
                            >
                                <option value="">Seleccione tipo de transacción</option>
                                {tiposTransaccion.map(t => (
                                    <option key={t.idTran} value={String(t.idTran)}>
                                        {t.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Fecha y monto */}
                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label>Fecha</label>
                            <input
                                type="date"
                                className={styles.input}
                                value={fecha}
                                onChange={e => setFecha(e.target.value)}
                            />
                        </div>
                        <div className={styles.field}>
                            <label>Monto</label>
                            <input
                                type="number"
                                placeholder="Ingrese el monto"
                                className={styles.input}
                                value={monto}
                                onChange={e => setMonto(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Cuenta de destino */}
                    {showCuentaDestino && (
                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label>Cuenta de destino</label>
                                <input
                                    type="text"
                                    placeholder="Número de cuenta destino"
                                    className={styles.input}
                                    value={cuentaDestino}
                                    onChange={e => setCuentaDestino(e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    {/* Beneficiario */}    
                    {showBeneficiario && (
                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label>Beneficiario</label>
                                <input
                                    type="text"
                                    placeholder="Nombre del beneficiario"
                                    className={styles.input}
                                    value={beneficiario}
                                    onChange={e => setBeneficiario(e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    {/* Concepto */}
                    <div className={styles.row}>
                        <div className={styles.field} style={{ width: '100%' }}>
                            <label>Concepto</label>
                            <input
                                type="text"
                                placeholder="Ej. Pago de servicios"
                                className={styles.input}
                                value={concepto}
                                onChange={e => setConcepto(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Motivo */}
                    <div className={styles.row}>
                        <div className={styles.field} style={{ width: '100%' }}>
                            <label>Motivo</label>
                            <input
                                type="text"
                                placeholder="Motivo de la transacción"
                                className={styles.input}
                                value={motivo}
                                onChange={e => setMotivo(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.buttons}>
                        <button className={styles.save} onClick={handleSave}>
                            Guardar
                        </button>
                        <button className={styles.close} onClick={onClose}>
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
