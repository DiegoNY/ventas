import React from 'react';
import './index.css';

function MainUser(props) {

    return (
        <div>

            <li className="nav-item nav-item-dropdown-lg dropdown dropdown-user h-100">
                <a href="#"
                    className="navbar-nav-link navbar-nav-link-toggler dropdown-toggle d-inline-flex align-items-center h-100"
                    data-toggle="dropdown">
                    <img src="../img/hombre-de-negocios.png" className="rounded-pill mr-lg-2" height="34" alt="" />
                    <span className="d-none d-lg-inline-block container-nombre-usuario" id="nombreUsuario">{props.user.nombre}</span>
                </a>

                <div className="dropdown-menu dropdown-menu-right menu-user">
                    <a href="#" className="dropdown-item"><i className="icon-user-plus"></i> Mi perfil</a>
                    <div className="dropdown-divider"></div>
                    <a 
                        href="#" 
                        onClick={ () => props.logout() }  
                        className="dropdown-item">
                        <i
                            className="icon-switch2"
                        >
                        </i>

                        Salir

                    </a>
                </div>
            </li>

        </div>


    );

}

export { MainUser };