import React, { useEffect } from 'react';
import { hostAPI, urlAPI } from '../../../config';
import img_registro from '../../img/mantenimiento-img/img-registro-cliente.png'
import img_editar from '../../img/mantenimiento-img/img-editar.png'
import { _, Grid } from "gridjs-react";
import { Modal } from '../../../ui/modal';
import { DeleteData, SaveData, UpdateData } from '../../useCRUD';
import { Titulo } from '../../../ui/titulos-vistas';
import { getData } from '../../useFetch';
import { useNavigate } from 'react-router';
import { useAuth } from '../../../auth/auth';


function MantenimientoCliente() {
    //Usuario autenticado ? 
    const auth = useAuth();
    const navigation = useNavigate();
    if (!auth.user) navigation('/');


    /**
    * @cliente , @setCliente maneja el estado de los clientes
    */
    const [cliente, setCliente] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [dataCliente, setDataCliente] = React.useState([{}])

    const obtenerData = (id) => {
        dataCliente.map(cliente => {
            if (cliente._id == id) {
                setCliente(cliente)
            }
        })
    }

    const eliminar = (id) => {

        DeleteData(`${urlAPI.Cliente.url}/${id}`);
        dataClientes();

    }

    /**
    * Obtiene todos los clientes que esten almacenados en bd 
    * y actualiza el estado de Clientes con los valores que 
    * obtenga 
    */
    const dataClientes = async () => {

        const data = await getData(`${urlAPI.Cliente.url}`);
        console.log(data);
        setDataCliente(data[0].body);

    }

    useEffect(() => {

        dataClientes();

    }, [])

    // Informacion y registro de cliente

    if (loading) {

        const validacionClienteSunat = async (dataParam) => {

            /**
             * Parametros que cambiaran
             */
            let descripcion = "";
            let direccion = "";
            let tipoIdentifiacion = 'DNI';
            let identificacion = '01';
            let queryParametro = 'dni';

            /**
             * Validando si es ruc o Dni
             */
            let dataNumber = dataParam.split('').map(Number);

            /**
             * Asignando el tipo de peticion
             */
            if (dataNumber.length == 12 || dataNumber.length == 11) {

                tipoIdentifiacion = 'RUC';
                queryParametro = 'ruc';
                identificacion = '06';

            }

            let url = `${hostAPI}/api/v1/procesos?peticion=SUNAT&descripcion=${tipoIdentifiacion}&${queryParametro}=`;



            const response = await fetch(`${url}${dataParam}`, {
                method: 'GET'
            })

            const data = await response.json();

            /**
            * Fin de tipo peticion / Inicio de carga de datos 
            */

            descripcion = data.Response.nombre;
            direccion = data.Response.direccion;


            /**
             * Mostrando los datos obtenidos
             */
            console.log("no debi ejecutarme")

            setCliente({
                ...cliente,
                descripcion: descripcion,
                direccion: direccion,
                tipo_identificacion: tipoIdentifiacion,
            })

        }

        /**
         * llamando funcion y terminando la carga para que no se 
         * ejecute cada vez que se renderiza 
         */

        validacionClienteSunat(cliente.dni_ruc);

        setLoading(false);

    }

    /**
     * 
     * @param {*} e  recive el evento submit para hacer que no se refresque la pagina
     */

    const saveClient = async (e) => {

        e.preventDefault();
        SaveData(`${urlAPI.Cliente.url}`, cliente)
        dataClientes();

    }

    const updateCliente = (e) => {
        e.preventDefault();

        UpdateData(`${urlAPI.Cliente.url}/${cliente._id}`, cliente)
        dataClientes();
    }
    /**
     * Vacia la informacion almacenada en el estado 🗑
     */
    const limpiarData = () => {

        setCliente({
            descripcion: "",
            direccion: "",
            correo: "",
            dni_ruc: "",
            telefono: "-",

        })
    }


    return (
        <>
            <div
                className='
                grid grid-cols-12 auto-rows-fr	 h-96 gap-1
                '
            >

                <Modal
                    id={'modalEditar'}
                    title={`EDITAR AL CLIENTE ${cliente?.descripcion}`}
                >
                    <form onSubmit={updateCliente} className="modal-body p-0">

                        <div className='row'>


                            <div className='col-sm-4 mr-4 mt-5 ml-5  p-3 mb-5  rounded'>
                                <img src={img_editar} />
                            </div>

                            <div className='col-sm-6 mt-3 ml-4 shadow-sm p-3 mb-3  rounded'>

                                <table className='table mt-3 table-borderless  table-responsive-sm'>

                                    <tr >
                                        <td className='font-sans'>

                                            <span>
                                                <i class="fi fi-rr-user"></i>
                                            </span>

                                            DNI / RUC

                                        </td>
                                        <td className='font-mono'>
                                            <div className='flex p-0'>

                                                <input

                                                    value={cliente?.dni}
                                                    type={'number'}
                                                    placeholder='DNI / RUC'
                                                    className='
                                                        input-form
                                                        form-control 
                                                        form-control-sm
                                                        shadow-sm p-2  
                                                        rounded
                                                    '
                                                />

                                                <i
                                                    role='button'
                                                    className="
                                                        fi fi-rr-search
                                                        w-14    
                                                        text-center
                                                        mt-2
                                                    "

                                                    onClick={() => {
                                                        setLoading(true);
                                                    }}
                                                >

                                                </i>
                                            </div>

                                        </td>

                                    </tr>
                                    <tr>
                                        <td className='font-sans'>

                                            <span>
                                                <i class="fi fi-rr-user"></i>
                                            </span>

                                            Descripción

                                        </td>
                                        <td className='font-mono'>

                                            <input
                                                placeholder=' Razon social / Nombres 
                        '
                                                className='
                                                    input-form
                                                    form-control 
                                                    form-control-sm
                                                    shadow-sm p-2  
                                                    rounded
                        '
                                                value={cliente?.descripcion}
                                                onChange={e => {
                                                    setCliente(
                                                        {
                                                            ...cliente,
                                                            descripcion: e.target.value,
                                                        }
                                                    )
                                                }}
                                            />

                                        </td>

                                    </tr>
                                    <tr>
                                        <td className='font-sans'>

                                            <span>
                                                <i class="fi fi-rr-user"></i>
                                            </span>

                                            Telefono

                                        </td>
                                        <td className='font-mono'>

                                            <input
                                                placeholder='Telefono'
                                                type={'number'}
                                                className='
                                                    input-form
                                                    form-control 
                                                    form-control-sm
                                                    shadow-sm p-2  
                                                    rounded
                        '
                                                value={cliente?.telefono}
                                                onChange={e => {

                                                    setCliente(
                                                        {
                                                            ...cliente,
                                                            telefono: e.target.value,
                                                        }
                                                    )
                                                }}
                                            />

                                        </td>

                                    </tr>
                                    <tr>
                                        <td className='font-sans'>

                                            <span>
                                                <i class="fi fi-rr-user"></i>
                                            </span>

                                            Direccion

                                        </td>
                                        <td className='font-mono'>

                                            <input
                                                placeholder='Direccion'
                                                className='
                                                    input-form
                                                    form-control 
                                                    form-control-sm
                                                    shadow-sm p-2  
                                                    rounded
                        '
                                                value={cliente?.direccion}
                                                onChange={e => {
                                                    setCliente(
                                                        {
                                                            ...cliente,
                                                            direccion: e.target.value
                                                        }
                                                    )
                                                }}
                                            />

                                        </td>

                                    </tr>
                                    <tr>
                                        <td className='font-sans'>

                                            <span>
                                                <i class="fi fi-rr-user"></i>
                                            </span>

                                            Correo

                                        </td>
                                        <td className='font-mono'>

                                            <input
                                                placeholder='Correo'
                                                className='
                                                    input-form
                                                    form-control 
                                                    form-control-sm
                                                    shadow-sm p-2  
                                                    rounded
                        '
                                                value={cliente?.correo}
                                                onChange={e => {
                                                    setCliente(
                                                        {
                                                            ...cliente,
                                                            correo: e.target.value,
                                                        }
                                                    )
                                                }}
                                            />

                                        </td>

                                    </tr>

                                </table>

                            </div>



                        </div>

                        <div className="modal-footer flex ">
                            <button
                                type="button"
                                className="
                                    btn

        "
                                data-bs-dismiss="modal"
                            >
                                Cerrar
                            </button>

                            <button
                                type="submit"
                                className="
                                    ml-2
                                    bg-indigo-500 
                                    h-10 
                                    rounded-md
                                    text-white 
                                    cursor-pointer
                                    px-3
                                    text-sm
                                    w-px-15
                                    w-30
                                    mr-2
                                "

                            >
                                Guardar cambios
                            </button>

                        </div>

                    </form>
                </Modal>



                <Modal
                    id={'staticBackdrop'}
                    title={'Nuevo Cliente'}
                >

                    <form onSubmit={saveClient} className="modal-body p-0">

                        <div className='row'>


                            <div className='col-sm-4 mr-4 mt-5 ml-5  p-3 mb-5  rounded'>
                                <img src={img_registro} />
                            </div>

                            <div className='col-sm-6 mt-3 ml-4 shadow-sm p-3 mb-3  rounded'>

                                <table className='table mt-3 table-borderless  table-responsive-sm'>

                                    <tr >
                                        <td className='font-sans'>

                                            <span>
                                                <i class="fi fi-rr-user"></i>
                                            </span>

                                            DNI / RUC

                                        </td>
                                        <td className='font-mono'>
                                            <div className='flex p-0'>

                                                <input
                                                    value={cliente?.dni_ruc}
                                                    onChange={e => {

                                                        setCliente({
                                                            dni_ruc: e.target.value
                                                        })

                                                    }}
                                                    type='number'
                                                    placeholder='DNI / RUC'
                                                    className='
                                                            input-form
                                                            form-control 
                                                            form-control-sm
                                                            shadow-sm p-2  
                                                            rounded
                                                        '
                                                />

                                                <i
                                                    role='button'
                                                    className="
                                                            fi fi-rr-search
                                                            w-14    
                                                            text-center
                                                            mt-2
                                                        "
                                                    onClick={() => {
                                                        setLoading(true);
                                                    }}
                                                >

                                                </i>
                                            </div>

                                        </td>

                                    </tr>
                                    <tr>
                                        <td className='font-sans'>

                                            <span>
                                                <i class="fi fi-rr-user"></i>
                                            </span>

                                            Descripción

                                        </td>
                                        <td className='font-mono'>

                                            <input
                                                placeholder=' Razon social / Nombres '
                                                className='
                                                        input-form
                                                        form-control 
                                                        form-control-sm
                                                        shadow-sm p-2  
                                                        rounded
                                                    '

                                                value={cliente?.descripcion}
                                                onChange={e => {
                                                    setCliente(
                                                        {
                                                            ...cliente,
                                                            descripcion: e.target.value,
                                                        }
                                                    )
                                                }}
                                            />

                                        </td>

                                    </tr>
                                    <tr>
                                        <td className='font-sans'>

                                            <span>
                                                <i class="fi fi-rr-user"></i>
                                            </span>

                                            Telefono

                                        </td>
                                        <td className='font-mono'>

                                            <input
                                                placeholder='Telefono'
                                                className='
                                                        input-form
                                                        form-control 
                                                        form-control-sm
                                                        shadow-sm p-2  
                                                        rounded
                                                    '
                                                type={'number'}
                                                value={cliente?.telefono}
                                                onChange={e => {

                                                    setCliente(
                                                        {
                                                            ...cliente,
                                                            telefono: e.target.value,
                                                        }
                                                    )
                                                }}
                                            />

                                        </td>

                                    </tr>
                                    <tr>
                                        <td className='font-sans'>

                                            <span>
                                                <i class="fi fi-rr-user"></i>
                                            </span>

                                            Direccion

                                        </td>
                                        <td className='font-mono'>

                                            <input
                                                placeholder='Direccion'
                                                className='
                                                        input-form
                                                        form-control 
                                                        form-control-sm
                                                        shadow-sm p-2  
                                                        rounded
                                                    '
                                                value={cliente?.direccion}
                                                onChange={e => {
                                                    setCliente(
                                                        {
                                                            ...cliente,
                                                            direccion: e.target.value
                                                        }
                                                    )
                                                }}
                                            />

                                        </td>

                                    </tr>
                                    <tr>
                                        <td className='font-sans'>

                                            <span>
                                                <i class="fi fi-rr-user"></i>
                                            </span>

                                            Correo

                                        </td>
                                        <td className='font-mono'>

                                            <input
                                                placeholder='Correo'
                                                className='
                                                    input-form
                                                    form-control 
                                                    form-control-sm
                                                    shadow-sm p-2  
                                                    rounded
                                                    '
                                                value={cliente?.correo}
                                                onChange={e => {
                                                    setCliente(
                                                        {
                                                            ...cliente,
                                                            correo: e.target.value,
                                                        }
                                                    )
                                                }}
                                            />

                                        </td>

                                    </tr>

                                </table>

                            </div>



                        </div>

                        <div className="modal-footer flex ">
                            <button
                                type="button"
                                className="
                                        btn
                                    "
                                data-bs-dismiss="modal"
                            >
                                Cerrar
                            </button>

                            <button
                                type="submit"
                                className="
                                    ml-2
                                    bg-indigo-500 
                                    h-10 
                                    rounded-md
                                    text-white 
                                    cursor-pointer
                                    px-3
                                    text-sm
                                    w-px-15
                                    w-30
                                    mr-2
                                "

                            >
                                Registrar
                            </button>

                        </div>

                    </form>

                </Modal>
                {/* Titulo */}
                <div className='
                    col-span-12 row-span-2 sm:row-span-1 flex z-10
                '>
                    <Titulo title={'Clientes '} className={{ container: 'flex flex-col w-full px-4 my-2' }} navegacion={' Mantenimiento'} icono={'fi fi-rr-settings'} />
                    <div class="flex flex-row-reverse">
                        <button
                            type="button"
                            class=" 
                            bg-indigo-500 
                            h-10 
                            rounded-md
                            text-white 
                            cursor-pointer
                            px-3
                            text-sm
                            w-px-15
                            w-48
                            margin-top-boton
                            mr-4
                        "
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                            onClick={() => limpiarData()}


                        >
                            Cliente +
                        </button>


                    </div>
                </div>


                {/* tabla */}
                <div className='mt-2 mx-3 card z-0 h-96 border-none col-span-12 row-span-6'>

                    <Grid
                        data={dataCliente}
                        columns={[
                            { id: '_id', name: '#' },
                            { id: 'tipo_identificacion', name: 'Tipo.Documento' },
                            { id: 'dni', name: 'Numero Identificacion' },
                            { id: 'descripcion', name: 'Nombre' },
                            { id: 'telefono', name: 'Telefono' },
                            { id: 'direccion', name: 'Direccion' },
                            {
                                id: 'acciones', name: 'Acciones', formatter: (cells, row) => _(
                                    <td>
                                        <i
                                            role="button"
                                            class="fi fi-rr-edit ml-2 mr-2 text-primary"
                                            data-bs-toggle="modal"
                                            data-bs-target="#modalEditar"
                                            onClick={() => {

                                                obtenerData(row.cells[0].data);
                                            }}>

                                        </i>
                                        <i
                                            role="button"
                                            class="fi fi-rr-trash text-danger"
                                            onClick={() => {
                                                eliminar(row.cells[0].data)
                                            }}
                                        >
                                        </i>

                                    </td>
                                )
                            },
                        ]}
                        search={true}
                        sort={true}
                        pagination={{
                            limit: 5,
                        }}
                        className={
                            {
                                th: 'bg-orange-500',
                                table: 'w-100',
                            }
                        }

                        language={{
                            'search': {
                                'placeholder': 'Buscar por ...',
                            },
                            'pagination': {
                                'previous': '⬅',
                                'next': '⬅',
                                'showing': 'Mostrando',
                                'results': () => 'Resultados'
                            }
                        }
                        }
                    />


                </div>

            </div>

        </>
    );
}

export { MantenimientoCliente }