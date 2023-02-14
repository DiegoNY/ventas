import React, { useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';

import './index.css'


import { Box } from '@mui/system';
import { getData } from '../../useFetch';
import { urlAPI } from '../../../config';

const Reporteventas = () => {
    const [ventas, setVentas] = React.useState([]);

    useEffect(() => {

        const getDataVentas = async () => {
            const data = await getData(`${urlAPI.Venta.url}?reporte=true`);

            let ventaArray = [];
            data?.map(venta => {
                ventaArray.push(
                    {
                        id: venta._id,
                        title: `Subtotal  : S/${venta?.subtotal} - IGV :  S/${venta?.igv} - TOTAL : S/ ${venta?.total}`,
                        date: venta?._id,
                        color: 'white',
                        textColor: '#34D399'
                    })

            })

            setVentas(ventaArray);

        }

        getDataVentas();

    }, [])

    function renderEventContent(eventInfo) {
        let total = eventInfo.event.title.split('-');
        console.log(total);
        return (
            <>
                <div
                    className='
                        h-full
                        flex
                        flex-col
                        w-full
                    '
                >
                    <div className='font-bold text-yellow-400 mx-auto'>{total[0]}</div>
                    <div className='font-bold text-green-400 mx-auto'>{total[1] || 123}</div>
                    <div className='font-bold text-indigo-400 mx-auto'>{total[2] || 123}</div>
                </div>
            </>
        )
    }

    return (
        <>
            <div>

                <div
                    className='
                        my-2

                    '
                >
                    <h1
                        className='
                        ml-2 
                        text-2xl 
                        sm:text-2xl 
                        font-extrabold 
                        text-slate-900 
                        tracking-tight   
                    '
                    >
                        Reporte de ventas
                    </h1>
                    <p className='ml-2 font-normal text-sm  text-slate-500'>Estas observando todas las ventas</p>
                </div>
                <div
                    className='
                        mx-4
                        p-2
                    '
                >
                    <Box
                        flex='1 1 100%'
                    >
                        <FullCalendar
                            height='75vh'
                            plugins={
                                [
                                    dayGridPlugin,
                                    timeGridPlugin,
                                    // interactionPlugin,
                                    listPlugin,
                                ]
                            }

                            headerToolbar={
                                {
                                    left: "prev,next today",
                                    center: "title",
                                    right: "dayGridMonth,timeGridWeek,timeGridDay"
                                }
                            }

                            initialView='dayGridMonth'
                            editable='true'
                            events={ventas}
                            locale={esLocale}
                            eventContent={renderEventContent}

                        >

                        </FullCalendar>
                    </Box>
                </div>

            </div>
        </>
    )

}

export { Reporteventas }