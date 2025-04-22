import React from 'react';
import styles from './modalAgregarEditarProveedor.module.css';

export default function ModalEditarProveedor({ onClose }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Editar Proveedor</h2>
        </div>

        <div className={styles.form}>
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Nombre/Razón social</label>
              <input type="text" className={styles.input} placeholder="Nombre del proveedor o razón social" />
            </div>

            <div className={styles.field}>
              <label>RUC</label>
              <input type="text" className={styles.input} placeholder="RUC" />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label>Actividad Comercial</label>
              <input type="text" className={styles.input} placeholder="Actividad comercial" />
            </div>

            <div className={styles.field}>
              <label>Dirección</label>
              <input type="text" className={styles.input} placeholder="Dirección del proveedor" />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label>Teléfono</label>
              <input type="text" className={styles.input} placeholder="Teléfono" />
            </div>

            <div className={styles.field}>
              <label>Email</label>
              <input type="email" className={styles.input} placeholder="Correo electrónico" />
            </div>
          </div>

          <div className={styles.buttons}>
            <button className={styles.save} type="submit">Guardar</button>
            <button className={styles.close} type="button" onClick={onClose}>Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
