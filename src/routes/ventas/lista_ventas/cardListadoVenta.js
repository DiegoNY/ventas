import React from 'react';
import icono_ticket from './img/icono-ticket.svg';
import icono_pdf from './img/icono-pdf.svg';

function CardListadoVenta({ tipo, numero, cliente, identificacion, fecha, total }) {

    return (
        <>
            <div
                className='
                    //bg-green-200
                    mx-1
                    my-1
                    rounded-xl
                    grid
                    border-2
                '
            >
                <div className=' mx-2 mt-2 flex font-semibold uppercase'>{tipo || 'BOLETA'}</div>
                <div className='mx-2   flex justify-between'><span className=''>Numero </span> <span className='font-semibold'>{numero || 'B001-00000004'}</span></div>
                <div className='mx-2  flex justify-between'><span className='lowercase font-semibold text-xs '>{cliente || 'Clientes varios'}</span> <span className=''>{identificacion || '00000000'}</span></div>
                <div className='flex justify-end mx-2'>{fecha || '12/12/12'}</div>
                <div className='flex justify-between mx-2'>Total <span className='font-semibold'>S/{total || '0'}</span></div>
                <div className='mx-2 flex justify-between'>
                    <div
                        className='
                                flex
                                flex-col
                            '
                    >
                        <h1 className='font-semibold'>Imprimir</h1>
                        <div
                            className='flex mx-2'
                        >

                            <img src={icono_ticket} className='h-4 cursor-pointer' />
                            <img src={icono_pdf} className='ml-1 h-4 cursor-pointer' />
                        </div>
                    </div>
                    <div
                        className='
                            flex
                        '
                    >
                        <button
                            className='
                                //ext-red-400
                                font-semibold
                                hover:font-extrabold 
                            '
                        >
                            RC
                        </button>
                        <button
                            className='
                                ml-2
                                font-semibold
                                hover:font-extrabold 
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