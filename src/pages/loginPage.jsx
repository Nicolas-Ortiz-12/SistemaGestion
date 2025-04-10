import React from "react";
import styles from "../components/login.module.css"; // Importa los estilos como un objeto

function LoginPage() {
    return (
        <div className={styles.loginContainer}> {/* Usa styles.nombreDeClase */}
            <h2 className={styles.title}>Iniciar Sesión</h2>
            <form className={styles.form} action="inicio">
                <label className={styles.label} htmlFor="usuario">Usuario</label>
                <div className={styles.inputContainer}>
                    <span className={styles.icon}>👤</span>
                    <input className={styles.input} type="text" id="usuario" value="Nicolas Ortiz" readOnly />
                </div>

                <label className={styles.label} htmlFor="password">Contraseña</label>
                <div className={styles.inputContainer}>
                    <span className={styles.icon}>🔒</span>
                    <input className={styles.input} type="password" id="password" value="********" readOnly />
                </div>

                <button className={styles.submitButton} type="submit">Ingresar</button>
            </form>
        </div>
    );
}

export default LoginPage;