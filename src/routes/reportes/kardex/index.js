import { DataGrid, esES, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { urlAPI } from '../../../config';
import { Layout } from '../../../ui/Layouts';
import { getData } from '../../useFetch';
import './index.css'

function CustomToolbar() {

    return (

        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
        </GridToolbarContainer>
    )
}


const Kardex = () => {

    const [data, setData] = useState();
    const [fechas, setFechas] = useState({});
    const [search, setSearch] = useState(false);
    const [searchProducto, setSearchProducto] = useState();
    const [productoBuscar, setProductoBuscar] = useState('');

    const [productos, setProductos] = useState([]);


    let searchProductos = [];

    //Buscador cuando el valor del buscador es menor que 1 no se filtra pero 
    //si es mayor que uno se filtra y se retorna el producto encontrado

    if (!searchProducto?.length >= 1) {
        searchProductos = productos;
    } else {
        searchProductos = productos?.filter(producto => {
            const productoText = `${producto?.descripcion?.toLowerCase()}${producto?.id_laboratorio?.toLowerCase()}`;

            const searchText = searchProducto.toLowerCase();

            return productoText?.includes(searchText);
        })
    }



    useEffect(() => {
        const getDataProductos = async () => {
            const productosData = await getData(`${urlAPI.Producto.url}`);
            setProductos(productosData)
        }
        getDataProductos();
    }, [])

    const ObtenerInformacionKardex = async () => {
        const dataInfo = await getData(`${urlAPI.Producto.url}?kardex={"id_producto":"63c5b406d1572b403576508c", "desde":"2023/02/10","hasta":"2023/02/24"}`)
        console.log(dataInfo);

        let arregloOrdenado = [];

        dataInfo[0].compras.map(value => {

            arregloOrdenado.push(value);

            value.ventas.map(venta => {
                arregloOrdenado.push(venta);
            })
            value.salidas.map(salida => {
                arregloOrdenado.push(salida);
            })

        });

        setData(arregloOrdenado);
    }

    const columns = [
        {
            field: '_id',
            headerName: 'ID',
            flex: 0.2,
        },
        {
            field: 'codigo_barras',
            headerName: 'Codigo',
            flex: 0.1,
        },
        {
            field: 'descripcion',
            headerName: 'Descripcion',
            flex: 0.2,
            renderCell: (params) => {
                let descripcion = `${params.row.descripcion}`.split(':')
                return (
                    <div className='flex'>
                        <p className='font-semibold  mr-2'>{descripcion[0]}</p>
                        <p>{descripcion[1]}</p>
                    </div>
                )
            }
        },
        {
            field: 'fecha',
            headerName: 'Fecha',
            flex: 0.2,
        },
        {
            field: 'entrada',
            headerName: 'Entrada',
            flex: 0.1,
        },
        {
            field: 'salida',
            headerName: 'Salida',
            flex: 0.1,
        },
        {
            field: 'stock',
            headerName: 'Stock',
            flex: 0.1,
        },
        {
            field: 'motivo',
            headerName: 'Motivo',
            flex: 0.3,
        },

    ]

    return (
        <>
            <Layout
                cardex='true'
                onClick={() => {
                    setSearch(false);
                }}
            >

                <div
                    className='
                        sm:ml-auto sm:mr-72 col-span-6
                        grid
                        grid-cols-12
                        w-full

                    '
                >


                    <div
                        className=' col-span-6 ml-12'
                    >
                        <h1 className=' mt-2 text-2xl sm:text-2xl font-extrabold text-slate-900 tracking-tight  '>
                            KARDEX
                        </h1>
                        <p className='font-normal text-sm  text-slate-500 mb-2'>Estas realizando una busqueda avanzada</p>

                    </div>

                    <div
                        className='col-span-12 opacity-60 h-px mt-2 mb-3 bg-gradient-to-r from-white via-slate-400 to-white '
                    >
                    </div>
                    <div
                        className='ml-12 flex flex-col col-span-4'
                    >
                        <input
                            type='text'
                            className='
                                mt-2
                                mb-auto
                                border-x
                                border-y
                                rounded-lg
                                w-full
                                px-2
                                py-1
                                focus:border-blue-600
                            '
                            placeholder='Busca un producto 💊'
                            onClick={(e) => {

                                setSearch(true);
                                e.stopPropagation();
                            }}

                            onChange={(e) => {
                                setSearchProducto(e.target.value)
                            }}
                        />
                        {!!search &&
                            <div
                                className='
                                     bg-white
                                     border
                                     rounded-xl
                                     flex
                                     flex-col
                                     absolute
                                     mt-10
                                     z-10
                                     productos-busqueda
                                     text-uppercase
                                 '
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                            >
                                {searchProductos?.map((value, index) => {

                                    return (
                                        <div
                                            className={`

                                                ${index == 0 && 'rounded-t-xl  mt-1' || 'mt-0.5'}
                                                mx-2
                                                bg-slate-100
                                                hover:bg-sky-100
                                                cursor-pointer
                                                p-1
                                            `}
                                            onClick={() => {
                                                setProductoBuscar(`${value.codigo_barras} ${value.descripcion}`);
                                                ObtenerInformacionKardex();
                                                setSearch(false);
                                            }}
                                        >
                                            <p className='text-slate-600'>{value.descripcion} </p>
                                        </div>

                                    )
                                })}

                            </div>
                        }

                        <p className='font-semibold'>{productoBuscar}</p>
                    </div>
                    <div
                        className='col-start-9 col-span-4  flex flex-col'
                    >

                        <div
                            className='flex justify-end mr-12'
                        >
                            <div
                                className='
                                flex 
                                flex-col
                            '
                            >
                                <h1 className='font-semibold text-slate-700 text-xs'>Desde</h1>
                                <input
                                    className='border-x border-y rounded-xl px-2 p-1 text-slate-600  focus:border-blue-600 font-mono'
                                    type='date'
                                />

                            </div>
                            <div
                                className='
                                flex-col
                                ml-2
                                
                            '
                            >
                                <h1 className='font-semibold text-slate-700 text-xs'>Hasta</h1>
                                <input
                                    className='border-x border-y p-1 text-slate-600 rounded-xl focus:border-blue-600 font-mono'
                                    type='date'
                                />
                            </div>
                        </div>

                        <div
                            className='
                                row-start-2
                                col-start-2
                                col-span-2
                                flex
                                justify-end
                                mr-12
                            '
                        >
                            <div
                                className='flex mt-2 cursor-pointer mr-2 hover:text-slate-400'
                            >
                                <p className='text-xs mt-0.5'>Buscar </p>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2563EB" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                </svg>
                            </div>
                            <div
                                className='flex mt-2 mr-4 cursor-pointer hover:text-slate-400'
                            >
                                <p className='text-xs mt-0.5'>Descargar </p>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2563EB" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                                </svg>

                            </div>
                        </div>
                    </div>
                </div>


                <div
                    className='
                        h-full
                    '
                >

                    <div
                        className='
                        flex
                        w-full
                        justify-between
                        my-2
                    '
                    >


                    </div>
                    <div
                        className='
                        //bg-yellow-200
                        col-span-12
                        h-full
                        mx-12
                        flex
                        flex-col
                    '
                    >

                        <DataGrid
                            components={{
                                Toolbar: CustomToolbar,
                            }}
                            getRowId={(row) => row._id}
                            rows={data || []}
                            density='compact'
                            columns={columns}
                            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                            initialState={
                                {
                                    columns: {
                                        columnVisibilityModel: {
                                            _id: false
                                        }
                                    }
                                }
                            }

                        />

                    </div>

                </div>
            </Layout>
        </>
    )
}

export { Kardex }