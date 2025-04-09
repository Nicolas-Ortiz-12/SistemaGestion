import React, { useState } from 'react';
import '../components/conciliacion.css';

const Conciliacion = () => {
    const [fecha, setFecha] = useState('03/30/2025');
    const [saldoAnterior, setSaldoAnterior] = useState('0.00');
    const [saldoSegundo, setSaldoSegundo] = useState('2.200.000');
    const [saldoActual, setSaldoActual] = useState('2.200.000');

    const movimientos = [
        { ref: '009', emision: '24/03/2024', conciliacion: '', monto: '2.200.000' },
        { ref: '008', emision: '23/03/2024', conciliacion: '29/03/2024', monto: '1.000.000' },
        { ref: '007', emision: '22/03/2024', conciliacion: '28/03/2024', monto: '2.800.000' },
        { ref: '006', emision: '21/03/2024', conciliacion: '26/03/2024', monto: '3.000.000' },
        { ref: '005', emision: '20/03/2024', conciliacion: '24/03/2024', monto: '1.540.000' },
        { ref: '004', emision: '19/03/2024', conciliacion: '22/03/2024', monto: '800.000' },
        { ref: '003', emision: '18/03/2024', conciliacion: '21/03/2024', monto: '150.000' },
        { ref: '002', emision: '17/03/2024', conciliacion: '19/03/2024', monto: '950.000' }
    ];

    const handleConciliar = () => {
        alert('Conciliación realizada.');
    };

    return (
        <div className="main-wrapper">
            <div className="sidebar">
                <img src="img/Conciliaciones.png" width="130" alt="Conciliaciones" />
                <div id="menu">
                    <a href="listaDeBancos.html" className="actual">Bancos</a>
                    <a href="proveedores.html" className="otros">Proveedores</a>
                    <a href="ordenDePago.html" className="otros">Orden de pago</a>
                    <a href="login.html" className="otros">Cerrar Sesión</a>
                </div>
            </div>

            <div className="main-content">
                <div className="header">
                    <h1>UENO BANK - Caja de Ahorro</h1>
                    <div id="botonesHeader">
                        <button onClick={() => alert('Agregar movimiento')}>
                            <img src="img/agregarMovimiento.png" width="80" alt="Agregar" />
                        </button>
                    </div>
                </div>

                <ul className="menu">
                    <li><a href="movimientosBancarios.html">Movimientos</a></li>
                    <li><a href="conciliacion.html" className="actual">Conciliaciones</a></li>
                </ul>

                <div className="form">
                    <div className="input-group">
                        <label htmlFor="fecha">Fecha</label>
                        <input type="text" id="fecha" value={fecha} onChange={(e) => setFecha(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="saldo-anterior">Saldo Anterior</label>
                        <input type="text" id="saldo-anterior" value={saldoAnterior} onChange={(e) => setSaldoAnterior(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="saldo-segundo">Saldo Segundo Edo. Cta</label>
                        <input type="text" id="saldo-segundo" value={saldoSegundo} onChange={(e) => setSaldoSegundo(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="saldo-actual">Saldo Actual</label>
                        <input type="text" id="saldo-actual" value={saldoActual} onChange={(e) => setSaldoActual(e.target.value)} />
                    </div>
                    <button id="botonConciliar" onClick={handleConciliar}>Conciliar</button>
                </div>

                <div className="tablaConciliacion">
                    <table>
                        <thead>
                            <tr>
                                <th>REFERENCIA</th>
                                <th></th>
                                <th>FECHA EMISIÓN</th>
                                <th>FECHA CONCILIACION</th>
                                <th>MONTO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movimientos.map((mov, idx) => (
                                <tr key={idx}>
                                    <td>{mov.ref}</td>
                                    <td><input type="checkbox" /></td>
                                    <td>{mov.emision}</td>
                                    <td>{mov.conciliacion}</td>
                                    <td>{mov.monto}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="pagination">
                    <button className="active">1</button>
                    <button>2</button>
                    <button>3</button>
                    <button>4</button>
                    <button>...</button>
                    <button>20</button>
                </div>
            </div>
        </div>
    );
};

export default Conciliacion;
