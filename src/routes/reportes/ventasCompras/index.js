import { DataGrid, esES, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from '@mui/x-data-grid';
import React from 'react';

function CustomToolbar() {

    return (

        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
        </GridToolbarContainer>
    )
}


const ReporteVentasCompras = () => {

    const columns = [
        {
            field: '_id',
            headerName: 'Id',
            flex: 0.3,
        },

        {
            field: 'cliente',
            headerName: 'Cliente',
            flex: 0.3,
            headerClassName: '',


        },
        {
            field: 'serie',
            headerName: 'Serie',
            flex: 0.1,
            headerClassName: '',


        },
        {
            field: 'correlativo',
            headerName: 'Correlativo',
            flex: 0.2,
            headerClassName: '',


        },
        {
            field: 'total',
            headerName: 'Total',
            flex: 0.2,
            headerClassName: '',
        },
        {
            field: 'fecha_registro',
            headerName: 'Fecha',
            flex: 0.2,
            headerClassName: '',
        },


    ]


    return (
        <>
            <div
                className='
                    grid
                    grid-cols-12
                    h-screen
                '
            >
                <div
                    className='
                        col-span-12
                        flex
                        flex-col
                    '
                >
                    <h1 className=' mx-8  my-2 text-2xl sm:text-2xl font-extrabold text-slate-900 tracking-tight  '>Reportes generales </h1>
                    <div
                        className='flex ml-8 my-2'
                    >
                        <div
                            className='flex flex-col mr-2'
                        >
                            <h1 className='text-slate-600 mb-1'>Reporte de ventas</h1>
                            <div>
                                Desde <input type='date' className='mx-2 border-x border-y px-2' />
                                Hasta <input type='date' className='mx-2 border-x border-y px-2'/>
                            </div>
                        </div>
                        <div
                            className='flex flex-col mr-2'
                        >
                            <h1 className='text-slate-600 mb-1'>Reporte de ventas</h1>
                            <div>
                                Desde <input type='date' className='mx-2 border-x border-y px-2' />
                                Hasta <input type='date' className='mx-2 border-x border-y px-2'/>
                            </div>
                        </div>

                    </div>
                    <div
                        className='
                        //bg-yellow-200
                        col-span-12
                        h-full
                        mx-8
                        flex
                        flex-col
                    '
                    >

                        <DataGrid
                            components={{
                                Toolbar: CustomToolbar,
                            }}
                            getRowId={(row) => row._id}
                            rows={[]}
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
            </div>
        </>
    )
}

export { ReporteVentasCompras }