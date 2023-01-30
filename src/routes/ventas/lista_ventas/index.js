import React, { useEffect, useState } from 'react';
import { urlAPI } from '../../../config';
import { Pagination } from '../../../ui/pagination';
import { Titulo } from '../../../ui/titulos-vistas';
import { getData } from '../../useFetch';
import { PaginaListadoVentas } from './paginaListadoVentas';

function ListaVenta() {

    const [ventas, setVentas] = useState([]);
    const [todasVentas, setTodasVentas] = useState([]);
    const [total, setTotal] = useState(0);
    const [skip, setSkip] = useState(0);
    const [limite, setLimite] = useState(12);
    const [cambiarPagina, setCambiarPagina] = useState(false);
    const [ventasBusqueda, setVentasBusqueda] = useState([]);


    const SearchVentas = (valorBusqueda) => {

        let ventasEncontradas = []

        if (!valorBusqueda.length >= 1) {

            ventasEncontradas = valorBusqueda;

        } else {
            ventasEncontradas = todasVentas?.filter(venta => {
                const ventaText = `${venta.numero_venta?.toLowerCase()}${venta.tipo_documento?.toLowerCase()}${venta.total}${venta.fecha_registro}${venta.cliente.toLowerCase()}`
                const valorBusquedaFiltrado = valorBusqueda.toLowerCase();

                return ventaText?.includes(valorBusquedaFiltrado)
            })
        }


        setVentasBusqueda(ventasEncontradas)
    }





    useEffect(() => {

        const obtenerTodasVentas = async () => {
            const todasVentasData = await getData(`${urlAPI.Venta.url}`);
            setTotal(todasVentasData.length)
            setTodasVentas(todasVentasData);

        }

        obtenerTodasVentas();


    }, [])

    useEffect(() => {

        const obtenerDataVentas = async () => {

            const ventaData = await getData(`${urlAPI.Venta.url}?skip=${skip}&limite=${limite}`);
            setVentas(ventaData);
        }

        obtenerDataVentas();

    }, [cambiarPagina])


    return (
        <>


            <div
                className='
                grid
                grid-cols-12
                grid-rows-6
                h-screen
            '
            >
                <div
                    className='
                    //bg-indigo-400
                    col-span-12
                    row-span-6
                    my-2
                    mx-3
                    grid
                    grid-cols-4
                    grid-rows-6
                '
                >
                    <div
                        className='
                        //bg-red-200
                        col-span-4
                        grid
                        grid-cols-2
                    '
                    >
                        <Titulo
                            title='Ventas '
                            navegacion='Ventas'
                            icono={'fi fi-rs-shop'}
                        />

                        <div
                            className='
                                flex
                                justify-end
                            '
                        >
                            <input
                                className='
                                    border
                                    rounded-lg
                                    my-4
                                    mr-9
                                    w-1/2
                                    px-1
                                '

                                onChange={(e) => {

                                    SearchVentas(e.target.value);
                                }}
                            />

                        </div>



                    </div>



                    <div
                        className='
                        //bg-yellow-200
                        col-span-4
                        row-span-5
                        mx-1
                        flex
                        flex-col
                    '
                    >
                        {ventasBusqueda.length == 0 &&

                            <PaginaListadoVentas ventas={ventas} />
                        }

                        {ventasBusqueda.length >= 1 &&

                            <PaginaListadoVentas ventas={ventasBusqueda} />
                        }

                        <Pagination
                            cantidadResultados={total}
                            limiteMuestra={limite}
                            onClickNext={() => {
                                if (skip <= total - limite) {
                                    setSkip(skip + limite)
                                    setCambiarPagina(!cambiarPagina);
                                }

                            }}
                            onClickPrevious={() => {
                                if (skip != 0) {

                                    setSkip(skip - limite);
                                    setCambiarPagina(!cambiarPagina);

                                }

                            }}
                            onClickPage={(e) => {
                                let pagina = Number(e.currentTarget.text);
                                let paginasSaltar = (pagina * limite) - limite;

                                setSkip(paginasSaltar);
                                setCambiarPagina(!cambiarPagina);
                                console.log(e.currentTarget.text)
                                console.log('Click en pagina');
                            }}
                        />


                    </div>

                </div>

            </div>

        </>
    )
}

export { ListaVenta }