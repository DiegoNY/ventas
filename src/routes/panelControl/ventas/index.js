import React, { useEffect, useState } from 'react';
import { urlAPI } from '../../../config';
import { getData } from '../../useFetch';
import { Cardventa } from './cards_venta';


function Tabventa() {

    const [ventas, setVentas] = useState([])
    const [informacionVentaProductos, setInformacionVentaProducto] = useState([]);

    useEffect(() => {
        const obtenerInformacionRecienteVentas = async () => {
            const ventasData = await getData(`${urlAPI.Venta.url}?recientes=9`);
            setVentas(ventasData);
        }

        obtenerInformacionRecienteVentas();
    }, [])

    // console.log(informacionVentaProductos);

    return (
        <>
            <div
                className='
                    bg-slate-700
                    rounded-sm
                    row-span-4
                    mb-2
                    mr-2
                '
            >
                <h1 className='text-white  ml-3 mt-2 mb-1 font-semibold'>Ventas recientes</h1>
                <div
                    className='scroll-content'
                >
                    {ventas.map((venta, index) => {
                        let numero = Number(venta?.correlativo);
                        return (
                            <Cardventa
                                numero={numero}
                                codigo={venta.numero_venta}
                                total={venta.total}
                                fecha={venta.fecha_registro}
                                onClick={() => {
                                    setInformacionVentaProducto(venta.productos)
                                }}
                            />
                        )
                    })}

                    <div
                        className='
                            flex
                            justify-end
                        '
                    >
                        <p
                            className='
                                my-2
                                mr-2
                                text-sky-100
                                font-bold
                                cursor-pointer
                                hover:text-sky-300
                            '
                        >
                            ver mas
                        </p>
                    </div>
                </div>
            </div>



        </>
    );
}

export { Tabventa }