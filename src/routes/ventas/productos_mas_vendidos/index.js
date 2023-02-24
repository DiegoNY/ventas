import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../../auth/auth';
import { urlAPI } from '../../../config';
import { RechartsBar } from '../../../ui/Graficos/BarRecharts';
import { RechartsLineal } from '../../../ui/Graficos/LinealRecharts';
import { Titulo } from '../../../ui/titulos-vistas';
import { getData } from '../../useFetch';
import icono_descarga from './img/icono-descarga.svg';

function ProductosMasVendidos() {

    //Usuario autenticado ? 
    const auth = useAuth();
    const navigation = useNavigate();
    if (!auth.user) navigation('/');


    const dataPrueba = [
        {
            name: 'Producto',
            ventas: 460,
            stock: 580,
            amt: 2400,
        },
    ];

    const [haceTresMeese, setHaceTresMeses] = useState();
    const [haceUnMes, setHaceUnMes] = useState();
    const [mesActual, setMesActual] = useState();
    const [haceUnAño, setHaceUnAño] = useState();

    useEffect(() => {

        const getDataHaceTresMeses = async () => {
            const data = await getData(`${urlAPI.Productos_vendidos.url}?haceTresMeses=true`)
            setHaceTresMeses(data);
        }
        const getDatahaceUnMes = async () => {
            const data = await getData(`${urlAPI.Productos_vendidos.url}?mesPasado=true`)
            setHaceUnMes(data);
        }
        const getDatamesActual = async () => {
            const data = await getData(`${urlAPI.Productos_vendidos.url}?mesActual=true`)
            setMesActual(data);
        }
        const getDatahaceUnAño = async () => {
            const data = await getData(`${urlAPI.Productos_vendidos.url}?haceUnAño=true`)
            setHaceUnAño(data);
        }

        getDataHaceTresMeses();
        getDatahaceUnAño();
        getDatamesActual();
        getDatahaceUnMes();

    }, [])

    return (
        <>
            <div
                className='
                    grid 
                    grid-cols-12
                    h-screen

                '
            >
                <div
                    className='
                        col-span-12
                        //bg-green-200
                        mb-4
                    '
                >
                    <h1 className='ml-2 text-2xl sm:text-2xl font-extrabold text-slate-900 tracking-tight  mt-2'>Productos mas vendidos </h1>
                    <p className='font-normal text-sm ml-2 text-slate-500'>estas observando los productos mas vendidos por fechas </p>
                </div>
                <div
                    className='
                        col-span-12
                        grid 
                        grid-cols-3
                    '
                >
                    <div
                        className='
                        mx-2
                        border
                        mb-2
                        flex
                        flex-col
                        text-white
                        rounded-sm

                    '
                    >

                        <h1 className='ml-2 font-semibold my-2 text-slate-600' >Mes actual</h1>
                        <RechartsBar


                            data={mesActual || []}
                            dataKey={[
                                {
                                    name: 'cantidad',
                                    fill: '#FACC15',
                                },

                            ]}
                            name='nombre'
                        />
                    </div>
                    <div
                        className='
                        mx-2
                        border
                        mb-auto
                        flex
                        flex-col
                        rounded-sm

                    '
                    >

                        <h1 className='ml-2 font-semibold my-2 text-slate-500' >Mes pasado</h1>
                        <RechartsBar

                            data={haceUnMes || []}
                            dataKey={[
                                {
                                    name: 'cantidad',
                                    fill: '#4ADE80',
                                },

                            ]}
                            name='nombre'
                        />
                    </div>
                    <div
                        className='
                        mx-2
                        border
                        mb-auto
                        flex
                        flex-col
                        rounded-sm

                    '
                    >
                        <div
                            className='
                                flex
                                justify-between
                                ml-2
                                mr-1
                            '
                        >
                            <h1 className=' font-semibold my-2 text-slate-500' >Hace 3 meses</h1>
                            
                        </div>
                        <RechartsBar
                            fill={'#2563EB'}
                            fill_2={'#E11D48'}
                            data={haceTresMeese || []}
                            dataKey={[
                                {
                                    name: 'cantidad',
                                    fill: '#2563EB',
                                },

                            ]}
                            name='nombre'
                        />
                    </div>
                </div>

                <div
                    className='
                        col-span-12
                        flex
                        justify-between
                        mx-2
                    '
                >
                    <div
                        className='
                        border
                        flex
                        flex-col
                        rounded-sm
                        h-80
                        w-full  
                    '
                    >



                        <div
                            className='mx-auto  w-full  '
                        >
                            <h1 className=' mt-2 ml-2 mb-4 font-semibold text-slate-500'>Hace un año</h1>
                            <RechartsLineal
                                height={'77%'}
                                fill='#697F92'
                                datos={haceUnAño || []}
                                dataKey={[

                                    {
                                        name: 'cantidad',
                                        stroke: '#FB923C',
                                    },

                                ]}
                                nameX='nombre'
                                fillX='#ffff'
                                typeLine=''
                            />

                        </div>


                    </div>

                </div>




            </div>
        </>
    );

}

export { ProductosMasVendidos }