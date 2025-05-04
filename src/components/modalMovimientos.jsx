import React, { useState } from 'react';
import styles from '../components/modalMovimientos.module.css';

export default function AgregarTransaccion({ isOpen, onClose }) {
    const [tipoTransaccion, setTipoTransaccion] = useState('');

    const handleTipoChange = (e) => {
        setTipoTransaccion(e.target.value);
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h2>Agregar Transacción</h2>
                </div>
                <div className={styles.form}>
                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label>Tipo de transacción</label>
                            <select
                                value={tipoTransaccion}
                                onChange={handleTipoChange}
                                className={styles.select}
                            >
                                <option value="">Seleccione tipo de transacción</option>
                                <option value="agregar">+ Agregar Transaccion</option>
                            </select>
                        </div>
                        <div className={styles.field}>
                            <label>Fecha</label>
                            <input type="date" className={styles.input} />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label>Monto</label>
                            <input type="number" placeholder="Ingrese el monto" className={styles.input} />
                        </div>
                        <div className={styles.field}>
                            <label>Cuenta de destino</label>
                            <input type="text" placeholder="Número de cuenta" className={styles.input} />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label>Beneficiario</label>
                            <input type="text" placeholder="Nombre del beneficiario" className={styles.input} />
                        </div>
                        <div className={styles.field}>
                            <label>Concepto</label>
                            <input type="text" placeholder="Ej. Pago de servicios" className={styles.input} />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.field} style={{ width: "100%" }}>
                            <label>Motivo</label>
                            <input type="text" placeholder="Motivo de la transacción" className={styles.input} />
                        </div>
                    </div>

                    <div className={styles.buttons}>
                        <button className={styles.save}>Guardar</button>
                        <button className={styles.close} onClick={onClose}>Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}