import React from 'react';

function Cardventa() {

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
                        Venta <span className='ml-1 font-normal '>N°7205</span>
                    </span>

                    <span
                        className='
                            mt-1
                            mx-2
                            flex
                            justify-between
                        '
                    >
                        Fecha : <span className='font-normal text-xs'>12/12/1212</span>
                    </span>
                    <span
                        className='
                            mt-1
                            mx-2
                            flex
                            justify-between
                        '
                    >
                        Codigo : <span className='font-normal text-xs'>B001-00007150</span>
                    </span>
                    <span
                        className='
                            mt-1
                            mx-2
                            flex
                            justify-between
                        '
                    >
                        Total : <span className='font-normal text-xs'>150</span>
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
                    >
                        ver productos 🛒

                    </span>

                </div>
            </div>
        </>
    )
}

export { Cardventa }