import React, { useEffect, useState } from 'react';
import { EMPRESA, urlAPI } from '../../../config';
import { useMain } from '../../../ui/main/useMain';
import { TablaDataGrid } from '../../../ui/Tabla/DataGrid';
import { getData } from '../../useFetch';

const Reporte = () => {
    const [load, setLoad] = useState(false);
    const [columnas, setColumnas] = useState([])
    const [reportes, setReportes] = useState();
    const contextoGlobal = useMain();
    const MostrarReporte = async (data) => {

        const informacion_adicional = await getData(`${urlAPI.Venta.url}?reporte_caja={"desde": "${data.consulta_registro}", "hasta": "${data.consulta_cierre}", "usuario":"${data.id_usuario}"}`)

        contextoGlobal.setReporte(
            <div className='col-span-6  w-full flex flex-col'>
                <h1 className='font-black px-2'>{EMPRESA.NOMBRE}</h1>
                <p className='px-2'>{EMPRESA.DIRECCION}</p>
                <p className='p-0.5 bg-slate-100 rounded-lg my-1'></p>
                <h1 className='font-black px-2'>REPORTE APERTURA - CIERRE</h1>
                <div className='font-semibold flex text-slate-700 px-2'>
                    <p className='mr-1' >{data.info_registro}</p> - <p className='ml-1'>{data.info_cierre}</p>
                </div>
                <p className='p-0.5 bg-slate-100 rounded-lg my-1'></p>
                <div className='flex justify-center items-center flex-col'>
                    <h1 className='mb-0.5'>RELACION DE DOCUMENTOS EMITIDOS</h1>
                    <div className='w-1/2 flex justify-between px-2'>
                        <p>Minimo apertura</p>
                        <span className='text-slate-800'>{data.minimo || 0}</span>
                    </div>
                    <div className='w-1/2 flex justify-between px-2'>
                        <p>Maximo</p>
                        <span className='text-slate-800'>{data.minimo || 0}</span>
                    </div>
                    <div className='p-1 flex justify-end w-1/2 px-2'>
                        <p className='ml-1'>Total  <span className='ml-2 text-slate-800'>{data.minimo || 0}</span> </p>
                    </div>
                </div>
                <p className='p-0.5 bg-slate-100 rounded-lg my-1'></p>
                <div className='flex justify-center items-center flex-col'>
                    <div className='flex justify-between w-1/2 px-2'>
                        <h1>TOTAL VENTA</h1>
                        <p>{data.total_venta || 0}</p>
                    </div>
                    <div className='flex justify-between w-1/2 px-2'>
                        <h1>MONTO CIERRE</h1>
                        <p>{data.dinero_cierre || 0}</p>
                    </div>
                    <div className='flex justify-between w-1/2 px-2'>
                        VENDEDOR <span>{data.usuario}</span>
                    </div>
                </div>

            </div>
        );
    }

    useEffect(() => {
        const columns = [
            {
                field: '_id',
                headerName: 'Id',
                flex: 0.3,
            },
            {
                field: 'usuario',
                headerName: 'USUARIO',
                flex: 0.2,
                renderCell: (params) => {
                    return <div className='w-full text-center'>{params.row.usuario}</div>
                }
            },
            {
                field: 'info_registro',
                headerName: 'APERTURA',
                flex: 0.3,
                renderCell: (params) => {
                    return <div className='w-full text-center'>{params.row.info_registro}</div>
                }
            },
            {
                field: 'dinero_registro',
                headerName: 'MONTO DE APERTURA',
                flex: 0.2,
                renderCell: (params) => {
                    return <div className='w-full text-center'>{params.row.dinero_registro}</div>
                }
            },
            {
                field: 'info_cierre',
                headerName: 'CIERRE',
                flex: 0.3,
                renderCell: (params) => {
                    return <div className='w-full text-center'>{params.row.info_cierre}</div>
                }
            },
            {
                field: 'dinero_cierre',
                headerName: 'MONTO DE CIERRE',
                flex: 0.2,
                renderCell: (params) => {
                    return <div className='w-full text-center'>{params.row.dinero_cierre}</div>
                }
            },
            {
                field: 'total',
                headerName: 'TOTAL',
                flex: 0.2,
                renderCell: (params) => {
                    return <div className='w-full text-center'>{params.row.total}</div>
                }
            },
            {
                field: 's',
                headerName: 'VISUALIZAR',
                flex: 0.2,
                renderCell: (params) => {

                    return (
                        <div className=' p-1 w-full flex justify-center'>
                            <div
                                className='text-white border-y border-x bg-sky-600 p-1 rounded-xl cursor-pointer'
                                onClick={() => MostrarReporte(params.row)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                        </div>
                    )
                }
            },

        ]

        setColumnas(columns);
    }, [])

    useEffect(() => {
        setLoad(true);
        const getReporte = async () => {
            const reportesData = await getData(`${urlAPI.Caja.url}?reporte=true`);
            setLoad(false);
            setReportes(reportesData);
        }
        getReporte();
    }, [])

    return (
        <div className='grid grid-cols-12'>
            <div
                className='col-span-8 sm:col-span-12 flex flex-col'
            >
                <h1 className='ml-2 text-2xl sm:text-2xl font-extrabold text-slate-900 tracking-tight p-2'>REPORTES</h1>
                <div className='h-screen p-2'>
                    <TablaDataGrid
                        columns={columnas}
                        data={reportes || []}
                        loading={load}
                    />
                </div>

            </div>
        </div>
    )
}

export { Reporte };