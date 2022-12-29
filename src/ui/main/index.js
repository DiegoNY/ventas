import React from 'react';


function Main(props) {

    return (
        <>

            <div className='sidebar sidebar-dark sidebar-main sidebar-expand-lg h-100'>

                <div className="sidebar-content">

                    <div className="sidebar-section sidebar-user my-1">
                        <div className="sidebar-section-body">
                            <div className="media">
                                <a href="#" className="mr-3">
                                    <img src="../img/hombre-de-negocios.png" className="rounded-circle sidebar-main-resize" alt="" />
                                </a>

                                <div className="media-body">
                                    <div className="font-weight-semibold" id="nombreUsuarioNav">{props.user.nombre}</div>
                                    <div className="font-size-sm line-height-sm opacity-50">
                                        {props.user.cargo}
                                    </div>
                                </div>

                                <div className="ml-3 align-self-center">

                                    <button type="button" className="btn btn-outline-light-100 text-white border-transparent btn-icon rounded-pill btn-sm sidebar-control sidebar-main-resize d-none d-lg-inline-flex">
                                        <i className="icon-transmission"></i>
                                    </button>

                                    <button type="button" className="btn btn-outline-light-100 text-white border-transparent btn-icon rounded-pill btn-sm sidebar-mobile-main-toggle d-lg-none">
                                        <i className="icon-cross2"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="sidebar-section">

                        <ul className="nav nav-sidebar" data-nav-type="accordion" id="navigationMenu">

                            <li className="nav-item" id="detalleContacto">
                                
                                <a href="vista-empresa.html" className="nav-link">
                                    <i className="icon-home4"></i>
                                    <span>Listado de Empresa</span>
                                </a>

                            </li>
                        </ul>
                    </div>


                </div>

            </div>

        </>
    );

}

export { Main };