// components/LayoutConSidebar.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar.jsx';
import styles from './pantallaConSidebar.module.css'; // opcional para estilos

export default function pantallaConSidebar() {
    return (
        <div className={styles.layoutContainer} style={{ display: 'flex' }}>
            <Sidebar paginaImg="/logo.png" />
            <div style={{ flex: 1 }}>
                <Outlet />
            </div>
        </div>
    );
}
