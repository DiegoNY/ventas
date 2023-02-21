import React, { useEffect } from 'react';
import { useAuth } from '../../auth/auth';
import { ItemMenu } from './ItemMenu';
import { SubMenuItem } from './SubMenuItem';
import icono_menu from './img/icono-menu.svg'
import { useLocalStorage } from '../../routes/useLocalStorage';
import { useMain } from './useMain';


function Main() {

    const comprimirs = useMain();
    console.log(comprimirs);

    const [mostrar, setMostrar] = React.useState(false);
    const [comprimir, setComprimir] = React.useState(false);
    const [mostrarSubMenuCaja, setmostrarSubMenuCaja] = React.useState(false);
    const [mostrarVentas, setMostrarVentas] = React.useState(false);
    const [mostrarCompras, setMostrarCompras] = React.useState(false);
    const [blur, setBlur] = React.useState(0);
    const [mostrarApertura, setMostrarApertura] = React.useState(true);
    const [mostrarGastos, setMostrarGastos] = React.useState(false);
    const [mostrarReportes, setMostrarReportes] = React.useState(false);
    const [usuario, setUsuario] = React.useState({});
    const [loadings, setLoading] = React.useState(false);
    const auth = useAuth();

    const {
        item: moneyInBox,
        loading,
        error
    } = useLocalStorage('BOX_V1', []);


    useEffect(() => {

        moneyInBox.dinero ? comprimirs.setApertura(true) : comprimirs.setApertura(false);

    }, [moneyInBox])

    useEffect(() => {

        setUsuario({ nombre: auth.user?.nombre, cargo: auth.user?.cargo });

    }, [auth])

    console.log(auth);
    console.log(usuario);
    console.log(comprimirs);

    if (auth.user) {

        return (
            <>

                <div className={`${!!comprimirs.comprimir && 'absolute z-50 sidebar-light  rounded-xl text-slate-800  h-100'}   ${!comprimirs.comprimir && ' sidebar-main-resized sidebar sidebar-light  rounded-xl text-slate-800 sidebar-main sidebar-expand-sm h-100 '} `}>

                    <div className="sidebar-content h-100">

                        <div className="sidebar-section sidebar-user my-1">
                            <div className="sidebar-section-body">
                                <div
                                    className="media"
                                    onClick={() => comprimirs.setComprimir(!comprimirs.comprimir)}
                                >
                                    <a href="#" className="mr-3">
                                        <img src="http://192.168.1.110:8080/imagen/imagen-usuario-fake.jpg" className="rounded-circle sidebar-main-resize" alt="" />
                                    </a>

                                    <div className="media-body">


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

                        <div
                            className="sidebar-section "
                        >

                            <ItemMenu
                                link='home'
                                name="Inicio"
                                icono="fi fi-rs-shop"
                                blur={blur == 18 && 'backdrop-blur-sm bg-white/10'}
                                onClickBlur={() => {
                                    setBlur(18)
                                    comprimirs.setComprimir(true)

                                }}
                            />

                            <ItemMenu
                                name="Caja"
                                icono="fi fi-rr-briefcase"
                                onClick={() => {
                                    setmostrarSubMenuCaja(!mostrarSubMenuCaja)
                                    comprimirs.setComprimir(true)
                                }}
                            >
                                {!!mostrarSubMenuCaja &&
                                    <SubMenuItem>

                                        {!comprimirs.apertura &&
                                            < ItemMenu
                                                link='caja'
                                                name="Apertura"
                                                icono="ICONO"
                                                blur={blur == 19 && 'backdrop-blur-sm bg-white/10'}
                                                onClickBlur={() => setBlur(19)}
                                            />
                                        }

                                        {!!comprimirs.apertura &&
                                            <ItemMenu
                                                link='caja-cierre'
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
                                onClick={() => {
                                    setMostrar(!mostrar)
                                    comprimirs.setComprimir(true)
                                }}

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
                                onClick={() => {
                                    setMostrarVentas(!mostrarVentas)
                                    comprimirs.setComprimir(true)

                                }}
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
                                onClick={() => {
                                    setMostrarCompras(!mostrarCompras)
                                    comprimirs.setComprimir(true)

                                }}

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
                            <ItemMenu
                                name='Gastos'
                                icono='fi fi-rr-shopping-cart-add'
                                onClick={() => {
                                    setMostrarGastos(!mostrarGastos)
                                    comprimirs.setComprimir(true)

                                }}

                            >

                                {!!mostrarGastos &&

                                    <SubMenuItem>
                                        <ItemMenu
                                            name='Registrar gastos'
                                            link='gastos'
                                            blur={blur == 7 && 'backdrop-blur-sm bg-white/10'}
                                            onClickBlur={() => setBlur(7)}
                                        />

                                        <ItemMenu
                                            name='Lista gastos'
                                            link='gastos-listado'
                                            blur={blur == 8 && 'backdrop-blur-sm bg-white/10'}
                                            onClickBlur={() => setBlur(8)}
                                        />
                                    </SubMenuItem>
                                }

                            </ItemMenu>
                            <ItemMenu
                                name='Reportes'
                                icono='fi fi-rr-shopping-cart-add'
                                onClick={() => {
                                    setMostrarReportes(!mostrarReportes)
                                    comprimirs.setComprimir(true)

                                }}

                            >

                                {!!mostrarReportes &&

                                    <SubMenuItem>
                                        <ItemMenu
                                            name='Ventas diarias'
                                            link='reporte-ventas'
                                            blur={blur == 7 && 'backdrop-blur-sm bg-white/10'}
                                            onClickBlur={() => setBlur(7)}
                                        />
                                        <ItemMenu
                                            name='Ventas mensuales'
                                            link='reporte-ventas-mensuales'
                                            blur={blur == 7 && 'backdrop-blur-sm bg-white/10'}
                                            onClickBlur={() => setBlur(7)}
                                        />

                                        <ItemMenu
                                            name='Ventas/Compras'
                                            link='reporte-ventas-compras'
                                            blur={blur == 8 && 'backdrop-blur-sm bg-white/10'}
                                            onClickBlur={() => setBlur(8)}
                                        />

                                        <ItemMenu
                                            name='Stock productos'
                                            link='reporte-productos'
                                            blur={blur == 8 && 'backdrop-blur-sm bg-white/10'}
                                            onClickBlur={() => setBlur(8)}
                                        />
                                        <ItemMenu
                                            name='Kardex'
                                            link='reporte-kardex'
                                            blur={blur == 8 && 'backdrop-blur-sm bg-white/10'}
                                            onClickBlur={() => setBlur(8)}
                                        />
                                        <ItemMenu
                                            name='Productos vencidos'
                                            link='reporte-productos-vencidos-vencer'
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


export { Main };