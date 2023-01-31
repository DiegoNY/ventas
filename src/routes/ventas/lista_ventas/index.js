import {
    DataGrid,
    esES,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarFilterButton
} from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { urlAPI } from '../../../config';
import { Titulo } from '../../../ui/titulos-vistas';
import { getData } from '../../useFetch';
import icono_ticket from './img/icono-ticket.svg';
import icono_pdf from './img/icono-pdf.svg';
import { useNavigate } from 'react-router';
import { useAuth } from '../../../auth/auth';


function CustomToolbar() {

    return (

        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
        </GridToolbarContainer>
    )
}



function ListaVenta() {
    //Usuario autenticado ? 
    const auth = useAuth();
    const navigation = useNavigate();
    if (!auth.user) navigation('/');


    const [ventas, setVentas] = useState([]);
    const [todasVentas, setTodasVentas] = useState([]);
    const [total, setTotal] = useState(0);
    const [skip, setSkip] = useState(0);
    const [limite, setLimite] = useState(12);
    const [cambiarPagina, setCambiarPagina] = useState(false);
    const [ventasBusqueda, setVentasBusqueda] = useState([]);


    const SearchVentas = (valorBusqueda) => {

        let ventasEncontradas = []

        if (!valorBusqueda.length >= 1) {

            ventasEncontradas = valorBusqueda;

        } else {
            ventasEncontradas = todasVentas?.filter(venta => {
                const ventaText = `${venta.numero_venta?.toLowerCase()}${venta.tipo_documento?.toLowerCase()}${venta.total}${venta.fecha_registro}${venta.cliente.toLowerCase()}`
                const valorBusquedaFiltrado = valorBusqueda.toLowerCase();

                return ventaText?.includes(valorBusquedaFiltrado)
            })
        }


        setVentasBusqueda(ventasEncontradas)
    }


    const columns = [
        {
            field: '_id',
            headerName: 'Id',
            flex: 0.3,
        },
        {
            field: 'identificacion',
            headerName: 'Ruc / Dni',
            flex: 0.3,
            headerClassName: '',
            renderCell: (params) => {
                let identificacion = params.row.identificacion;
                if (identificacion == 0) {
                    identificacion = '0000000'
                }
                return identificacion;
            }


        },
        {
            field: 'cliente',
            headerName: 'Cliente',
            flex: 0.3,
            headerClassName: '',


        },
        {
            field: 'tipo_documento',
            headerName: 'Tipo documento',
            flex: 0.2,
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
        {
            field: 'Imprimir',
            headerName: 'Imprimir',
            flex: 0.2,
            headerClassName: '',
            renderCell: (params) => {
                return (
                    <div
                        className='flex justify-between w-full mx-2'
                    >
                        <div
                            className='flex font-semibold cursor-pointer'
                        >
                            Ticket
                            <img src={icono_ticket} className='h-4 rotate-90' />

                        </div>
                        <div
                            className='flex font-semibold  cursor-pointer'
                        >
                            A4
                            <img src={icono_pdf} className=' h-4 ' />
                        </div>
                    </div>
                )
            }
        },
        {
            field: 'Acciones',
            headerName: 'Acciones',
            flex: 0.1,
            headerClassName: '',
            renderCell: (params) => {
                return (
                    <div
                        className='flex justify-between w-full '
                    >
                        <div
                            className='
                                text-xs 
                                bg-indigo-400 
                                rounded-sm 
                                w-1/2 
                                h-full 
                                text-center  
                                text-white 
                                cursor-pointer
                            '
                        >
                            <h1 className='mt-1'>RC</h1>
                        </div>
                        <div
                            className='
                                text-xs 
                                bg-yellow-300 
                                rounded-sm 
                                w-1/2 
                                h-full 
                                text-center  
                                text-slate-700
                                ml-1
                                cursor-pointer
                            '
                        >
                            <h1 className='mt-1 '>NC</h1>
                        </div>
                    </div>
                )
            }
        },

    ]


    useEffect(() => {

        const obtenerTodasVentas = async () => {
            const todasVentasData = await getData(`${urlAPI.Venta.url}`);
            setTotal(todasVentasData.length)
            setTodasVentas(todasVentasData);

        }

        obtenerTodasVentas();


    }, [])

    useEffect(() => {

        const obtenerDataVentas = async () => {

            const ventaData = await getData(`${urlAPI.Venta.url}?skip=${skip}&limite=${limite}`);
            setVentas(ventaData);
        }

        obtenerDataVentas();

    }, [cambiarPagina])


    return (
        <>


            <div
                className='
                grid
                grid-cols-12
                grid-rows-6
                h-screen
            '
            >
                <div
                    className='
                    //bg-indigo-400
                    col-span-12
                    row-span-6
                    my-2
                    mx-3
                    grid
                    grid-cols-4
                    grid-rows-6
                '
                >
                    <div
                        className='
                        //bg-red-200
                        col-span-4
                        grid
                        grid-cols-2
                    '
                    >
                        <Titulo
                            title='Lista de ventas '
                            navegacion='Ventas'
                            icono={'fi fi-rs-shop'}
                        />




                    </div>



                    <div
                        className='
                        //bg-yellow-200
                        col-span-4
                        row-span-5
                        mx-1
                        flex
                        flex-col
                    '
                    >

                        <DataGrid
                            components={{
                                Toolbar: CustomToolbar,
                            }}
                            getRowId={(row) => row._id}
                            rows={todasVentas || []}
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

export { ListaVenta }