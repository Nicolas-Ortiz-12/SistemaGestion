import React from 'react';
import { useState } from "react";
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import Pagination from "../components/pagination";
import imagenOrdenDePago from "../img/OrdenDePago.png";
import styles from "./ordenDepago.module.css";

const facturas = [
    { fecha: '12-04-2024', nro: '001.001.000011', total: '750.000', saldo: '0', aplica: '750.000' },
    { fecha: '12-04-2024', nro: '001.001.000011', total: '690.000', saldo: '0', aplica: '690.000' },
    { fecha: '22-05-2024', nro: '001.001.000012', total: '254.256', saldo: '0', aplica: '254.256' },
    { fecha: '15-03-2024', nro: '001.001.000013', total: '789.245', saldo: '0', aplica: '789.245' },
    { fecha: '17-06-2024', nro: '001.001.000014', total: '1.000.000', saldo: '0', aplica: '1.000.000' },
    { fecha: '11-08-2024', nro: '001.001.000015', total: '452.358', saldo: '0', aplica: '452.358' },
    { fecha: '27-09-2024', nro: '001.001.000016', total: '985.125', saldo: '0', aplica: '985.125' },
    { fecha: '01-10-2024', nro: '001.001.000017', total: '500.000', saldo: '0', aplica: '500.000' },
    { fecha: '05-11-2024', nro: '001.001.000018', total: '1.250.000', saldo: '0', aplica: '1.250.000' },
    { fecha: '25-12-2024', nro: '001.001.000019', total: '1.500.000', saldo: '0', aplica: '1.500.000' }
];
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

export default function OrdenDePago() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentFacturas = facturas.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(facturas.length / itemsPerPage);
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <Header title="Orden de Pago" />
                <form className={styles.form}>
                    <div className={styles.inputDiv}>
                        <label>Proveedor:</label>
                        <input input list="proveedores" className={styles.input} />
                        <datalist id='proveedores'>
                            {proveedores.map((prov, index) => (
                                <option key={index} value={prov.nombre} />
                            ))}
                        </datalist>
                    </div>

                    <div className={styles.inputDiv}>
                        <label className="mb-1 font-semibold">Desde:</label>
                        <input type="date" className={styles.input} />
                    </div>

                    <div className={styles.inputDiv}>
                        <label>Hasta:</label>
                        <input type="date" className={styles.input} />
                    </div>

                    <button type="submit" className={styles.boton}>
                        Buscar
                    </button>
                </form>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Nro.</th>
                            <th>Total</th>
                            <th>Saldo</th>
                            <th>Aplica</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentFacturas.map((fac, i) => (
                            <tr key={i}>
                                <td>{fac.fecha}</td>
                                <td>{fac.nro}</td>
                                <td>{fac.total}</td>
                                <td>{fac.saldo}</td>
                                <td>{fac.aplica}</td>
                                <td>
                                    <input type="checkbox" />
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