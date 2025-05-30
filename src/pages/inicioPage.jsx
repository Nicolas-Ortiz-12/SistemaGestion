import React from "react";
import inicioImg from "../img/Inicio.png";
import bancoImg from "../img/Banco.png";
import proveedorImg from "../img/icono1.png";
import ordenDePagoImg from "../img/OrdenDePago.png";
import Usuario from "../components/usuario.jsx";
import Header from "../components/header.jsx";
import styles from "./inicio.module.css";
import { useNavigate } from "react-router-dom";

function InicioPage() {
    const navigate = useNavigate();

    return (

        <div className={styles.mainContent}>
            <img src={inicioImg} width="130" className={styles.headerImg} />
            <Header title="BIENVENIDO!!">
                <div className={styles.usuarioEnInicio}>
                    <Usuario />
                </div>
            </Header>
            <p className={styles.welcomeText}>
                Has accedido al <strong>Sistema de Bancos y Tesorería</strong>
            </p>

            <div className={styles.buttons}>
                <button className={styles.menuButton} onClick={() => navigate("/listaDeBancos")}>
                    <img src={bancoImg} width="150" alt="Bancos" />
                    <h2 className={styles.buttonTitle}>Lista de Bancos</h2>
                </button>

                <button className={styles.menuButton} onClick={() => navigate("/proveedores")}>
                    <img src={proveedorImg} width="150" alt="Proveedores" />
                    <h2 className={styles.buttonTitle}>Proveedores</h2>
                </button>

                <button className={styles.menuButton} onClick={() => navigate("/ordenDePago")}>
                    <img src={ordenDePagoImg} width="130" alt="Orden de Pago" />
                    <h2 className={styles.buttonTitle}>Orden de Pago</h2>
                </button>
            </div>

        </div>
    );
}

export default InicioPage;