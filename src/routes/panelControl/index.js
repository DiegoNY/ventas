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
    const [clientes, setClientes] = React.useState(0);
    const [productosStockBajo, setProductoStockBajo] = useState([]);
    const [informacionVentaSemana, setInformacionVentaSemana] = useState(false);
    const [ventasSemanales, setVentasSemanales] = React.useState([
        { name: 'Lunes', Ventas: 0 },
        { name: 'Martes', Ventas: 0 },
        { name: 'Miercoles', Ventas: 0 },
        { name: 'Jueves', Ventas: 0 },
        { name: 'Viernes', Ventas: 0 },
        { name: 'Sabado', Ventas: 0 },
        { name: 'Domingo', Ventas: 0 },
    ])

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



    useEffect(() => {

        const dataProductosStockBajo = async () => {
            const productosData = await getData(`${urlAPI.Producto.url}?stockBajo=4`);
            // console.log(productosData);
            setProductoStockBajo(productosData)


        }

        dataProductosStockBajo();

    }, [])

    useEffect(() => {
        //ventas por semana debes enviar desde hasta que fecha quieres ver 
        const dataVentasSemanales = async () => {

            // Obtenemos la fecha actual
            const hoy = new Date();
            // Obtenemos el número del día de la semana (0 es domingo y 6 es sábado)
            const diaDeLaSemana = hoy.getDay();
            // Calculamos la diferencia entre la fecha actual y el día de hace una semana
            // Si hoy es domingo, restamos 6 días para obtener el día de hace una semana
            // Si no, restamos la diferencia y sumamos 1 para obtener el lunes de la semana pasada
            const diferencia = hoy.getDate() - diaDeLaSemana + (diaDeLaSemana === 0 ? -6 : 0);

            // Establecemos la fecha calculada en la fecha actual y la guardamos en una nueva variable
            const fechaDomingoPasado = new Date(hoy.setDate(diferencia));
            // Mostramos el resultado en la consola
            const formateandoFechaInicio = `${fechaDomingoPasado.getFullYear().toString()}-${fechaDomingoPasado.getMonth() + 1}-${fechaDomingoPasado.getDate()}`;
            let date = new Date(formateandoFechaInicio);
            // Sumar 6 días a la fecha
            date.setDate(date.getDate() + 6);
            // Mostrar la fecha resultante
            let formateandoFechaFin = `${date.getFullYear().toString()}-${date.getMonth() + 1}-${date.getDate()}`;

            //Fecha del dia Domingo que es cuando inicia la semana  
            const fechaInicioSemana = formateandoFechaInicio;
            const fechaFinSemana = formateandoFechaFin;

            const dataVentas = await getData(`${urlAPI.Venta.url}?diarias={"desde":"${fechaInicioSemana}", "hasta":"${fechaFinSemana}"}`);

            console.log(dataVentas);
            const ventas = [];

            //Se ingresan las ventas obtenidas desde la bd y tambien ventas hardcore para poder colocarlas en 0 
            // se les agrega una propiedad name para poder compararlas por el nombre

            dataVentas[0].resultado.map(venta => {
                ventas.push({ ...venta, name: venta._id });
            })
            ventas.push(...ventasSemanales);

            //Se coloca en 0 las ventas que no tengan valores 

            let resultado = {};

            ventas.forEach(venta => {
                if (resultado[venta.name]) {
                    resultado[venta.name] += venta.Ventas || venta.totalVentas || 0
                } else {
                    resultado[venta.name] = venta.Ventas || venta.totalVentas || 0;
                }
            });


            let resultArray = [];
            for (let key in resultado) {
                resultArray.push({ name: key, Ventas: resultado[key] });
            }

            resultArray.sort((a, b) => {
                let dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
                return dias.indexOf(a.name) - dias.indexOf(b.name);
            });

            console.log(resultArray);
            setVentasSemanales(resultArray);


        }

        dataVentasSemanales();
    }, [])
    return (

        <>

            <div
                className='
                    grid
                    grid-cols-8
                    sm:grid-cols-12
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
                        <h1 className='ml-2 text-2xl sm:text-2xl font-extrabold text-slate-900 tracking-tight  '>PANEL CONTROL</h1>
                        <p className='font-normal text-sm ml-2 text-slate-500'>Bienvenido a tu panel control</p>
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
                        color='bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 cursor-pointer hover:shadow-lg'
                    >
                        <div
                            className='
                                w-full
                                text-center
                                text-3xl
                            '
                        >

                            {clientes}
                        </div>
                    </CardInformacion>
                    <CardInformacion
                        icono={icono_ventas}
                        numero={venta}
                        informacion='Ventas realizadas '
                        navigation={'/venta-punto_venta'}
                        color='bg-gradient-to-r from-indigo-300 to-purple-400 cursor-pointer hover:shadow-lg'
                    >
                        <div
                            className='
                                w-full
                                text-center
                                text-3xl
                            '
                        >

                            {venta}
                        </div>
                    </CardInformacion>
                    <CardInformacion
                        icono={icono_producto}
                        numero={producto}
                        informacion='Productos registrados'
                        navigation='/mantenimiento-producto'
                        color='bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 cursor-pointer hover:shadow-lg'

                    >
                        <div
                            className='
                                w-full
                                text-center
                                text-3xl
                            '
                        >

                            {producto}
                        </div>
                    </CardInformacion>
                    <CardInformacion
                        icono={icono_carrito_compras}
                        numero={compras}
                        informacion='Compras realizadas'
                        navigation='/compras-registro_compras'
                        color=' bg-gradient-to-r from-indigo-300 to-purple-400 cursor-pointer hover:shadow-lg hover:'

                    >
                        <div
                            className='
                                w-full
                                text-center
                                text-3xl
                            '
                        >

                            {compras}
                        </div>
                    </CardInformacion>


                </div>
                <div
                    className='
                        col-span-12
                        row-span-6
                        //bg-green-600
                        flex
                        sm:grid
                        grid-cols-3

                    '
                >

                    <div
                        className='
                            border
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
                            <div
                                className='flex'
                            >
                                <h1 className=' text-slate-500 mt-2 ml-2 mb-4 font-medium'>Ventas de esta semana</h1>
                                <i
                                    className='text-orange-500 ml-1 mt-2 cursor-pointer'
                                    onPointerEnter={() => setInformacionVentaSemana(true)}
                                    onMouseLeave={() => setInformacionVentaSemana(false)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                    </svg>
                                </i>
                                {!!informacionVentaSemana &&
                                    <div
                                        className='
                                            absolute
                                            z-10 mt-10
                                            border
                                            flex
                                            w-32
                                            ml-24
                                            text-xs
                                            bg-white
                                            py-1
                                            px-1

                                        '
                                    >
                                        El grafico muestra las ventas que se an realizado o se realizaran
                                    </div>
                                }

                            </div>


                            <RechartsLineal
                                datos={ventasSemanales}
                                fill='#697F92'
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
                            border
                            mx-2
                            flex
                            flex-col
                        '
                    >
                        <h1 className='text-slate-500 ml-2 my-2'>Productos con stock mas bajo</h1>
                        <div
                            className='
                                w-full
                                mt-2
                            '
                        >
                            <RechartsBar
                                data={productosStockBajo || []}
                                dataKey={[
                                    {
                                        name: 'stock',
                                        fill: '#FB923C',
                                    }
                                ]}
                                name='descripcion'
                            />
                        </div>


                    </div>
                    <Tabcompra />
                    <div
                        className='
                            border
                            ml-1
                            mr-2
                            rounded-sm
                        '
                    >
                        <h1 className='text-slate-500 mt-2 ml-2 mb-1 '>Tipo de clientes</h1>
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
                                    w-full
                                    justify-center
                                    text
                                    font-medium 
                                    italic  
                                  '
                                >
                                    <p className='mx-2 '>RUC</p> <p className='mx-2 '>DNI</p> <p className='mx-2 '>VARIOS</p>
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