import React from 'react';
import { TablaTalwindCss } from '../../../ui/Tabla/useTabla';
import { Titulo } from '../../../ui/titulos-vistas';

function NotaSalida() {

    return (
        <>
            <div
                className='
                    h-screen
                    grid
                    grid-cols-12
                    grid-rows-6
                    mx-auto
                    w-full
                '
            >
                <div
                    className='
                        //bg-red-200
                        col-span-6
                        row-span-6
                        flex
                        flex-col
                    '
                >
                    <div>
                        <Titulo
                            title='Nota salida '
                            navegacion='ventas'
                            iconoEmoji='📝'
                        />
                    </div>

                    <h1 className='mt-2 ml-4 text-lg font-black text-slate-700 mx-5'>Datos Necesarios</h1>

                    <div
                        className='
                            mt-2
                            mx-auto
                            h-full
                            flex
                            flex-col
                            w-full
                        '
                    >
                        <div
                            className='
                                flex
                                justify-end
                                mx-4
                            '
                        >
                            <input type={'date'} className='mt-3 ' />

                        </div>
                        <div
                            className='
                                mt-3
                                flex
                                flex-col
                                mx-4
                            '
                        >
                            <h1 className='text-lg font-extrabold' >Solicitante</h1>
                            <input className='border rounded-sm h-14 mx-3 px-2' />
                        </div>
                        <div
                            className='
                                mt-3
                                flex
                                flex-col
                                mx-4
                            '
                        >
                            <h1 className=' text-lg font-extrabold' >Motivo salida</h1>
                            <textarea
                                className='
                                    border
                                    rounded-sm
                                    h-40
                                    mx-3
                                    p-2
                                '
                            >

                            </textarea>
                        </div>

                    </div>
                </div>
                <div
                    className='
                        //bg-yellow-200
                        col-span-6
                        row-span-6
                        flex
                        flex-col
                    '
                >

                    <div
                        className='
                            flex
                            justify-end
                        '
                    >
                        <input
                            className='
                                    border-2
                                    rounded-xl
                                    my-4
                                    mr-9
                                    w-1/2
                                    px-1
                                    h-8
                                '

                            onChange={(e) => {

                                // SearchVentas(e.target.value);
                            }}
                        />

                    </div>

                    <div>
                        <TablaTalwindCss
                            headers={[
                                { name: '#' },
                                { name: 'Descripcion' },
                                { name: 'Lote' },
                                { name: 'F.Vencimiento' },
                                { name: 'Cantidad' },
                                { name: 'P.Compra unitario' },
                                { name: 'P.Venta' },
                                { name: 'Total' },
                            ]}
                        >

                        </TablaTalwindCss>
                    </div>
                </div>

            </div>
        </>
    );
}

export { NotaSalida }