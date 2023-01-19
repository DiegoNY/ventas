import React, { useEffect } from 'react';
import { Grid } from 'gridjs-react';
import { _ } from 'gridjs-react';
import { Titulo } from '../../ui/titulos-vistas';
import { getData } from '../useFetch';
import { urlAPI } from '../../config';


function ListaCompra() {
    const [listaCompras, setListaCompras] = React.useState([]);

    useEffect(() => {

        const obtenerListaCompra = async () => {
            const data = await getData(`${urlAPI.ListaCompra.url}`);
            console.log(listaCompras);
            setListaCompras(data);
        }

        obtenerListaCompra();

    }, [])


    //crear cards para el listado y no usar una tabla 

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
                        mx-4
                        my-1
                    '
                >

                    <Titulo
                        title='Listado compras '
                        navegacion='Compras'
                    />

                </div>

                <div
                    className='
                        //bg-red-400
                        col-span-12
                        row-span-5
                        mx-5
                    '
                >
                    <div
                        className='
                            card
                            border-none
                        '
                    >
                        <Grid
                            data={listaCompras}

                            columns={[
                                { id: '_id', name: '#' },
                                { id: 'codigo_barras', name: 'RUC' },
                                { id: 'descripcion', name: 'Proveedor' },
                                { id: 'fecha_registro', name: 'Tipo documento' },
                                { id: 'stock', name: 'Codigo compra' },
                                { id: 'precio_venta', name: 'Fecha' },
                                { id: 'precio_venta', name: 'Total' },
                                {
                                    id: 'acciones', name: 'Acciones', formatter: (cells, row) => _(
                                        <td>
                                            <i
                                                role="button"
                                                class="fi fi-rr-edit ml-2 mr-2 text-primary"
                                                data-bs-toggle="modal"
                                                data-bs-target="#modalEditar"
                                                onClick={() => {

                                                    // obtenerData(row.cells[0].data);
                                                }}>

                                            </i>
                                            <i
                                                role="button"
                                                class="fi fi-rr-trash text-danger"
                                                onClick={() => {
                                                    // eliminar(row.cells[0].data)
                                                }}
                                            >
                                            </i>

                                        </td>
                                    )
                                },
                            ]}
                            search={true}
                            sort={true}
                            pagination={{
                                limit: 5,
                            }}
                            className={
                                {
                                    th: 'text-xs',
                                    table: 'w-100',
                                }
                            }

                            language={{
                                'search': {
                                    'placeholder': '🔍 Buscar por ...',
                                },
                                'pagination': {
                                    'previous': '⬅',
                                    'next': '⬅',
                                    'showing': 'Mostrando',
                                    'results': () => 'Resultados'
                                }
                            }}

                        />
                    </div>


                </div>

            </div>
        </>
    )
}

export { ListaCompra }