import React from 'react';
import { Cardproducto } from './card_productos';

function Tabproducto({ productos }) {

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
                    <Cardproducto />
                    <Cardproducto />
                    <Cardproducto />
                    <Cardproducto />
                    <Cardproducto />
                    <Cardproducto />
                    <Cardproducto />
                    <Cardproducto />
                    <Cardproducto />
                    <Cardproducto />
                    <Cardproducto />

                </div>
            </div>
        </>
    )
}

export { Tabproducto }