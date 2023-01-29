import React from 'react';

function CardInformacion({ icono, numero, informacion, children }) {

    return (
        <>
            <div
                className='bg-slate-700 flex text-white mx-2 rounded-sm mb-auto '
            >
                <div className='text-white flex flex-col'>
                    <img src={icono} className='max-h-20 scale-75 ml-0' />

                    <h1 className='font-semibold text-sm ml-4 '>{numero || '00'}</h1>
                    <p className='text-xs ml-4 mb-2 w-30'>{informacion || 'Informacion adicional'}</p>
                </div>
                <div
                    className='my-auto mx-auto w-1/2'
                >
                    {children}
                </div>
            </div>
        </>
    )
}

export { CardInformacion }