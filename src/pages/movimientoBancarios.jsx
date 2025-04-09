import React from 'react';

const MovimientosBancarios = () => {
    const mostrarAgregar = () => {
        alert('Función para agregar un nuevo movimiento aún no implementada.');
    };

    return (
        <div className="container">
            <nav className="sidebar">
                <img src="/img/Movimientos.png" width="130" alt="Logo" />
                <div id="menu">
                    <a href="listaDeBancos.html" className="actual">Bancos</a>
                    <a href="proveedores.html" className="otros">Proveedores</a>
                    <a href="ordenDePago.html" className="otros">Orden de pago</a>
                    <a href="login.html" className="otros">Cerrar Sesión</a>
                </div>
            </nav>

            <main className="main-content">
                <div className="header">
                    <h1>UENO BANK - Caja de Ahorro</h1>
                    <div id="botonesHeader">
                        <button onClick={mostrarAgregar}>
                            <img src="/img/agregarMovimiento.png" width="80" alt="Agregar Movimiento" />
                        </button>
                    </div>
                </div>

                <ul className="menu">
                    <li><a href="movimientosBancarios.html" className="actual">Movimientos</a></li>
                    <li><a href="conciliacion.html">Conciliaciones</a></li>
                </ul>

                <div className="saldo-total">
                    <h3>SALDO TOTAL<br />DE LA CUENTA</h3>
                    <p>₲ 54.027.054</p>
                </div>

                <div className="tabla-movimientos">
                    <h3>Últimos Movimientos Bancarios</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Referencia</th>
                                <th>Fecha</th>
                                <th>Debe</th>
                                <th>Haber</th>
                                <th>Tipo</th>
                                <th>Estado</th>
                                <th>Accion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { ref: 'Pago de Seguro contra Incendios', fecha: '24/03/20', debe: '', haber: '1.500.000', tipo: 'Cheque', estado: 'Emitido' },
                                { ref: 'Alquiler de Salón de Eventos', fecha: '23/03/20', debe: '8.000.000', haber: '', tipo: 'Transferencia', estado: '' },
                                { ref: 'Pago de Obras en Planta Baja', fecha: '22/03/20', debe: '', haber: '2.800.000', tipo: 'Cheque', estado: 'Emitido' },
                                { ref: 'Pago de Almuerzo de Empleados', fecha: '21/03/20', debe: '', haber: '300.000', tipo: 'Transferencia', estado: '' },
                                { ref: 'Pago de Reparación de inmobiliario', fecha: '20/03/20', debe: '', haber: '500.000', tipo: 'Transferencia', estado: '' },
                                { ref: 'Cobro de Alquiler de Quincho', fecha: '19/03/20', debe: '1.400.000', haber: '', tipo: 'Transferencia', estado: '' },
                                { ref: 'Pago a Proveedor', fecha: '18/03/20', debe: '1.300.000', haber: '', tipo: 'Cheque', estado: 'Conciliado' },
                                { ref: 'Compra de torta de cumpleaños', fecha: '17/03/20', debe: '', haber: '80.000', tipo: 'Transferencia', estado: '' }
                            ].map((mov, i) => (
                                <tr key={i}>
                                    <td>{mov.ref}</td>
                                    <td>{mov.fecha}</td>
                                    <td>{mov.debe}</td>
                                    <td>{mov.haber}</td>
                                    <td>{mov.tipo}</td>
                                    <td>{mov.estado}</td>
                                    <td>
                                        <button className="botonDetalle" aria-label="Ver detalle">
                                            <img src="/img/detalleMovimiento.png" width="15" alt="Detalle" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="pagination">
                        {[1, 2, 3, 4, '...', 20].map((num, i) => (
                            <button key={i} className={num === 1 ? 'active' : ''}>{num}</button>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MovimientosBancarios;
