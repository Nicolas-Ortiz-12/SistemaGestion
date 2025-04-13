import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './sidebar.module.css';

export default function Sidebar({ paginaImg }) {
    const { pathname } = useLocation();

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
                <img src={paginaImg} className={styles.logoImg} alt="Logo" />
            </div>
            <nav className={styles.nav}>
                <ul>
                    <li className={pathname === '/listaDeBancos' || pathname === '/movimientoBancarios' ? styles.active : styles.link}>
                        <NavLink to="/listaDeBancos" className={styles.link}>
                            Bancos
                        </NavLink>
                    </li>
                    <li className={pathname === '/proveedores' ? styles.active : styles.link}>
                        <NavLink to="/proveedores" className={styles.link}>
                            Proveedores
                        </NavLink>
                    </li>
                    <li className={pathname === '/ordenDePago' ? styles.active : styles.link}>
                        <NavLink to="/orden-de-pago" className={styles.link}>
                            Orden de pago
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <div className={styles.logout}>Cerrar Sesión</div>
        </aside>
    );
}
