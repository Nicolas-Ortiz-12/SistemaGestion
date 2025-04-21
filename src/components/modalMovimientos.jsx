import React, { useState } from 'react';
import styles from "../components/modalMovimientos.module.css";

export default function ModalDynamicFields({ isOpen, onClose }) {
    const [selected, setSelected] = useState('');

    const handleSelectChange = (e) => {
        setSelected(e.target.value);
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button className={styles.closeBtn} onClick={onClose}>&times;</button>
                <h2>Selecciona una opción</h2>
                <select value={selected} onChange={handleSelectChange} className={styles.select}>
                    <option value="">-- Elige una opción --</option>
                    <option value="opcion1">Opción 1</option>
                    <option value="opcion2">Opción 2</option>
                    <option value="opcion3">Opción 3</option>
                </select>

                {/* Campos dinámicos según la opción */}
                {selected === 'opcion1' && (
                    <div className={styles.fields}>
                        <label>
                            Campo A
                            <input type="text" />
                        </label>
                        <label>
                            Campo B
                            <input type="text" />
                        </label>
                    </div>
                )}

                {selected === 'opcion2' && (
                    <div className={styles.fields}>
                        <label>
                            Campo C
                            <input type="text" />
                        </label>
                    </div>
                )}

                {selected === 'opcion3' && (
                    <div className={styles.fields}>
                        <label>
                            Campo D
                            <input type="text" />
                        </label>
                        <label>
                            Campo E
                            <input type="text" />
                        </label>
                    </div>
                )}
            </div>
        </div>
    );
}