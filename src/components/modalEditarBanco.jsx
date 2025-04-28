import React, { useState, useEffect } from 'react';
import styles from './modalesBanco.module.css';

export default function ModalEditarBanco({ cuenta, onClose, onCuentaActualizada }) {
  const [formData, setFormData] = useState({
    nroCuenta: '',
    saldo: '',
    nombre: '',
    tipoCuenta: '',
    bancoId: ''
  });
  const [bancos, setBancos] = useState([]);

  // Carga la lista de bancos para el select
  useEffect(() => {
    fetch('https://localhost:7149/api/Banco')
      .then(res => {
        if (!res.ok) throw new Error('Error al obtener bancos');
        return res.json();
      })
      .then(data => setBancos(data))
      .catch(err => console.error('Fetch bancos error:', err));
  }, []);
  

  // Inicializa formData cuando cambia la cuenta seleccionada
  useEffect(() => {
    if (cuenta) {
      setFormData({
        nroCuenta: cuenta.nroCuenta?.toString() || '',
        saldo: cuenta.saldo?.toString() || '',
        nombre: cuenta.nombre || '',
        tipoCuenta: cuenta.tCuenta || '',
        bancoId: cuenta.banco?.idBanco?.toString() || ''
      });
    }
  }, [cuenta]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGuardar = async () => {
    // Validaciones mínimas para evitar 400
    if (!formData.nroCuenta || !formData.saldo || !formData.nombre || !formData.tipoCuenta || !formData.bancoId) {
      alert('Por favor complete todos los campos antes de guardar.');
      return;
    }

    try {
      const payload = new FormData();
      payload.append('numero', formData.nroCuenta);
      payload.append('saldo', formData.saldo);
      payload.append('nombre', formData.nombre);
      payload.append('tCuenta', formData.tipoCuenta);
      payload.append('bancoId', formData.bancoId);


      const res = await fetch(
        `https://localhost:7149/api/Cuenta/${cuenta.idCuenta}`,
        { method: 'PUT', body: payload }
      );
      if (!res.ok) throw new Error(`Error al actualizar: ${res.status}`);

      if (onCuentaActualizada) onCuentaActualizada();
      onClose();
    } catch (err) {
      console.error('Guardar error:', err);
      alert('No se pudo guardar los cambios. Verifique la consola para más detalles.');
    }
  };

  if (!cuenta) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Editar Cuenta</h2>
        </div>
        <div className={styles.form}>

          <label htmlFor="nroCuenta">Número de cuenta:</label>
          <input
            id="nroCuenta"
            name="nroCuenta"
            className={styles.input}
            value={formData.nroCuenta}
            onChange={handleChange}
          />

          <label htmlFor="saldo">Saldo (solo lectura):</label>
          <input
            id="saldo"
            className={styles.input}
            value={formData.saldo}
            readOnly
          />

          <label htmlFor="nombre">Nombre:</label>
          <input
            id="nombre"
            name="nombre"
            className={styles.input}
            value={formData.nombre}
            onChange={handleChange}
          />

          <label htmlFor="tipoCuenta">Tipo de cuenta:</label>
          <select
            id="tipoCuenta"
            name="tipoCuenta"
            className={styles.input}
            value={formData.tipoCuenta}
            onChange={handleChange}
          >
            <option key="" value="">Seleccione tipo...</option>
            <option key="Cuenta Corriente" value="Cuenta Corriente">Cuenta Corriente</option>
            <option key="Caja de Ahorro" value="Caja de Ahorro">Caja de Ahorro</option>
          </select>

          <label htmlFor="bancoId">Banco:</label>
          <select
            id="bancoId"
            name="bancoId"
            className={styles.input}
            value={formData.bancoId}
            onChange={handleChange}
          >
            <option key="default-banco" value="">
              Seleccione banco…
            </option>
            {bancos.map(b => (
              <option key={b.idBancos} value={b.idBancos}>
                {b.nombre}
              </option>
            ))}
          </select>

          <div className={styles.buttons}>
            <button className={styles.save} onClick={handleGuardar}>
              Guardar
            </button>
            <button className={styles.close} onClick={onClose}>
              Cerrar
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
