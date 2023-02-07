import React, { useEffect } from 'react';
import { useAuth } from '../../auth/auth';
import { ItemMenu } from './ItemMenu';
import { SubMenuItem } from './SubMenuItem';
import icono_menu from './img/icono-menu.svg'
import { useLocalStorage } from '../../routes/useLocalStorage';


function Main() {
    const [mostrar, setMostrar] = React.useState(false);
    const [comprimir, setComprimir] = React.useState(false);
    const [mostrarSubMenuCaja, setmostrarSubMenuCaja] = React.useState(false);
    const [mostrarVentas, setMostrarVentas] = React.useState(false);
    const [mostrarCompras, setMostrarCompras] = React.useState(false);
    const [blur, setBlur] = React.useState(0);
    const [mostrarApertura, setMostrarApertura] = React.useState(true);
    const [usuario, setUsuario] = React.useState({});
    const [loadings, setLoading] = React.useState(false);
    const auth = useAuth();

    const {
        item: moneyInBox,
        loading,
        error
    } = useLocalStorage('BOX_V1', []);


    useEffect(() => {

        if (!loading) {
            moneyInBox.dinero_apertura ? setMostrarApertura(false) : setMostrarApertura(true);
        }

    }, [moneyInBox])

    useEffect(() => {

        auth.loading ? setLoading(true) : setUsuario({ nombre: auth.user?.nombre, cargo: auth.user?.cargo });

    }, [auth])

    if (auth.user) {

        return (
            <>
                <div className={`${!!comprimir && 'absolute z-50 sidebar-light  rounded-xl text-slate-800  h-screen'}   ${!comprimir && ' sidebar-main-resized sidebar sidebar-light  rounded-xl text-slate-800 sidebar-main sidebar-expand-sm h-screen '} `}>

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
                                        </button>

                                        <button type="button" className="btn btn-outline-light-100 text-white border-transparent btn-icon rounded-pill btn-sm sidebar-mobile-main-toggle d-lg-none">
                                            <i className="icon-cross2"></i>
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="sidebar-section ">

                            <ItemMenu
                                link='home'
                                name="Inicio"
                                icono="fi fi-rs-shop"
                                blur={blur == 18 && 'backdrop-blur-sm bg-white/10'}
                                onClickBlur={() => setBlur(18)}
                            />

                            <ItemMenu
                                name="Caja"
                                icono="fi fi-rr-briefcase"
                                onClick={() => setmostrarSubMenuCaja(!mostrarSubMenuCaja)}
                            >
                                {!!mostrarSubMenuCaja &&
                                    <SubMenuItem>

                                        {mostrarApertura &&
                                            <ItemMenu
                                                link='caja'
                                                name="Apertura"
                                                icono="ICONO"
                                                blur={blur == 19 && 'backdrop-blur-sm bg-white/10'}
                                                onClickBlur={() => setBlur(19)}
                                            />
                                        }

                                        {!mostrarApertura &&
                                            <ItemMenu
                                                link='caja?cierre'
                                                name="Cierre"
                                                icono="ICONO"
                                                blur={blur == 17 && 'backdrop-blur-sm bg-white/10'}
                                                onClickBlur={() => setBlur(17)}
                                            />
                                        }


                                        <ItemMenu
                                            link='caja-reporte'
                                            name="Reporte"
                                            icono="ICONO"
                                            blur={blur == 16 && 'backdrop-blur-sm bg-white/10'}
                                            onClickBlur={() => setBlur(16)}
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
                                            blur={blur == 15 && 'backdrop-blur-sm bg-white/10'}
                                            onClickBlur={() => setBlur(15)}
                                        />

                                        <ItemMenu
                                            link={'mantenimiento-cliente'}
                                            name="Cliente"
                                            blur={blur == 14 && 'backdrop-blur-sm bg-white/10'}
                                            onClickBlur={() => setBlur(14)}
                                        />

                                        <ItemMenu
                                            link={'mantenimiento-producto'}
                                            name="Producto"
                                            blur={blur == 13 && 'backdrop-blur-sm bg-white/10'}
                                            onClickBlur={() => setBlur(13)}
                                        />

                                        <ItemMenu
                                            link={'mantenimiento-usuarios'}
                                            name="Usuario"
                                            icono="icono"
                                            blur={blur == 12 && 'backdrop-blur-sm bg-white/10'}
                                            onClickBlur={() => setBlur(12)}
                                        />

                                        <ItemMenu
                                            link={'mantenimiento-laboratorio'}
                                            name="Laboratorio"
                                            icono="icono"
                                            blur={blur == 11 && 'backdrop-blur-sm bg-white/10'}
                                            onClickBlur={() => setBlur(11)}
                                        />

                                        <ItemMenu
                                            link={'mantenimiento-moneda'}
                                            name="Moneda"
                                            icono="icono"
                                            blur={blur == 10 && 'backdrop-blur-sm bg-white/10'}
                                            onClickBlur={() => setBlur(10)}
                                        />

                                        <ItemMenu
                                            link={'mantenimiento-proveedor'}
                                            name="Proveedor"
                                            icono="icono"
                                            blur={blur == 9 && 'backdrop-blur-sm bg-white/10'}
                                            onClickBlur={() => setBlur(9)}
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
                                            blur={blur == 1 && 'backdrop-blur-sm bg-white/10'}
                                            onClickBlur={() => setBlur(1)}
                                        />
                                        <ItemMenu
                                            link='venta-lista_venta'
                                            name='Lista de ventas'
                                            blur={blur == 2 && 'backdrop-blur-sm bg-white/10'}
                                            onClickBlur={() => setBlur(2)}

                                        />
                                        <ItemMenu
                                            link='venta-productos_mas_vendidos'
                                            name='Productos mas vendidos'
                                            blur={blur == 3 && 'backdrop-blur-sm bg-white/10'}
                                            onClickBlur={() => setBlur(3)}

                                        />
                                        <ItemMenu
                                            link='venta-nota_salida'
                                            name='Nota de salida'
                                            blur={blur == 4 && 'backdrop-blur-sm bg-white/10'}
                                            onClickBlur={() => setBlur(4)}

                                        />
                                        <ItemMenu
                                            link='venta-listado_salida'
                                            name='Lista salida'
                                            blur={blur == 5 && 'backdrop-blur-sm bg-white/10'}
                                            onClickBlur={() => setBlur(5)}
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
                                            blur={blur == 7 && 'backdrop-blur-sm bg-white/10'}
                                            onClickBlur={() => setBlur(7)}
                                        />

                                        <ItemMenu
                                            name='Lista compra'
                                            link='compras-lista_compras'
                                            blur={blur == 8 && 'backdrop-blur-sm bg-white/10'}
                                            onClickBlur={() => setBlur(8)}
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