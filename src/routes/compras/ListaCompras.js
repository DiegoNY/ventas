import React, { useEffect } from 'react';
import { _ } from 'gridjs-react';
import { Titulo } from '../../ui/titulos-vistas';
import { getData } from '../useFetch';
import { urlAPI } from '../../config';
import {
    DataGrid, esES, GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { Box } from '@mui/system';
import icono_compras from './img/icono-compras.svg';
import { useAuth } from '../../auth/auth';
import { useNavigate } from 'react-router';

function CustomToolbar() {

    return (

        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
        </GridToolbarContainer>
    )
}


function ListaCompra() {
    //Usuario autenticado ? 
    const auth = useAuth();
    const navigation = useNavigate();
    if (!auth.user) navigation('/');

    const [listaCompras, setListaCompras] = React.useState([]);
    const columns = [
        {
            field: '_id',
            headerName: '',
            flex: 0.1,
            renderCell: (params) => {
                return (
                    <button
                        onClick={() => {
                        }}
                    >
                        btn
                    </button>
                )
            }
        },
        {
            field: 'ruc',
            headerName: 'Ruc',
            flex: 0.3,


        },
        {
            field: 'proveedor',
            headerName: 'Proveedor',
            flex: 0.3,

        },
        {
            field: 'tipo_documento',
            headerName: 'Tipo documento',
            flex: 0.3,


        },
        {
            field: 'numero_documento',
            headerName: 'Codigo compra',
            flex: 0.4,


        },
        {
            field: 'fecha_documento',
            headerName: 'Fecha',
            flex: 0.3,

        },
        {
            field: 'efectivo',
            headerName: 'Total',
            flex: 0.2,
            renderCell: (params) => {
                return `S/ ${params.row.efectivo}`
            }

        },
        {
            field: '',
            headerName: 'Acciones',
            headerClassName: 'bg-white',
            flex: 0.2,
            renderCell: (params) => {

                return (
                    <div>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
                            </svg>


                        </button>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                        </button>
                        <button >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>

                        </button>
                    </div>
                )

            }
        }

    ]

    useEffect(() => {

        const obtenerListaCompra = async () => {
            const data = await getData(`${urlAPI.ListaCompra.url}`);
            setListaCompras(data);
        }

        obtenerListaCompra();

    }, [])


    return (
        <>

            <Box
                m="1px 2.5rem"
            >
                <div
                    className='
                        text-2xl
                        font-black
                        my-3
                        flex
                    '
                >
                    <p className='font-sans'>Lista compras</p> / <p className=' text-sm text-sky-400 mt-2'>compras </p>
                    <img src={icono_compras} className='ml-1 mt-1  scale-70 h-6' />

                </div>

                <Box
                    mt="10px"
                    height="75vh"

                >
                    <DataGrid
                        components={{
                            Toolbar: CustomToolbar,
                        }}
                        getRowId={(row) => row._id}
                        rows={listaCompras || []}
                        columns={columns}
                        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                    />
                </Box>
            </Box>
        </>
    )
}

export { ListaCompra }