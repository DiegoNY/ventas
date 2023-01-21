import React from 'react';
import { Cardcompra } from './card_compras';

function Tabcompra({ compras }) {

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
                    <Cardcompra/>
                    <Cardcompra/>
                    <Cardcompra/>
                    <Cardcompra/>
                    <Cardcompra/>
                    <Cardcompra/>
                    <Cardcompra/>
                    <Cardcompra/>
                        
                </div>
            </div>
        </>
    )
}

export { Tabcompra }