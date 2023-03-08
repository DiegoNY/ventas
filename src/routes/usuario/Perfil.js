import React, { useEffect, useState } from 'react'
import { useAuth } from '../../auth/auth';
import { useMain } from '../../ui/main/useMain';
import { TablaDataGrid } from '../../ui/Tabla/DataGrid';

const Perfil = React.memo(() => {
    const contextosGlobales = useMain();
    const auth = useAuth();

    const [columnas, setColumnas] = useState([])

    useEffect(() => {
        const columns = [
            {
                field: '_id',
                headerName: 'Id',
                flex: 0.3,
            },
            {
                field: 'fecha',
                headerName: 'CODIGO BARRAS',
                flex: 0.3,
            },
            {
                field: 'tipo',
                headerName: 'DESCRIPCION',
                flex: 0.3,
            },
            {
                field: 'serie',
                headerName: 'FECHA REGISTRO',
                flex: 0.3,
            },

            {
                field: 'min_correlativo',
                headerName: 'PRECIO VENTA',
                flex: 0.3,
            },
            {
                field: 'max_correlativo',
                headerName: 'TIPO',
                flex: 0.3,
            },
            {
                field: 'total',
                headerName: 'TIPO',
                flex: 0.3,
            },
        ]

        setColumnas(columns);
    }, [])

    return (
        <div
            className=' w-full h-screen bg-gray-100 rounded-xl  shadow-lg p-2 grid grid-cols-8 sm:grid-cols-12'
            onClick={() => {
                contextosGlobales.setComprimir(false);
                contextosGlobales.setMostrarProductosStockMinimo(false);
                contextosGlobales.setHistorial(false)
                contextosGlobales.setSalida(false)
            }}
        >
            <div className='flex items-center  col-span-8 sm:col-span-12 flex-col gap-1.5'>

                <div className='w-full flex flex-col sm:grid grid-cols-12 gap-1'>
                    <div className='bg-white col-span-3 rounded-lg border p-2 flex flex-col items-center'>
                        <img
                            className='border  rounded-full h-32'
                            src={auth?.user?.foto || 'http://192.168.1.110:8080/imagen/imagen-usuario-fake.jpg'}
                        />
                        <div className='text-xl uppercase font-black tracking-tighter'>
                            {auth?.user?.nombre}
                        </div>
                        <div className='w-full px-1  grid grid-cols-4 mb-1'>
                            <h1 className='font-black tracking-tighter'>CARGO</h1>
                            <p className='text-blue-500 uppercase col-start-3'>{auth?.user?.cargo}</p>
                            <h1 className='font-black row-start-2 tracking-tighter'>DESDE</h1>
                            <p className='text-blue-500 uppercase row-start-2 col-start-3'>{auth?.user?.fecha_ingreso}</p>
                        </div>
                        <button className='bg-green-500 text-white p-1 rounded-lg tracking-tighter w-full mt-1' >
                            IR A VENTAS
                        </button>
                    </div>
                    <div className='col-span-9 bg-white border rounded-lg  grid grid-cols-2 gap-1' >
                        <div className='p-2'>
                            <h1 className='font-black'>Sobre Mi</h1>
                            <p>Nro Documento</p>
                        </div>
                        <div className='p-2'>
                            <h1 className='font-black'>Datos</h1>

                        </div>
                    </div>
                </div>

                <div className='w-full px-1 flex flex-col bg-white rounded-lg border p-2'>
                    <h1 className='font-black mb-1'>Actividad reciente</h1>
                    <div
                        className='h-80'
                    >
                        <TablaDataGrid
                            columns={columnas}
                            data={[{
                                _id: "1",
                                fecha: "12-12-2023",
                                tipo: "03",
                                serie: "B5321",
                                min_correlativo: "0023546871",
                                max_correlativo: "1",
                                total: "1",
                            }]}
                            loading={false}
                        />
                    </div>
                </div>
            </div>

        </div>
    )
})

export { Perfil }
