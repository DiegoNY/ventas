import React from 'react';
import { Cardventa } from './cards_venta';


function Tabventa({ ventas }) {



    return (
        <>
            <div
                className='
                    scroll-content
                '
            >
                <div
                    className='
                    h-full
                    grid
                    sm:grid-cols-12
                    auto-rows-auto
                '
                >
                    <Cardventa />
                    <Cardventa />
                    <Cardventa />
                    <Cardventa />
                    <Cardventa />
                    <Cardventa />
                    <Cardventa />
                    <Cardventa />
                </div>
            </div>

        </>
    );
}

export { Tabventa }