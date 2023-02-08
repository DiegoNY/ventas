import React from 'react';

function CardCompra({ numero, fecha, total, proveedor }) {

    return (
        <>
            <div
                className='
                    mt-1
                    mx-2
                    border
                    mb-auto
                    rounded-sm
                    bg-white
                '
            >
                <div
                    className='
                        flex
                        justify-between 
                        text-slate-600
                        hover:text-slate-700
                        text-xs
                    '
                >
                    <span className='mt-2 ml-2'>
                        C° {numero || '001'}
                    </span>
                    <span className='mt-2'>
                        {proveedor || 'Proveedor'}
                    </span>

                    <div className='mt-2 mb-1 mr-1   flex flex-col text-xs '>
                        <p className='mr-10'>S/ {total || 'S/ 14.50'}</p>
                        <span className='mt-2 ml-10 text-xs'>{fecha || '12-12-2023'}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export { CardCompra }