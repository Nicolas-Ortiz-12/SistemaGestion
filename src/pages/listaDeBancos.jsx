// src/pages/ListaBancos.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import BankCard from '../components/bankCard';
import agregarBanco from "../img/Agregar.png";
import editarBanco from "../img/Editar.png";
import styles from './listaDeBancos.module.css';

export default function ListaDeBancos() {
    const [cuentas, setCuentas] = useState([]);

    useEffect(() => {
        fetch('https://localhost:7149/api/Cuenta') // Asegurate de que esta sea la URL correcta
            .then(res => {
                if (!res.ok) throw new Error("Error al obtener cuentas");
                return res.json();
            })
            .then(data => setCuentas(data))
            .catch(error => console.error("Error:", error));
    }, []);

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <Header title="Lista de Cuentas Bancarias">
                    <button><img src={agregarBanco} width={60} /></button>
                    <button><img src={editarBanco} width={60} /></button>
                </Header>
                <div className={styles.grid}>
                    {cuentas.map((cuenta, i) => (
                        <Link
                            key={i}
                            to="/movimientoBancarios"
                            state={{ cuenta }}
                            style={{ textDecoration: 'none' }}
                        >
                            <BankCard
                                name={cuenta.banco.nombre}            // Nombre del banco
                                type={cuenta.tCuenta}                 // Tipo de cuenta
                                account={cuenta.nroCuenta}            // Número de cuenta
                                balance={`${cuenta.saldo.toLocaleString()} GS`}  // Saldo formateado
                            />
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}
