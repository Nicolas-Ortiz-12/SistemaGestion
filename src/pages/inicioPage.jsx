import React from "react";
import "../components/inicio.css";
import { useNavigate } from "react-router-dom";

function InicioPage() {
    const navigate = useNavigate();

    return (
        <div id="main-content">
            <div className="header">
                <img src="/img/Inicio.png" width="130" alt="Inicio" />
                <h1>BIENVENIDO!!</h1>
            </div>

            <p>
                Has accedido al <strong>Sistema de Bancos y Tesorería</strong>
            </p>

            <div className="buttons">
                <button onClick={() => navigate("/listaDeBancos")}>
                    <img src="/img/Banco.png" width="150" alt="Bancos" />
                    <h2>Lista de Bancos</h2>
                </button>

                <button onClick={() => navigate("/proveedores")}>
                    <img src="/img/icono1.png" width="150" alt="Proveedores" />
                    <h2>Proveedores</h2>
                </button>

                <button onClick={() => navigate("/ordenDePago")}>
                    <img src="/img/OrdenDePago.png" width="130" alt="Orden de Pago" />
                    <h2>Orden de Pago</h2>
                </button>
            </div>
        </div>
    );
}

export default InicioPage;
