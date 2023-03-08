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
            setVentasRecientes(informacion);
        }

        socket.on('ventas_recientes', obtenerVentasRecientes);

        return () => {
            socket.off('ventas_recientes', obtenerVentasRecientes);
        }
    }, [])

    useEffect(() => {

        const getVentasRecientes = async () => {
            const data = await getData(`${urlAPI.Venta.url}?historial=true`)
            setVentasRecientes(data.body);
        }

        const getProductosStockBajo = async () => {
            const dataStockBajo = await getData(`${urlAPI.Producto.url}?stock_minimo=true`);

            setProductosStockBajo({ productos: dataStockBajo })
        }

        getVentasRecientes();
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
                                if (!!contextosGlobales.salida) contextosGlobales.setSalida(false);
                                if (!!contextosGlobales.historial) contextosGlobales.setHistorial(false);
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
                                shadow-md 
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

                            if (!!contextosGlobales.mostrarProductosStockMinimo) contextosGlobales.setMostrarProductosStockMinimo(false);
                            if (!!contextosGlobales.salida) contextosGlobales.setSalida(false);
                            contextosGlobales.setHistorial(true)
                        }}
                    >
                        <h1 className='mt-1 '>Historial de ventas recientes</h1>


                    </div>


                    <div
                        className=" p-2 cursor-pointer text-slate-900 hover:bg-slate-100 rounded-md flex items-center"
                        onClick={() => {
                            if (!!contextosGlobales.mostrarProductosStockMinimo) contextosGlobales.setMostrarProductosStockMinimo(false);
                            if (!!contextosGlobales.historial) contextosGlobales.setHistorial(false);
                            contextosGlobales.setSalida(true)

                        }}
                    >

                        <img className=' rounded-full w-14 p-2  ' src={auth.user.foto || 'http://192.168.1.110:8080/imagen/imagen-usuario-fake.jpg'} />

                        <h1
                            className="mx-2 mb-1.5  text-slate-800 "
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
                            shadow-md 

                        "
                            onMouseLeave={() => setMostrar(!mostrar)}

                        >
                            <div
                                className="dropdown-item flex items-center gap-2 "
                                onClick={() => contextosGlobales.setPerfil(true)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                                <h1 >Mi perfil</h1>
                            </div>
                            <div className="dropdown-divider"></div>
                            <a
                                href="#"
                                onClick={() => auth.logout()}
                                className="dropdown-item flex gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                </svg>
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
                            shadow-lg 

                        '
                            onMouseLeave={() => setMostrarInformacion(!mostrarInformacion)}
                        >
                            {ventasRecientes?.map(venta => {

                                return (

                                    <CardVentasRecientes
                                        usuario={venta?.usuario}
                                        hora={venta?.hora}
                                        total={venta?.venta?.total}
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