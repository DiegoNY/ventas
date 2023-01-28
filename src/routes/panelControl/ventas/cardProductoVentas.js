import React from 'react';

function CardProductoVenta({ codigo, cantidad, descripcion, precio, total, correlativo }) {

    return (
        <>
            <div
                className='
                    flex
                    row-span-3
                
                '
            >
                <div
                    className='
                        mx-1
                        my-1
                        w-full
                        bg-indigo-500
                        flex
                        flex-col   
                        rounded-sm
                        text-white
                        mb-auto
                    '
                >
                    <h1 className='font-semibold mx-1'>{'N° ' + correlativo || 'N° 000000'}</h1>
                    <h2 className='flex justify-between mx-2'><p className='font-semibold'>Codigo {codigo || '0000000'}</p> <p>Cantidad : <span>{cantidad || '0'}</span></p> </h2>
                    <p className='flex text-center mx-auto mt-1'>{descripcion || 'OCURRIO UN ERROR AL OBTNER EL NOMBRE DEL PRODUCTO'}</p>
                    <p className='mt-1 mx-2'>Precio: {precio || '00'} </p>
                    <p className='flex  justify-end text-lg font-semibold mx-1'>S/ {total || '00'}</p>

                </div>
            </div>
        </>
    )

}

export { CardProductoVenta }