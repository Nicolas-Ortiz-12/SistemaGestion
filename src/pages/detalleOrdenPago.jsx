import React from "react";
import "../components/detalleOrdenPago.css";

function DetalleOrdenPago() {
    return (
        <div className="container">
            <h1>Detalle Orden De Pago</h1>
            <div id="vista">
                <div className="form-container">
                    <div>
                        <label htmlFor="proveedor">Proveedor</label>
                        <input type="text" id="proveedor" value="Pedro Sanchez" readOnly />
                    </div>
                    <div>
                        <label htmlFor="nroPago">Nro. Pago</label>
                        <input type="text" id="nroPago" value="2000000" readOnly />
                    </div>
                    <div>
                        <label htmlFor="fecha">Fecha</label>
                        <input type="date" id="fecha" defaultValue="2025-03-26" />
                    </div>
                    <div>
                        <label htmlFor="importeTotal">Importe total</label>
                        <input
                            type="text"
                            id="importeTotal"
                            value="4.230.984"
                            readOnly
                        />
                    </div>
                </div>

                <h2>Facturas A Pagar</h2>
                <table>
                    <thead>
                        <tr>
                            <th>FECHA</th>
                            <th>N°Factura</th>
                            <th>Total</th>
                            <th>Saldo</th>
                            <th>Aplica</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            ["12-04-2024", "001.001.0000011", "750.000"],
                            ["22-05-2024", "001.001.0000012", "254.256"],
                            ["15-03-2024", "001.001.0000013", "789.245"],
                            ["17-06-2024", "001.001.0000014", "1.000.000"],
                            ["11-08-2024", "001.001.0000015", "452.358"],
                            ["27-09-2024", "001.001.0000016", "985.125"]
                        ].map(([fecha, factura, total], i) => (
                            <tr key={i}>
                                <td>{fecha}</td>
                                <td>{factura}</td>
                                <td>{total}</td>
                                <td>0</td>
                                <td>{total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h2>Método De Pago</h2>
                <button className="btn">Transferencia</button>
                <button className="btn">Cheques</button>

                <table>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Tipo de Pago</th>
                            <th>Cuenta Bancaria</th>
                            <th>Monto</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>15-04-2024</td>
                            <td>Cheque</td>
                            <td>25245266</td>
                            <td>1.515.545</td>
                            <td>
                                <i className="fas fa-trash-alt" />
                            </td>
                        </tr>
                        <tr>
                            <td>15-04-2024</td>
                            <td>Transferencia</td>
                            <td>25245266</td>
                            <td>2.520.125</td>
                            <td>
                                <i className="fas fa-trash-alt" />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="buttons">
                    <button className="btn">Generar Orden</button>
                    <button className="btn secondary">Volver</button>
                </div>
            </div>
        </div>
    );
}

export default DetalleOrdenPago;
