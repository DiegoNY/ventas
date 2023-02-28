import React, { useEffect, useState } from 'react';
import { DataGrid, esES, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from '@mui/x-data-grid';
import { getData } from '../../useFetch';
import { EMPRESA, urlAPI } from '../../../config';
import { DescargarDataExcel } from '../../useDescargaExcel';

function CustomToolbar() {

    return (

        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
        </GridToolbarContainer>
    )
}

const ReporteGanancias = () => {


    const [data, setData] = useState();
    const [informacion, setInformacion] = useState();
    const [columns, setColumns] = useState();

    useEffect(() => {
        const columnss = [
            {
                field: '_id',
                headerName: 'ID',
                flex: 0.1,
            },
            {
                field: 'cantidad_vendida',
                headerName: 'Cantidad Vendidad',
                flex: 0.1,
            },
            {
                field: 'descripcion',
                headerName: 'Descripcion / Producto',
                flex: 0.3,
            },
            {
                field: 'laboratorio',
                headerName: 'Laboratorio',
                flex: 0.2,
            },
            {
                field: 'precio_venta',
                headerName: 'Precio Venta',
                flex: 0.1,
            },
            {
                field: 'total',
                headerName: 'Total',
                flex: 0.1,
            },
            {
                field: 'utilidad',
                headerName: 'Utilidad',
                flex: 0.1,
            },
            {
                field: 'porcentaje',
                headerName: 'Porcentaje',
                flex: 0.1,
            },
        ]

        setColumns(columnss);
    }, [])


    const buscarInformacion = async () => {
        const dataInfo = await getData(`${urlAPI.Producto.url}?reporte_ganancias={"desde":"${informacion?.desde}","hasta":"${informacion?.hasta}"}`);
        setData(dataInfo);
    }


    const DescargarReporte = (titulo, hoja, data) => {
        let columns = [
            {
                key: 'cantidad_vendida',
                width: 20,
            },
            {
                key: 'descripcion',
                width: 40,
            },
            {
                key: 'laboratorio',
                width: 30,
            },
            {
                key: 'precio_venta',
                width: 20,
            },
            {
                key: 'total',
                width: 20,
            },
            {
                key: 'utilidad',
                width: 20,
            },
            {
                key: 'porcentaje',
                width: 20,
            },
        ]


        let informacion = {
            hoja: hoja,
            titulo: {
                celdas: "A1:G2",
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
                    value: "CANTIDAD VENDIDA    ",
                    font: { bold: true },
                },
                {
                    numero: "B7",
                    value: "DESCRIPCION",
                    font: { bold: true },
                },
                {
                    numero: "C7",
                    value: "LABORATORIO",
                    font: { bold: true },
                },
                {
                    numero: "D7",
                    value: "PRECIO VENTA",
                    font: { bold: true },
                    width: 20
                },
                {
                    numero: "E7",
                    value: "TOTAL",
                    font: { bold: true },
                },
                {
                    numero: "F7",
                    value: "UTILIDAD",
                    font: { bold: true },
                },
                {
                    numero: "G7",
                    value: "PORCENTAJE",
                    font: { bold: true },
                },
            ],
            nombreArchivo: titulo,
            final: [
                {
                    columna: "D",
                    cantidad: 2,
                    value: "TOTAL"
                },
                {
                    columna: "E",
                    cantidad: 2,
                    value: { formula: { operacion: "SUM", columna: "E", numero: 8 } },
                    font: { bold: false }
                },
            ]
        }


        DescargarDataExcel(data, columns, informacion);
    }



    return (
        <div className='grid grid-cols-12'>
            <div
                className='col-span-12 p-1 '
            >
                <h1 className='ml-2 text-2xl sm:text-2xl font-extrabold text-slate-900 tracking-tight  '>Reporte</h1>
                <p className='font-normal text-sm ml-2 text-slate-500'>Reporte de ganancias</p>
            </div>
            <div className='col-span-12 p-2 mx-3 rounded-sm border-y border-x flex flex-col mt-1 sm:grid grid-cols-8 '>
                <div className='col-span-7 sm:flex sm:justify-center sm:items-center'>
                    <input
                        type='date'
                        className='border-x border-y p-1 rounded-sm sm:w-48  text-center'
                        onChange={(e) => setInformacion({ ...informacion, desde: e.target.value })}
                    />
                    <input
                        type='date'
                        className='border-x border-y p-1 rounded-sm ml-4 sm:w-48 text-center'
                        onChange={(e) => setInformacion({ ...informacion, hasta: e.target.value })}

                    />
                </div>
                <div className='flex justify-end items-center sm:mr-7 cursor-pointer'>
                    <div
                        className='rounded-2xl p-1 border-x border-y bg-slate-200 mt-1 hover:border-blue-400'
                        onClick={() => buscarInformacion()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2563EB" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </div>
                    <div
                        className='ml-1'
                        onClick={() => {
                            DescargarReporte(`REPORTE DE GANANCIAS EN EL RANGO DE ${informacion.desde} HASTA EL ${informacion.hasta}`, "REPORTE DE GANANCIAS", data)
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2563EB" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className='col-span-12 p-2 mx-2 h-screen'>
                <DataGrid
                    components={{
                        Toolbar: CustomToolbar,
                    }}
                    getRowId={(row) => row._id}
                    rows={data || []}
                    density='compact'
                    columns={columns || []}
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
    )
}

export { ReporteGanancias }