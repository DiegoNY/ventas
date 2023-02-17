import React, { useEffect, useState } from 'react';
import { urlAPI } from '../../../config';
import { RechartsLineal } from '../../../ui/Graficos/LinealRecharts';
import { Layout } from '../../../ui/Layouts';
import { getData } from '../../useFetch';
import './index.css'
import { ObtnerFechas } from './useFechasAnuales';

const VentasMensuales = () => {

    const [data, setData] = useState([]);

    const [siguiente, setSiguiente] = useState(1);
    const [anterior, setAnterior] = useState(1);
    const [buscar, setBuscar] = useState(false);

    // const hoy = ObtnerFechas(new Date());
    // console.log(hoy);

    const [fecha, setFecha] = useState({
        desde: "2023-01-01",
        hasta: "2024-01-01",
        año_busqueda: "2023-01-01",
        año: 2023
    });


    const AñoAnterior = () => {
        let hoy = new Date(fecha.año_busqueda)
        const { fin, inicio, año } = ObtnerFechas(hoy, false, anterior);

        setFecha(
            {
                ...fecha,
                año: año,
                desde: inicio,
                hasta: fin,
                año_busqueda: inicio,
            }
        )

        setBuscar(!buscar)
    }

    const AñoSiguiente = () => {

        let hoy = new Date(fecha.año_busqueda)

        const { fin, inicio, año } = ObtnerFechas(hoy, siguiente);

        setFecha(
            {
                ...fecha,
                año: año,
                desde: inicio,
                hasta: fin,
                año_busqueda: inicio,
            }
        )

        setBuscar(!buscar)

    }

    useEffect(() => {

        const dataReporte = async () => {

            const dataVenta = await getData(`${urlAPI.Venta.url}?reporte_mensuales={"desde":"${fecha.desde}", "hasta":"${fecha.hasta}"}`)


            let mesesData = [
                { mes: "Enero", igv: 0, subtotal: 0, total: 0 },
                { mes: "Febrero", igv: 0, subtotal: 0, total: 0 },
                { mes: "Marzo", igv: 0, subtotal: 0, total: 0 },
                { mes: "Abril", igv: 0, subtotal: 0, total: 0 },
                { mes: "Mayo", igv: 0, subtotal: 0, total: 0 },
                { mes: "Junio", igv: 0, subtotal: 0, total: 0 },
                { mes: "Julio", igv: 0, subtotal: 0, total: 0 },
                { mes: "Agosto", igv: 0, subtotal: 0, total: 0 },
                { mes: "Setiembre", igv: 0, subtotal: 0, total: 0 },
                { mes: "Octubre", igv: 0, subtotal: 0, total: 0 },
                { mes: "Noviembre", igv: 0, subtotal: 0, total: 0 },
                { mes: "Diciembre", igv: 0, subtotal: 0, total: 0 },
            ]


            mesesData.map(mes => {

                dataVenta.map(data => {

                    if (mes.mes == data.mes) {
                        mes.igv = data.igv
                        mes.subtotal = data.subtotal
                        mes.total = data.total
                    }

                })

            })


            setData(mesesData);
        }

        dataReporte();

    }, [buscar])

    return (
        <>
            <Layout>
                <div
                    className='
                       
                        //bg-red-200
                        col-span-12
                        row-span-6
                        flex
                        flex-col
                        w-full
                        mb-1
                    '
                >

                    <h1
                        className='ml-4 text-2xl sm:text-2xl font-extrabold text-slate-900 tracking-tight  '
                    >
                        Ventas mensuales
                    </h1>
                    <p className='font-normal text-sm ml-4 text-slate-500' >Estas observando las ventas mensuales</p>

                    <div className='mx-4 flex justify-between'>
                        <div
                            className='flex justify-end w-1/2'
                        >
                            <h1 className='text-lg font-semibold' > Año {fecha.año}</h1>
                        </div>
                        <div
                            className='w-1/2 flex justify-end'
                        >
                            <div
                                className='cursor-pointer rounded-xl p-2 bg-orange-500 hover:bg-orange-400 text-white'
                                onClick={() => {

                                    AñoAnterior()
                                    setAnterior(anterior + 1);
                                }}
                            >
                                <p>Anterior</p>
                            </div>
                            <div
                                className='ml-2 cursor-pointer rounded-xl p-2 bg-orange-500 hover:bg-orange-400 text-white'
                                onClick={() => {
                                    AñoSiguiente()
                                    setSiguiente(siguiente + 1)
                                }}
                            >
                                <p>Siguiente</p>
                            </div>
                        </div>
                    </div>
                    <div
                        className='
                            mt-1
                            container
                            //bg-red-400
                            p-3
                        '
                    >
                        <RechartsLineal
                            fill='#697F92'
                            datos={data || [{ mes: "Enero", subtotal: 1234 }, {
                                _id: 2,
                                mes: "febrero",
                                igv: 666.576,
                                subtotal: 60966.9,
                                total: 61633.476
                            }]}
                            nameX='mes'
                            dataKey={
                                [
                                    {
                                        name: 'subtotal',
                                        stroke: '#1D4ED8',
                                        type: 'linear'
                                    },
                                    {
                                        name: 'igv',
                                        stroke: '#F39C12',
                                        type: 'linear',
                                    },
                                    {
                                        name: 'total',
                                        stroke: '#BEF264',
                                        type: 'linear',
                                    }
                                ]
                            }
                        />
                    </div>
                </div>
            </Layout>
        </>
    )
}

export { VentasMensuales }