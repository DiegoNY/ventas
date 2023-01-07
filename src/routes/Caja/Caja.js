import React from 'react';
import { Button } from '../../ui/Boton';
import { LabelGroup } from '../../ui/Label';
import { useEffect } from 'react';
import { Error } from '../../ui/Error';
import { useLocalStorage } from '../useLocalStorage';
import img1 from '../img/Humaaans - Wireframe.png';
import { useAuth } from '../../auth/auth';
import { useNavigate } from 'react-router-dom';
import { getData } from '../useFetch';


var Usuario = {

    nombre: "admin",
    cargo: "administrador",
    correo: "correo",
    dni: "754470089",
    token: "123124124"

}

/**
 * Informacion Puesto
**/

let objfecha = new Date();
let fecha = objfecha.toLocaleDateString();

const InformacionPuesto = {
    fecha: fecha,
    puesto: '',
}




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

    const {

        item: open,
        saveItem: saveOpen,

    } = useLocalStorage('APERTURA_V1', []);


    const [box, setMoneyBox] = React.useState({

        money: "",
        date: "",
        point: "",
        user: "",
        dni: "",

    });

    const [ip, setIP] = React.useState('');

    const [openBox, setOpenBox] = React.useState(false)


    /**
     * comparando fechas de apertura de caja si no se cerro sesion
     */

    if (moneyInBox.date)
        if (moneyInBox.date === InformacionPuesto.fecha) {

            console.log("es el mismo dia de apertura sistema funciona bien");

        } else {

            console.log("es otro dia de apertura tienes que cerrar caja ");

        }


    const handleChange = (event) => {

        let money = event.target.value;

        setMoneyBox({

            money: money,
            point: ip,
            user: Usuario.nombre,
            dni: Usuario.dni,
            date: InformacionPuesto.fecha

        });

    }

    const sendingMoneyDay = () => {

        var requestOptions = {

            method: 'POST',
            redirect: 'follow',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(box)

        };


        /**
         * se envia data al servidor // Dinero de la caja en ese dia y la informacion del puesto @caja contiene todos los datos
         * tambien se carga la data en localStorage 
        **/

        const sendingBox = async (requestOptions) => {

            const response = await fetch("http://192.168.1.43:8000/api/v1/checkoutbox/", requestOptions)
            const data = await response.json();
            return data;

        }

        sendingBox(requestOptions)
            .then(data => {
                
                if (data.message === "save") {

                    setOpenBox(true);
                    saveMoneyInBox(box);
                    saveOpen({ status: true });
                    navigate('/home');

                }

            })
            .catch(error => <Error error={error} />);


    }

    /**
     * Obteniendo la IP 
    **/

    useEffect(() => {


        const getIP = async () => {
            try {

                const response = await fetch('https://api.ipify.org?format=json');
                const data = await response.json();
                setIP(data.ip);

                // 
                // se trae la data ejemplo
                // 
                // const resp = getData('http://192.168.1.43:8000/api/v1/checkoutbox/');

                // const d = await resp;
                // console.log(d);


            } catch (e) {
                console.warn(e);
            }
        }

        getIP();
        console.log("se ejecuto el llamado una vez owo ");

    }, []);

    InformacionPuesto.puesto = ip;

    return (

        <React.Fragment>

            <>

                <div className='card mb-1'>
                    <h3
                        className='
                            text-xl
                            my-3 
                            ml-3 
                            w-40 
                            font-bold
                            font-sans
                        '
                    >

                        Apertura Caja

                    </h3>

                </div>

                <div
                    className='
                        card  
                        mx-9 
                        mt-2 
                        h-full 
                        flex-row-reverse
                    '
                >

                    <div className='w-1/2 mx-10 mt-20 my-20'>
                        <img src={img1} className="img-fluid rounded-top " alt="logo farmacia" />
                    </div>

                    <form className='w-1/2 mx-8 mt-10 mb-10  flex-col'>

                        <fieldset>

                            {
                                !auth.loading &&

                                <>
                                    <LabelGroup
                                        value={auth.user.dni}
                                        text={"DNI"}
                                    />

                                    <LabelGroup
                                        value={auth.user.nombre}
                                        text={"Usuario"}
                                    />

                                </>

                            }


                            <LabelGroup
                                value={InformacionPuesto.puesto}
                                text={"IP Maquina"}
                            />

                            <LabelGroup
                                value={InformacionPuesto.fecha}
                                text={"Fecha"}
                            />

                            <div className='flex flex-row gap-2 max-w-xs'>

                                <label className='text-sm font-semibold font-sans w-1/2 mb-0 p-2'>Efectivo</label>

                                <input className='w-1/2 h-10' onChange={e => handleChange(e)} />

                            </div>

                        </fieldset>

                        <div className='mt-2 p-8'>

                            <Button
                                text="Aperturar Caja"
                                onClick={sendingMoneyDay}
                            />

                        </div>

                    </form>

                </div>

            </>

        </React.Fragment>
    );
}


export { Caja };
