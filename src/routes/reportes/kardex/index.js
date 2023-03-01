import { DataGrid, esES, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from '@mui/x-data-grid';
import React, { useCallback, useEffect, useState } from 'react';
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
    const [informacionBusqueda, setInformacionBusqueda] = useState({});
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
        const dataInfo = await getData(`${urlAPI.Producto.url}?kardex={"id_producto":"${informacionBusqueda.producto}", "desde":"${informacionBusqueda.desde}","hasta":"${informacionBusqueda.hasta}"}`)

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

    const [columns] = useState([
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
                    <div className='w-full text-center flex'>
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
            renderCell: (params) => {
                return <div className='w-full text-center'>{params.row.fecha}</div>
            }
        },
        {
            field: 'entrada',
            headerName: 'Entrada',
            flex: 0.1,
            renderCell: (params) => {
                return <div className='w-full text-center'>{params.row.entrada}</div>
            }
        },
        {
            field: 'salida',
            headerName: 'Salida',
            flex: 0.1,
            renderCell: (params) => {
                return <div className='w-full text-center'>{params.row.salida}</div>
            }
        },
        {
            field: 'stock',
            headerName: 'Stock',
            flex: 0.1,
            renderCell: useCallback((params) => {
                return <div className='w-full text-center'>{params.row.stock}</div>
            })
        },
        {
            field: 'motivo',
            headerName: 'Motivo',
            flex: 0.3,
        },

    ])

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
                        className=' col-span-12 grid sm:grid-cols-12 '
                    >
                        <div className='ml-12 col-span-3'>
                            <h1 className=' mt-2 text-2xl sm:text-2xl font-extrabold text-slate-900 tracking-tight  '>
                                KARDEX
                            </h1>
                            <p className='font-normal text-sm  text-slate-500 mb-2'>Estas realizando una busqueda avanzada</p>
                        </div>
                        <div
                            className=' col-span-5 '
                        >
                            <div className='mt-3 p-1 rounded-xl'>
                                <input
                                    value={searchProducto}
                                    type='text'
                                    className='
                                        mb-auto
                                        border-x
                                        border-y
                                        rounded-lg
                                        w-full
                                        px-2
                                        py-1
                                        focus:border-blue-600
                                        text-lg
                                        font-black
                                        text-center
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
                            </div>

                            {!!search &&
                                <div
                                    className='
                                     bg-white
                                     border
                                     rounded-xl
                                     flex
                                     flex-col
                                     absolute
                                     mt-1
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
                                                    setInformacionBusqueda({
                                                        ...informacionBusqueda,
                                                        producto: value._id,
                                                    })
                                                    setSearchProducto(value.descripcion)
                                                    setSearch(false);
                                                }}
                                                key={index}
                                            >
                                                <p className='text-slate-600'>{value.descripcion} </p>
                                            </div>

                                        )
                                    })}

                                </div>
                            }

                        </div>
                        <div
                            className='col-span-4 flex'
                        >
                            <div className='flex flex-col p-1'>
                                <input
                                    className='border-x border-y mt-3 rounded-sm px-2 p-1  text-slate-600  focus:border-blue-600 '
                                    type='date'
                                    onChange={(e) => {
                                        setInformacionBusqueda({
                                            ...informacionBusqueda,
                                            desde: e.target.value,
                                        })
                                    }}
                                />
                                <h1 className='font-semibold text-slate-400 text-xs flex justify-end p-1'>Desde</h1>
                            </div>
                            <div className='flex flex-col p-1'>
                                <input
                                    className='border-x border-y mt-3 rounded-sm px-2 p-1  text-slate-600  focus:border-blue-600  '
                                    type='date'
                                    onChange={(e) => {
                                        setInformacionBusqueda({
                                            ...informacionBusqueda,
                                            hasta: e.target.value,
                                        })
                                    }}
                                />
                                <h1 className='font-semibold text-slate-400 text-xs flex justify-end p-1'>Hasta</h1>
                            </div>
                            <div
                                className='
                                row-start-2
                                flex
                                flex-col
                                p-3
                            '
                            >
                                <div
                                    className='flex  cursor-pointer  mb-2 hover:text-slate-400 bg-blue-400 p-1 rounded-xl'
                                    onClick={() => {

                                        ObtenerInformacionKardex();

                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffff" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                    </svg>
                                </div>
                                <div
                                    className='flex  cursor-pointer mb-2 hover:text-slate-400 bg-blue-400 p-1 rounded-xl'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffff" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
                                    </svg>
                                </div>
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