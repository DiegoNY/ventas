import React from 'react';
import icono_ticket from './img/icono-ticket.svg';
import icono_pdf from './img/icono-pdf.svg';

function CardListadoVenta({ tipo, numero, cliente, identificacion, fecha, total }) {

    return (
        <>
            <div
                className='
                    //bg-slate-800
                    mx-1
                    my-1
                    rounded-sm
                    flex
                    flex-col
                    border
                '
            >
                <div className=' mx-2 mt-2 flex font-semibold uppercase italic'>{tipo || 'BOLETA'}</div>
                <div className='mx-2   flex justify-between'><span className='text-xs'>Numero </span> <span className='font-semibold text-xs'>{numero || 'B001-00000004'}</span></div>
                <div className='mx-2  flex justify-between'><span className='lowercase font-semibold text-xs '>{cliente || 'Clientes varios'}</span> <span className='text-xs'>{identificacion || '00000000'}</span></div>
                <div className='flex justify-end mx-2 text-xs'>{fecha || '12/12/12'}</div>
                <div className='flex justify-between mx-2'>Total <span className='font-semibold text-xs'>S/{total || '0'}</span></div>
                <div className='mx-2 flex justify-between mt-2'>
                    <div
                        className='
                                flex
                                flex-col
                                mt-2
                            '
                    >
                        <h1 className='font-medium'>Imprimir</h1>
                        <div
                            className='flex mx-2'
                        >

                            <img src={icono_ticket} className='h-4 cursor-pointer rotate-90' />
                            <img src={icono_pdf} className='ml-1 h-4 cursor-pointer' />
                        </div>
                    </div>
                    <div
                        className='
                            flex
                            mt-4
                        '
                    >
                        <button
                            className='
                                //ext-red-400
                                font-bold
                                text-cyan-500

                            '
                        >
                            RC
                        </button>
                        <button
                            className='
                                ml-2
                                font-bold
                                text-green-500
                            '
                        >
                            NC
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export { CardListadoVenta }