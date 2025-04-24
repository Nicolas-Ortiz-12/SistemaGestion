import React, { useState, useEffect } from 'react';
import styles from './modalesBanco.module.css';

export default function ModalRegistrarBanco({ onClose, onAgregarBanco }) {
    const [nombre, setNombre] = useState('');
    const [pais, setPais] = useState('');
    const [direccion, setDireccion] = useState('');
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
        fetchPaises();
    }, []);

    const handleGuardar = async () => {
        if (!pais || !direccion || !nombre) {
            alert('Por favor complete todos los campos');
            return;
        }

        const form = new FormData();
        form.append('nombre', nombre);
        form.append('direccion', direccion);
        form.append('paisId', pais);
        
        console.log(nombre,pais,direccion);

        try {
            const response = await fetch('https://localhost:7149/api/Banco', {
                method: 'POST',
                body: form
            });

            const responseData = await response.json();

            if (response.ok) {
                if (onAgregarBanco) onAgregarBanco();
                onClose();
            } else {
                throw new Error(responseData.message || 'Error al registrar el banco');
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
                    <h2>Registrar Banco</h2>
                </div>

                <div className={styles.form}>
                    <label>Nombre del banco:</label>
                    <input
                        className={styles.select}
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />

                    <label>Dirección:</label>
                    <input
                        className={styles.select}
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                        required
                    />

                    <label>País:</label>
                    <select
                        className={styles.input}
                        value={pais}
                        onChange={(e) => setPais(e.target.value)}
                        required
                    >
                        <option value="">Seleccione un país</option>
                        {paises.map((p) => (
                            <option key={p.idPais} value={p.idPais}>{p.nombre}</option>
                        ))}
                    </select>

                    <div className={styles.buttons}>
                        <button className={styles.save} onClick={handleGuardar}>Guardar</button>
                        <button className={styles.close} onClick={onClose}>Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
