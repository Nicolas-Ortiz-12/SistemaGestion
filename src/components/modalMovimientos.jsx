import React, { useEffect, useState } from 'react';
import styles from '../components/modalMovimientos.module.css';
import AgregarTipoTransaccion from '../components/AgregarTipoTransaccion';

export default function AgregarTransaccion({ isOpen, onClose, accountId, onSave }) {
    const [tipoTransaccion, setTipoTransaccion] = useState('');
    const [tiposTransaccion, setTiposTransaccion] = useState([]);
    const [fecha, setFecha] = useState(new Date().toISOString().slice(0, 10));
    const [monto, setMonto] = useState('');
    const [cuentaDestino, setCuentaDestino] = useState('');
    const [beneficiario, setBeneficiario] = useState('');
    const [concepto, setConcepto] = useState('');
    const [motivo, setMotivo] = useState('');
    const [showAgregarTipo, setShowAgregarTipo] = useState(false);
    const [bancos, setBancos] = useState([]);
    const [bancoEmisor, setBancoEmisor] = useState('');

    const resetForm = () => {
        setTipoTransaccion('');
        setFecha(new Date().toISOString().slice(0, 10));
        setMonto('');
        setCuentaDestino('');
        setBeneficiario('');
        setConcepto('');
        setMotivo('');
        setBancoEmisor('');
        setShowAgregarTipo(false);
    };

    useEffect(() => {
        if (isOpen) resetForm();
    }, [isOpen]);

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

    useEffect(() => {
        async function fetchBancos() {
            try {
                const resp = await fetch('https://localhost:7149/api/Banco');
                if (!resp.ok) throw new Error('Error al obtener bancos');
                const data = await resp.json();
                setBancos(data);
            } catch (err) {
                console.error('Error al cargar bancos:', err);
            }
        }
        fetchBancos();
    }, []);

    const formatearMonto = (valor) => {
        const soloNumeros = valor.replace(/\D/g, '');
        return soloNumeros.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    const handleMontoChange = (e) => {
        const valor = e.target.value;
        const formateado = formatearMonto(valor);
        setMonto(formateado);
    };


    const handleSave = async () => {
        const seleccion = tiposTransaccion.find(t => String(t.idTran) === tipoTransaccion);
        const nombreTipo = seleccion?.nombre;
        const tipoMov = seleccion?.tipoMov; // Asegúrate de que 'tipoMov' esté disponible en el objeto
        let estado = nombreTipo === 'Cheque' ? 'Emitido' : 'Activo';

        if (nombreTipo === 'Cheque Deposito') {
            try {
                const cuentaOrigenResp = await fetch(`https://localhost:7149/api/Cuenta/${accountId}`);
                if (!cuentaOrigenResp.ok) throw new Error('Error al obtener cuenta');
                const cuentaOrigen = await cuentaOrigenResp.json();

                const mismoBanco = cuentaOrigen.banco.nombre === bancoEmisor;
                estado = mismoBanco ? 'Activo' : 'Emitido';
            } catch (err) {
                console.error('Error al validar banco:', err);
                estado = 'Emitido';
            }
        }

        const montoNumerico = parseFloat(monto.replace(/\./g, ''));

        // 🛑 VALIDACIÓN DE SALDO INSUFICIENTE
        if (tipoMov === 'D') {
            try {
                const cuentaResp = await fetch(`https://localhost:7149/api/Cuenta/${accountId}`);
                if (!cuentaResp.ok) throw new Error('Error al obtener cuenta');
                const cuenta = await cuentaResp.json();

                if (montoNumerico > cuenta.saldo) {
                    alert('Saldo insuficiente para realizar esta operación.');
                    return;
                }
            } catch (err) {
                console.error('Error al verificar saldo:', err);
                alert('No se pudo verificar el saldo. Intente nuevamente.');
                return;
            }
        }

        const formData = new FormData();
        formData.append('Monto', montoNumerico);
        formData.append('CtaDestino', cuentaDestino || 0);
        formData.append('Beneficiario', beneficiario || null);
        formData.append('Concepto', concepto);
        formData.append('Motivo', motivo);
        formData.append('Estado', estado);
        formData.append('IdCuenta', accountId);
        formData.append('IdTran', tipoTransaccion);
        formData.append('Fecha', fecha);

        try {
            const resp = await fetch('https://localhost:7149/api/Movimiento', {
                method: 'POST',
                body: formData
            });
            if (!resp.ok) throw new Error(`Error ${resp.status}: No se guardó el movimiento`);
            const savedMov = await resp.json();
            onSave(savedMov);
            onClose();
        } catch (error) {
            console.error('Error al guardar Movimiento:', error);
        }
    };


    if (!isOpen) return null;

    const seleccion = tiposTransaccion.find(t => String(t.idTran) === tipoTransaccion);
    const nombreTipo = seleccion?.nombre;
    const showCuentaDestino = nombreTipo === 'Transferencia';
    const showBeneficiario = ['Transferencia', 'Cheque', 'Nota de Credito'].includes(nombreTipo);

    return (
        <>
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
                                    onChange={e => {
                                        if (e.target.value === 'agregarT') {
                                            setShowAgregarTipo(true);
                                        } else {
                                            setTipoTransaccion(e.target.value);
                                        }
                                    }}
                                    className={styles.select}
                                >
                                    <option value="">Seleccione tipo de transacción</option>
                                    <option value="agregarT">Agregar transacción...</option>
                                    {tiposTransaccion.map(t => (
                                        <option key={t.idTran} value={String(t.idTran)}>
                                            {t.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Fecha y Monto */}
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
                                    type="text"
                                    placeholder="Ingrese el monto"
                                    className={styles.input}
                                    value={monto}
                                    onChange={handleMontoChange}
                                />
                            </div>
                        </div>

                        {/* Cuenta destino si aplica */}
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

                        {/* Banco Emisor para Cheque Depósito */}
                        {nombreTipo === 'Cheque Deposito' && (
                            <div className={styles.row}>
                                <div className={styles.field}>
                                    <label>Banco emisor del cheque</label>
                                    <select
                                        className={styles.select}
                                        value={bancoEmisor}
                                        onChange={e => setBancoEmisor(e.target.value)}
                                    >
                                        <option value="">Seleccione un banco</option>
                                        {bancos.map(b => (
                                            <option key={b.id} value={b.nombre}>{b.nombre}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}

                        {/* Beneficiario si aplica */}
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

                        {/* Botones */}
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

            {/* Modal para agregar tipo de transacción */}
            <AgregarTipoTransaccion
                isOpen={showAgregarTipo}
                onClose={() => setShowAgregarTipo(false)}
                onTipoAgregado={nuevoTipo => {
                    setTiposTransaccion(prev => [...prev, nuevoTipo]);
                    setTipoTransaccion(String(nuevoTipo.idTran));
                    setShowAgregarTipo(false);
                }}
            />
        </>
    );
}
