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
                    border
                    mx-2
                    rounded-sm
                '
            >
                <h1 className='text-slate-500  ml-3 mt-2 mb-1 '>Compras recientes</h1>
                <div
                    className='scroll-content-card rounded-xl bg-sky-100'
                >
                    {compras.map((compra, index) => {
                        let numeroCorrelativoArray = compra?.numero_documento?.split('-');
                        let correlativo;
                        if (numeroCorrelativoArray) {
                            correlativo = Number(numeroCorrelativoArray[1]);
                        }

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