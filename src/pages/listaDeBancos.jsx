import React, { useState, useRef } from "react";

const ListaDeBancos = () => {
    const [mostrarFormAgregar, setMostrarFormAgregar] = useState(false);
    const [mostrarFormRegistrarBanco, setMostrarFormRegistrarBanco] = useState(false);
    const bancoSelectRef = useRef(null);
    const formRegistrarBancoRef = useRef(null);

    const handleMostrarAgregar = () => {
        setMostrarFormAgregar(true);
    };

    const handleBancoChange = (e) => {
        if (e.target.value === "añadirBanco") {
            setMostrarFormRegistrarBanco(true);
        }
    };

    const cerrarRegistroBanco = () => {
        if (bancoSelectRef.current) {
            bancoSelectRef.current.value = "0";
        }

        if (formRegistrarBancoRef.current) {
            formRegistrarBancoRef.current.reset();
        }

        setMostrarFormRegistrarBanco(false);
    };

    const guardarRegistroBanco = () => {
        // Aquí puedes completar con lógica para guardar el banco (por ejemplo, enviar a una API)
        setMostrarFormRegistrarBanco(false);
    };

    return (
        <div className="main-content">
            <div className="header">
                <h1>Lista de Bancos</h1>
                <div id="botonesHeader">
                    <button onClick={handleMostrarAgregar}>
                        <img src="img/Agregar.png" width="50" />
                    </button>
                </div>
            </div>

            {/* ... tarjetas y otras partes omitidas para simplificar */}

            {mostrarFormAgregar && (
                <form id="formularioAgregar">
                    <div id="headerForm1">Agregar Banco</div>
                    <div className="entradas">
                        <div className="selector">
                            <label>País:</label>
                            <select>
                                <option>Paraguay</option>
                                <option>Argentina</option>
                                <option>Brasil</option>
                            </select>
                        </div>
                        <div className="selector">
                            <label>Banco:</label>
                            <select ref={bancoSelectRef} onChange={handleBancoChange}>
                                <option value="0">Sudameris</option>
                                <option value="1">UENO BANK</option>
                                <option value="2">Continental</option>
                                <option value="añadirBanco">Añadir banco...</option>
                            </select>
                        </div>
                        <div className="selector">
                            <label>Tipo de cuenta:</label>
                            <select>
                                <option>Cuenta Corriente</option>
                                <option>Caja de ahorro</option>
                            </select>
                        </div>
                        <div className="escritura">
                            <label>Número de Cuenta:</label>
                            <input type="text" defaultValue="512031564" />
                        </div>
                        <div className="botonesForm">
                            <button type="button">Guardar</button>
                            <button type="button" onClick={() => setMostrarFormAgregar(false)}>Cerrar</button>
                        </div>
                    </div>
                </form>
            )}

            {mostrarFormRegistrarBanco && (
                <form id="formularioRegistrarBanco" ref={formRegistrarBancoRef}>
                    <div id="headerForm1">Registrar Nuevo Banco</div>
                    <div className="entradas">
                        <div className="escritura">
                            <label>Nombre del Banco:</label>
                            <input type="text" id="NombreBancoRegistrar" />
                        </div>
                        <div className="escritura">
                            <label>Dirección:</label>
                            <input type="text" id="DireccionBanco" />
                        </div>
                        <div className="botonesForm">
                            <button type="button" onClick={guardarRegistroBanco}>Registrar</button>
                            <button type="button" onClick={cerrarRegistroBanco}>Volver</button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ListaDeBancos;
