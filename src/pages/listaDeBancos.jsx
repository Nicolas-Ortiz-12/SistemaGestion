// src/pages/ListaBancos.jsx
import React from 'react';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import BankCard from '../components/bankCard';
import agregarBanco from "../img/Agregar.png";
import editarBanco from "../img/Editar.png";
import imagenBanco from "../img/Banco.png";
import styles from './listaDeBancos.module.css';

const banks = [
    { name: 'UENO BANK', type: 'Caja de Ahorro', account: '32132155', balance: '54.105.280 GS' },
    { name: 'SUDAMERIS', type: 'Cuenta Corriente', account: '5646540', balance: '28.501.802 GS' },
    { name: 'CONTINENTAL', type: 'Caja de Ahorro', account: '54464100', balance: '40.031.221 GS' },
];

export default function ListaDeBancos() {
    return (
        <div className={styles.container}>
            <Sidebar paginaImg={imagenBanco} />
            <main className={styles.main}>
                <Header title="Lista de Bancos">
                    <button><img src={agregarBanco} width={60}/></button>
                    <button><img src={editarBanco} width={60}/></button>
                </Header>
                <div className={styles.grid}>
                    {banks.map((b, i) => (
                        <BankCard key={i} {...b} />
                    ))}
                </div>
            </main>
        </div>
    );
}

