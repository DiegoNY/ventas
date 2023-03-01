import { DataGrid, esES, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { urlAPI } from '../../../config';
import { Footer } from '../../../ui/Layouts/Footer';
import { getData } from '../../useFetch';



function CustomToolbar() {

    return (

        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
        </GridToolbarContainer>
    )
}

const StockProductos = () => {

    const [reporte, setReporte] = useState();
    const [columns] = useState([
        {
            field: '_id',
            headerName: 'Id',
            flex: 0.2,
        },

        {
            field: 'laboratorio',
            headerName: 'Laboratorio',
            flex: 0.2,
            headerClassName: '',

        },
        {
            field: 'codigo',
            headerName: 'Codigo',
            flex: 0.1,
            headerClassName: '',

        },
        {
            field: 'descripcion',
            headerName: 'Descripcion',
            flex: 0.2,
            headerClassName: '',
        },
        {
            field: 'stock_inicial',
            headerName: 'Stock inicial',
            flex: 0.2,
            headerClassName: '',
        },
        {
            field: 'ventas',
            headerName: 'Cantidad vendida',
            flex: 0.2,
            headerClassName: '',
            renderCell: (params) => {
                return params.row.ventas || 0;
            }
        },
        {
            field: 'salidas',
            headerName: 'Cantidad saliente',
            flex: 0.2,
            headerClassName: '',
            renderCell: (params) => {

                return params.row.salidas || 0
            }
        },
        {
            field: 'stock',
            headerName: 'Stock actual',
            flex: 0.2,
            headerClassName: '',
            renderCell: (params) => {
                return params.row.stock || 0;
            }
        },
        {
            field: 'estado',
            headerName: 'Estado',
            renderCell: (params) => {

                return (
                    <div className={`
                    ${params.row.estado == 1 && 'bg-green-500 ' || 'bg-red-500'} 
                        text-white 
                            w-full 
                            text-xs
                            p-1
                            rounded-xl
                            text-center
                            tracking-tighter
                        `}
                    >
                        {params.row.estado == 1 && 'ACTIVO' || 'INACTIVO'}
                    </div>
                )
            }
        }


    ])

  

    useEffect(() => {

        const getReporteProductos = async () => {
            const dataReporte = await getData(`${urlAPI.Producto.url}?stockReporte=true`)

            setReporte(dataReporte);
        }
        getReporteProductos();

    }, [])


    return (
        <>
            <div
                className='
                    h-screen
                    grid
                    grid-cols-12
                '
            >

                <div
                    className='
                        col-span-12
                        h-full
                        mb-auto
                        mx-4
                    '
                >
                    <div className='my-2'>
                        <h1 className='ml-2 text-2xl mt-1 sm:text-2xl font-extrabold text-slate-900 tracking-tight  '>Stock</h1>
                        <p className='font-normal text-sm ml-2 text-slate-500'>Estas observando el stock de los productos</p>
                    </div>

                    <DataGrid
                        components={{
                            Toolbar: CustomToolbar,
                        }}
                        getRowId={(row) => row._id}
                        rows={reporte || []}
                        density='compact'
                        columns={columns || []}
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

                    <div
                        className='flex w-full my-2 text-slate-400 justify-center mb-1'
                    >
                        www.rcingenierossac.com
                    </div>
                    <Footer>
                    </Footer>
                </div>


            </div>
        </>
    )
}

export { StockProductos }