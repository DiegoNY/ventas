import React from 'react';
import { ItemMenu } from './ItemMenu';
import { SubMenuItem } from './SubMenuItem';


function Main(props) {

    return (
        <>

            <div className='sidebar sidebar-dark sidebar-main sidebar-expand-lg h-100'>

                <div className="sidebar-content h-auto">

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

                        <ItemMenu name="Prueba" icono="aca ira una img de un icono xd" />

                        <ItemMenu name="Mantenimiento" icono="">
                            <SubMenuItem>
                                <ItemMenu name="Tipo de documento" icono="icono" />
                                <ItemMenu name="Cliente" icono="icono" />
                                <ItemMenu name="Producto" icono="icono" />
                                <ItemMenu name="Usuario" icono="icono" />
                                <ItemMenu name="Laboratorio" icono="icono" />
                                <ItemMenu name="Moneda" icono="icono" />
                                <ItemMenu name="Proveedor" icono="icono" />
                            </SubMenuItem>
                        </ItemMenu >

                    </div>

                </div>

            </div>

        </>
    );

}

export { Main };