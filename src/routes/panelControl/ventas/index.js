import React, { useEffect, useState } from 'react';
import { urlAPI } from '../../../config';
import { Modal } from '../../../ui/modal';
import { getData } from '../../useFetch';
import { CardProductoVenta } from './cardProductoVentas';
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
                    {ventas.map((venta, index) => {

                        return (
                            <Cardventa
                                numero={index + 1}
                                fecha={venta.fecha_registro}
                                codigo={venta.numero_venta}
                                total={venta.total}
                                onClick={() => {
                                    setInformacionVentaProducto({ productos: venta.productos, correlativo: venta.correlativo });
                                }}
                            />
                        )
                    })

                    }

                </div>
            </div>

            <Modal
                id={'productos'}
                title={'Productos 🛍'}
                className={'modal-dialog'}
            >

                <div
                    className='flex scroll-content'
                >
                    <div
                        className='
                            mx-2
                            w-full
                            my-2
                            grid
                            grid-cols-2
                            auto-rows-auto
                        '
                    >
                        {informacionVentaProductos?.productos?.map(producto => {
                            return (
                                <CardProductoVenta
                                    correlativo={informacionVentaProductos.correlativo}
                                    codigo={producto.codigo_barras}
                                    cantidad={producto.cantidad_comprada}
                                    descripcion={producto.descripcion}
                                    precio={producto.precio}
                                    total={producto.total}
                                />
                            )
                        })

                        }

                    </div>
                </div>

            </Modal>

        </>
    );
}

export { Tabventa }