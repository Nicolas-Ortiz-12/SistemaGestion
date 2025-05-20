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
    const [cuentaSeleccionada, setCuentaSeleccionada] = useState(null);

    const fetchCuentas = async () => {
        try {
            const res = await fetch('https://localhost:7149/api/Cuenta');
            if (!res.ok) throw new Error('Error al obtener cuentas');
            const data = await res.json();
            setCuentas(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchCuentas();
    }, []);


    const abrirModalElegir = () => {
        setTipoModal('editar');
    };


    const handleContinuar = (cuenta) => {
        setCuentaSeleccionada(cuenta);
        setTipoModal('editarBanco');
    };

    
    const handleCerrarEditar = () => {
        setTipoModal(null);
    };

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <Header title="Lista de Cuentas Bancarias">
                    <button onClick={() => setTipoModal('agregar')}>
                        <img src={agregarBanco} width={60} />
                    </button>
                    <button onClick={abrirModalElegir}>
                        <img src={editarBanco} width={60} />
                    </button>
                </Header>

                <div className={styles.grid}>
                    {cuentas.map((cuenta, i) => (
                        <Link
                            key={i}
                            to="/movimientoBancarios"
                            state={{ account: cuenta, bank: cuenta.banco }}
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

                {tipoModal === 'agregar' && (
                    <ModalAgregarBanco
                        onClose={() => setTipoModal(null)}
                        onCuentaCreada={async () => {
                            await fetchCuentas();    // recarga lista
                            setTipoModal(null);      // cierra modal
                        }}
                    />
                )}

                {tipoModal === 'editar' && (
                    <ModalElegirCuenta
                        onClose={() => setTipoModal(null)}
                        onContinuar={handleContinuar}   // pasa la cuenta al padre
                    />
                )}

                {tipoModal === 'editarBanco' && (
                    <ModalEditarBanco
                        cuenta={cuentaSeleccionada}
                        onClose={handleCerrarEditar}
                        onCuentaActualizada={async () => {
                            await fetchCuentas();      // recarga lista actualizada
                            setTipoModal(null);        // cierra modal
                        }}
                    />
                )}

            </main>
        </div>
    );
}
