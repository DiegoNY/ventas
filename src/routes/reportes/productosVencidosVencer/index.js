import { DataGrid, esES, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { urlAPI } from '../../../config';
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

const ProductosVencidosVencer = () => {

    const [fecha, setFecha] = useState()
    const [buscar, setBuscar] = useState(false);
    const [data, setData] = useState();

    useEffect(() => {
        const getInformacion = async () => {
            const data = await getData(`${urlAPI.Stock.url}?productos_vencidos={"desde":"${fecha.desde}","hasta":"${fecha.hasta}"}`)
            setData(data)
        }

        getInformacion();

    }, [buscar])


    const columns = [
        {
            field: '_id',
            headerName: 'ID',
            flex: 0.2,
        },
        {
            field: 'descripcion',
            headerName: 'Descripcion',
            flex: 0.2,
        },
        {
            field: 'laboratorio',
            headerName: 'Laboratorio',
            flex: 0.2,
        },
        {
            field: 'lote',
            headerName: 'Lote',
            flex: 0.2,
        },
        {
            field: 'fecha_vencimiento',
            headerName: 'Fecha vencimiento',
            flex: 0.2,
        },
        {
            field: 'stock',
            headerName: 'Cantidad',
            flex: 0.2,
        },
    ]

    return (
        <>
            <div className='grid grid-cols-12'>

                <div
                    className='col-span-12 flex flex-col mx-1'
                >
                    <h1 className='ml-2 text-2xl sm:text-2xl font-extrabold text-slate-900 tracking-tight  '>Reportes</h1>
                    <p className='font-normal text-sm ml-2 text-slate-500'>Productos vencidos o por vencer</p>

                    <div className='grid grid-cols-8 sm:grid-cols-12 mx-4 mt-2 border-slate-400 justify-center items-center border h-16 rounded-sm '>

                        <div className='w-full col-span-8 sm:col-span-9 text-slate-600 sm:row-start-1 flex justify-end'>

                            <input
                                type='date'
                                className='border mx-2 w-80 p-2 h-7'
                                onChange={(e) => {

                                    setFecha({
                                        ...fecha,
                                        desde: e.target.value
                                    })
                                }}
                            />
                            <input
                                type='date'
                                className='border w-80  p-2 h-7'
                                onChange={(e) => {
                                    setFecha({
                                        ...fecha,
                                        hasta: e.target.value
                                    })
                                }}
                            />
                        </div>
                        <div
                            className='
                               row-start-2 col-span-8  sm:row-start-1 sm:col-span-3 flex justify-end w-full items-center mr-2  
                            '
                        >
                            <div className='bg-slate-200 rounded-3xl h-10 w-10 flex justify-center items-center border-x border-y hover:border-blue-600 cursor-pointer'
                                onClick={() => setBuscar(!buscar)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </div>
                            <div className=' cursor-pointer mx-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2563EB" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                                </svg>
                            </div>
                        </div>

                    </div>
                    <div
                        className='
                                mx-4
                                h-96
                                mt-2
                            '
                    >
                        <DataGrid
                            components={{
                                Toolbar: CustomToolbar,
                            }}
                            getRowId={(row) => row._id}
                            rows={data || []}
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
                    </div>
                </div>

            </div>
        </>
    )
}

export { ProductosVencidosVencer }