import React, { useState, useRef } from "react";
import styles from "../components/listaDeBancos.module.css"; // Importa los estilos como módulo

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
        // Lógica para guardar el banco
        setMostrarFormRegistrarBanco(false);
    };

    return (
        <div className={styles.mainContent}>
            <div className={styles.header}>
                <h1 className={styles.headerTitle}>Lista de Bancos</h1>
                <div className={styles.botonesHeader}>
                    <button className={styles.botonAgregar} onClick={handleMostrarAgregar}>
                        <img src="img/Agregar.png" width="50" alt="Agregar banco" />
                    </button>
                </div>
            </div>

            {/* Contenido principal y tarjetas de bancos */}
            <div className={styles.tarjetas}>
                {/* Aquí irían tus tarjetas de bancos */}
            </div>

            {mostrarFormAgregar && (
                <form className={styles.formularioAgregar} style={{ display: 'block' }}>
                    <div className={styles.headerForm}>Agregar Banco</div>
                    <div className={styles.entradas}>
                        <div className={styles.selector}>
                            <label>País:</label>
                            <select>
                                <option>Paraguay</option>
                                <option>Argentina</option>
                                <option>Brasil</option>
                            </select>
                        </div>
                        <div className={styles.selector}>
                            <label>Banco:</label>
                            <select ref={bancoSelectRef} onChange={handleBancoChange}>
                                <option value="0">Sudameris</option>
                                <option value="1">UENO BANK</option>
                                <option value="2">Continental</option>
                                <option value="añadirBanco">Añadir banco...</option>
                            </select>
                        </div>
                        <div className={styles.selector}>
                            <label>Tipo de cuenta:</label>
                            <select>
                                <option>Cuenta Corriente</option>
                                <option>Caja de ahorro</option>
                            </select>
                        </div>
                        <div className={styles.escritura}>
                            <label>Número de Cuenta:</label>
                            <input type="text" defaultValue="512031564" />
                        </div>
                        <div className={styles.botonesForm}>
                            <button type="button" className={styles.guardar}>Guardar</button>
                            <button type="button" className={styles.cerrar} onClick={() => setMostrarFormAgregar(false)}>Cerrar</button>
                        </div>
                    </div>
                </form>
            )}

            {mostrarFormRegistrarBanco && (
                <form className={styles.formularioRegistrarBanco} ref={formRegistrarBancoRef} style={{ display: 'block' }}>
                    <div className={styles.headerForm}>Registrar Nuevo Banco</div>
                    <div className={styles.entradas}>
                        <div className={styles.escritura}>
                            <label>Nombre del Banco:</label>
                            <input type="text" id="NombreBancoRegistrar" />
                        </div>
                        <div className={styles.escritura}>
                            <label>Dirección:</label>
                            <input type="text" id="DireccionBanco" />
                        </div>
                        <div className={styles.botonesForm}>
                            <button type="button" className={styles.guardar} onClick={guardarRegistroBanco}>Registrar</button>
                            <button type="button" className={styles.cerrar} onClick={cerrarRegistroBanco}>Volver</button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ListaDeBancos;