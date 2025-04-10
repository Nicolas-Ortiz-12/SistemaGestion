import React from "react";
import "../components/login.css"; // ajusta la ruta si es necesario


function LoginPage() {
    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            <form action="inicio">
                <label htmlFor="usuario">Usuario</label>
                <div className="input-container">
                    <span className="icon">👤</span>
                    <input type="text" id="usuario" value="Nicolas Ortiz" readOnly />
                </div>

                <label htmlFor="password">Contraseña</label>
                <div className="input-container">
                    <span className="icon">🔒</span>
                    <input type="password" id="password" value="********" readOnly />
                </div>

                <button type="submit">Ingresar</button>
            </form>
        </div>
    );
}

export default LoginPage;
