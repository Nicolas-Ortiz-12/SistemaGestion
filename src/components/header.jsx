// src/components/Header.jsx
import React from 'react';
import styles from './header.module.css';

export default function Header({ title, children }) {
    return (
        <header className={styles.header}>
            <h1>{title}</h1>
            <div className="actions">
                {children}    {/* aquí van los botones, o lo que le pases */}
            </div>
        </header>
    );
}
