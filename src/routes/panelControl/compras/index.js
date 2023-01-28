import React, { useEffect, useState } from 'react';
import { urlAPI } from '../../../config';
import { getData } from '../../useFetch';
import { Cardcompra } from './card_compras';

function Tabcompra() {
    const [compras, setCompras] = useState([]);

    useEffect(() => {
        const obtenerDataCompras = async () => {
            const comprasData = await getData(`${urlAPI.ListaCompra.url}?recientes=9`);
            setCompras(comprasData)
        }

        obtenerDataCompras();
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
                    {compras.map((compra, index) => {


                        return (

                            <Cardcompra
                                fecha={compra.fecha_registro}
                                numero={index + 1}
                                total={compra.total}
                                proveedor={compra.proveedor}
                            />
                        )
                    })}

                </div>
            </div>
        </>
    )
}

export { Tabcompra }