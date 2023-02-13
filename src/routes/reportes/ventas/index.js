import React, { useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';

import { Box } from '@mui/system';
import { getData } from '../../useFetch';
import { urlAPI } from '../../../config';

const Reporteventas = () => {
    const [ventas, setVentas] = React.useState([]);

    useEffect(() => {

        const getDataVentas = async () => {
            const data = await getData(`${urlAPI.Venta.url}`);

            let ventaArray = [];
            data?.map(venta => {

                ventaArray.push({ id: venta._id, title: `${venta?.numero_venta} - S/ ${venta?.total}`, date: venta?.fecha_registro })
            })

            setVentas(ventaArray);

        }

        getDataVentas();

    }, [])


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
                            eventAdd

                        >

                        </FullCalendar>
                    </Box>
                </div>

            </div>
        </>
    )

}

export { Reporteventas }