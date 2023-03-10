import React, { useEffect } from 'react';
import { useAuth } from '../../auth/auth';
import { socket } from '../../config';
import img_default_usuarios from './img/simbolo-alerta-succes.png'
import './index.css';
import { CardVentasRecientes } from './ventasRecientes';

function MainUser() {
    const [mostrar, setMostrar] = React.useState(false);
    const auth = useAuth();
    const [tiempo, setTiempo] = React.useState('00:00');
    const [ventasRecientes, setVentasRecientes] = React.useState([]);
    const [mostrarInformacion, setMostrarInformacion] = React.useState(false);


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

    }, []);

    useEffect(() => {

        const obtenerVentasRecientes = (informacion) => {
            console.log(informacion);
        }

        socket.on('ventas_recientes', obtenerVentasRecientes);

        return () => {
            socket.off('ventas_recientes', obtenerVentasRecientes);
        }
    }, [])


    if (auth.user) {
        return (
            <>
                <div
                    className='
                    flex 
                '
                >

                    <div
                        className='
                        text-xl
                        sm:text-1xl
                        mt-2
                        text-center
                        p-1
                    '
                    >

                        <div >
                            <i className="fi fi-rr-moon-stars text-orange-400 text-sm mr-1"></i>
                            {tiempo}
                        </div>
                    </div>
                    <div
                        className='text-center mt-3 mx-2 cursor-pointer '
                    >
                        <i
                            className='
                         fi fi-rr-bell
                         hover:text-gray-700
                        '
                        >
                        </i>
                    </div>
                    <div
                        className='text-center p-2 cursor-pointer hover:bg-white/10'
                        onClick={() => setMostrarInformacion(!mostrarInformacion)}
                    >
                        <h1 className='mt-1'>Historial de ventas recientes</h1>


                    </div>


                    <li
                        className="nav-item nav-item-dropdown-lg dropdown dropdown-user h-100"
                        onClick={() => setMostrar(!mostrar)}
                    >

                        <a href='#'
                            className="navbar-nav-link navbar-nav-link-toggler dropdown-toggle d-inline-flex align-items-center h-100"
                            data-toggle="dropdown">
                            <img src="../img/hombre-de-negocios.png" className="rounded-pill mr-lg-2" height="34" alt="" />

                            {!auth.loading &&
                                <span
                                    className="d-none d-lg-inline-block  container-nombre-usuario"
                                    id="nombreUsuario">
                                    {auth.user.nombre}
                                </span>

                            }

                        </a>
                        {!!mostrar &&
                            <div
                                className="dropdown-menu dropdown-menu-right menu-user"
                                onMouseLeave={() => setMostrar(!mostrar)}

                            >
                                <a href="#" className="dropdown-item"><i className="icon-user-plus"></i> Mi perfil</a>
                                <div className="dropdown-divider"></div>
                                <a
                                    href="#"
                                    onClick={() => auth.logout()}
                                    className="dropdown-item">
                                    <i
                                        className="icon-switch2"
                                    >
                                    </i>

                                    Salir

                                </a>
                            </div>}

                    </li>



                </div >
                {!!mostrarInformacion &&
                    <div
                        className='
                            bg-white
                            border
                            border-2
                            z-10
                            absolute
                            historial-venta-container
                            h-60
                            rounded-xl
                            mr-14
                            grid
                            scroll-historial
                        '
                        onMouseLeave={() => setMostrarInformacion(!mostrarInformacion)}
                    >
                        <CardVentasRecientes />
                        <CardVentasRecientes />
                        <CardVentasRecientes />
                        <CardVentasRecientes />
                        <CardVentasRecientes />
                        <CardVentasRecientes />
                    </div>
                }


            </>



        );

    }


}

export { MainUser };