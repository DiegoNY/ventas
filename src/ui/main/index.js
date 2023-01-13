import React from 'react';
import { useAuth } from '../../auth/auth';
import { ItemMenu } from './ItemMenu';
import { SubMenuItem } from './SubMenuItem';


function Main() {
    const [mostrar, setMostrar] = React.useState(false);
    const [comprimir, setComprimir] = React.useState(false);
    const [mostrarSubMenuCaja, setmostrarSubMenuCaja] = React.useState(false);
    const [mostrarVentas, setMostrarVentas] = React.useState(false);
    const [mostrarCompras, setMostrarCompras] = React.useState(false);

    const auth = useAuth();

    if (auth.user) {

        return (
            <>
                <div className={`sidebar sidebar-dark sidebar-main sidebar-expand-sm h-screen ${!!comprimir && ' sidebar-main-resized '} `}>

                    <div className="sidebar-content h-screen">

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
                                icono="fi fi-rs-shop"
                            />

                            <ItemMenu
                                name="Caja"
                                icono="fi fi-rr-briefcase"
                                onClick={() => setmostrarSubMenuCaja(!mostrarSubMenuCaja)}
                            >
                                {!!mostrarSubMenuCaja &&
                                    <SubMenuItem>
                                        <ItemMenu
                                            link='caja'
                                            name="Apertura"
                                            icono="ICONO"
                                        />
                                        <ItemMenu
                                            link='caja-cierre'
                                            name="Cierre"
                                            icono="ICONO"
                                        />
                                        <ItemMenu
                                            link='caja-reporte'
                                            name="Reporte"
                                            icono="ICONO"
                                        />
                                    </SubMenuItem>

                                }

                            </ItemMenu>

                            <ItemMenu
                                name={'Mantenimiento'}
                                icono="fi fi-rr-settings"
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
                                        />

                                        <ItemMenu
                                            link={'mantenimiento-producto'}
                                            name="Producto"
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

                            <ItemMenu
                                name='Ventas'
                                icono="fi fi-rs-shop"
                                onClick={() => setMostrarVentas(!mostrarVentas)}
                            >
                                {!!mostrarVentas &&
                                    <SubMenuItem>
                                        <ItemMenu
                                            link='venta-punto_venta'
                                            name='Punto de venta'

                                        />
                                        <ItemMenu
                                            link='venta-lista_venta'
                                            name='Lista de ventas'

                                        />
                                        <ItemMenu
                                            link='venta-productos_mas_vendidos'
                                            name='Productos mas vendidos'
                                        />
                                        <ItemMenu
                                            link='venta-nota_salida'
                                            name='Nota de salida'
                                        />
                                        <ItemMenu
                                            link='venta-listado_salida'
                                            name='Lista salida'
                                        />
                                    </SubMenuItem>
                                }

                            </ItemMenu>

                            <ItemMenu
                                name='Compras'
                                icono='fi fi-rr-shopping-cart-add'
                                onClick={() => setMostrarCompras(!mostrarCompras)}
                            >

                                {!!mostrarCompras &&

                                    <SubMenuItem>
                                        <ItemMenu
                                            name='Registrar compras'
                                            link='compras-registro_compras'
                                        />

                                        <ItemMenu
                                            name='Lista compra'
                                            link='compras-lista_compras'
                                        />
                                    </SubMenuItem>
                                }

                            </ItemMenu>

                        </div>

                    </div>

                </div>

            </>
        );

    }

}

const routes = [];



export { Main };