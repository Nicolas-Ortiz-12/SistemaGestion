// src/components/ModalElegirCuenta.jsx
import React, { useEffect, useState } from 'react';
import styles from './modalesBanco.module.css';

export default function ModalElegirCuenta({ onClose, onContinuar }) {
  const [cuentas, setCuentas] = useState([]);
  const [cuentaSeleccionada, setCuentaSeleccionada] = useState(null);

  useEffect(() => {
    fetch('https://localhost:7149/api/Cuenta')
      .then(res => {
        if (!res.ok) throw new Error('Error al obtener cuentas');
        return res.json();
      })
      .then(data => setCuentas(data))
      .catch(err => console.error('Error:', err));
  }, []);

  const handleContinuar = () => {
    if (!cuentaSeleccionada) {
      alert('Seleccione una cuenta primero');
      return;
    }
    const cuenta = cuentas.find(c => c.idCuenta === parseInt(cuentaSeleccionada));
    if (!cuenta) {
      alert('Cuenta no encontrada');
      return;
    }
    onContinuar(cuenta);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Seleccione la cuenta a editar</h2>
        </div>

        <div className={styles.form}>
          <label>Cuenta</label>
          <div className={styles.inputWithIcon}>
            <select
              className={styles.input}
              value={cuentaSeleccionada || ''}
              onChange={e => setCuentaSeleccionada(e.target.value)}
            >
              <option value="">Seleccione una cuenta</option>
              {cuentas.map(c => (
                <option key={c.idCuenta} value={c.idCuenta}>
                  {c.nombre} - {c.nroCuenta}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.buttons}>
            <button className={styles.save} onClick={handleContinuar}>Continuar</button>
            <button className={styles.close} onClick={onClose}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
}