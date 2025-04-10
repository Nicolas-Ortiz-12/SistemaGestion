import React from "react";
import styles from "../components/inicio.module.css"; // Importa los estilos como objeto
import { useNavigate } from "react-router-dom";

function InicioPage() {
    const navigate = useNavigate();

    return (
        <div className={styles.mainContent}>
            <div className={styles.header}>
                <img src="/img/Inicio.png" width="130" alt="Inicio" className={styles.headerImage} />
                <h1 className={styles.headerTitle}>BIENVENIDO!!</h1>
            </div>

            <p className={styles.welcomeText}>
                Has accedido al <strong>Sistema de Bancos y Tesorería</strong>
            </p>

            <div className={styles.buttons}>
                <button className={styles.menuButton} onClick={() => navigate("/listaDeBancos")}>
                    <img src="/img/Banco.png" width="150" alt="Bancos" />
                    <h2 className={styles.buttonTitle}>Lista de Bancos</h2>
                </button>

                <button className={styles.menuButton} onClick={() => navigate("/proveedores")}>
                    <img src="/img/icono1.png" width="150" alt="Proveedores" />
                    <h2 className={styles.buttonTitle}>Proveedores</h2>
                </button>

                <button className={styles.menuButton} onClick={() => navigate("/ordenDePago")}>
                    <img src="/img/OrdenDePago.png" width="130" alt="Orden de Pago" />
                    <h2 className={styles.buttonTitle}>Orden de Pago</h2>
                </button>
            </div>
        </div>
    );
}

export default InicioPage;