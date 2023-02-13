import { _, Grid } from 'gridjs-react';
import React, { useEffect } from 'react';
import { urlAPI } from '../../../config';
import { Label } from '../../../ui/forms/label';
import { Modal } from '../../../ui/modal';
import { Titulo } from '../../../ui/titulos-vistas';
import { DeleteData, SaveData, UpdateData } from '../../useCRUD';
import { getData } from '../../useFetch';


function MantenimientoUsuario() {

    /**
  * @cliente , @setCliente maneja el estado de los clientes
  */

    const [usuario, setUsuario] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [usuarios, setUsuarios] = React.useState([]);

    const saveUsuario = (e) => {

        e.preventDefault();
        SaveData(`${urlAPI.Usuario.url}`, usuario);

        setTimeout(() => {
            ObtenerDataUsuarios();
        }, 800)
    }

    const updateUsuario = (e) => {
        e.preventDefault();
        console.log(usuario);
        UpdateData(`${urlAPI.Usuario.url}/${usuario._id}`, usuario);

        setTimeout(() => {
            ObtenerDataUsuarios();
        }, 800);

    }

    const obtenerData = (id) => {
        usuarios.map(usuario => {
            if (usuario._id == id) {
                setUsuario(usuario);
            }
        })

    }

    const eliminar = (id) => {
        DeleteData(`${urlAPI.Usuario.url}/${id}`);

        setTimeout(() => {
            ObtenerDataUsuarios();
        }, 800);
    }

    const limpiarData = () => {
        setUsuario({
            cargo: "",
            clave: "",
            created_at: "",
            dni: "",
            email: "",
            estado: 1,
            fecha_ingreso: "",
            nombre: "",
            telefono: "",
            tipo: "",
            tipo_impresion: " ",
            updated_at: "",
            usuario: "",
            _id: "",
        })
    }

    /**
    * Informacion para la tabla
    * 
    */


    const ObtenerDataUsuarios = async () => {
        const data = await getData(`${urlAPI.Usuario.url}`);
        console.log(data);
        setUsuarios(data);
    }

    useEffect(() => {
        ObtenerDataUsuarios();
    }, [])

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

                <Titulo title={'Usuario '} className={{ container: 'flex flex-col w-full px-4 my-2' }} navegacion={' Mantenimiento'} icono={'fi fi-rr-settings'} />

                <div className='mx-3 mt-2'>


                    <Grid
                        data={usuarios}
                        columns={[
                            {
                                id: 'button',
                                name: _(<div class="flex flex-row-reverse">
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
                                        onClick={() => limpiarData()}


                                    >
                                        Usuario  +
                                    </button>


                                </div>),
                                columns: [
                                    { id: '_id', name: '#' },
                                    { id: 'dni', name: 'DNI' },
                                    { id: 'nombre', name: 'NOMBRE' },
                                    { id: 'fecha_ingreso', name: 'FECHA REGISTRO' },
                                    { id: 'tipo', name: 'ACCESOS' },
                                    {
                                        id: 'acciones', name: 'ACCIONES', formatter: (cells, row) => _(
                                            <td className='flex justify-center'>

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
                                ]
                            }
                        ]}
                        search={true}
                        sort={true}
                        pagination={{
                            limit: 5,
                        }}
                        className={
                            {
                                thead: 'bg-red',
                                th: 'bg-orange-500 text-center mx-0 ',
                                table: 'w-100',
                                td: 'text-center',
                            }
                        }

                        language={{
                            'search': {
                                'placeholder': '🔍 Buscar por ...',
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

export { MantenimientoUsuario }