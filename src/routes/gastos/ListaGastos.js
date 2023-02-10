import { Box } from '@mui/material';
import { DataGrid, esES, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { urlAPI } from '../../config';
import { Informacion } from '../../ui/Error';
import { getData } from '../useFetch';


function CustomToolbar() {

    return (

        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
        </GridToolbarContainer>
    )
}


const ListaGastos = () => {

    const [gastos, setGastos] = useState([]);
    const [imagen, setImagen] = useState(false);

    const columns = [
        {
            field: '_id',
            headerName: '',
            flex: 0.1,
        },
        {
            field: 'fecha',
            headerName: 'Fecha',
            // headerClassName:'text-slate-800 ',
            flex: 0.1,


        },
        {
            field: 'descripcion',
            headerName: 'Descripcion',
            flex: 0.3,

        },
        {
            field: 'monto',
            headerName: 'Monto',
            flex: 0.1,


        },
        {
            field: 'usuario',
            headerName: 'Creado por ',
            flex: 0.1,


        },
        {
            field: 'imagen',
            headerName: 'Imagen',
            flex: 0.1,
            renderCell: (params) => {
                return (
                    <>
                        <div
                            className='mx-auto cursor-pointer scale-75'
                            onClick={() => {
                                setImagen(params.row.imagen)
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 stroke-blue-500">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>

                        </div>
                    </>
                )
            }

        },
        {
            field: 'Acciones',
            headerName: 'Acciones',
            flex: 0.1,
            renderCell: (params) => {
                return (
                    <div
                        className='mx-auto'
                    >
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                            </svg>
                        </button>
                    </div>

                )



            }

        }

    ]

    useEffect(() => {
        const obtenerGastos = async () => {
            const gastosData = await getData(`${urlAPI.Gastos.url}`);
            setGastos(gastosData);
        }

        obtenerGastos();

    }, [])
    return (
        <>

            <Box
                m="1px 2.5rem"
            >
                <div
                    className='
                            //bg-red-200
                            col-span-4
                            flex
                            flex-col
                            justify-center
                            my-3
                    '
                >

                    <h1 className='
                            ml-2 
                            text-2xl 
                            sm:text-2xl 
                            font-extrabold 
                            text-slate-900 
                            tracking-tight  
                        '>
                        Gastos realizados
                    </h1>
                    <p className='ml-2 font-normal text-sm  text-slate-500'>Recuerda que estas observando todos los gastos registrados </p>
                </div>



                <Box
                    mt="10px"
                    height="75vh"

                >
                    <DataGrid
                        components={{
                            Toolbar: CustomToolbar,
                        }}
                        density='compact'
                        getRowId={(row) => row._id}
                        initialState={
                            {
                                columns: {
                                    columnVisibilityModel: {
                                        _id: false
                                    }
                                }
                            }
                        }
                        rows={gastos || []}
                        columns={columns || []}
                        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                    />
                </Box>

            </Box>
            {!!imagen &&
                <Informacion
                    onClick={() => {
                        setImagen(false);
                    }}
                >
                    <div
                        className='
                            flex
                            mx-auto
                            my-auto
                            scale-75
                        '
                    >
                        <img
                            src={imagen}
                            className='
                                h-40
                            '
                        />
                    </div>
                </Informacion>
            }

        </>
    )
}

export { ListaGastos }