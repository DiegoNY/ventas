import React from 'react';
import { useAuth } from '../../auth/auth';
import { ItemMenu } from './ItemMenu';
import { SubMenuItem } from './SubMenuItem';


function Main() {
    const [mostrar, setMostrar] = React.useState(false);
    const [comprimir, setComprimir] = React.useState(false);

    const auth = useAuth();

    if (auth.user) {

        return (
            <>
                <div className={`sidebar sidebar-dark sidebar-main sidebar-expand-lg h-100${!!comprimir && ' sidebar-main-resized'} `}>

                    <div className="sidebar-content h-auto">

                        <div className="sidebar-section sidebar-user my-1">
                            <div className="sidebar-section-body">
                                <div
                                    className="media"
                                    onClick={() => setComprimir(!comprimir)}
                                >
                                    <a href="#" className="mr-3">
                                        <img src="../img/hombre-de-negocios.png" className="rounded-circle sidebar-main-resize" alt="" />
                                    </a>

                                    <div className="media-body">
                                        {
                                            !auth.loading && <>

                                                <div
                                                    div className="font-weight-semibold"
                                                    id="nombreUsuarioNav"
                                                >

                                                    {auth.user.nombre}

                                                </div>

                                                <div
                                                    className="font-size-sm line-height-sm opacity-50"
                                                >

                                                    {auth.user.cargo}

                                                </div>

                                            </>
                                        }


                                    </div>

                                    <div
                                        className="ml-3 align-self-center"
                                        onClick={() => setComprimir(!comprimir)}
                                    >

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

                            <ItemMenu
                                link='home'
                                name="Inicio"
                                icono="aca ira una img de un icono xd"
                            />

                            <ItemMenu
                                name={'Mantenimiento'}
                                icono=""
                                onClick={() => setMostrar(!mostrar)}

                            >
                                {!!mostrar &&
                                    <SubMenuItem>
                                        <ItemMenu
                                            link={'mantenimiento-tipo-documento'}
                                            name="Tipo de documento"
                                            icono="icono"
                                        />

                                        <ItemMenu
                                            link={'mantenimiento-cliente'}
                                            name="Cliente"
                                            icono="icono"
                                        />

                                        <ItemMenu
                                            link={'mantenimiento-producto'}
                                            name="Producto"
                                            icono="icono"
                                        />

                                        <ItemMenu
                                            link={'mantenimiento-usuarios'}
                                            name="Usuario"
                                            icono="icono"
                                        />

                                        <ItemMenu
                                            link={'mantenimiento-laboratorio'}
                                            name="Laboratorio"
                                            icono="icono"
                                        />

                                        <ItemMenu
                                            link={'mantenimiento-moneda'}
                                            name="Moneda"
                                            icono="icono"
                                        />

                                        <ItemMenu
                                            link={'mantenimiento-proveedor'}
                                            name="Proveedor"
                                            icono="icono"
                                        />

                                    </SubMenuItem>
                                }


                            </ItemMenu >

                        </div>

                    </div>

                </div>

            </>
        );

    }

}

const routes = [];



export { Main };