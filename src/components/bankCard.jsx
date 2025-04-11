// src/components/BankCard.jsx
import React from 'react';
import styles from './BankCard.module.css';
import chanchoImg from "../img/Chancho.png"
import { FaPiggyBank } from 'react-icons/fa';

export default function BankCard({ name, type, account, balance }) {
    return (
        <div className={styles.card}>
            <div className={styles.info}>
                <h2>{name}</h2>
                <p>{type}</p>
                <p>Nro. Cta: {account}</p>
                <p>Saldo: {balance}</p>
            </div>
            <div className={styles.icon}>
                <img src={chanchoImg}/>
            </div>
        </div>
    );
}
