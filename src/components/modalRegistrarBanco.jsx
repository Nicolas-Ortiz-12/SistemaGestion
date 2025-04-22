// src/components/ModalElegirCuenta.jsx
import React from 'react';
import styles from './modalesBanco.module.css';

export default function ModalRegistrarBanco({ onClose, onContinuar }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Registrar nuevo banco</h2>
        </div>

        <label>Nombre del banco:</label>
        <select className={styles.input}>
            <option>Sudameris</option>
        </select>
        <label>Dirección del banco:</label>
        <select className={styles.input}>
            <option>Av. Caballero</option>
        </select>
            <div className={styles.buttons}>
                <button className={styles.save}>Guardar</button>
                <button className={styles.close} onClick={onClose}>Cerrar</button>
            </div>
        </div>
      </div>

  );
}

