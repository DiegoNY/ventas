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

    const [columns] = useState([
        {
            field: '_id',
            headerName: '',
            flex: 0.1,
        },
        {
            field: 'fecha',
            headerName: 'Fecha',
            flex: 0.1,
            renderCell: (params) => {
                return <div className='text-center w-full'>{params.row.fecha}</div>
            }

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
            renderCell: (params) => {
                return <div className='text-center w-full'>{params.row.monto}</div>
            }
        },
        {
            field: 'usuario',
            headerName: 'Creado por ',
            flex: 0.1,
            renderCell: (params) => {
                return <div className='text-center w-full'>{params.row.usuario}</div>
            }
        },
        {
            field: 'imagen',
            headerName: 'Archivo adjunto',
            flex: 0.1,
            renderCell: (params) => {
                return (
                    <>
                        <div
                            className='mx-auto cursor-pointer scale-75 flex'
                            onClick={() => {
                                setImagen(params.row.imagen)
                            }}
                        >
                            <div className='bg-blue-400 rounded-xl p-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffff" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
                                </svg>
                            </div>

                            <a href={params.row.imagen} className='p-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                </svg>
                            </a>

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
                        <button className='rounded-xl bg-green-600 p-1 text-white text-xs '>
                            Exportar
                        </button>
                    </div>

                )



            }

        }

    ])

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
                        pagination
                        pageSize={11}
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