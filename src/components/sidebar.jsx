import React from 'react';
import styles from './sidebar.module.css';

export default function Sidebar({paginaImg}) {
    return (
        <aside className={styles.sidebar}>
            <div className="logo">
                <img src={paginaImg} className={styles.logoImg} />
            </div>
            <nav className={styles.nav}>
                <ul>
                    <li className={styles.active}>Bancos</li>
                    <li>Proveedores</li>
                    <li>Orden de pago</li>
                </ul>
            </nav>
            <div className={styles.logout}>Cerrar Sesión</div>
        </aside>
    );
}
