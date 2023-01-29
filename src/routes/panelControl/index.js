import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/auth';
import LineChart from '../../ui/Graficos/Lineal';
import './index.css'
import { getData } from '../useFetch';
import { urlAPI } from '../../config';
import icono_clientes from './img/icono-clientes.svg'
import { CardInformacion } from './cardInformacion';
import { RechartsLineal } from '../../ui/Graficos/LinealRecharts';
import { Cardventa } from './ventas/cards_venta';
import { RechartsBar } from '../../ui/Graficos/BarRecharts';
import { RechartsPie } from '../../ui/Graficos/PieRecharts';


function PanelControl() {

    /**
     * Obteniendo los datos del usuario
     * 
     * @navigate funcion que cambia las rutas  
     */

    const navigate = useNavigate();
    const auth = useAuth();

    if (!auth.user) navigate('/');

    //Grafico info 
    const [userData, setUserData] = useState({
        labels: ["Mat 10", "May 11", "May 12", "May 13", "May 14", "May 14", "May 14", "May 14"],
        datasets: [{
            data: [8, 7, 8, 2, 2.3, 2, 9, 6],
            backgroundColor: 'transparent',
            borderColor: '#f26c6d',
            pointBorderColor: 'transparent',
            pointBorderWidth: 4,
            tension: 0.5

        }]
    })

    const options = {
        plugins: {
            legend: false
        },
        scales: {
            x: {
                grid: {
                    display: false,
                }
            },
            y: {
                min: 0,
                max: 10,
                ticks: {
                    stepSize: 2,
                    callback: (value) => value + 'k'
                },
                grid: {
                    display: false,

                }

            },

        }

    };

    const [venta, setVenta] = useState(0);
    const [producto, setProducto] = useState(0);
    const [compras, setCompras] = useState(0);
    const [clientes, setClientes] = React.useState(0)

    const [estadosTabs, setEstadosTabs] = React.useState(0)

    //funciones
    const cambiarTab = (tab) => {
        setEstadosTabs(tab);
    }

    const [fecha, setFecha] = useState('Enero 18th , 2022');



    useEffect(() => {

        const objFecha = new Date();

        let mesString = objFecha.toLocaleDateString("es-ES", {
            month: 'long',
        })

        let dia = objFecha.toLocaleDateString("es-ES", {
            day: 'numeric',
        })

        let año = objFecha.toLocaleDateString("es-ES", {
            year: 'numeric',
        })
        let mesArr = mesString.split('');

        let mesComplementario = '';
        mesArr.map((mes, index) => {

            if (index != 0) {
                mesComplementario = mesComplementario + mes;
            }
        })

        let fecha = `${mesArr[0].toUpperCase() + mesComplementario} ${dia}th , ${año}`;
        setFecha(fecha);

    }, [])


    //Data Necesaria 

    useEffect(() => {



        const obtenerDataVenta = async () => {
            const dataVentas = await getData(`${urlAPI.Venta.url}`);
            const venta = dataVentas.length;

            setVenta(venta);

        }

        const obtenerDataProductos = async () => {
            const dataProductos = await getData(`${urlAPI.Producto.url}`);
            const producto = dataProductos.length;
            setProducto(producto);
        }

        const obtenerDataCompras = async () => {
            const dataCompras = await getData(`${urlAPI.ListaCompra.url}`);
            const compras = dataCompras.length;

            setCompras(compras);
        }

        const obtenerDataClientes = async () => {
            const dataClientes = await getData(`${urlAPI.Cliente.url}`);
            const clientes = dataClientes[0].body.length;
            setClientes(clientes);
        }



        obtenerDataClientes();
        obtenerDataVenta();
        obtenerDataProductos();
        obtenerDataCompras();

        return;

    }, [])

    return (

        <>

            <div
                className='
                    grid
                    grid-cols-12
                    h-screen
                    mx-auto
                    w-full
                '
            >
                <div
                    className='
                        col-span-12
                        //bg-red-200
                        row-span-1
                        flex
                        justify-between
                        mx-2
                        my-3
                    '
                >
                    <div
                        className='
                            font-black
                            text-lg
                            h-full
                            flex
                            justify-center
                            flex-col
                        '
                    >
                        <h1 className='ml-2'>PANEL CONTROL</h1>
                        <p className='font-normal text-xs ml-2'>Bienvenido a tu panel control</p>
                    </div>
                    <p>Enero 12th 2023</p>
                </div>

                <div
                    className='
                        col-span-12
                        row-span-2
                        //bg-green-100
                        grid
                        grid-cols-4
                        mb-2
                    '
                >

                    <CardInformacion
                        icono={icono_clientes}
                        numero={clientes}
                        informacion={'Clientes registrados'}
                    >
                        <RechartsPie />
                    </CardInformacion>
                    <CardInformacion
                        icono={icono_clientes}
                        numero={venta}
                        informacion='Ventas realizadas '
                    >
                        <RechartsPie
                            fill={'#82ca9d'}
                        />
                    </CardInformacion>
                    <CardInformacion
                        icono={icono_clientes}
                        numero={producto}
                        informacion='Productos registrados'
                    >
                        <RechartsPie />
                    </CardInformacion>
                    <CardInformacion
                        icono={icono_clientes}
                        numero={compras}
                        informacion='Compras realizadas'
                    >
                        <RechartsPie
                            fill={'#82ca9d'}
                        />
                    </CardInformacion>


                </div>
                <div
                    className='
                        col-span-12
                        row-span-6
                        //bg-green-600
                        grid
                        grid-cols-3

                    '
                >
                    <div
                        className='
                            bg-slate-700
                            col-span-2
                            row-span-4
                            flex
                            rounded-sm
                            mx-2
                            mb-2

                        '
                    >
                        <div
                            className='mx-auto  w-full'
                            style={{ height: '150px' }}
                        >
                            <h1 className=' text-white mt-2 ml-2 mb-4'>Productos mas vendidos</h1>
                            <RechartsLineal />

                        </div>

                    </div>
                    <div
                        className='
                            bg-slate-700
                            rounded-sm
                            row-span-4
                            mb-2
                            mr-2

                        '
                    >
                        <h1 className='text-white  ml-3 mt-2 mb-1'>Ventas recientes</h1>
                        <div
                            className='scroll-content'
                        >

                            <Cardventa />
                            <Cardventa />
                            <Cardventa />
                            <Cardventa />
                        </div>
                    </div>

                    <div
                        className='
                            rounded-sm
                            bg-slate-700
                            mx-2
                            flex
                            flex-col
                        '
                    >
                        <h1 className='text-white ml-2 my-2'>Stock productos</h1>
                        <div
                            className='
                                w-full
                            '
                        >
                            <RechartsBar />
                        </div>


                    </div>
                    <div
                        className='
                            bg-slate-700
                            mx-2
                            rounded-sm
                        '
                    >

                    </div>
                    <div
                        className='
                            bg-slate-700
                            ml-1
                            mr-2
                            rounded-sm
                           
                        '
                    >

                    </div>

                </div>

            </div>


        </>

    );

}

export { PanelControl }