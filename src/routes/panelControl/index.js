import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/auth';
import LineChart from '../../ui/Graficos/Lineal';
import './index.css'
import { getData } from '../useFetch';
import { urlAPI } from '../../config';
import icono_clientes from './img/icono-clientes.svg';
import icono_carrito_compras from './img/icono-carrito-compras.svg';
import icono_producto from './img/icono-productos.svg';
import icono_ventas from './img/icono-ventas.svg';
import { CardInformacion } from './cardInformacion';
import { RechartsLineal } from '../../ui/Graficos/LinealRecharts';
import { Cardventa } from './ventas/cards_venta';
import { RechartsBar } from '../../ui/Graficos/BarRecharts';
import { RechartsPie } from '../../ui/Graficos/PieRecharts';
import { CardCompra } from './compras/card_compras';
import { Tabventa } from './ventas';
import { Tabcompra } from './compras';


function PanelControl() {

    /**
     * Obteniendo los datos del usuario
     * 
     * @navigate funcion que cambia las rutas  
     */

    const navigate = useNavigate();
    const auth = useAuth();

    if (!auth.user) navigate('/');

    const [venta, setVenta] = useState(0);
    const [producto, setProducto] = useState(0);
    const [compras, setCompras] = useState(0);
    const [clientes, setClientes] = React.useState(0)

    //funciones


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
                        <h1 className='ml-2 text-2xl sm:text-2xl font-extrabold text-slate-900 tracking-tight font-sans '>PANEL CONTROL</h1>
                        <p className='font-normal text-sm ml-2 '>Bienvenido a tu panel control</p>
                    </div>
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
                        navigation={'/mantenimiento-cliente'}
                    >
                        <RechartsPie />
                    </CardInformacion>
                    <CardInformacion
                        icono={icono_ventas}
                        numero={venta}
                        informacion='Ventas realizadas '
                        navigation={'/venta-punto_venta'}
                    >
                        <RechartsPie
                            fill={'#82ca9d'}
                        />
                    </CardInformacion>
                    <CardInformacion
                        icono={icono_producto}
                        numero={producto}
                        informacion='Productos registrados'
                        navigation={'/mantenimiento-producto'}

                    >
                        <RechartsPie />
                    </CardInformacion>
                    <CardInformacion
                        icono={icono_carrito_compras}
                        numero={compras}
                        informacion='Compras realizadas'
                        navigation={'/compras-registro_compras'}

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
                            className='mx-auto  w-full  '
                            style={{ height: '150px' }}
                        >
                            <h1 className=' text-white mt-2 ml-2 mb-4 font-semibold'>Ventas diarias</h1>
                            <RechartsLineal
                                datos={[
                                    { name: 'Lunes', Ventas: 20 },
                                    { name: 'Martes', Ventas: 100 },
                                    { name: 'Miercoles', Ventas: 100 },
                                    { name: 'Jueves', Ventas: 380 },
                                    { name: 'Viernes', Ventas: 100 },
                                ]}

                                dataKey={[
                                    {
                                        name: 'Ventas',
                                        stroke: '#8884d8'
                                    }
                                ]}
                            />

                        </div>

                    </div>
                    <Tabventa />

                    <div
                        className='
                            rounded-sm
                            bg-slate-700
                            mx-2
                            flex
                            flex-col
                        '
                    >
                        <h1 className='text-white ml-2 my-2 font-semibold'>Productos con stock mas bajo</h1>
                        <div
                            className='
                                w-full
                                mt-2
                            '
                        >
                            <RechartsBar

                            />
                        </div>


                    </div>
                    <Tabcompra />
                    <div
                        className='
                            bg-slate-700
                            ml-1
                            mr-2
                            rounded-sm
                        '
                    >
                        <h1 className='text-white mt-2 ml-2 mb-1 font-semibold'>Tipo de clientes</h1>
                        <div
                            className=''
                        >
                            <div
                                className='
                                    mb-auto
                                    
                                '
                            >
                                <RechartsPie
                                    innerRadius={43}
                                    outerRadius={80}
                                    tooltip={true}
                                    data={[{ name: 'DNI', value: 10 }, { name: 'RUC', value: 30 }, { name: 'VARIOS', value: 1 }]}
                                    colors={['#fde68a', '#82ca9d']}
                                    label={true}
                                />

                                <div
                                    className='
                                    flex
                                    text-white
                                    w-full
                                    justify-center
                                    text
                                    font-medium 
                                    italic  
                                  '
                                >
                                    <p className='mx-2 text-green-300'>RUC</p> <p className='mx-2 text-yellow-200'>DNI</p> <p className='mx-2 text-indigo-300'>VARIOS</p>
                                </div>
                            </div>



                        </div>
                    </div>

                </div>

            </div>


        </>

    );

}

export { PanelControl }