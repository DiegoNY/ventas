import React from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../../auth/auth';
import { RechartsBar } from '../../../ui/Graficos/BarRecharts';
import { RechartsLineal } from '../../../ui/Graficos/LinealRecharts';
import { Titulo } from '../../../ui/titulos-vistas';
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
                    <h1 className='text-2xl mt-2 font-bold text-blue-400 ml-2'>Productos mas vendidos </h1>
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
                        <RechartsBar fill={'#FACC15'} fill_2={'#84CC16'} />
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
                        <RechartsBar fill={'#4ADE80'} fill_2={'#22D3EE'} />
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
                            <button className='border my-1  text-xs w-36 flex justify-center   hover:' >
                                <h1 className='mt-1'>Descargar reporte</h1>
                                <img src={icono_descarga} className=' mt-1 h-4' />
                            </button>

                        </div>
                        <RechartsBar fill={'#2563EB'} fill_2={'#E11D48'} />
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
                                dataKey={[
                                    {
                                        name: 'pv',
                                        stroke: '#FB923C'
                                    }
                                ]}
                            />

                        </div>


                    </div>

                </div>




            </div>
        </>
    );

}

export { ProductosMasVendidos }