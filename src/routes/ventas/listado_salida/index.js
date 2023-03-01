import { DataGrid, esES, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../../auth/auth';
import icono_ticket from '../lista_ventas/img/icono-ticket.svg';
import icono_pdf from '../lista_ventas/img/icono-pdf.svg';
import { getData } from '../../useFetch';
import { urlAPI } from '../../../config';
import { ImprimirPDF } from '../../../ui/Layouts/Impresiones/Pdf';
import { useReactToPrint } from 'react-to-print';
import { PdfNotaSalida } from '../../../ui/Layouts/Impresiones/Pdf/NotaSalida';
import { Informacion } from '../../../ui/Error';
import { TablaRow } from '../../../ui/Tabla/tableRow';
import { TableCell } from '../../../ui/Tabla/tableCell';
import { TablaTalwindCss } from '../../../ui/Tabla/useTabla';

function CustomToolbar() {

    return (

        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
        </GridToolbarContainer>
    )
}



function ListadoSalida() {
    //Usuario autenticado ? 
    const auth = useAuth();
    const navigation = useNavigate();
    if (!auth.user) navigation('/');

    const [notas, setNotas] = useState([]);
    const [informacionImpresion, setInformacionImpresion] = React.useState({});
    const [informacionNota, setInformacionNota] = React.useState(false);


    const componentPdfRef = React.useRef();

    const imprimirPDF = useReactToPrint({
        content: () => componentPdfRef.current,
        documentTitle: 'Documento de venta',
        onAfterPrint: () => console.log('Impreso uwu')
    })


    const [columns] = useState([
        {
            field: '_id',
            headerName: 'Id',
            flex: 0.3,
        },
        {
            field: '',
            headerName: 'Info',
            flex: 0.05,
            renderCell: (params) => {

                return (
                    <div
                        className='border bg-orange rounded-lg bg-orange-500 cursor-pointer'
                        onClick={() => {
                            setInformacionNota(params.row)
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                        </svg>

                    </div>
                )
            }
        },
        {
            field: 'numeroDocumento',
            headerName: 'Codigo nota salida',
            flex: 0.2,
            headerClassName: ''


        },
        {
            field: 'tipo',
            headerName: 'Tipo de  nota',
            flex: 0.1,
            headerClassName: '',


        },
        {
            field: 'solicitante',
            headerName: 'Solicitante',
            flex: 0.2,
            headerClassName: '',

        },
        {
            field: 'fecha',
            headerName: 'Fecha salida',
            flex: 0.2,
            headerClassName: '',


        },
        {
            field: 'motivo',
            headerName: 'Motivo',
            flex: 0.3,
            headerClassName: '',
        },
        {
            field: 'fecha_registro',
            headerName: 'Fecha registro',
            flex: 0.2,
            headerClassName: '',
        },
        {
            field: 'Imprimir',
            headerName: 'Imprimir',
            flex: 0.1,
            headerClassName: '',
            renderCell: (params) => {
                return (
                    <div
                        className='flex justify-center items-center  bg-blue-500 rounded-sm p-1 mx-auto'
                        onMouseEnter={() => {
                            setInformacionImpresion(params.row)
                        }}
                    >

                        <div
                            className='flex items-center  font-semibold text-xs text-white cursor-pointer'
                            onClick={(e) => {
                                imprimirPDF();
                            }}
                        >
                            PDF
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>

                        </div>
                    </div>
                )
            }
        },

    ])


    useEffect(() => {
        const getNotasSalida = async () => {
            const data = await getData(`${urlAPI.Nota_salida.url}`);
            setNotas(data);
        }

        getNotasSalida();
    }, [])

    return (
        <>
            {/**Impresion */}
            <div
                className='hidden'
            >
                <div
                    ref={componentPdfRef}

                >

                    <PdfNotaSalida
                        data={
                            {
                                venta: informacionImpresion,
                                qr: 'www.datos.com'
                            }
                        }
                    />

                </div>
            </div>

            {/**Fin de impresion */}
            <div
                className='
                
                    grid
                    h-screen
                    grid-cols-12
                '
            >
                <div
                    className='
                        col-span-12
                        flex
                        flex-col
                    '
                >
                    <div
                        className='
                            //bg-red-200
                            flex
                            flex-col
                            justify-center
                            my-2
                            mx-2
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
                            Notas de salida
                        </h1>
                        <p className='ml-2 font-normal text-sm  text-slate-500'>Recuerda que estas observando todas las notas de salidas registradas </p>
                    </div>

                    <div
                        className='
                        //bg-yellow-200
                        col-span-4
                        row-span-5
                        mx-3
                        mt-2
                        h-full
                        flex
                        flex-col
                    '
                    >

                        <DataGrid
                            components={{
                                Toolbar: CustomToolbar,
                            }}
                            getRowId={(row) => row._id}
                            rows={notas}
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
                            pagination
                            pageSize={11}
                        />

                    </div>


                </div>

            </div>

            {!!informacionNota &&
                <Informacion
                    onClick={() => {
                        setInformacionNota(false);
                    }}
                >
                    <div className='flex flex-col'>
                        <h1 className='p-2 border-b border-b-slate-200 font-black tracking-tighter'>Detalle de Salida</h1>
                        <div className='flex justify-end px-1 mt-1'><p className='font-semibold'>Codigo Salida :</p><p className='text-slate-600'> N01-00000234</p></div>
                        <p className='ml-2'>Solicitante: Juan</p>
                        <p className='ml-2'>Fecha Salida : 2022-03-07 </p>
                        <p className='ml-2'>Emitido : 2022-03-07 19:003 </p>
                        <div
                            className='
                                bg-sky-200
                                mt-2 p-2
                                rounded-xl
                            '
                        >

                            <div
                                className='
                                    tabla-informacion
                                    rounded-xl
                                '
                            >

                                <TablaTalwindCss
                                    headers={[
                                        { name: 'Codigo' },
                                        { name: 'Producto' },
                                        { name: 'Laboratorio' },
                                        { name: 'Lote' },
                                        { name: 'Fecha. Vct' },
                                        { name: 'Cantidad' },
                                    ]}
                                    marginY={'my-0 bg-white'}
                                >
                                    {informacionNota?.productos?.map((producto, index) => {

                                        return (
                                            <TablaRow>
                                                <TableCell
                                                    className='text-xs'
                                                >
                                                    {producto.codigo_barras}
                                                </TableCell>
                                                <TableCell
                                                    className='text-xs'
                                                >
                                                    {producto.descripcion}
                                                </TableCell>
                                                <TableCell
                                                    className='text-xs'
                                                >
                                                    {producto.id_laboratorio}
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
                                                    {producto.stock_saliente}
                                                </TableCell>
                                            </TablaRow>
                                        )
                                    })

                                    }

                                </TablaTalwindCss>
                            </div>

                        </div>
                    </div>

                </Informacion>
            }
        </>
    );
}

export { ListadoSalida }