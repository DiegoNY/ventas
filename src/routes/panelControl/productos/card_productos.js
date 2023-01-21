import React from 'react';
import iconoprueba from '../img/imagen-clientes.png';
function Cardproducto() {

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
                        hover:bg-fuchsia-500
                        //bg-white
                        bg-fuchsia-400
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
                    <div
                        className='
                            row-span-3
                            flex
                            justify-center
                        '
                    >
                        <img
                            className='
                                rounded-sm
                                h-full
                            '
                            src={iconoprueba}
                        />
                    </div>
                  
                    
                    <span
                        className='
                            mx-2
                            row-span-2
                            text-xs
                            flex
                            text-center
                        '
                    >
                       AMBROXOL 30MG X120ML JARABE7
                    </span>
                    <span
                        className='
                            mx-2
                            mb-1
                            flex
                            justify-between
                        '
                    >
                        <span className='font-normal text-xs'>Generico</span> 
                        <span className='text-sm '>S/ 15</span>
                    </span>

                   

                </div>
            </div>
        </>
    )
}

export { Cardproducto }