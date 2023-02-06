import React, { useEffect, useState } from 'react';
import { urlAPI } from '../../../config';
import { getData } from '../../useFetch';
import { Cardventa } from './cards_venta';


function Tabventa() {

    const [ventas, setVentas] = useState([])
    const [informacionVentaProductos, setInformacionVentaProducto] = useState([]);
    const [cantidadMostrar, setCantidadMostrar] = useState(9);
    const [productosStockBajo, setProductoStockBajo] = useState([]);

    useEffect(() => {
        const obtenerInformacionRecienteVentas = async () => {
            const ventasData = await getData(`${urlAPI.Venta.url}?recientes=${cantidadMostrar}`);
            setVentas(ventasData);
        }

        obtenerInformacionRecienteVentas();
    }, [cantidadMostrar])

    useEffect(() => {

        const dataProductosStockBajo= async () => {
            const productosData = await getData(`${urlAPI.Producto.url}?stockBajo=4`);
            
            setProductoStockBajo(productosData)
        }

        dataProductosStockBajo();

    }, [])
    // console.log(informacionVentaProductos);

    return (
        <>
            <div
                className='
                    border
                    rounded-sm
                    row-span-4
                    mb-2
                    mr-2
                '
            >
                <h1 className='text-slate-500  ml-3 mt-2 mb-1 '>Ventas recientes</h1>
                <div
                    className='scroll-content bg-sky-100 rounded-xl mx-1'
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
                                text-slate-400
                                font-bold
                                cursor-pointer
                                hover:text-sky-300
                            '
                            onClick={() => setCantidadMostrar(cantidadMostrar + 9)}
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