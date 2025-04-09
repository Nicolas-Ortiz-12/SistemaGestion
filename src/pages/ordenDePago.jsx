import React from 'react';

const OrdenDePago = () => {
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

    const handleBuscar = () => {
        alert('Función de búsqueda aún no implementada');
    };

    const handleGenerarOrden = () => {
        alert('Orden de pago generada (simulado)');
    };

    return (
        <div className="sidebar">
            <img src="/img/ordenDePago.png" width="100" alt="Orden de Pago" />
            <div id="menu">
                <a href="listaDeBancos.html" className="otros">Bancos</a>
                <a href="proveedores.html" className="otros">Proveedores</a>
                <a href="ordenDePago.html" className="actual">Orden de pago</a>
                <a href="login.html" className="otros">Cerrar Sesión</a>
            </div>

            <div className="main-content">
                <div className="header">
                    <h1>Orden De Pago</h1>
                </div>

                <div className="container">
                    <div className="form-container">
                        <div>
                            <label htmlFor="proveedor">Proveedor:</label>
                            <input list="listaProveedores" id="proveedor" name="proveedor" placeholder="Seleccione o escriba..." />
                            <datalist id="listaProveedores">
                                <option value="Proveedor 1" />
                                <option value="Proveedor 2" />
                                <option value="Proveedor 3" />
                            </datalist>
                        </div>

                        <div>
                            <label htmlFor="desde">Desde:</label>
                            <input type="date" id="desde" />
                        </div>
                        <div>
                            <label htmlFor="hasta">Hasta:</label>
                            <input type="date" id="hasta" />
                        </div>
                        <button id="BuscarOrden" onClick={handleBuscar}>Buscar</button>
                    </div>

                    <h2>Facturas Pendientes a Pago</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>N° Factura</th>
                                <th>Total</th>
                                <th>Saldo</th>
                                <th>Aplica</th>
                                <th>Seleccionar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {facturas.map((factura, index) => (
                                <tr key={index}>
                                    <td>{factura.fecha}</td>
                                    <td>{factura.nro}</td>
                                    <td>{factura.total}</td>
                                    <td>{factura.saldo}</td>
                                    <td>{factura.aplica}</td>
                                    <td><input type="checkbox" /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="pagination">
                        <button className="active">1</button>
                        <button>2</button>
                        <button>3</button>
                        <button>4</button>
                        <button>...</button>
                        <button>20</button>
                    </div>

                    <button id="GenerarOrden" onClick={handleGenerarOrden}>Generar Orden De Pago</button>
                </div>
            </div>
        </div>
    );
};

export default OrdenDePago;
