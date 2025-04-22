// src/components/ModalElegirCuenta.jsx
import React from 'react';
import styles from './modalesBanco.module.css';

export default function ModalElegirCuenta({ onClose, onContinuar }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Seleccione la cuenta a editar</h2>
        </div>

        <div className={styles.form}>
          <label>Cuenta</label>
          <div className={styles.inputWithIcon}>
            <select className={styles.input} style={{ flex: 1 }}>
              <option>UENO BANK - 4565120356</option>
            </select>
            
          </div>

          <div className={styles.buttons}>
            <button className={styles.save} onClick={onContinuar}>Continuar</button>
            <button className={styles.close} onClick={onClose}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

