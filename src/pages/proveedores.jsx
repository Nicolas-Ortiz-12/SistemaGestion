import React, { useEffect, useState } from 'react';
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
    const [busqueda, setBusqueda] = useState("");

    const itemsPerPage = 5;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProveedores = proveedores.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(proveedores.length / itemsPerPage);

    useEffect(() => {
        fetchProveedores();
    }, []);

    const fetchProveedores = () => {
        fetch('https://localhost:7149/api/Proveedores')
            .then(res => {
                if (!res.ok) throw new Error("Error al obtener proveedores");
                return res.json();
            })
            .then(data => {
                setCurrentPage(1);
                setProveedores(data);
            })
            .catch(error => console.error("Error:", error));
    };

    const manejarBusqueda = () => {
        if (!busqueda.trim()) {
            fetchProveedores();
            return;
        }

        fetch(`https://localhost:7149/api/Proveedores/buscar?filtro=${encodeURIComponent(busqueda)}`)
            .then(res => {
                if (!res.ok) throw new Error("Error al buscar proveedores");
                return res.json();
            })
            .then(data => {
                setCurrentPage(1);
                setProveedores(data);
            })
            .catch(error => console.error("Error:", error));
    };

    const abrirModalEditar = (proveedor) => {
        setProveedorSeleccionado(proveedor);
        setTipoModal("editar");
    };

    const cerrarModal = () => {
        setTipoModal(null);
        setProveedorSeleccionado(null);
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
                    <input
                        className={styles.input}
                        placeholder="Buscar (RUC | Nombre | Correo)"
                        value={busqueda}
                        onChange={e => setBusqueda(e.target.value)}
                    />
                    <button className={styles.boton} onClick={manejarBusqueda}>Buscar</button>
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
                        {currentProveedores.map((prov, i) => (
                            <tr key={i}>
                                <td>{prov.nombre}</td>
                                <td>{prov.ruc}</td>
                                <td>{prov.actividad}</td>
                                <td>{prov.telefono}</td>
                                <td>{prov.correo}</td>
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

                {tipoModal === "agregar" && (
                    <ModalAgregarProveedor
                        onClose={cerrarModal}
                        onSuccess={fetchProveedores} // 👈 Actualiza lista después de agregar
                    />
                )}

                {tipoModal === "editar" && proveedorSeleccionado && (
                    <ModalEditarProveedor
                        proveedor={proveedorSeleccionado}
                        onClose={cerrarModal}
                        onEditSuccess={fetchProveedores}
                    />
                )}
            </main>
        </div>
    );
}
