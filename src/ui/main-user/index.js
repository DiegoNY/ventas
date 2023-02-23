import React, { useEffect } from 'react';
import { useAuth } from '../../auth/auth';
import { socket, urlAPI } from '../../config';
import { getData } from '../../routes/useFetch';
import { useMain } from '../main/useMain';
import './index.css';
import { CardVentasRecientes } from './ventasRecientes';

function MainUser() {
    const [mostrar, setMostrar] = React.useState(false);

    const auth = useAuth();
    const contextosGlobales = useMain();

    const [tiempo, setTiempo] = React.useState('00:00');
    const [ventasRecientes, setVentasRecientes] = React.useState([]);
    const [mostrarInformacion, setMostrarInformacion] = React.useState(false);

    const [productosStockBajo, setProductosStockBajo] = React.useState({
        mostrar: false,
    });

    useEffect(() => {
        const actualizarFechaHora = () => {
            const objFecha = new Date();
            let horas = objFecha.getHours();
            let minutos = objFecha.getMinutes();
            let segundos = objFecha.getSeconds();
            let seg = segundos.toString().padStart(2, '0');
            let min = minutos.toString().padStart(2, '0');
            const hora = `${horas}: ${min}:${seg}`
            setTiempo(hora)


        }
        setInterval(() => {
            actualizarFechaHora();
        }, 1000)

    }, []);

    useEffect(() => {

        const obtenerVentasRecientes = (informacion) => {
            ventasRecientes.push(informacion);
        }

        socket.on('ventas_recientes', obtenerVentasRecientes);

        return () => {
            socket.off('ventas_recientes', obtenerVentasRecientes);
        }
    }, [])

    useEffect(() => {

        const getProductosStockBajo = async () => {
            const dataStockBajo = await getData(`${urlAPI.Producto.url}?stock_minimo=true`);

            setProductosStockBajo({ productos: dataStockBajo })
        }

        getProductosStockBajo()

    }, [])

    useEffect(() => {

        const informacionStockBajo = (informacion) => {
            console.log(informacion);
        }

        socket.on('productos_stock_bajo', informacionStockBajo);

        return () => {
            socket.off('productos_stock_bajo', informacionStockBajo);
        }
    }, [])


    if (auth.user) {
        return (
            <>


                <div
                    className='
                        text-lg
                        mt-2
                        p-1
                        text-slate-900
                        w-1/2
                    '
                >

                    <div
                        className='ml-14'
                    >
                        <i className="fi fi-rr-moon-stars text-orange-400 text-sm mr-1"></i>
                        {tiempo}
                    </div>
                </div>
                <div
                    className='
                    flex 
                    justify-end
                    w-1/2
                    '
                >
                    <div><span className='absolute ml-3 mt-1 rounded-3xl bg-yellow-400 w-4 flex justify-center items-center '>{productosStockBajo?.productos?.length > 0 ? productosStockBajo?.productos?.length : ""}</span></div>
                    <div
                        className='text-center mt-3 mx-2 cursor-pointer '
                    >
                        <i
                            className='
                         fi fi-rr-bell
                         text-orange-500
                         hover:text-orange-300
                        '
                            onClick={() => {
                                contextosGlobales.setMostrarProductosStockMinimo(true)
                            }}
                        >
                        </i>


                    </div>

                    {contextosGlobales.mostrarProductosStockMinimo &&
                        <div
                            className='
                                bg-white 
                                border 
                                absolute 
                                mt-16 
                                mr-52 
                                w-64 
                                z-30 
                                cursor-pointer 
                                rounded-lg 
                                grid p-1
                                max-h-20
                                overflow-scroll 
                            '
                        >
                            {productosStockBajo?.productos?.map((data, index) => {

                                return (
                                    <div
                                        className={`
                                                bg-slate-100
                                                rounded-xl
                                                p-1
                                                text-center
                                                ${index != 0 && 'mt-1' || ''}
                                            `}
                                    >
                                        <p className='text-slate-600 text-xs font-black'>El producto {data.descripcion} tiene {data.stock_actual} unidades y el stock minimo es de {data.stock_minimo}</p>
                                    </div>
                                )
                            })}

                        </div>
                    }

                    <div
                        className='text-center p-2 cursor-pointer text-slate-900 hover:bg-slate-100 rounded-sm '
                        onClick={() => {
                            contextosGlobales.setHistorial(true)
                        }}
                    >
                        <h1 className='mt-1 '>Historial de ventas recientes</h1>


                    </div>


                    <div
                        className="text-center p-2 cursor-pointer text-slate-900 hover:bg-slate-100 rounded-md"
                        onClick={() => {
                            contextosGlobales.setSalida(true)
                        }}
                    >



                        <h1
                            className="mx-2 mt-1 text-slate-800 "
                        >
                            {auth.user.nombre}
                        </h1>




                    </div>

                    {!!contextosGlobales.salida &&
                        <div
                            className=" 
                          bg-white
                            border
                            z-10
                            absolute
                            rounded-xl
                            mr-2
                            grid
                            mt-16
                            w-40
                        "
                            onMouseLeave={() => setMostrar(!mostrar)}

                        >
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


                    {!!contextosGlobales.historial &&
                        <div
                            className='
                            bg-white
                            border
                            z-10
                            absolute
                            historial-venta-container
                            rounded-xl
                            mt-16
                            mr-14
                            grid
                            scroll-historial
                        '
                            onMouseLeave={() => setMostrarInformacion(!mostrarInformacion)}
                        >
                            {ventasRecientes?.map(venta => {
                                console.log(venta);
                                return (

                                    <CardVentasRecientes
                                        usuario={venta.usuario}
                                        hora={venta.hora}
                                        total={venta.venta.total}
                                    />

                                )
                            })}


                        </div>
                    }

                </div>




            </>



        );

    }


}

export { MainUser };