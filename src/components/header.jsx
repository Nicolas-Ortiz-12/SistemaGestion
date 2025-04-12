
import React from 'react';
import styles from './header.module.css';

export default function Header({ title, children }) {
    return (
        <header className={styles.header}>
            <div></div>
            <h1>{title}</h1>
            <div className="actions">
                {children}
            </div>
        </header>
    );
}
