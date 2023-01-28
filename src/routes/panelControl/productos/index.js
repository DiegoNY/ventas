import React, { useEffect, useState } from 'react';
import { urlAPI } from '../../../config';
import { getData } from '../../useFetch';
import { Cardproducto } from './card_productos';

function Tabproducto() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const obtenerProductos = async () => {
            const productosData = await getData(`${urlAPI.Producto.url}?recientes=9`);
            setProductos(productosData);
        }
        obtenerProductos();
    }, [])

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

                    {productos.map(producto => {


                        return (
                            <Cardproducto
                                descripcion={producto?.descripcion}
                                tipo={producto?.tipo}
                                stock={producto.stock}
                            />
                        )

                    })}

                </div>
            </div>
        </>
    )
}

export { Tabproducto }