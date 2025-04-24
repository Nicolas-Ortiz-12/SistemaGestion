import React from 'react';
import { useState } from "react";
import Header from '../components/header';
import Pagination from "../components/pagination";
import agregarProveedorImg from "../img/icono2.png";
import editarImg from "../img/icono3.png";
import styles from "./proveedores.module.css";
import ModalAgregarProveedor from '../components/modalAgregarProveedor';
import ModalEditarProveedor from '../components/modalEditarProveedor';



export default function Proveedores() {
    const [currentPage, setCurrentPage] = useState(1);
    const [tipoModal, setTipoModal] = useState(null);
    const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null);
    const [proveedores, setProveedores] = useState([]);

    const itemsPerPage = 12;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProveedores = proveedores.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(proveedores.length / itemsPerPage);

    /*useEffect(() => {
        fetch('https://localhost:7149/api/Proveedores')
            .then(res => {
                if (!res.ok) throw new Error("Error al obtener proveedores");
                return res.json();
            })
            .then(data => setProveedores(data))
            .catch(error => console.error("Error:", error));
    }, []);*/

    const abrirModalEditar = (proveedor) => {
        setProveedorSeleccionado(proveedor);
        setTipoModal("editar");
    };

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <Header title="Proveedores">
                    <button onClick={() => setTipoModal("agregar")}>
                        <img src={agregarProveedorImg} width={60} />
                    </button>
                </Header>

                <div className={styles.buscador}>
                    <label>Buscar proveedor:</label>
                    <input className={styles.input} placeholder="Buscar (RUC | Nombre | Correo)" />
                    <button className={styles.boton}>Buscar</button>
                </div>

                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>RUC</th>
                            <th>Actividad Comercial</th>
                            <th>Teléfono</th>
                            <th>Email</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proveedores.map((prov, i) => (
                            <tr key={i}>
                                <td>{prov.nombre}</td>
                                <td>{prov.ruc}</td>
                                <td>{prov.actividad}</td>
                                <td>{prov.telefono}</td>
                                <td>{prov.email}</td>
                                <td>
                                    <button
                                        className={styles.actionBtn}
                                        onClick={() => abrirModalEditar(prov)}
                                    >
                                        <img src={editarImg} width={24} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />

                {/* Modales */}
                {tipoModal === "agregar" && (
                    <ModalAgregarProveedor onClose={() => setTipoModal(null)} />
                )}

                {tipoModal === "editar" && proveedorSeleccionado && (
                    <ModalEditarProveedor
                        proveedor={proveedorSeleccionado}
                        onClose={() => {
                            setTipoModal(null);
                            setProveedorSeleccionado(null);
                        }}
                    />
                )}
            </main>
        </div>
    );
}