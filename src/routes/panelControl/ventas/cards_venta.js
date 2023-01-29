import React from 'react';

function Cardventa({ numero, fecha, codigo, total, onClick }) {

    return (
        <>
            <div
                className='
                    mt-1
                    mx-2
                    bg-slate-600
                    mb-auto
                    rounded-sm
                '
            >
                <div
                    className='
                        flex
                        justify-between 
                        text-white
                        text-xs
                    '
                >
                    <span className='mt-2 ml-2'>
                        N° 001
                    </span>
                    <span className='mt-2'>
                        B001-00001
                    </span>
                    <span className='mt-2'>
                        S/ 120
                    </span>
                    <div className='mt-2 mb-1 mr-1  text-white flex flex-col text-xs '>
                        <span className='cursor-pointer hover:' >ver productos 🛒</span>
                        <span className='mt-1 ml-3 '>12-12-2023</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export { Cardventa }