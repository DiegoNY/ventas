import React, { useEffect, useState } from 'react';
import { urlAPI } from '../../../config';
import { getData } from '../../useFetch';
import { CardCompra, Cardcompra } from './card_compras';

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
                    bg-slate-700
                    mx-2
                    rounded-sm
                '
            >
                <h1 className='text-white  ml-3 mt-2 mb-1 font-semibold'>Compras recientes</h1>
                <div
                    className='scroll-content-card'
                >
                    {compras.map((compra, index) => {
                        let numeroCorrelativoArray = compra.numero_documento.split('-');
                        let correlativo = Number(numeroCorrelativoArray[1]);

                        return (
                            <CardCompra
                                numero={correlativo}
                                proveedor={compra.proveedor}
                                total={compra.total}
                                fecha={compra.fecha_registro}
                            />
                        )
                    })}

                </div>

            </div>
        </>
    )
}

export { Tabcompra }