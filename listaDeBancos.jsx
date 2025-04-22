// src/pages/ListaBancos.jsx 
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import BankCard from '../components/bankCard';
import ModalAgregarBanco from '../components/modalAgregarBanco';
import ModalEditarBanco from '../components/modalEditarBanco';
import ModalElegirCuenta from '../components/modalElegirCuenta';
import agregarBanco from "../img/Agregar.png";
import editarBanco from "../img/Editar.png";
import styles from './listaDeBancos.module.css';

export default function ListaDeBancos() {
    const [cuentas, setCuentas] = useState([]);
    const [tipoModal, setTipoModal] = useState(null);

    useEffect(() => {
        fetch('https://localhost:7149/api/Cuenta')
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
                    <button onClick={() => setTipoModal('agregar')}><img src={agregarBanco} width={60} /></button>
                    <button onClick={() => setTipoModal('editar')}><img src={editarBanco} width={60} /></button>
                    
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
                                name={cuenta.banco.nombre}
                                type={cuenta.tCuenta}
                                account={cuenta.nroCuenta}
                                balance={`${cuenta.saldo.toLocaleString()} GS`}
                            />
                        </Link>
                    ))}
                </div>
                {tipoModal === 'agregar' && <ModalAgregarBanco onClose={() => setTipoModal(null)} />}
                {tipoModal === 'editar' && (<ModalElegirCuenta onClose={() => setTipoModal(null)} onContinuar={() => setTipoModal('editarBanco')}/>)}
                {tipoModal === 'editarBanco' && (<ModalEditarBanco onClose={() => setTipoModal(null)} />)}

            </main>
        </div>
    );
}
