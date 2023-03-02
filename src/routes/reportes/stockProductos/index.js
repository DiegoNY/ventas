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

                const percentage = params.row.stock / params.row.stock_minimo * 100;
                let color = '';

                if (percentage >= 70) {
                    color = '#5DAB5D';
                } else if (percentage >= 30) {
                    color = '#F5D496';
                } else {
                    color = '#F44336';
                }

                const progressStyle = {
                    width: `${percentage}%`,
                    height: '30px',
                    backgroundColor: color,
                };

                return (
                    <div className='flex w-full border mx-1'>
                        <div style={progressStyle} className=' items-center  border-x border-slate-400 rounded-sm p-2 flex justify-center'  ></div>
                        <div className='bg-white w-auto'>
                        </div>
                        <div className='absolute w-32 mt-1 text-center'>{params.row.stock}</div>
                    </div>
                )
            }
        },
        {
            field: 'estado',
            headerName: 'Estado',
            flex:0.2,
            renderCell: (params) => {
                let estadoInfo = {
                    borde: 'border-red-400', text: 'text-red-400', texto: 'Inactivo',
                    icono: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                }

                if (params.row.estado === 1) {
                    estadoInfo = {
                        borde: 'border-green-600', text: 'text-green-600', texto: 'Activo',
                        icono: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>

                    }
                }


                return (
                    <div className='w-full  px-4'>
                        <div className={`border-y border-x text-xs text-center px-1  rounded-xl ${estadoInfo.borde} ${estadoInfo.text} flex justify-between mx-1`}>
                            <div className='mt-0.5'>
                                {estadoInfo.icono}
                            </div>
                            <div className='mt-0.5 mr-1'>
                                {estadoInfo.texto}
                            </div>
                        </div>
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