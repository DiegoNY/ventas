import React, { useState } from 'react';
import { useEffect } from 'react';
import { useLocalStorage } from '../useLocalStorage';
import { useAuth } from '../../auth/auth';
import { useNavigate } from 'react-router-dom';
import { SaveData } from '../useCRUD';
import { urlAPI } from '../../config';
import { Footer } from '../../ui/Layouts/Footer';
import { useLocation } from 'react-router-dom';
import { useMain } from '../../ui/main/useMain';


function Caja({ cierre = false }) {

    const contextosGlobales = useMain();

    const navigate = useNavigate();
    /**
     * Obteniendo los datos del usuario
     * 
     * @navigate funcion que cambia las rutas  
     */
    const auth = useAuth();

    if (!auth.user) navigate('/');



    const {
        moneyInBox,
        loading,
    } = contextosGlobales;

    let hoy = new Date();
    const [apertura, setApertura] = React.useState({

        dinero: "",
        punto_venta: '',
        usuario: auth?.user?._id,
        dni: auth?.user?.dni,
        tipo: 'APERTURA',
        fecha_apertura: ` ${`${hoy.toISOString()}`.substring(0, 10)}`,
        id_apertura: "",

    });

    const [cierreState, setCierre] = React.useState(cierre);


    useEffect(() => {
        if (!loading) {
            if (moneyInBox?.tipo == "APERTURA") {

                if (!!moneyInBox?.dinero || moneyInBox.dinero == 0) {

                    setCierre(true)
                };
            }
        }

    }, [moneyInBox, loading])

    const sendingMoneyDay = async (aper) => {

        setApertura({
            ...aper,
            usuario: auth?.user?._id,
            dni: auth?.user?.dni,
        })

        return console.log(aper);
        const response = await SaveData(`${urlAPI.Caja.url}`, aper);


        if (response[0].body.tipo == "CIERRE") {

            if (!response[0].error) {
                contextosGlobales.setCierre(true);

                setCierre(false);
                setApertura({

                    dinero: "",
                    punto_venta: '',
                    usuario: auth?._id,
                    dni: auth?.user?.dni,
                    tipo: 'APERTURA',
                    fecha_apertura: `${hoy.toISOString()}`.substring(0, 10)

                })


            }
        }

        if (response[0].body.tipo == "APERTURA") {
            console.log("se apertura");
            if (!response[0].error) {
                contextosGlobales.setCierre(false);
                contextosGlobales.setDineroCaja(true);
                contextosGlobales.setAperturaDiaHoy(true);
                contextosGlobales.setApertura(true);
                // saveMoneyInBox(response[0].body);
                navigate('/home');
            }

        }


    }

    /**
     * Obteniendo la IP 
    **/

    useEffect(() => {

        const getIP = async () => {

            const response = await fetch(`${urlAPI.IP.url}`);
            const data = await response.json();
            setApertura({
                ...apertura,
                punto_venta: data?.ip,
                dinero: moneyInBox?.dinero,
                id_apertura: moneyInBox?._id,
            })
        }

        getIP();

    }, [moneyInBox]);


    useEffect(() => {
        let tipo = 'APERTURA';
        if (cierreState === true) {
            tipo = 'CIERRE';
        }

        setApertura({
            ...apertura,
            tipo: 'CIERRE'
        })

        console.log(apertura);
        console.log("ENTRE ACA PERTURA DEBE TIPO SER CIERRE")

        return
    }, [cierreState, moneyInBox])




    return (

        <React.Fragment>

            <>

                <div
                    className='
                        grid
                        grid-cols-12
                        grid-rows-6
                        h-screen
                    '
                >


                    <div
                        className='
                            col-start-4
                            //bg-yellow-400
                            col-span-6
                            row-span-6
                            grid
                            grid-cols-12
                            grid-rows-6
                        '
                    >

                        <div
                            className='
                                //bg-indigo-300
                                col-start-3
                                col-span-8
                                row-span-6
                                my-2
                                flex
                                flex-col
                                grid-rows-6
                                grid-cols-4  
                            '
                        >

                            <div
                                className='
                                    //bg-indigo-200
                                    col-span-4
                                    flex
                                    justify-center
                                '
                            >
                                <h1 className='text-2xl font-black text-slate-600  mt-4'>
                                    {!cierreState && `Hola  ${auth?.user?.nombre} 🖐, para continuar registra el monto que hay en caja `}

                                    {!!cierreState && 'Para poder continuar debes registrar el cierre de caja'}
                                </h1>
                            </div>

                            <div
                                className='
                                    
                                    //bg-red-200
                                    col-span-4
                                    row-span-5
                                    mt-3
                                    mx-2
                                    flex 
                                    flex-col
 
                                '
                            >

                                <div
                                    className='
                                       
                                        //bg-indigo-200
                                        mx-2
                                        h-20
                                        mt-1
                                        text-lg
                                        flex
                                        text-center
 
                                    '
                                >
                                    <h1 className=''>
                                        <span className='mt-3'>
                                            La ip de la maquina que estas usando es {apertura?.punto_venta || '192.160.2.43'}
                                        </span>
                                    </h1>

                                </div>

                                <div
                                    className='
                                        
                                        mx-2
                                        //bg-red-100
                                        flex
                                        flex-col
 
                                    '
                                >

                                    <div
                                        className='
                                            
                                            //bg-red-500 
                                            h-20 
                                            w-full 
                                            mt-2 
                                            flex 
                                            justify-between
                                            flex-col
 
                                        '
                                    >
                                        <span

                                        >
                                            Dni
                                        </span>
                                        <div
                                            className='
                                                flex
                                            '
                                        >
                                            <input
                                                className=' 
                                                h-14    
                                                rounded-xl 
                                                px-4  
                                                bg-slate-200 
                                                text-slate-500
                                                text-lg
                                                mr-2
                                            '
                                                disabled
                                                value={auth?.user?.dni}
                                            />
                                            <div
                                                className='
                                                    mt-1
                                                    text-2xl
                                                    flex
                                                    justify-center
                                                '
                                            >
                                                S/ <textarea
                                                    cols={6}
                                                    rows={1}
                                                    defaultValue={apertura?.dinero}
                                                    onChange={(e) => {
                                                        console.log(apertura);
                                                        setApertura({
                                                            ...apertura,
                                                            dinero: e.target.value,
                                                            id_apertura: moneyInBox?._id
                                                        })
                                                    }}
                                                    className='
                                                        border-none
                                                    '
                                                ></textarea>
                                            </div>
                                        </div>


                                    </div>


                                </div>

                                <div
                                    className='
                                        
                                        //bg-green-100
                                        h-16
                                        flex
                                        justify-end

                                    '
                                >
                                    <button
                                        className='
                                            
                                            mx-2
                                            mt-2
                                            bg-orange-500
                                            h-10
                                            rounded-xl
                                            w-25
                                            text-white
                                            hover:bg-orange-600
 
                                        '
                                        onClick={() => sendingMoneyDay(apertura)}
                                    >
                                        {!cierreState && ' aperturar'}
                                        {!!cierreState && ' registrar cierre'}
                                    </button>
                                </div>


                            </div>

                        </div>

                    </div>
                    <div
                        className='flex w-full text-slate-400 justify-center mb-1 row-start-7 col-span-12'
                    >
                        www.rcingenierossac.com
                    </div>
                    <Footer>

                    </Footer>
                </div>


            </>

        </React.Fragment>
    );
}


export { Caja };
