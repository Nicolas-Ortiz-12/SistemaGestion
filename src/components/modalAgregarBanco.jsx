import React, { useState, useEffect } from 'react';
import styles from './modalesBanco.module.css';

export default function ModalAgregarBanco({ onClose, onAgregarBanco }) {
  const [pais, setPais] = useState('');
  const [propietario, setPropietario] = useState('');
  const [tipoCuenta, setTipoCuenta] = useState('');
  const [numeroCuenta, setNumeroCuenta] = useState('');
  const [bancoId, setBancoId] = useState('');

  const [bancos, setBancos] = useState([]);
  const [bancosFiltrados, setBancosFiltrados] = useState([]);
  const [paises, setPaises] = useState([]);

  useEffect(() => {
    const fetchPaises = async () => {
      try {
        const response = await fetch('https://localhost:7149/api/Pais');
        const data = await response.json();
        setPaises(data);
      } catch (error) {
        console.error('Error al cargar países:', error);
      }
    };

    const fetchBancos = async () => {
      try {
        const response = await fetch('https://localhost:7149/api/Banco');
        const data = await response.json();
        setBancos(data);
      } catch (error) {
        console.error('Error al cargar bancos:', error);
      }
    };

    fetchPaises();
    fetchBancos();
  }, []);

  useEffect(() => {
    if (pais) {
      const bancosDelPais = bancos.filter(b => b.idPais === parseInt(pais));
      setBancosFiltrados(bancosDelPais);
    } else {
      setBancosFiltrados([]);
    }
    setBancoId('');
  }, [pais, bancos]);

  const handleBancoChange = (e) => {
    const value = e.target.value;
    if (value === 'agregar') {
      onAgregarBanco();
    } else {
      setBancoId(value);
    }
  };

  const handleGuardar = async () => {
    if (!pais || !bancoId || !propietario || !tipoCuenta || !numeroCuenta) {
      alert('Por favor complete todos los campos');
      return;
    }

    // Obtener el objeto banco completo usando el idBancos
    const bancoSeleccionado = bancos.find(b => b.idBancos === parseInt(bancoId));
    if (!bancoSeleccionado) {
      alert('Banco no encontrado');
      return;
    }

    // Preparar los datos a enviar
    const cuentaData = {
      nroCuenta: parseInt(numeroCuenta),
      saldo: 0,
      nombre: propietario,
      tCuenta: tipoCuenta,
      idBancos: bancoSeleccionado.idBancos, // ID del banco
       // Objeto Banco completo
    };

    console.log("Datos a enviar:", cuentaData);

    try {
      const response = await fetch('https://localhost:7149/api/Cuenta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cuentaData)
      });

      const responseData = await response.json();

      if (response.ok) {
        alert('Cuenta creada exitosamente');
        onClose();
      } else {
        throw new Error(responseData.message || 'Error al crear la cuenta');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error.message || 'Error de conexión con el servidor');
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Agregar Banco</h2>
        </div>

        <div className={styles.form}>
          <label>País:</label>
          <select className={styles.input} value={pais} onChange={(e) => setPais(e.target.value)}>
            <option value="">Seleccione un país</option>
            {paises.map((p) => (
              <option key={p.idPais} value={p.idPais}>{p.nombre}</option>
            ))}
          </select>

          <label>Banco:</label>
          <select className={styles.input} value={bancoId} onChange={handleBancoChange}>
            <option value="">Seleccione un banco</option>
            {bancosFiltrados.map(b => (
              <option key={b.idBancos} value={b.idBancos}>{b.nombre}</option>
            ))}
            <option value="agregar">＋ Agregar banco</option>
          </select>

          <label>Tipo de cuenta:</label>
          <select className={styles.input} value={tipoCuenta} onChange={(e) => setTipoCuenta(e.target.value)}>
            <option value="">Seleccione tipo de cuenta</option>
            <option value="Cuenta Corriente">Cuenta Corriente</option>
            <option value="Caja de Ahorro">Caja de Ahorro</option>
          </select>

          <label>Nombre del titular:</label>
          <input
            className={styles.select}
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
            required
          />

          <label>Número de cuenta:</label>
          <input
            type="number"
            className={styles.select}
            value={numeroCuenta}
            onChange={(e) => setNumeroCuenta(e.target.value)}
            required
          />

          <div className={styles.buttons}>
            <button className={styles.save} onClick={handleGuardar}>Guardar</button>
            <button className={styles.close} onClick={onClose}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
