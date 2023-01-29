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
                    />
                    <CardInformacion
                        icono={icono_clientes}
                        numero={venta}
                        informacion='Ventas realizadas '
                    />
                    <CardInformacion
                        icono={icono_clientes}
                        numero={producto}
                        informacion='Productos registrados'
                    />
                    <CardInformacion
                        icono={icono_clientes}
                        numero={compras}
                        informacion='Compras realizadas'
                    />


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
                            {/* <LineChart chartData={userData} options={options} /> */}
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
                        <h1 className='text-white  ml-3 mt-2 mb-1'>Ventas Recientes</h1>

                        <Cardventa />
                        <Cardventa />
                        <Cardventa />
                        <Cardventa />
                    </div>

                    <div
                        className='
                            bg-green-100
                        '
                    >
                        <div
                            className='
                                mx-auto
                                w-full
                            '
                        >
                            <RechartsBar />
                        </div>


                    </div>
                    <div
                        className='
                            bg-green-200
                        '
                    >

                    </div>
                    <div
                        className='
                            bg-green-300
                        '
                    >

                    </div>

                </div>

            </div>

            {/* <div
                className='
                grid
                grid-cols-12
                auto-rows-auto
                sm:grid-rows-6
                h-screen
                mx-2
               '
            >
                <div
                    className='
                        //bg-indigo-500
                        col-span-12
                        sm:col-span-5
                        row-span-6
                        grid
                        grid-cols-12
                        grid-rows-6
                        
                    '
                >

                    <div
                        className='
                            col-span-12
                            mx-2
                            //bg-red-800
                            flex
                            flex-column
                            justify-center
                        '
                    >
                        <h1
                            className='
                                text-3xl
                                font-black
                            '
                        >
                            Panel control
                        </h1>

                        <span
                            className='
                                text-sky-500
                                font-black
                            '
                        >
                            {fecha}
                        </span>

                    </div>

                    <div
                        className='
                            //bg-yellow-400
                            col-span-12
                            row-span-5
                            mx-3
                            flex
                            flex-col
                        '
                    >

                        <div
                            className='
                                bg-blue-500
                                h-24
                                mx-3
                                rounded-xl
                                mt-2
                                grid
                                grid-rows-4
                                text-white
                                
                            '
                        >
                            <div
                                className='
                                //bg-red-300
                                row-span-3
                                mx-2
                                mt-1
                                grid
                                grid-cols-6
                                grid-rows-3
                            '
                            >
                                <img
                                    src={imgventas}
                                    className='
                                    //bg-red-200
                                    row-span-3
                                    my-1
                                    rounded-lg
                                '
                                />

                                <div
                                    className='
                                    col-span-5
                                    row-span-3
                                    mb-1
                                    ml-1
                                    //bg-white
                                    flex
                                    justify-between
                                    
                                '
                                >
                                    <div
                                        className='
                                            flex 
                                            flex-col
                                        '
                                    >
                                        <h2
                                            className='
                                            text-xl
                                        '
                                        >
                                            Ventas
                                        </h2>
                                        <span
                                            className='
                                           mt-1
                                        '
                                        >
                                            Ventas efectuadas

                                        </span>
                                    </div>



                                    <span
                                        className='
                                            my-3
                                            text-3xl
                                            font-semibold
                                        '
                                    >
                                        {venta}
                                    </span>

                                </div>
                            </div>
                            <div
                                className='
                                mb-1
                                mx-2
                                h-1
                                rounded-xl
                                bg-white
                            '
                            >
                            </div>

                        </div>
                        <div
                            className='
                                bg-fuchsia-400
                                h-24
                                mx-3
                                grid
                                grid-rows-4
                                rounded-xl
                                mt-2
                            '
                        >
                            <div
                                className='
                                //bg-red-300
                                row-span-3
                                mx-2
                                mt-1
                                grid
                                grid-cols-6
                                grid-rows-3
                                text-white
                            '
                            >
                                <img
                                    src={imgproductos}
                                    className='
                                    //bg-red-200
                                    row-span-3
                                    mb-1
                                    rounded-lg
                                '
                                />



                                <div
                                    className='
                                    col-span-5
                                    row-span-3
                                    mb-1
                                    ml-1
                                    //bg-white
                                    flex
                                    justify-between
                                '
                                >
                                    <div
                                        className='
                                            flex 
                                            flex-col
                                        '
                                    >
                                        <h2
                                            className='
                                            text-xl
                                        '
                                        >
                                            Productos
                                        </h2>
                                        <span
                                            className='
                                           mt-1
                                        '
                                        >
                                            Productos registrados

                                        </span>
                                    </div>



                                    <span
                                        className='
                                            my-3
                                            text-3xl
                                            font-semibold
                                        '
                                    >
                                        {producto}
                                    </span>
                                </div>
                            </div>
                            <div
                                className='
                                mb-1
                                mx-2
                                h-1
                                rounded-xl
                                bg-white
                               
                            '
                            >
                            </div>
                        </div>
                        <div
                            className='
                                bg-yellow-300
                                h-24
                                mx-3
                                grid
                                grid-rows-4
                                rounded-xl
                                mt-2
                            '
                        >
                            <div
                                className='
                                //bg-red-300
                                row-span-3
                                mx-2
                                mt-1
                                grid
                                grid-cols-6
                                grid-rows-3
                                
                            '
                            >
                                <img
                                    src={imgcompras}
                                    className='
                                    //bg-red-200
                                    row-span-3
                                    mb-1
                                    rounded-lg
                                '
                                />


                                <div
                                    className='
                                    col-span-5
                                    row-span-3
                                    mb-1
                                    ml-1
                                    //bg-white
                                    flex
                                    justify-between
                                '
                                >
                                    <div
                                        className='
                                            flex 
                                            flex-col
                                        '
                                    >
                                        <h2
                                            className='
                                            text-xl
                                        '
                                        >
                                            Compras
                                        </h2>
                                        <span
                                            className='
                                             mt-1
                                             text-gray-700
                                            '
                                        >
                                            Compras registradas

                                        </span>
                                    </div>



                                    <span
                                        className='
                                            my-3
                                            text-3xl
                                            font-semibold
                                        '
                                    >
                                        {compras}
                                    </span>
                                </div>
                            </div>
                            <div
                                className='
                                mb-1
                                mx-2
                                h-1
                                rounded-xl
                                bg-white
                            '
                            >

                            </div>
                        </div>
                        <div
                            className='
                                bg-red-400
                                h-24
                                mx-3
                                grid
                                grid-rows-4
                                rounded-xl
                                mt-2
                            '
                        >
                            <div
                                className='
                                //bg-red-300
                                row-span-3
                                mx-2
                                mt-1
                                grid
                                grid-cols-6
                                grid-rows-3
                                text-white
                            '
                            >
                                <img
                                    src={imgclientes}
                                    className='
                                    //bg-red-200
                                    row-span-3
                                    mb-1
                                    rounded-lg
                                '
                                />


                                <div
                                    className='
                                    col-span-5
                                    row-span-3
                                    mb-1
                                    ml-1
                                    //bg-white
                                    flex
                                    justify-between
                                '
                                >
                                    <div
                                        className='
                                            flex 
                                            flex-col
                                        '
                                    >
                                        <h2
                                            className='
                                            text-xl
                                        '
                                        >
                                            Clientes
                                        </h2>
                                        <span
                                            className='
                                           mt-1
                                        '
                                        >
                                            clientes registrados

                                        </span>
                                    </div>



                                    <span
                                        className='
                                            my-3
                                            text-3xl
                                            font-semibold
                                        '
                                    >
                                        {clientes}
                                    </span>
                                </div>
                            </div>
                            <div
                                className='
                                mb-1
                                mx-2
                                h-1
                                rounded-xl
                                bg-white
                                flex
                                justify-between
                            '
                            >

                            </div>
                        </div>

                    </div>

                </div>
                <div
                    className='
                        //bg-red-400
                        col-span-12
                        sm:col-span-7
                        row-span-6
                        grid
                        grid-cols-7
                        grid-rows-6
                    '
                >
                    <div
                        className='
                            //bg-yellow-400
                            col-span-10
                            grid
                           
                            sm:grid-cols-12
                            grid-rows-3
                            row-span-1
                            mx-3
                        '
                    >
                        <div
                            className='
                                bg-amber-500
                                col-span-12
                                row-span-2
                                my-1
                                mx-3
                            '
                        >

                        </div>

                        <div
                            className='
                            //bg-red-200
                            col-span-12
                            mb-1
                          '
                        >

                            <span
                                className='
                                    text-lg
                                    text-slate-400
                                '
                            >
                                Informacion reciente
                            </span>

                        </div>

                    </div>

                    <div
                        className='
                                row-span-5
                                col-span-7
                                //bg-orange-500
                                mb-1
                                mx-1
                                flex
                                flex-col
                              
                            '
                    >
                        <div
                            className='
                                    h-10
                                    //bg-red-400
                                    mx-2
                                    mt-1
                                    grid
                                    grid-cols-4
                                    sm:grid-cols-7
                                '
                        >
                            <span
                                className={`
                                    //bg-red-200
                                    cursor-pointer
                                    text-gray-400
                                    rounded-lg
                                    flex
                                    justify-center
                                    ${estadosTabs == 0 && 'text-dark border-b-4'} 

                                `}
                                onClick={() => cambiarTab(0)}
                            >
                                <span className='mt-1'>Ventas</span>
                            </span>
                            <span
                                className={`
                                cursor-pointer
                                text-gray-400
                                hover:border-b-4
                                rounded-lg
                                flex
                                justify-center
                                ${estadosTabs == 1 && 'text-dark border-b-4'} 

                                 `}
                                onClick={() => cambiarTab(1)}

                            >
                                <span className='mt-1'>Productos</span>
                            </span>
                            <span
                                className={
                                    `
                                        cursor-pointer
                                        text-gray-400
                                        hover:border-b-4
                                        rounded-lg
                                        flex
                                        justify-center
                                        ${estadosTabs == 2 && 'text-dark border-b-4'} 

                                    `
                                }
                                onClick={() => cambiarTab(2)}

                            >
                                <span className='mt-1'>Compras</span>
                            </span>
                            <span

                                className={
                                    `
                                    cursor-pointer
                                    text-gray-400
                                    hover:border-b-4
                                    rounded-lg
                                    flex
                                    justify-center
                                    ${estadosTabs == 3 && 'text-dark border-b-4'} 
                                    `
                                }
                                onClick={() => cambiarTab(3)}

                            >
                                <span className='mt-1'>Clientes</span>

                            </span>
                        </div>

                        {estadosTabs == 0 &&

                            <Tabventa
                                ventas={[]}
                            />
                        }

                        {estadosTabs == 1 &&
                            <Tabproducto />
                        }
                        {estadosTabs == 2 &&

                            <Tabcompra
                                compras={[]}
                            />
                        }
                        {estadosTabs == 3 &&
                            <div
                                className='
                                    scroll-content
                                '
                            >

                            </div>
                        }

                    </div>




                </div>

            </div> */}


        </>

    );

}

export { PanelControl }