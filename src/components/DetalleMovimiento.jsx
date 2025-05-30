import React, { useState, useEffect } from 'react';
import styles from './modalDetalleMovimiento.module.css';

const ChequeDetailModal = ({ isOpen, onClose, movimiento }) => {
    if (!isOpen || !movimiento) return null;
    console.log(movimiento)

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>Detalle de Movimiento</div>
                <div className={styles.form}>
                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label>Fecha de Emisión:</label>
                            <input className={styles.input} type="text" value={new Date(movimiento.fecha).toLocaleDateString('es-ES')} readOnly />
                        </div>
                        <div className={styles.field}>
                            <label>Beneficiario:</label>
                            <input
                                className={styles.input}
                                type="text"
                                value={movimiento.beneficiario === "null" ? '—' : movimiento.beneficiario}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label>Monto:</label>
                            <input className={styles.input} type="text" value={movimiento.monto.toLocaleString('es-PY')} readOnly />
                        </div>
                        <div className={styles.field}>
                            <label>Cuenta de Destino:</label>
                            <input className={styles.input} type="text" value={movimiento.ctaDestino || '—'} readOnly />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label>Concepto:</label>
                            <input className={styles.input} type="text" value={movimiento.concepto} readOnly />
                        </div>
                        <div className={styles.field}>
                            <label>Motivo:</label>
                            <input className={styles.input} type="text" value={movimiento.motivo || '—'} readOnly />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label>Estado:</label>
                            <input className={styles.input} type="text" value={movimiento.estado} readOnly />
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <button className={styles.close} onClick={onClose}>Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChequeDetailModal;