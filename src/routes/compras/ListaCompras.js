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
import { useReactToPrint } from 'react-to-print';
import { ImprimirPDF } from '../../ui/Layouts/Impresiones/Pdf';
import { Informacion } from '../../ui/Error';
import { TablaTalwindCss } from '../../ui/Tabla/useTabla';
import { TablaRow } from '../../ui/Tabla/tableRow';
import { TableCell } from '../../ui/Tabla/tableCell';

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
    const [informacionImpresion, setInformacionImpresion] = React.useState();
    const [vermas, setVermas] = React.useState(false);


    const componentPdfRef = React.useRef();
    const imprimirPDF = useReactToPrint({
        content: () => componentPdfRef.current,
        documentTitle: 'Documento de venta',
        onAfterPrint: () => console.log('Impreso uwu')
    })

    console.log(vermas);

    const columns = [
        {
            field: '_id',
            headerName: '',
            flex: 0.1,
            renderCell: (params) => {
                return (
                    <button
                        onClick={() => {
                            setVermas(params.row)
                        }}
                        className='flex justify-center items-center config'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#D97706" class="w-6 h-5 ml-1">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>

                    </button>
                )
            }
        },
        {
            field: 'ruc_proveedor',
            headerName: 'Ruc',
            // headerClassName:'text-slate-800 ',
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
                    <div
                        onMouseEnter={() => {
                            setInformacionImpresion(params.row)
                        }}
                    >
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#ffff" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#16A34A" className="w-6 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
                            </svg>


                        </button>
                        <button

                            onClick={() => {
                                imprimirPDF();
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#0369A1" className="w-6 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                        </button>
                        <button >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" className="w-6 h-4">
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

    console.log(vermas);

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
                        Compras realizadas
                    </h1>
                    <p className='ml-2 font-normal text-sm  text-slate-500'>Recuerda que estas observando todas las compras registradas </p>
                </div>

                <div
                    className='hidden'
                >
                    <div
                        ref={componentPdfRef}

                    >

                        <ImprimirPDF
                            data={
                                {
                                    venta: {
                                        ...informacionImpresion,
                                        numero_venta: informacionImpresion?.numero_documento,
                                        tipo_moneda: 'SOLES',

                                    },
                                    qr: 'www.datos.com'
                                }
                            }
                        />

                    </div>
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
                        rows={listaCompras || []}
                        columns={columns}
                        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                    />
                </Box>
            </Box>
            {vermas &&
                <Informacion
                    onClick={() => setVermas(false)}
                >
                    <div
                        className='flex flex-col text-xs '
                    >
                        <h1 className='text-lg text-slate-600 p-2 border-b border-slate-300 font-sans' >Detalle de compra</h1>
                        <div
                            className='mt-3 px-2  flex justify-between w-full'
                        >
                            <p>Proveedor: {vermas?.proveedor}</p> <p className='font-bold'>{vermas?.tipo_documento} : {vermas?.numero_documento}</p>
                        </div>
                        <p className='px-2 mt-3'>Fecha Compra : {vermas?.fecha_documento}</p>
                        <p className='px-2 mt-3'>Emitido : {vermas?.fecha_registro}</p>

                        <div
                            className='
                                bg-sky-200
                                tabla-informacion
                                mt-2 p-2
                                rounded-xl
                            '
                        >
                            <TablaTalwindCss
                                headers={[
                                    { name: 'Producto' },
                                    { name: 'Lote' },
                                    { name: 'Fecha vencimiento' },
                                    { name: 'Cantidad' },
                                    { name: 'Precio' },
                                    { name: 'Total' },
                                ]}
                                marginY={'my-0 bg-white'}
                            >
                                {vermas?.productos.map((producto, index) => {

                                    return (
                                        <TablaRow>
                                            <TableCell
                                                className='text-xs'
                                            >
                                                {producto.descripcion}
                                            </TableCell>
                                            <TableCell
                                                className='text-xs'
                                            >
                                                {producto.lote}
                                            </TableCell>
                                            <TableCell
                                                className='text-xs'
                                            >
                                                {producto.fecha_vencimiento}
                                            </TableCell>
                                            <TableCell
                                                className='text-xs'
                                            >
                                                {producto.stock_comprado}
                                            </TableCell>
                                            <TableCell
                                                className='text-xs'
                                            >
                                                {producto.precio_compra}
                                            </TableCell>
                                            <TableCell
                                                className='text-xs'
                                            >
                                                {producto.total}
                                            </TableCell>
                                        </TablaRow>
                                    )
                                })

                                }

                            </TablaTalwindCss>

                        </div>


                    </div>

                </Informacion>
            }
        </>
    )
}

export { ListaCompra }