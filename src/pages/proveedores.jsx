import React from 'react';
import { useState } from "react";
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import Pagination from "../components/pagination";
import agregarProveedorImg from "../img/icono2.png";
import imagenProveedor from "../img/icono1.png";
import editarImg from "../img/icono3.png";
import styles from "./proveedores.module.css";

const proveedores = [
    {
        nombre: "Distribuidora Horeca",
        ruc: "5896759-8",
        actividad: "Alimentos y bebidas",
        telefono: "+595985102897",
        email: "contacto@horecadist.com",
    },
    {
        nombre: "Importadora Martínez",
        ruc: "1548796-3",
        actividad: "Importación de tecnología",
        telefono: "+595971456789",
        email: "ventas@importmartinez.com",
    },
    {
        nombre: "AgroPar S.A.",
        ruc: "4785962-5",
        actividad: "Agroquímicos",
        telefono: "+595981332211",
        email: "info@agropar.com.py",
    },
    {
        nombre: "Construland",
        ruc: "3012547-1",
        actividad: "Materiales de construcción",
        telefono: "+595983112233",
        email: "pedidos@construland.com",
    },
    {
        nombre: "Eco Print",
        ruc: "1247859-9",
        actividad: "Impresiones y papelería",
        telefono: "+595991998877",
        email: "eco@printpy.com",
    },
    {
        nombre: "Global Repuestos",
        ruc: "8547962-6",
        actividad: "Repuestos de vehículos",
        telefono: "+595981223344",
        email: "contacto@globalrepuestos.com",
    },
    {
        nombre: "Farmacenter",
        ruc: "3054179-0",
        actividad: "Distribución farmacéutica",
        telefono: "+595985112200",
        email: "ventas@farmacenter.com",
    },
    {
        nombre: "CleanUp S.A.",
        ruc: "7765412-4",
        actividad: "Productos de limpieza",
        telefono: "+595982765432",
        email: "soporte@cleanuppsa.com",
    },
    {
        nombre: "Distribuciones Frutales",
        ruc: "1592634-2",
        actividad: "Frutas y verduras",
        telefono: "+595980456789",
        email: "frutas@distribuciones.com",
    },
    {
        nombre: "Eléctrica Zeta",
        ruc: "2014579-1",
        actividad: "Materiales eléctricos",
        telefono: "+595986123456",
        email: "ventas@zetaelectric.com",
    },
];


export default function Proveedores() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProveedores = proveedores.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(proveedores.length / itemsPerPage);
    return (
        <div className={styles.container}>
            <Sidebar paginaImg={imagenProveedor} />
            <main className={styles.main}>
                <Header title="Proveedores">
                    <button><img src={agregarProveedorImg} width={60} /></button>
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
                        {currentProveedores.map((prov, i) => (
                            <tr key={i}>
                                <td>{prov.nombre}</td>
                                <td>{prov.ruc}</td>
                                <td>{prov.actividad}</td>
                                <td>{prov.telefono}</td>
                                <td>{prov.email}</td>
                                <td>
                                    <button className={styles.actionBtn}><img src={editarImg} /></button>
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
            </main>
        </div>
    );
}