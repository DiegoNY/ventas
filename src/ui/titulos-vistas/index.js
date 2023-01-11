import React, { useEffect } from 'react';


function Titulo(props) {
    const [tiempo, setTiempo] = React.useState('00:00')
    const [fecha, setFecha] = React.useState('12/12/12')
    const [segundos, setSegundos] = React.useState('');



    useEffect(() => {
        const actualizarFechaHora = () => {
            const objFecha = new Date();
            let horas = objFecha.getHours();
            let minutos = objFecha.getMinutes();
            let segundos = objFecha.getSeconds();
            let seg = segundos.toString().padStart(2, '0');
            let min = minutos.toString().padStart(2, '0');
            const hora = `${horas}: ${min}:${seg}`
            setTiempo(hora)


        }
        setInterval(() => {
            actualizarFechaHora();
        }, 1000)

    }, [])

    return (
        <>
            <div
                className='
                    card-body 
                    my-2                   
                    mx-2 
                    flex 
                    justify-between
                '
            >
                <h3
                    className='
                           
                           inline-block 
                           text-2xl 
                           sm:text-3xl 
                           font-extrabold 
                           text-slate-900 
                           tracking-tight 
                           dark:text-slate-200
                        '
                >

                    {props.title}
                    /
                    <span
                        className='
                            text-base 
                            font-normal 
                        '
                    > {props.navegacion}
                    </span>
                    <i className={`${props.icono} text-xs ml-2 `}></i>
                </h3>



                <div
                    className='
                        text-xl
                        sm:text-1xl
                    '
                >

                    <div >
                        <i class="fi fi-rr-moon-stars text-orange-400 text-sm mr-1"></i>
                        {tiempo}
                    </div>
                </div>

            </div>
        </>
    )

}

export { Titulo }