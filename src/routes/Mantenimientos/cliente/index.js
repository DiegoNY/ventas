import React, { useEffect, useRef } from 'react';
import { hostAPI, ModeloClientes, urlAPI } from '../../../config';
import { Table } from '../../../ui/Tabla';
import img_registro from '../../img/mantenimiento-img/img-registro-cliente.png'
import img_editar from '../../img/mantenimiento-img/img-editar.png'
import { _ } from "gridjs-react";
import { Modal } from '../../../ui/modal';
import { DeleteData, SaveData, UpdateData } from '../../useCRUD';


function MantenimientoCliente() {

    /**
    * @cliente , @setCliente maneja el estado de los clientes
    */

    const [cliente, setCliente] = React.useState(null);

    const [loading, setLoading] = React.useState(false);



    const obtenerData = (data) => {
        console.log(data);
        setCliente(data)
    }

    const eliminar = (data) => {

        console.log(data);

        DeleteData(`${urlAPI.Cliente.url}/${data._id}`);


    }

    /**
   * Informacion para la tabla
   */
    let ModeloCliente = data => data.map(data => [
        data.tipo_documento,
        data.dni,
        data.descripcion,
        data.telefono,
        data.direccion,
        _(<td>
            <i
                role="button"
                class="fi fi-rr-edit ml-2 mr-2 text-primary"
                data-bs-toggle="modal"
                data-bs-target="#modalEditar"
                onClick={() => {

                    obtenerData(data);
                }}>

            </i>
            <i
                role="button"
                class="fi fi-rr-trash text-danger"
                onClick={() => eliminar(data)}
            >
            </i>

        </td>)


    ]);


    const columns = [
        {
            name: 'Tipo. Documento'
        },
        {
            name: 'Numero Identificacion'
        },
        {
            name: 'Nombre'
        },
        {
            name: 'Telefono'
        },
        {
            name: 'Direccion'
        },
        {
            name: 'Acciones',


        }
    ]


    // Informacion y registro de cliente

    /**
     * Peticiones validar para hacer la data dinamica
     */
    const CargarDatosUsuario = (res) => {
        console.log(res);
    }


    if (loading) {

        const validacionClienteSunat = async (dataParam) => {

            /**
             * Parametros que cambiaran
             */
            let descripcion = "";
            let direccion = "";
            let tipoIdentifiacion = 'DNI';
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

    }

    const updateCliente = (e) => {
        e.preventDefault();

        console.log(cliente);

        UpdateData(`${urlAPI.Cliente.url}/${cliente._id}`, cliente)

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
            telefono: "",

        })
    }


    return (
        <>
            <div className='card'>

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




                <div className='mx-3 mt-20'>


                    <Table
                        modelo={ModeloCliente}
                        columns={columns}
                        url={`${urlAPI.Cliente.url}`}

                        button={
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

                                    "
                                    data-bs-toggle="modal"
                                    data-bs-target="#staticBackdrop"
                                    onClick={
                                        limpiarData
                                    }


                                >
                                    Cliente +
                                </button>


                            </div>

                        }
                    />

                </div>



            </div>



        </>
    );
}

export { MantenimientoCliente }