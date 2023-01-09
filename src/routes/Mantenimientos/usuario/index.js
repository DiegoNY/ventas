import { _ } from 'gridjs-react';
import React from 'react';
import { urlAPI } from '../../../config';
import { Label } from '../../../ui/forms/label';
import { Modal } from '../../../ui/modal';
import { Table } from '../../../ui/Tabla';
import { DeleteData, SaveData, UpdateData } from '../../useCRUD';


function MantenimientoUsuario() {

    /**
  * @cliente , @setCliente maneja el estado de los clientes
  */

    const [usuario, setUsuario] = React.useState(null);

    const [loading, setLoading] = React.useState(false);


    const saveUsuario = (e) => {

        e.preventDefault();

        console.log(usuario);

        SaveData(`${urlAPI.Usuario.url}`, usuario);


    }

    const updateUsuario = (e) => {
        e.preventDefault();
        console.log(usuario);
        UpdateData(`${urlAPI.Usuario.url}/${usuario._id}`, usuario)


    }

    const obtenerData = (data) => {

        setUsuario(data);

    }

    const eliminar = (data) => {
        console.log(data)
        DeleteData(`${urlAPI.Usuario.url}/${data._id}`);

    }




    const limpiarData = () => {

    }


    /**
    * Informacion para la tabla
    * 
    * @const columns son las columnas que contendra tu tabla
    * @ModeloProducto Modelo de la data que se mostrara
    * 
    */
    let ModeloUsuario = data => data.map(data => [
        data.dni,
        data.nombre,
        data.telefono,
        data.cargo,
        _(<td>
            <i
                role="button"
                class="fi fi-rr-edit ml-2 mr-2 text-primary"
                data-bs-toggle="modal"
                data-bs-target="#modalEditar"
                onClick={() => {
                    console.log(data);
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
            name: 'DNI'
        },
        {
            name: 'Nombre'
        },
        {
            name: 'Fecha Registro'
        },
        {
            name: 'Acceso'
        },
        {
            name: 'Acciones',

        }
    ]

    return (
        <>


            <Modal
                id={'modalRegistro'}
                title={'NUEVO USUARIO 🙍‍♂️🙍‍♀️ '}
            >

                <form onSubmit={saveUsuario} className="modal-body p-0">

                    <div className='flex'>


                        <div className='col-sm-5 mt-3 ml-4 shadow-sm p-3 mb-3  rounded'>
                            {/* <img src={img_registro} /> */}
                            <table className='table mt-3 table-borderless  table-responsive-sm'>
                                <Label
                                    icon={''}
                                    text={'DNI / RUC'}
                                    onChange={e => {
                                        setUsuario(
                                            {
                                                ...usuario,
                                                dni: e.target.value,
                                            }
                                        )
                                    }}
                                />

                                <Label
                                    icon={''}
                                    text={'Nombre'}
                                    onChange={e => {
                                        setUsuario(
                                            {
                                                ...usuario,
                                                nombre: e.target.value,
                                            }
                                        )
                                    }}
                                />

                                <Label
                                    icon={'fi fi-rr-user'}
                                    text={'Email'}
                                    onChange={e => {
                                        setUsuario(
                                            {
                                                ...usuario,
                                                email: e.target.value,
                                            }
                                        )
                                    }}
                                />

                                <Label
                                    icon={'fi fi-rr-user'}
                                    text={'Telefono'}
                                    onChange={e => {
                                        setUsuario(
                                            {
                                                ...usuario,
                                                telefono: e.target.value,
                                            }
                                        )
                                    }}
                                />

                                <Label
                                    icon={'fi fi-rr-user'}
                                    text={'Fecha Ingreso'}
                                    date={true}
                                    onChange={e => {
                                        setUsuario(
                                            {
                                                ...usuario,
                                                fecha_ingreso: e.target.value,
                                            }
                                        )
                                    }}
                                />

                                <Label
                                    icon={'fi fi-rr-user'}
                                    text={'Cargo'}
                                    onChange={e => {
                                        setUsuario(
                                            {
                                                ...usuario,
                                                cargo: e.target.value,
                                            }
                                        )
                                    }}
                                />




                            </table>
                        </div>

                        <div className='col-sm-5 mt-3 ml-4 shadow-sm p-3 mb-3  rounded'>



                            <table className='table mt-3 table-borderless  table-responsive-sm'>

                                <Label
                                    icon={'fi fi-rr-user'}
                                    text={"Estado"}
                                    select={true}
                                    onChange={e => {
                                        setUsuario(
                                            {
                                                ...usuario,
                                                estado: e.target.value,
                                            }
                                        )
                                    }}
                                >
                                    <option>ACTIVO</option>
                                    <option>INACTIVO</option>
                                </Label>

                                <Label
                                    icon={'fi fi-rr-user'}
                                    text={"Tipo Impresion"}
                                    select={true}
                                    onChange={e => {
                                        setUsuario(
                                            {
                                                ...usuario,
                                                tipo_impresion: e.target.value,
                                            }
                                        )
                                    }}

                                >
                                    <option>PDF (A4)</option>
                                    <option>TICKET</option>
                                </Label>

                                <Label
                                    icon={'fi fi-rr-user'}
                                    text={"Tipo"}
                                    select={true}
                                    onChange={e => {
                                        setUsuario(
                                            {
                                                ...usuario,
                                                tipo: e.target.value,
                                            }
                                        )
                                    }}
                                >
                                    <option value={'ADMINISTRADOR'} >ADMINISTRADOR</option>
                                    <option value={'USUARIO'} >USUARIO</option>
                                </Label>

                                <Label
                                    icon={'fi fi-rr-user'}
                                    text={"Usuario"}
                                    onChange={e => {
                                        setUsuario(
                                            {
                                                ...usuario,
                                                usuario: e.target.value,
                                            }
                                        )
                                    }}

                                />

                                <Label
                                    icon={'fi fi-rr-user'}
                                    text={"Clave"}
                                    onChange={e => {
                                        setUsuario(
                                            {
                                                ...usuario,
                                                clave: e.target.value,
                                            }
                                        )
                                    }}
                                />


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
            <Modal
                id={'modalEditar'}
                title={'EDITAR EL USUARIO ' + usuario?.nombre}
            >

                <form onSubmit={updateUsuario} className="modal-body p-0">

                    <div className='flex'>


                        <div className='col-sm-5 mt-3 ml-4 shadow-sm p-3 mb-3  rounded'>
                            {/* <img src={img_registro} /> */}
                            <table className='table mt-3 table-borderless  table-responsive-sm'>
                                <Label
                                    icon={''}
                                    text={'DNI / RUC'}
                                    value={usuario?.dni}
                                    onChange={e => {
                                        setUsuario(
                                            {
                                                ...usuario,
                                                dni: e.target.value,
                                            }
                                        )
                                    }}
                                />

                                <Label
                                    icon={''}
                                    text={'Nombre'}
                                    value={usuario?.nombre}
                                    onChange={e => {
                                        setUsuario(
                                            {
                                                ...usuario,
                                                nombre: e.target.value,
                                            }
                                        )
                                    }}
                                />

                                <Label
                                    icon={'fi fi-rr-user'}
                                    text={'Email'}
                                    value={usuario?.email}
                                    onChange={e => {
                                        setUsuario(
                                            {
                                                ...usuario,
                                                email: e.target.value,
                                            }
                                        )
                                    }}
                                />

                                <Label
                                    icon={'fi fi-rr-user'}
                                    text={'Telefono'}
                                    value={usuario?.telefono}

                                    onChange={e => {
                                        setUsuario(
                                            {
                                                ...usuario,
                                                telefono: e.target.value,
                                            }
                                        )
                                    }}
                                />

                                <Label
                                    icon={'fi fi-rr-user'}
                                    text={'Fecha Ingreso'}
                                    value={usuario?.fecha_ingreso}

                                    onChange={e => {
                                        setUsuario(
                                            {
                                                ...usuario,
                                                fecha_ingreso: e.target.value,
                                            }
                                        )
                                    }}
                                />

                                <Label
                                    icon={'fi fi-rr-user'}
                                    text={'Cargo'}
                                    value={usuario?.cargo}

                                    onChange={e => {
                                        setUsuario(
                                            {
                                                ...usuario,
                                                cargo: e.target.value,
                                            }
                                        )
                                    }}
                                />




                            </table>
                        </div>

                        <div className='col-sm-5 mt-3 ml-4 shadow-sm p-3 mb-3  rounded'>



                            <table className='table mt-3 table-borderless  table-responsive-sm'>

                                <Label
                                    icon={'fi fi-rr-user'}
                                    text={"Estado"}
                                    value={usuario?.estado}

                                    onChange={e => {
                                        setUsuario(
                                            {
                                                ...usuario,
                                                estado: e.target.value,
                                            }
                                        )
                                    }}
                                />

                                <Label
                                    icon={'fi fi-rr-user'}
                                    text={"Tipo Impresion"}
                                    value={usuario?.tipo_impresion}
                                    onChange={e => {
                                        setUsuario(
                                            {
                                                ...usuario,
                                                tipo_impresion: e.target.value,
                                            }
                                        )
                                    }}

                                />

                                <Label
                                    icon={'fi fi-rr-user'}
                                    text={"Tipo"} value={usuario?.tipo}

                                    onChange={e => {
                                        setUsuario(
                                            {
                                                ...usuario,
                                                tipo: e.target.value,
                                            }
                                        )
                                    }}
                                />

                                <Label
                                    icon={'fi fi-rr-user'}
                                    text={"Usuario"}
                                    value={usuario?.usuario}
                                    onChange={e => {
                                        setUsuario(
                                            {
                                                ...usuario,
                                                usuario: e.target.value,
                                            }
                                        )
                                    }}

                                />

                                <Label
                                    icon={'fi fi-rr-user'}
                                    text={"Clave"} value={usuario?.clave}

                                    onChange={e => {
                                        setUsuario(
                                            {
                                                ...usuario,
                                                clave: e.target.value,
                                            }
                                        )
                                    }}
                                />


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
                            Guardar Cambios
                        </button>

                    </div>

                </form>

            </Modal>


            <div className='card'>

                <div className='mx-3 mt-20'>


                    <Table
                        modelo={ModeloUsuario}
                        columns={columns}
                        url={`${urlAPI.Usuario.url}`}

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
                                    data-bs-target="#modalRegistro"
                                    onClick={
                                        limpiarData
                                    }


                                >
                                    Usuario +
                                </button>


                            </div>

                        }
                    />

                </div>

            </div>


        </>

    );
}

export { MantenimientoUsuario }