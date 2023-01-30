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
                                    border
                                    rounded-sm
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