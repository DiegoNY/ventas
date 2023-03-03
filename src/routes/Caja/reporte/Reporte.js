import React, { useEffect, useState } from 'react';
import { TablaDataGrid } from '../../../ui/Tabla/DataGrid';

const Reporte = () => {
    const [load, setLoad] = useState(true);
    const [columnas, setColumnas] = useState([])
    const [reportes, setReporte] = useState();

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
                flex: 0.3,
            },
            {
                field: 'apertura',
                headerName: 'APERTURA',
                flex: 0.3,
            },
            {
                field: 'monto_apertura',
                headerName: 'MONTO DE APERTURA',
                flex: 0.3,
            },
            {
                field: 'cierre',
                headerName: 'CIERRE',
                flex: 0.3,
            },
            {
                field: 'monto_cierre',
                headerName: 'MONTO DE CIERRE',
                flex: 0.3,
            },
            {
                field: 'tipo',
                headerName: 'TIPO',
                flex: 0.3,
            },

        ]

        setColumnas(columns);
    }, [])

    useEffect(() => {

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