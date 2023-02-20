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
import { getData } from '../../useFetch';
import icono_ticket from './img/icono-ticket.svg';
import icono_pdf from './img/icono-pdf.svg';
import { useNavigate } from 'react-router';
import { useAuth } from '../../../auth/auth';

import { useReactToPrint } from 'react-to-print';
import { ImprimirTicket } from '../../../ui/Layouts/Impresiones/Ticket';
import { ImprimirPDF } from '../../../ui/Layouts/Impresiones/Pdf';
import { Informacion } from '../../../ui/Error';


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


    const [todasVentas, setTodasVentas] = useState([]);
    const [notaCredito, setNotaCredito] = useState(false);
    const [rc, setRc] = useState(false)

    const componenTicketRef = React.useRef();
    const componentPdfRef = React.useRef();
    const [informacionImpresion, setInformacionImpresion] = useState({});

    const imprimirTicket = useReactToPrint({
        content: () => componenTicketRef.current,
        documentTitle: 'Ticket de venta',
        onAfterPrint: () => console.log('Print'),
    })
    const imprimirPDF = useReactToPrint({
        content: () => componentPdfRef.current,
        documentTitle: 'Documento de venta',
        onAfterPrint: () => console.log('Impreso uwu')
    })

    const opcionesAnulacion = [
        {
            descripcion: 'Anulacion de la operacion',
            codigo: 222,
        },
        {
            descripcion: 'Anulacion por error en el  RUC',
            codigo: 222,
        },
        {
            descripcion: 'Correccion por error en la descripcion ',
            codigo: 222,
        },
        {
            descripcion: 'Descuento global',
            codigo: 222,
        },
        {
            descripcion: 'Descuento por item',
            codigo: 222,
        },
        {
            descripcion: 'Devolucion total',
            codigo: 222,
        },
        {
            descripcion: 'Devolucion por item',
            codigo: 222,
        },
        {
            descripcion: 'Bonificacion',
            codigo: 222,
        },
        {
            descripcion: 'Disminucio en el valor',
            codigo: 222,
        },
        {
            descripcion: 'Otros conceptos',
            codigo: 222,
        },
    ]


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
            renderCell: (params) => {
                let tipoDocumento;
                let serie = params.row.serie.split('');

                if (serie[0] === 'B') tipoDocumento = 'BOLETA';
                if (serie[0] === 'T') tipoDocumento = 'TICKET';
                if (serie[0] === 'F') tipoDocumento = 'FACTURA';

                return <p>{tipoDocumento}</p>
            }


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
                        onMouseEnter={() => {
                            setInformacionImpresion(params.row)
                        }}
                    >
                        <div
                            className='flex font-semibold tracking-tighter text-xs text-lime-600 cursor-pointer'
                            onClick={(e) => {
                                imprimirTicket();
                            }}
                        >
                            TICKET
                            <img src={icono_ticket} className='h-4 rotate-90' />

                        </div>
                        <div
                            className='flex font-semibold text-xs text-orange-500 	 cursor-pointer'
                            onClick={(e) => {
                                imprimirPDF();
                            }}
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
                            <h1 className='mt-1 ' onClick={() => setNotaCredito(params.row)} >NC</h1>
                        </div>


                    </div>
                )
            }
        },

    ]



    useEffect(() => {

        const obtenerTodasVentas = async () => {
            const todasVentasData = await getData(`${urlAPI.Venta.url}`);
            setTodasVentas(todasVentasData);

        }

        obtenerTodasVentas();


    }, [])


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
                            flex
                            flex-col
                            justify-center
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
                            Ventas realizadas
                        </h1>
                        <p className='ml-2 font-normal text-sm  text-slate-500'>Recuerda que estas observando todas las ventas registradas </p>
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

                {/**Impresion */}
                <div
                    className='hidden'
                >
                    <div
                        ref={componenTicketRef}

                    >

                        <ImprimirTicket
                            data={
                                {
                                    venta: informacionImpresion,
                                    qr: 'www.datos.com'
                                }
                            }
                        />
                    </div>
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
                                    venta: informacionImpresion,
                                    qr: 'www.datos.com'
                                }
                            }
                        />

                    </div>
                </div>

                {/**Fin impresion */}

            </div>
            {notaCredito &&
                <Informacion
                    onClick={() => setNotaCredito(false)}
                    height=' '
                >
                    <div
                        className='flex flex-col '
                    >
                        <h1 className='p-2 border-b border-b-slate-100 text-slate-600 font-bold tracking-tighter'>Anulacion de comprobante</h1>
                        <h1 className='mt-1 p-2 text-slate-900 font-black '>Informacion del documento</h1>
                        <p className='p-2 flex justify-end mr-2 text-slate-700 '><p className='font-semibold tracking-tighter'>Fecha de la Nota de Credito</p> : 2023-02-20 </p>
                        <div className='border-y rounded-xl grid grid-rows-3 p-2 mx-3' >

                            <div
                                className='grid grid-cols-2 p-1'
                            >
                                <h1 className='mx-4'>Tipo de documento </h1>
                                <div
                                    className='flex'
                                >
                                    Boleta de venta electronico
                                </div>
                            </div>
                            <div
                                className='grid grid-cols-2 border-t p-1'
                            >
                                <h1 className='mx-4' >Numero de documento</h1>
                                <div className='flex' >
                                    B001-00007150
                                </div>
                            </div>
                            <div
                                className='grid grid-cols-2 border-t p-1'
                            >
                                <h1 className='mx-4' >Fecha del documento</h1>
                                <div className='flex' >
                                    2023-12-09
                                </div>
                            </div>
                        </div>
                        <div className='p-2 flex justify-between'>
                            <p className='p-1 text-slate-900 font-semibold'>¿Cual es el motivo de la anulacion?</p>
                            <select
                                className='border w-1/2 p-1'
                            >
                                <option>Selecciona una opcion</option>
                                {opcionesAnulacion.map(value => {

                                    return (
                                        <option value={value.codigo}>{value.descripcion}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <p className='px-2 text-slate-900 font-semibold'>Descripcion</p>
                        <textarea
                            className='border mx-2 rounded-lg p-1'
                        >

                        </textarea>
                        <div
                            className='flex  justify-end mx-2 '
                        >
                            <button className='bg-orange-500 rounded-sm text-white  p-1 mt-1.5'>
                                Emitir resumen
                            </button>
                        </div>

                    </div>
                </Informacion>
            }


        </>
    )
}

export { ListaVenta }