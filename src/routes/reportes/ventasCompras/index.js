import { style } from '@mui/system';
import { DataGrid, esES, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { EMPRESA, urlAPI } from '../../../config';
import { DescargarDataExcel } from '../../useDescargaExcel';
import { getData } from '../../useFetch';

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



    const [fechaCompras, setFechaCompras] = useState({});
    const [fechaVentas, setFechaVentas] = useState({});

    const [buscarCompras, setBuscarCompras] = useState(false);
    const [buscarVentas, setBuscarVentas] = useState(false);

    const [data, setData] = useState([]);

    const [columns] = useState([
        {
            field: '_id',
            headerName: 'Id',
            flex: 0.2,
        },

        {
            field: 'fecha_registro',
            headerName: 'Fecha',
            flex: 0.05,
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
            headerName: 'Base Imponible',
            flex: 0.1,
            headerClassName: '',


        },
        {
            field: 'igv',
            headerName: 'Igv',
            flex: 0.1,
            headerClassName: '',
        },
        {
            field: 'total',
            headerName: 'Total',
            flex: 0.1,
            headerClassName: '',
        },


    ])

    const DescargarVentas = (titulo, hoja, data) => {
        let columns = [
            {
                key: 'fecha_registro',
                width: 20,
            },
            {
                key: 'identificacion',
                width: 16,
            },
            {
                key: 'cliente',
                width: 20,
            },
            {
                key: 'tipo_documento',
                width: 20,
            },
            {
                key: 'serie',
                width: 20,
            },
            {
                key: 'correlativo',
                width: 20,
            },
            {
                key: 'subtotal',
                width: 20,
            },
            {
                key: 'igv',
                width: 20,
            },
            {
                key: 'total',
                width: 20,
            },
            {
                key: 'leyenda',
                width: 20,
            },
        ]


        let informacion = {
            hoja: hoja,
            titulo: {
                celdas: "A1:I2",
                value: titulo,
            },
            celdas: [
                {
                    numero: "A4",
                    value: `${EMPRESA.RUC}`,
                    font: { bold: true },
                    style: {}
                },
                {
                    numero: "A5",
                    value: `${EMPRESA.NOMBRE}`,
                    font: { bold: true },
                    style: {},
                },
                {
                    numero: "A7",
                    value: "FECHA REGISTRO",
                    font: { bold: true },
                },
                {
                    numero: "B7",
                    value: "IDENTIFICACION",
                    font: { bold: true },
                },
                {
                    numero: "C7",
                    value: "CLIENTE",
                    font: { bold: true },
                },
                {
                    numero: "D7",
                    value: "TIPO COMPROBANTE",
                    font: { bold: true },
                    width: 20
                },
                {
                    numero: "E7",
                    value: "SERIE",
                    font: { bold: true },
                },
                {
                    numero: "F7",
                    value: "CORRELATIVO",
                    font: { bold: true },
                },
                {
                    numero: "G7",
                    value: "BASE IMPONIBLE",
                    font: { bold: true },
                },
                {
                    numero: "H7",
                    value: "IGV",
                    font: { bold: true },
                },
                {
                    numero: "I7",
                    value: "TOTAL VENTA",
                    font: { bold: true },
                },
                {
                    numero: "J7",
                    value: "LEYENDA VENTA",
                    font: { bold: true },
                },
            ],
            nombreArchivo: titulo,
            final: [
                {
                    columna: "H",
                    cantidad: 2,
                    value: "TOTAL"
                },
                {
                    columna: "I",
                    cantidad: 2,
                    value: { formula: { operacion: "SUM", columna: "I", numero: 8 } },
                    font: { bold: false }
                },
            ]
        }
        DescargarDataExcel(data, columns, informacion);
    }

    const DescargarCompras = (titulo, hoja, data) => {
        let columns = [
            {
                key: 'fecha_registro',
                width: 20,
            },
            {
                key: 'ruc_proveedor',
                width: 16,
            },
            {
                key: 'proveedor',
                width: 20,
            },
            {
                key: 'tipo_documento',
                width: 20,
            },
            {
                key: 'fecha_documento',
                width: 20,
            },
            {
                key: 'numero_documento',
                width: 20,
            },
            {
                key: 'total',
                width: 20,
            },
            {
                key: 'forma_pago',
                width: 20,
            },
        ]


        let informacion = {
            hoja: hoja,
            titulo: {
                celdas: "A1:H2",
                value: titulo,
            },
            celdas: [
                {
                    numero: "A4",
                    value: `${EMPRESA.RUC}`,
                    font: { bold: true },
                    style: {}
                },
                {
                    numero: "A5",
                    value: `${EMPRESA.NOMBRE}`,
                    font: { bold: true },
                    style: {},
                },
                {
                    numero: "A7",
                    value: "FECHA REGISTRO",
                    font: { bold: true },
                },
                {
                    numero: "B7",
                    value: "RUC",
                    font: { bold: true },
                },
                {
                    numero: "C7",
                    value: "LABORATORIO",
                    font: { bold: true },
                },
                {
                    numero: "D7",
                    value: "TIPO COMPROBANTE",
                    font: { bold: true },
                    width: 20
                },
                {
                    numero: "E7",
                    value: "FECHA DOCUMENTO",
                    font: { bold: true },
                },
                {
                    numero: "F7",
                    value: "CODIGO COMPRA",
                    font: { bold: true },
                },
                {
                    numero: "G7",
                    value: "TOTAL COMPRA",
                    font: { bold: true },
                },
                {
                    numero: "H7",
                    value: "FORMA PAGO",
                    font: { bold: true },
                },

            ],
            nombreArchivo: titulo,
            final: [
                {
                    columna: "F",
                    cantidad: 2,
                    value: "TOTAL"
                },
                {
                    columna: "G",
                    cantidad: 2,
                    value: { formula: { operacion: "SUM", columna: "G", numero: 8 } },
                    font: { bold: false }
                },
            ]
        }


        DescargarDataExcel(data, columns, informacion);
    }

    useEffect(() => {

        const getCompras = async () => {
            const comprasData = await getData(`${urlAPI.ListaCompra.url}?reporte={"desde":"${fechaCompras.desde}", "hasta":"${fechaCompras.hasta}" }`)
            setData(comprasData);
        }

        if (fechaCompras.buscar) getCompras();


    }, [buscarCompras])

    useEffect(() => {

        const getVentas = async () => {
            const ventasData = await getData(`${urlAPI.Venta.url}?reporte_busqueda={"desde":"${fechaVentas.desde}", "hasta":"${fechaVentas.hasta}"}`)
            setData(ventasData);
        }

        if (fechaVentas.buscar) getVentas();

    }, [buscarVentas])

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
                    <h1 className=' mx-8  mt-2 text-2xl sm:text-2xl font-extrabold text-slate-900 tracking-tight  '>Reportes generales </h1>
                    <p className='font-normal text-sm ml-8 text-slate-500'>Por favor escoge las fechas que deseas buscar </p>
                    <div
                        className='flex ml-8 my-2 justify-between mr-4'
                    >
                        <div
                            className='flex flex-col '
                        >
                            <h1 className='text-slate-700 mb-1 font-black tracking-tighter'>Reporte de ventas</h1>
                            <div>
                                Desde
                                <input
                                    type='date'
                                    className='mx-2 border-x border-y p-1 text-center'
                                    onChange={(e) => {
                                        setFechaVentas({
                                            ...fechaVentas,
                                            desde: e.target.value,
                                        })
                                    }}
                                />
                                Hasta
                                <input
                                    type='date'
                                    className='mx-2 border-x border-y p-1 text-center'
                                    onChange={(e) => {
                                        setFechaVentas({
                                            ...fechaVentas,
                                            hasta: e.target.value,
                                        })
                                    }}
                                />
                            </div>
                            <div
                                className='
                                    flex
                                    justify-between
                                    mr-2
                                    my-2
                                '
                            >
                                <div
                                    className='
                                        border
                                        w-1/2
                                        p-1
                                        rounded-lg
                                        bg-green-500
                                        text-white
                                        flex
                                        justify-center
                                        cursor-pointer
                                    '
                                    onClick={() => {

                                        DescargarVentas(
                                            `REPORTE DE VENTAS DESDE ${fechaVentas.desde} HASTA ${fechaVentas.hasta}`,
                                            "VENTAS",
                                            data
                                        );
                                    }}
                                >
                                    Descargar reporte
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-4 mt-0.5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25" />
                                    </svg>
                                </div>
                                <button
                                    className='
                                    bg-orange-500
                                    rounded-lg
                                    p-1
                                    text-white
                                    w-40
                                    flex
                                    justify-center
                                '
                                    onClick={() => {
                                        setFechaVentas({
                                            ...fechaVentas,
                                            buscar: 'buscar',
                                        })


                                        setBuscarVentas(!buscarVentas)
                                    }}
                                >
                                    Buscar
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class=" ml-1 w-6 h-5 mt-0.5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>

                                </button>
                            </div>

                        </div>
                        <div
                            className='flex flex-col'
                        >
                            <h1 className='text-slate-700 mb-1 font-black tracking-tighter'>Reporte de compras</h1>
                            <div>
                                Desde
                                <input
                                    type='date'
                                    className='mx-2 border-x border-y p-1 text-center'
                                    onChange={(e) => {

                                        setFechaCompras({
                                            ...fechaCompras,
                                            desde: e.target.value
                                        })

                                    }}
                                />
                                Hasta
                                <input
                                    type='date'
                                    className='mx-2 border-x border-y p-1 text-center'
                                    onChange={(e) => {

                                        setFechaCompras({
                                            ...fechaCompras,
                                            hasta: e.target.value
                                        })

                                    }}
                                />

                            </div>
                            <div
                                className='
                                    flex
                                    justify-between
                                    mr-2
                                    my-2
                                '
                            >
                                <div
                                    className='
                                        border
                                        w-1/2
                                        p-1
                                        rounded-lg
                                        bg-green-500
                                        text-white
                                        flex
                                        justify-center
                                        cursor-pointer
                                    '
                                    onClick={() => {
                                        DescargarCompras(
                                            `REPORTE DE COMPRAS DESDE ${fechaCompras.desde} HASTA ${fechaCompras.hasta}`,
                                            "COMPRAS",
                                            data
                                        )
                                    }}
                                >
                                    Descargar reporte
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-4 mt-0.5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25" />
                                    </svg>
                                </div>
                                <button
                                    className='
                                    bg-orange-500
                                    rounded-lg
                                    p-1
                                    text-white
                                    w-40
                                    flex
                                    justify-center
                                '
                                    onClick={() => {
                                        setFechaCompras({
                                            ...fechaCompras,
                                            buscar: 'buscar',
                                        })

                                        setBuscarCompras(!buscarCompras)
                                    }}
                                >
                                    Buscar
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class=" ml-1 w-6 h-5 mt-0.5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>

                                </button>
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
                            rows={data || []}
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