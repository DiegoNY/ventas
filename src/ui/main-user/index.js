import React from 'react';
import { useAuth } from '../../auth/auth';
import './index.css';

function MainUser() {
    const [mostrar, setMostrar] = React.useState(false);
    const auth = useAuth();

    if (auth.user) {
        return (
            <div>

                <li
                    className="nav-item nav-item-dropdown-lg dropdown dropdown-user h-100"
                    onClick={() => setMostrar(!mostrar)}
                >

                    <a href="#"
                        className="navbar-nav-link navbar-nav-link-toggler dropdown-toggle d-inline-flex align-items-center h-100"
                        data-toggle="dropdown">
                        <img src="../img/hombre-de-negocios.png" className="rounded-pill mr-lg-2" height="34" alt="" />
                        
                        {!auth.loading &&
                            <span
                                className="d-none d-lg-inline-block  container-nombre-usuario"
                                id="nombreUsuario">
                                {auth.user.nombre}
                            </span>

                        }

                    </a>
                    {!!mostrar &&
                        <div className="dropdown-menu dropdown-menu-right menu-user">
                            <a href="#" className="dropdown-item"><i className="icon-user-plus"></i> Mi perfil</a>
                            <div className="dropdown-divider"></div>
                            <a
                                href="#"
                                onClick={() => auth.logout()}
                                className="dropdown-item">
                                <i
                                    className="icon-switch2"
                                >
                                </i>

                                Salir

                            </a>
                        </div>}

                </li>

            </div>


        );

    }


}

export { MainUser };