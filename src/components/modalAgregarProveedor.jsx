import React, { useState } from 'react';
import styles from './modalAgregarEditarProveedor.module.css';

export default function ModalAgregarProveedor({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    nombre: '',
    ruc: '',
    actividad: '',
    direccion: '',
    telefono: '',
    correo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append('nombre', formData.nombre);
      form.append('ruc', formData.ruc);
      form.append('correo', formData.correo);
      form.append('telefono', formData.telefono);
      form.append('direccion', formData.direccion);
      form.append('actividad', formData.actividad);

      
      const response = await fetch('https://localhost:7149/api/Proveedores', {
        method: 'POST',
        body: form
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || 'Error al guardar proveedor');
      }

      onSuccess(); 
      onClose();   
    } catch (error) {
      console.error(error);
      alert('Error al agregar proveedor');
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Agregar Proveedor</h2>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Nombre/Razon social</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className={styles.input}
                placeholder="Nombre del proveedor o razón social"
                required
              />
            </div>

            <div className={styles.field}>
              <label>RUC</label>
              <input
                type="text"
                name="ruc"
                value={formData.ruc}
                onChange={handleChange}
                className={styles.input}
                placeholder="RUC"
                required
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label>Actividad Comercial</label>
              <input
                type="text"
                name="actividad"
                value={formData.actividad}
                onChange={handleChange}
                className={styles.input}
                placeholder="Actividad comercial"
              />
            </div>

            <div className={styles.field}>
              <label>Direccion</label>
              <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                className={styles.input}
                placeholder="Dirección del proveedor"
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label>Telefono</label>
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className={styles.input}
                placeholder="Teléfono"
                required
              />
            </div>

            <div className={styles.field}>
              <label>Email</label>
              <input
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                className={styles.input}
                placeholder="Correo electrónico"
                required
              />
            </div>
          </div>

          <div className={styles.buttons}>
            <button className={styles.save} type="submit">Guardar</button>
            <button className={styles.close} type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
