import React from 'react';
import { useNavigate } from 'react-router';

function CardInformacion({ icono, numero, informacion, children, navigation, color }) {
    const navigate = useNavigate();
    return (
        <>
            <div
                className={` ${color || 'bg-slate-700'} flex text-white mx-2 rounded-sm mb-auto `}
                onClick={() => {
                    navigate(navigation)
                }}
            >
                <div className='text-white flex flex-col'>
                    <img src={icono} className='max-h-20 scale-75 ml-0' />

                    <h1 className='font-semibold text-sm ml-3 '>{numero || '00'}</h1>
                    <p className='text-xs ml-3 mb-2  mr-auto'>{informacion || 'Informacion adicional'}</p>
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