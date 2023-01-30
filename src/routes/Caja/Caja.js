import React from 'react';
import { useEffect } from 'react';
import { useLocalStorage } from '../useLocalStorage';
import { useAuth } from '../../auth/auth';
import { useNavigate } from 'react-router-dom';
import { SaveData } from '../useCRUD';
import { urlAPI } from '../../config';


function Caja() {

    const navigate = useNavigate();
    /**
     * Obteniendo los datos del usuario
     * 
     * @navigate funcion que cambia las rutas  
     */
    const auth = useAuth();

    if (!auth.user) navigate('/');

    const {
        item: moneyInBox,
        saveItem: saveMoneyInBox,
        loading,
        error
    } = useLocalStorage('BOX_V1', []);


    const [apertura, setApertura] = React.useState({

        dinero_apertura: 120,
        punto_venta: '192.20.43.20',
        usuario: "usuario",
        dni: 75447008,
        fecha_apertura: '23/01/2023'

    });


    const sendingMoneyDay = async () => {

        const response = await SaveData(`${urlAPI.Caja.url}`, apertura);

        if (!response[0].error) {
            saveMoneyInBox(response[0].body);
            navigate('/home');
        }

    }

    /**
     * Obteniendo la IP 
    **/

    useEffect(() => {


        const getIP = async () => {
            try {

                const response = await fetch('https://api.ipify.org?format=json');
                const data = await response.json();

                setApertura({
                    ...apertura,
                    punto_venta: data.ip,
                })

            } catch (e) {
                console.warn(e);
            }
        }

        getIP();

    }, []);

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
                                <h1 className='text-2xl font-black text-slate-600  mt-4'>Hola  {auth?.user?.nombre} 🖐, para continuar registra el monto que hay en caja 😃</h1>
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
                                            className='
                                                ml-20
                                            '
                                        >
                                            Dni
                                        </span>
                                        <input
                                            className=' 
                                                h-20 
                                                rounded-xl 
                                                px-4  
                                                mx-20 
                                                bg-slate-200 
                                                text-slate-500
                                                text-lg
                                            '
                                            disabled
                                            value={auth?.user?.dni}
                                        />

                                    </div>

                                    <div
                                        className='
                                            
                                            flex
                                            justify-center
                                            text-5xl
                                            mt-5
 
                                        '
                                    >
                                        S/ <textarea
                                            cols={6}
                                            rows={1}
                                            defaultValue={50}
                                            onChange={(e) => {
                                                setApertura({
                                                    ...apertura,
                                                    dinero_apertura: e.target.value
                                                })
                                            }}
                                            className='
                                                border-none
                                            '
                                        ></textarea>
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
                                            bg-indigo-500
                                            h-10
                                            rounded-xl
                                            w-25
                                            text-white
                                            hover:bg-green-700
 
                                        '
                                        onClick={sendingMoneyDay}
                                    >
                                        aperturar
                                    </button>
                                </div>


                            </div>

                        </div>

                    </div>
                </div>


            </>

        </React.Fragment>
    );
}


export { Caja };
