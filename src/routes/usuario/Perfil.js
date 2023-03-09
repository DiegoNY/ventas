import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/auth';
import { urlAPI } from '../../config';
import { useMain } from '../../ui/main/useMain';
import { TablaDataGrid } from '../../ui/Tabla/DataGrid';
import { getData } from '../useFetch';

const Perfil = React.memo(() => {
    const contextosGlobales = useMain();
    const auth = useAuth();

    const [columnas, setColumnas] = useState([])
    const [data, setData] = useState([]);
    const [COLORES] = useState(['bg-orange-500', 'bg-green-600', 'bg-yellow-500', 'bg-red-400',])
    useEffect(() => {

        const getDatas = async () => {
            const dataRta = await getData(`${urlAPI.Usuario.url}/perfil/${auth?.user?._id}`)
            setData(dataRta)
        }
        if (auth?.user?._id) {
            getDatas();
        }
    }, [auth])

    useEffect(() => {
        const columns = [

            {
                field: 'fecha',
                headerName: 'FECHA',
                flex: 0.3,
            },
            {
                field: 'tipo_documento',
                headerName: 'TIPO_DOCUMENTO',
                flex: 0.3,
            },
            {
                field: '_id',
                headerName: 'SERIE',
                flex: 0.3,
            },
            {
                field: 'primera_venta',
                headerName: 'MIN_CORRELATIVO',
                flex: 0.3,
            },
            {
                field: 'ultima_venta',
                headerName: 'MAX_CORRELATIVO',
                flex: 0.3,
            },
            {
                field: 'total',
                headerName: 'TOTAL',
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
                        <div className='text-xl uppercase font-black tracking-tighter font-sans mb-1'>
                            {auth?.user?.nombre}
                        </div>
                        <div className='w-full px-1 mt-2  grid grid-cols-4 mb-1'>
                            <h1 className='font-black tracking-tighter'>CARGO</h1>
                            <p className='text-blue-500 uppercase col-start-3'>{auth?.user?.cargo}</p>
                            <h1 className='font-black row-start-2 tracking-tighter'>DESDE</h1>
                            <p className='text-blue-500 uppercase row-start-2 col-start-3'>{auth?.user?.fecha_ingreso}</p>
                        </div>
                        <Link className=' flex p-1 rounded-lg tracking-tighter w-full mt-1 justify-end items-center gap-1 cursor-pointer hover:text-green-400' to='/venta-punto_venta'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                            </svg>
                            <h1 className='font-black'>IR A VENTAS</h1>

                        </Link>
                    </div>
                    <div className='col-span-9 bg-white border rounded-lg  flex flex-col sm:grid grid-cols-2 gap-1' >
                        <div className='p-2'>
                            <h1 className='font-black font-sans'>Sobre Mi</h1>
                            <div className=' w-full grid grid-cols-2 p-2 items-center gap-1'>
                                <p className=' text-xs font-black flex items-center '>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                                    </svg>
                                    Nro Documento
                                </p>
                                <div className='border-b border-b-gray-200 outline-none font-black   p-0.5' >
                                    {auth.user?.dni}
                                </div>
                                <p className=' text-xs  mt-1 flex items-center font-black'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                    </svg>
                                    Contacto
                                </p>
                                <div className='border-b border-b-gray-200 outline-none font-black  p-0.5' >
                                    {auth.user?.telefono} / {auth?.user?.email}
                                </div>


                            </div>
                            <div className='p-2'>
                                <h1 className='font-black'>
                                    Series utilizadas :
                                </h1>
                                <div className='grid grid-cols-5 gap-2 p-1 max-h-24 overflow-y-scroll mt-2 rounded-xl border-b-gray-200 border-b'>

                                    {data.data?.series_utilizadas?.map((serie, index) => {
                                        return (
                                            <div className='p-0.5 sm:px-2'>
                                                <div className={` ${COLORES[index % COLORES.length]} text-center text-white p-1 rounded-xl`}>
                                                    {serie._id}
                                                </div>
                                            </div>
                                        )
                                    })}

                                </div>
                            </div>
                            <div
                                className='px-2'
                            >
                                <h1 className='font-black flex items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                    </svg>
                                    Nota
                                </h1>
                                <div className='px-3'>
                                    Estimado trabajador sigue adelante, esfuerzate cada dia. Eres una persona maravillosa
                                </div>
                            </div>
                        </div>
                        <div className='p-2'>
                            <h1 className='font-black font-sans'>Datos</h1>
                            <div className=' w-full grid grid-cols-2 p-2 items-center gap-1'>
                                <p className='text-slate-400 text-xs  '>Nro Documento</p>
                                <input className='border-b border-b-gray-200 outline-none font-black   p-0.5' value={auth.user?.dni} />
                                <p className='text-slate-400 text-xs  mt-1'>Telefono</p>
                                <input className='border-b border-b-gray-200 outline-none font-black  p-0.5' value={auth.user?.telefono} />
                                <p className='text-slate-400 text-xs  mt-1'>Nombre y apellido</p>
                                <input className='border-b border-b-gray-200 outline-none font-black   p-0.5' value={auth.user?.nombre} />
                                <p className='text-slate-400 text-xs  mt-1'>Correo</p>
                                <input className='border-b border-b-gray-200 outline-none font-black  p-0.5' value={auth.user?.email} />
                                <p className='text-slate-400 text-xs  mt-1'>Estado</p>
                                <div className='flex w-1/2 p-1'>
                                    <div className={`px-2 flex items-center rounded-xl border-y border-x text-center ${auth?.user?.estado == 1 && 'text-green-500 border-green-500' || 'bg-red-500'}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>
                                        {auth?.user?.estado == 1 && 'ACTIVO' || 'INACTIVO'}
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>

                <div className='w-full px-1 flex flex-col bg-white rounded-lg border p-2'>
                    <h1 className='font-black mb-1 font-sans'>Actividad reciente</h1>
                    <div
                        className='h-80'
                    >
                        <TablaDataGrid
                            columns={columnas}
                            data={data?.data?.actividad_reciente || []}
                            loading={false}
                        />
                    </div>
                </div>
            </div>

        </div >
    )
})

export { Perfil }
