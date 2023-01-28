import React from "react";
import { CardListadoVenta } from "./cardListadoVenta";

function PaginaListadoVentas({ ventas }) {

    return (
        <>
            <div
                className='
                    //bg-yellow-200
                    h-full
                    mx-3
                    grid
                    grid-cols-6
                    grid-rows-2
                '
            >
                {ventas.map(venta => {

                    return (
                        <CardListadoVenta
                            total={venta.total}
                            tipo={venta.tipo_documento}
                            fecha={venta.fecha_registro}
                            identificacion={venta.identificacion}
                            cliente={venta.cliente}
                            numero={venta.numero_venta}
                        />
                    )
                })}


            </div>
        </>
    )
}

export { PaginaListadoVentas }