import React, { useState } from 'react';
import styles from './modalAgregarTipoTransaccion.module.css';

export default function AgregarTipoTransaccion({ isOpen, onClose, onTipoAgregado }) {
    const [nombre, setNombre] = useState('');
    const [tipoMov, setTipoMov] = useState('C');

    const handleSubmit = async () => {
        if (!nombre || !['C', 'D'].includes(tipoMov)) {
            alert('Todos los campos son obligatorios');
            return;
        }

        const formData = new FormData();
        formData.append('Nombre', nombre);
        formData.append('TipoMov', tipoMov);

        try {
            const response = await fetch('https://localhost:7149/api/Transaccion', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error al agregar tipo de transacción: ${errorText}`);
            }

            const nuevoTipo = await response.json();
            onTipoAgregado(nuevoTipo);
            onClose();
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al guardar. Revisa la consola para más detalles.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2>Agregar Tipo de Transacción</h2>
                <div className={styles.form}>
                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label>Nombre</label>
                            <input
                                type="text"
                                className={styles.input}
                                value={nombre}
                                onChange={e => setNombre(e.target.value)}
                                placeholder="Ej: Depósito"
                            />
                        </div>
                        <div className={styles.field}>
                            <label>Tipo de Movimiento</label>
                            <select
                                className={styles.select}
                                value={tipoMov}
                                onChange={e => setTipoMov(e.target.value)}
                            >
                                <option value="C">Crédito (C)</option>
                                <option value="D">Débito (D)</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <button className={styles.save} onClick={handleSubmit}>
                            Guardar
                        </button>
                        <button className={styles.close} onClick={onClose}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
