import React from 'react';
import img_default_usuarios from './img/simbolo-alerta-succes.png'


function CardVentasRecientes() {

    return (
        <>
            <div
                className='
                    mb-auto
                    mx-2
                    mt-2
                    rounded-sm
                    bg-slate-200
                    flex
                    justify-between
                    text-dark
                    
                '
            >
                <img src={img_default_usuarios} className='h-14' />
                <div className='flex '>
                    <p className='mt-3 text-xs'>Nombre usuario</p>
                    <p className='ml-4 mt-3 font-semibold'>S/ 30</p>
                </div>
                <spna className='mr-2 mt-4 text-xs mb-1 text-slate-400'>14:40</spna>
            </div>
        </>
    )
}


export { CardVentasRecientes }