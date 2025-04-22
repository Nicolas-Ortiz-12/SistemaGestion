import React from 'react';
import styles from './modalesBanco.module.css';

export default function ModalAgregarBanco({ onClose, onAgregarBanco }) {
  const handleBancoChange = (e) => {
    if (e.target.value === 'agregar') {
      onAgregarBanco(); 
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Agregar Cuenta Bancaria</h2>
        </div>

        <div className={styles.form}>
          <label>País:</label>
          <select className={styles.input}>
            <option>Paraguay</option>
            <option>Argentina</option>
            <option>Brasil</option>
          </select>

          <label>Banco:</label>
          <select className={styles.input} onChange={handleBancoChange}>
            <option>Sudameris</option>
            <option value="agregar">＋ Agregar banco</option>
          </select>

          <label>Tipo de cuenta:</label>
          <select className={styles.input}>
            <option>Cuenta Corriente</option>
            <option>Caja de Ahorro</option>
          </select>

          <label>Nombre del titular:</label>
          <input className={styles.select}/>

          <label>Número de cuenta:</label>
          <input className={styles.select}/>

          <div className={styles.buttons}>
            <button className={styles.save}>Guardar</button>
            <button className={styles.close} onClick={onClose}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
