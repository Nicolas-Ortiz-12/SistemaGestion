import React from "react";
import "./proveedores.css";

const Proveedores = () => {
    const abrirModal = () => {
        document.getElementById("modal").style.display = "block";
    };

    const cerrarModal = () => {
        document.getElementById("modal").style.display = "none";
    };

    return (
        <div className="page">
            <div className="sidebar">
                <img src="img/icono1.png" width="130" alt="Icono" />
                <div id="menu">
                    <a href="listaDeBancos.html" className="otros">Bancos</a>
                    <a href="proveedores.html" className="actual">Proveedores</a>
                    <a href="ordenDePago.html" className="otros">Orden de pago</a>
                    <a href="login.html" className="otros">Cerrar Sesión</a>
                </div>
            </div>

            <div className="main-content">
                <div className="header">
                    <h1>Proveedor</h1>
                    <div id="botonesHeader">
                        <button onClick={abrirModal}>
                            <img src="img/icono2.png" width="80" alt="Agregar" />
                        </button>
                    </div>
                </div>

                <div className="contenido">
                    <div className="buscador">
                        <label htmlFor="buscar">Buscar Proveedor</label>
                        <input type="text" id="buscar" placeholder="Buscar (RUC | Nombre | Correo)" />
                        <button className="btn-buscar">Buscar</button>
                    </div>

                    <table>
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
                            {[
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
                                    email: "soporte@cleanupsa.com",
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
                            ].map((proveedor, index) => (
                                <tr key={index}>
                                    <td>{proveedor.nombre}</td>
                                    <td>{proveedor.ruc}</td>
                                    <td>{proveedor.actividad}</td>
                                    <td>{proveedor.telefono}</td>
                                    <td>{proveedor.email}</td>
                                    <td>
                                        <img src="img/icono3.png" alt="Editar" width="23" height="22" className="icono-accion" />
                                        <img src="img/icono4.png" alt="Eliminar" width="19" height="24" className="icono-accion" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div id="modal" className="modal">
                <div className="modal-content">
                    <h2>Agregar Proveedor</h2>
                    <form>
                        <label>Nombre/Razón social</label>
                        <input type="text" placeholder="Nombre del proveedor o razón social" />
                        <label>RUC</label>
                        <input type="text" placeholder="RUC" />
                        <label>Actividad Comercial</label>
                        <input type="text" placeholder="Actividad comercial" />
                        <label>Dirección</label>
                        <input type="text" placeholder="Dirección del proveedor" />
                        <label>Teléfono</label>
                        <input type="text" placeholder="Teléfono" />
                        <label>Email</label>
                        <input type="email" placeholder="Correo electrónico" />
                        <button type="submit" className="btn-guardar">Guardar</button>
                        <button type="button" className="btn-cerrar" onClick={cerrarModal}>Cancelar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Proveedores;
