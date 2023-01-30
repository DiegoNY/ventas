import React from 'react';
import { RechartsBar } from '../../../ui/Graficos/BarRecharts';
import { RechartsLineal } from '../../../ui/Graficos/LinealRecharts';
import { Titulo } from '../../../ui/titulos-vistas';


function ProductosMasVendidos() {

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
                        mb-auto
                    '
                >
                    <Titulo
                        title='Productos mas vendidos'
                        navegacion='ventas'
                    />

                </div>
                <div
                    className='
                        col-span-12
                        grid 
                        grid-cols-2
                    '
                >
                    <div
                        className='
                        mx-2
                        bg-slate-700
                        mb-2
                        flex
                        flex-col
                        text-white
                        rounded-sm

                    '
                    >

                        <h1 className='ml-2 font-semibold my-2' >Mes actual</h1>
                        <RechartsBar fill={'#8884d8'} fill_2={'#82ca9d'} />
                    </div>
                    <div
                        className='
                        mx-2
                        bg-slate-700
                        mb-auto
                        flex
                        flex-col
                        text-white
                        rounded-sm

                    '
                    >

                        <h1 className='ml-2 font-semibold my-2' >Mes pasado</h1>
                        <RechartsBar fill={'#8884d8'} fill_2={'#82ca9d'} />
                    </div>
                </div>
                <div
                    className='
                        col-span-12
                        flex
                        justify-between
                    '
                >
                    <div
                        className='
                        mx-1
                        bg-slate-700
                        flex
                        flex-col
                        text-white
                        rounded-sm
                        h-80
                        w-full  
                    '
                    >



                        <div
                            className='mx-auto  w-full  '
                        >
                            <h1 className=' text-white mt-2 ml-2 mb-4 font-semibold'>Hace un año</h1>
                            <RechartsLineal height={'77%'} />

                        </div>


                    </div>

                </div>




            </div>
        </>
    );

}

export { ProductosMasVendidos }