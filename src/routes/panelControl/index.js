import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/auth';
import BarChart from '../../ui/Graficos';
import { UserDat } from '../../ui/Graficos/data';
import imgventas from './img/imagen-venta.png';
import imgproductos from './img/imagen-productos.png';
import imgclientes from './img/imagen-clientes.png';
import imgcompras from './img/imagen-compras.png';
import imgojoproductos from './img/icono-ojo-productos.svg'


function PanelControl() {

    /**
     * Obteniendo los datos del usuario
     * 
     * @navigate funcion que cambia las rutas  
     */

    const navigate = useNavigate();
    const auth = useAuth();

    if (!auth.user) navigate('/');

    const [userData, setUserData] = useState({
        labels: UserDat.map((data) => data.year),
        datasets: [{
            label: "Productos mas vendidos",
            data: UserDat.map((data) => data.useGain),

        }]
    })

    const [informacionPrincipal, setInformacionPrincipal] = React.useState({
        ventas: 150,
        productos: 15,
        compras: 12,
        clientes: 11

    })

    const [estadosTabs, setEstadosTabs] = React.useState({

        ventas: true,
        productos: false,
        compras: false,
        clientes: false,

    })

    return (

        <>

            <div
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
                                font-bold
                            '
                        >
                            Panel control
                        </h1>

                        <span
                            className='
                                text-sky-500
                                font-semibold
                            '
                        >
                            Enero 18th , 2022
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
                                        {informacionPrincipal.ventas}
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
                                        {informacionPrincipal.productos}
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
                                        {informacionPrincipal.compras}
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
                                        {informacionPrincipal.clientes}
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
                        col-span-7
                        row-span-6
                        grid
                        grid-cols-7
                        grid-rows-6
                    '
                >
                    <div
                        className='
                            bg-yellow-400
                            col-span-10
                            mx-3
                        '
                    >

                    </div>
                    <div
                        className='
                            bg-red-200
                            row-start-2
                            col-span-10
                            row-span-2
                            mx-3
                            my-2
                        '
                    >

                    </div>

                    <div
                        className='
                                row-span-3
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
                                    //bg-white
                                    mx-2
                                    mt-1
                                    flex
                                    justify-center  
                                '
                        >
                            <span
                                className='
                                        mx-2
                                        cursor-pointer
                                        hover:text-gray-500
                                        border-b-4
                                        hover:border-b-indigo-500
                                    '
                            >
                                Ventas
                            </span>
                            <span
                                className='
                                     mx-2
                                     cursor-pointer
                                     hover:text-gray-500
                                     border-b-4
                                     hover:border-b-indigo-500
                                 '
                            >
                                Productos
                            </span>
                            <span
                                className='
                                     mx-2
                                     cursor-pointer
                                     hover:text-gray-500
                                     border-b-4
                                     hover:border-b-indigo-500
                                 '
                            >
                                Compras
                            </span>
                            <span

                                className='
                                     mx-2
                                     cursor-pointer
                                     hover:text-gray-500
                                     border-b-4
                                     hover:border-b-indigo-500
                                     
                                 '
                            >
                                Clientes
                            </span>
                        </div>

                        <div
                            className='
                                    h-full
                                    grid
                                    grid-cols-12
                                    grid-rows-6
                                '
                        >
                            <div
                                className='
                                        col-span-12
                                        row-span-6
                                        //bg-gray-200
                                        mx-3
                                        my-2
                                        flex
                                        flex-col
                                        rounded-sm
    
                                    '
                            >

                                {!!estadosTabs.ventas && !estadosTabs.compras && !estadosTabs.productos &&
                                    <div
                                        className='
                                hover:bg-gray-200
                                //bg-white
                                mx-1
                                my-1
                                h-50
                                w-48
                                rounded-sm
                                shadow-sm
                                grid
                                grid-rows-6
                                                                        
                            '
                                    >

                                        <span
                                            className='
                                    font-sans
                                    font-semibold
                                    mt-3
                                    mx-2
                                '
                                        >
                                            Usuario : 1
                                        </span>

                                        <span
                                            className='
                                    font-sans
                                    font-semibold
                                    mt-3
                                    mx-2
                                '
                                        >
                                            Fecha : 12/12/1212
                                        </span>
                                        <span
                                            className='
                                    font-sans
                                    font-semibold
                                    mt-3
                                    mx-2
                                '
                                        >
                                            Codigo : B001-00007150
                                        </span>
                                        <span
                                            className='
                                    font-sans
                                    font-semibold
                                    mt-3
                                    mx-2
                                '
                                        >
                                            Total : 150
                                        </span>

                                        <span
                                            className='
                                    font-sans
                                    font-semibold
                                    mt-3
                                    mx-2
                                        flex
                                    '
                                        >
                                            Productos :
                                            <img
                                                src={imgojoproductos}
                                                className='
                                        h-4
                                       
                                        cursor-pointer
                                        hover:bg-orange-200
                                        roundered-xl                                                
                                    '
                                            />

                                        </span>



                                    </div>
                                }

                                {!!estadosTabs.compras && !estadosTabs.ventas && !estadosTabs.productos &&

                                    1234

                                }

                            </div>

                        </div>

                    </div>




                </div>

            </div>

            {/* Ejemplo de grafico */}
            <div className='card inactive'>

                Panel de control
                <div className='w-50 h-60'>
                    <BarChart chartData={userData} />
                </div>

            </div>
        </>

    );

}

export { PanelControl }