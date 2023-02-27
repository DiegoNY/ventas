import React, { useEffect, useState } from 'react';
import { _ } from 'gridjs-react';
import { getData } from '../useFetch';
import { urlAPI } from '../../config';
import {
    DataGrid, esES, GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { Box } from '@mui/system';
import { useAuth } from '../../auth/auth';
import { useNavigate } from 'react-router';
import { useReactToPrint } from 'react-to-print';
import { ImprimirPDF } from '../../ui/Layouts/Impresiones/Pdf';
import { Informacion } from '../../ui/Error';
import { TablaTalwindCss } from '../../ui/Tabla/useTabla';
import { TablaRow } from '../../ui/Tabla/tableRow';
import { TableCell } from '../../ui/Tabla/tableCell';

import * as  XLSX from 'xlsx'
import * as ExcelJS from 'exceljs'


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

    const DescargarDataExcel = (data) => {


        const worbook = new ExcelJS.Workbook();
        const sheet = worbook.addWorksheet("My Sheet");

        sheet.properties.defaultRowHeight = 16;
        sheet.mergeCells('A1:H2');

        const blueStyle = {
            font: { color: { argb: 'FFFFFFFF' } },
            fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0070C0' } },
            alignment: { horizontal: 'center' }
        };

        const titleCell = sheet.getCell('A1');
        titleCell.value = `REPORTE DETALLADO DE LA COMPRA ${data[0].numero_documento}`;
        titleCell.font = { bold: true };
        titleCell.alignment = { horizontal: 'center', vertical: 'middle' };

        const PROVEEDOR = sheet.getCell('A4');
        PROVEEDOR.value = 'PROVEEDOR :';
        PROVEEDOR.font = { bold: true };

        const PROVEEDOR_VALUE = sheet.getCell('B4');
        PROVEEDOR_VALUE.value = data[0].proveedor;

        const FECHA_COMPRA = sheet.getCell('A5');
        FECHA_COMPRA.value = 'FECHA COMPRA :';
        FECHA_COMPRA.font = { bold: true };

        const FECHA_COMPRA_VALUE = sheet.getCell('B5');
        FECHA_COMPRA_VALUE.value = data[0].fecha_registro;

        const TIPO_COMPRA = sheet.getCell('A6');
        TIPO_COMPRA.value = 'TIPO COMPRA :';
        TIPO_COMPRA.font = { bold: true };

        const TIPO_COMPRA_VALUE = sheet.getCell('B6');
        TIPO_COMPRA_VALUE.value = data[0].tipo_documento;

        const descripcion = sheet.getCell('A8');
        descripcion.value = "DESCRIPCION";
        descripcion.font = { bold: true };
        descripcion.alignment = { horizontal: 'center', vertical: 'middle' };
        descripcion.style = blueStyle;



        const cantidad = sheet.getCell('B8');
        cantidad.value = "CANTIDAD";
        cantidad.font = { bold: true };
        cantidad.alignment = { horizontal: 'center', vertical: 'middle' };
        cantidad.style = blueStyle;

        const LOTE = sheet.getCell('C8');
        LOTE.value = "LOTE";
        LOTE.font = { bold: true };
        LOTE.alignment = { horizontal: 'center', vertical: 'middle' };
        LOTE.style = blueStyle;


        const FECHA_VENCIMIENTO = sheet.getCell('D8');
        FECHA_VENCIMIENTO.value = "FECHA DE VENCIMIENTO";
        FECHA_VENCIMIENTO.font = { bold: true };
        FECHA_VENCIMIENTO.alignment = { horizontal: 'center', vertical: 'middle' };
        FECHA_VENCIMIENTO.style = blueStyle;


        const TOTAL = sheet.getCell('E8');
        TOTAL.value = "TOTAL";
        TOTAL.font = { bold: true };
        TOTAL.alignment = { horizontal: 'center', vertical: 'middle' };
        TOTAL.style = blueStyle;



        sheet.columns = [
            {
                key: 'descripcion',
                width: 20,
            },
            {
                key: 'cantidad',
                width: 16,
            },
            {
                key: 'lote',
                width: 10,
            },
            {
                key: 'fecha_vencimiento',
                width: 30,
            },
            {
                key: 'total',
                width: 10,
            },
        ]

        data[0].productos.map(producto => {
            const row = sheet.addRow({
                descripcion: producto.descripcion, cantidad: producto.stock,
                lote: producto.lote, fecha_vencimiento: producto.fecha_vencimiento,
                total: producto.total,
            })

            row.eachCell(cell => {
                cell.alignment = { horizontal: 'center' };
            });
        })

        const totalRows = sheet.rowCount;
        const totalCellTexts = sheet.getCell(`D${totalRows + 1}]`);
        const totalCell = sheet.getCell(`E${totalRows + 1}]`);
        totalCellTexts.value = 'TOTAL'
        totalCellTexts.font = { bold: true };
        totalCell.value = 120;
        totalCell.alignment = { horizontal: 'center' }




        worbook.xlsx.writeBuffer().then(datas => {
            const blob = new Blob([datas], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
            })

            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = `COMPRA ${data[0].numero_documento}.xlsx`;
            anchor.click();
            window.URL.revokeObjectURL(url);
        })


    }


    const [columns] = useState([
        {
            field: '_id',
            headerName: 'id',
            flex: 0.1,
        },
        {
            field: 'opciones',
            headerName: '',
            flex: 0.1,
            renderCell: (params) => {
                return (
                    <button
                        onClick={() => {
                            setVermas(params.row)
                        }}
                        className=' rounded-lg bg-orange-500 cursor-pointer'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
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
            field: 'total',
            headerName: 'Total',
            flex: 0.2,
            renderCell: (params) => {
                return `S/ ${params.row.total}`
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
                        <button
                            onClick={() => {
                                DescargarDataExcel([params.row])
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#ffff" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#16A34A" className="w-6 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
                            </svg>


                        </button>
                        <button
                            className='bg-blue-400 rounded-lg p-1'
                            onClick={() => {
                                imprimirPDF();
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffff" className="w-6 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                        </button>
                        <button  >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" className="w-6 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>

                        </button>
                    </div>
                )

            }
        }

    ]
    )



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
                </Box>
            </Box>
            {vermas &&
                <Informacion
                    onClick={() => setVermas(false)}
                >
                    <div
                        className='flex flex-col text-xs '
                    >
                        <h1 className='p-2 border-b text-sm border-b-slate-200 font-black tracking-tighter'>Detalle de Compra</h1>

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


                    </div>

                </Informacion>
            }
        </>
    )
}

export { ListaCompra }