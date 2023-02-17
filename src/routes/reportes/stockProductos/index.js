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

const StockProductos = () => {

    const columns = [
        {
            field: '_id',
            headerName: 'Id',
            flex: 0.2,
        },

        {
            field: 'fecha_registro',
            headerName: 'Fecha',
            flex: 0.2,
            headerClassName: '',


        },
        {
            field: 'numero_documento',
            headerName: 'Documento',
            flex: 0.1,
            headerClassName: '',


        },
        {
            field: 'subtotal',
            headerName: 'Base impuestos',
            flex: 0.2,
            headerClassName: '',


        },
        {
            field: 'igv',
            headerName: 'Igv',
            flex: 0.2,
            headerClassName: '',
        },
        {
            field: 'total',
            headerName: 'Total',
            flex: 0.2,
            headerClassName: '',
        },


    ]

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
                        flex
                        flex-col
                        ml-3
                        mb-auto
                    '
                >
                    <h1 className='ml-2 text-2xl mt-1 sm:text-2xl font-extrabold text-slate-900 tracking-tight  '>Stock</h1>
                    <p className='font-normal text-sm ml-2 text-slate-500'>Estas observando el stock de los productos</p>
                </div>

                <div
                    className='
                        col-span-12 
                        h-full
                        mb-auto
                        mx-4
                        row-span-6
                    '
                >

                    <DataGrid
                        components={{
                            Toolbar: CustomToolbar,
                        }}
                        getRowId={(row) => row._id}
                        rows={[]}
                        density='compact'
                        columns={columns|| []}
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
        </>
    )
}

export { StockProductos }