import React, { useEffect, useState } from 'react';
import { urlAPI } from '../../../config';
import { TablaDataGrid } from '../../../ui/Tabla/DataGrid';
import { getData } from '../../useFetch';

const Reporte = () => {
    const [load, setLoad] = useState(false);
    const [columnas, setColumnas] = useState([])
    const [reportes, setReportes] = useState();

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

                    return <div>EYES</div>
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