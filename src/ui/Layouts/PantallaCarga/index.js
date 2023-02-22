import React from 'react';
import './index.css'
const PantallaCarga = () => {

    return (
        <div
            className='absolute h-full w-full backdrop-grayscale-0 bg-white/60   flex justify-center items-center carga '
        >

            <p className='bg-green-400 rounded-3xl w-9 h-9  carga-1 absolute mr-52 '></p>
            <p className='bg-orange-500 rounded-3xl w-9 h-9 carga-2 mr-32 absolute'></p>
            <p className='bg-blue-400 rounded-3xl w-9 h-9 mx-1 carga-3'></p>
            <p className='bg-yellow-400 rounded-3xl w-9 h-9 mx-1 carga-4'></p>

        </div>
    )

}

export { PantallaCarga }