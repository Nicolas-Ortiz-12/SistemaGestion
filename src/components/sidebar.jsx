import React, { useEffect, useState } from 'react';
import { NavLink, useLocation , useNavigate} from 'react-router-dom';
import styles from './sidebar.module.css';

import proveedoresImg from '../img/icono1.png';
import listaDeBancosImg from '../img/Banco.png';
import ordenDePagoImg from '../img/OrdenDePago.png';
import movimentosImg from '../img/Movimientos.png';
import reportesImg from '../img/reportes.png';

export default function Sidebar() {
    const { pathname } = useLocation();
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();
    


    const handleLogout = () => {
        
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        
        navigate('/');
    };

    useEffect(() => {
        if (pathname.includes('listaDeBancos') || pathname.includes('movimientoBancarios')) {
            setActiveIndex(0);
        } else if (pathname.includes('proveedores')) {
            setActiveIndex(1);
        } else if (pathname.includes('ordenDePago')) {
            setActiveIndex(2);
        } else if (pathname.includes('reportes')) {
            setActiveIndex(3);
        }else if (pathname.includes('asiento')){
            setActiveIndex(4);
        }
    }, [pathname]);

    const getLogoForRoute = () => {
        if (pathname.includes('proveedores')) return proveedoresImg;
        if (pathname.includes('ordenDePago')) return ordenDePagoImg;
        if (pathname.includes('listaDeBancos')) return listaDeBancosImg;
        if (pathname.includes('movimientoBancarios')) return movimentosImg;
        if (pathname.includes('reportes')) return reportesImg; 
        return listaDeBancosImg;
    };

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
                <img src={getLogoForRoute()} className={styles.logoImg} alt="Logo" />
            </div>

            <nav className={styles.nav}>
                <div
                    className={styles.activeBg}
                    style={{ top: `${activeIndex * 73}px` }}
                />

                <ul>
                    <li>
                        <NavLink
                            to="/listaDeBancos"
                            className={({ isActive }) =>
                                isActive || pathname.includes('movimientoBancarios') ? styles.active : styles.link
                            }
                        >
                            Bancos
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/proveedores"
                            className={({ isActive }) =>
                                isActive ? styles.active : styles.link
                            }
                        >
                            Proveedores
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/ordenDePago"
                            className={({ isActive }) =>
                                isActive ? styles.active : styles.link
                            }
                        >
                            Orden de pago
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/reportes"
                            className={({ isActive }) =>
                                isActive ? styles.active : styles.link
                            }
                        >
                            Reportes
                        </NavLink>
                    </li>
                    <li>
                            <NavLink
                            to="/asiento"
                            className={({ isActive }) =>
                                isActive ? styles.active : styles.link
                            }
                        >
                            Asiento
                        </NavLink>


                    </li>
                </ul>
            </nav>

            <div className={styles.logout}  onClick={handleLogout} >Cerrar Sesión</div>
        </aside>
    );
}
