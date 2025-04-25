import React, { useState } from 'react';
import styles from './modalAgregarEditarProveedor.module.css';

export default function ModalEditarProveedor({ proveedor, onClose, onEditSuccess }) {
  const [formData, setFormData] = useState({
    nombre: proveedor.nombre,
    ruc: proveedor.ruc,
    correo: proveedor.correo,
    telefono: proveedor.telefono,
    direccion: proveedor.direccion,
    actividad: proveedor.actividad

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
        form.append('direccion',formData.direccion);
        form.append('actividad',formData.actividad);



        
    
      const response = await fetch(`https://localhost:7149/api/Proveedores/${proveedor.id_prov}`, {
        method: "PUT",
        body: form
      });

      if (!response.ok) throw new Error("Error al actualizar el proveedor");

      onEditSuccess(); // Refresca la lista
      onClose();       // Cierra el modal
    } catch (error) {
      console.error("Error al editar proveedor:", error);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Editar Proveedor</h2>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Nombre/Razón social</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className={styles.input}
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
              />
            </div>

            <div className={styles.field}>
              <label>Dirección</label>
              <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label>Teléfono</label>
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className={styles.input}
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
