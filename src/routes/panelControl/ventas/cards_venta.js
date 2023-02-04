import React from 'react';

function Cardventa({ numero, fecha, codigo, total, onClick }) {

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
                    cursor-pointer
                    
                '
            >
                <div
                    className='
                        flex
                        justify-between 
                        text-slate-500
                        hover:text-slate-900
                        text-xs
                    '
                >
                    <span className='mt-2 ml-2'>
                        N° {numero || 'N° 001'}
                    </span>
                    <span className='mt-2'>
                        {codigo || 'B001-00001'}
                    </span>
                    <span className='mt-2'>
                       S/ {total || '120'}
                    </span>
                    <div className='mt-2 mb-1 mr-1   flex flex-col text-xs '>
                        <span
                            className='cursor-pointer hover:'
                            onClick={onClick}
                        >ver productos 🛒</span>
                        <span className='mt-1 ml-3 '>{fecha || '12-12-2023'}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export { Cardventa }