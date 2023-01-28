import React from 'react';

function Cardventa({ numero, fecha, codigo, total, onClick }) {

    return (
        <>
            <div
                className='
                    col-span-4
                    row-span-3
                    //bg-gray-200
                    ml-24
                    sm:mx-3
                    my-2
                    flex
                    flex-col
                    rounded-sm
    
                '
            >
                <div
                    className='
                        mt-2
                        hover:bg-blue-600
                        //bg-white
                        bg-blue-500
                        text-white
                        mx-1
                        w-48
                        rounded-lg
                        shadow-sm
                        grid
                        grid-rows-6
                        card-panel-control
                    '
                >

                    <span
                        className='
                            mx-2
                            mt-1
                        '
                    >
                        Venta N°<span className='ml-1 font-normal '>{numero || '0'}</span>
                    </span>

                    <span
                        className='
                            mt-1
                            mx-2
                            flex
                            justify-between
                        '
                    >
                        Fecha : <span className='font-normal text-xs'>{fecha || '12/12/1212'}</span>
                    </span>
                    <span
                        className='
                            mt-1
                            mx-2
                            flex
                            justify-between
                        '
                    >
                        Codigo : <span className='font-normal text-xs'>{codigo || 'xxx-xxxxx'}</span>
                    </span>
                    <span
                        className='
                            mt-1
                            mx-2
                            flex
                            justify-between
                        '
                    >
                        Total : <span className='font-normal text-xs'>{total || '0'}</span>
                    </span>

                    <span
                        className='
                            mx-2
                            flex
                            justify-end
                            mt-1
                            cursor-pointer
                            hover:text-xs
                        '
                        data-bs-toggle="modal"
                        data-bs-target="#productos"
                        onClick={onClick}
                    >
                        ver productos 🛒

                    </span>

                </div>
            </div>
        </>
    )
}

export { Cardventa }