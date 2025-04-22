// src/components/modalAgregarBanco.jsx
import React from 'react';
import styles from './modalesBanco.module.css';

export default function ModalEditarBanco({ onClose }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Editar</h2>
        </div>

        <div className={styles.form}>
          <label>País:</label>
          <select className={styles.input}>
            <option>Paraguay</option>
          </select>

          <label>Banco:</label>
          <div className={styles.inputWithIcon}>
            <select className={styles.input} style={{ flex: 1 }}>
              <option>Sudameris</option>
            </select>
            <button className={styles.addButton}>＋</button>
          </div>

          <label>Tipo de cuenta:</label>
          <select className={styles.input}>
            <option>Cuenta Corriente</option>
          </select>

          <label>Número de cuenta:</label>
          <input className={styles.input} defaultValue="512031564" />

          <div className={styles.buttons}>
            <button className={styles.save}>Guardar</button>
            <button className={styles.close} onClick={onClose}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
