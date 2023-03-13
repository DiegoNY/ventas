import { _, Grid } from 'gridjs-react';
import React, { useEffect, useState } from 'react';
import { urlAPI } from '../../../config';
import { Label } from '../../../ui/forms/label';
import { Modal } from '../../../ui/modal';
import { TablaDataGrid } from '../../../ui/Tabla/DataGrid';
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
    const [columnas, setColumnas] = useState([]);

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
        const columns = [
            {
                field: '_id',
                headerName: 'Id',
                flex: 0.3,
                renderCell: (params) => {
                    return <div className='text-center w-full'>{params.row._id}</div>
                }
            },
            {
                field: 'dni',
                headerName: 'DNI',
                flex: 0.2,
                renderCell: (params) => {
                    return <div className='text-center w-full'>{params.row.dni}</div>
                }
            },
            {
                field: 'nombre',
                headerName: 'NOMBRE',
                flex: 0.2,
               
            },
            {
                field: 'fecha_ingreso',
                headerName: 'FECHA REGISTRO',
                flex: 0.1,
                
            },
            {
                field: 'tipo',
                headerName: 'ACCESOS',
                flex: 0.3,
                renderCell: (params) => {
                    return <div className='text-center w-full'>{params.row.tipo}</div>
                }
            },
            {
                field: '',
                headerName: 'ACCIONES',
                flex: 0.1,
                renderCell: (params) => {
                    return (
                        <div className='w-full flex justify-between mx-3'>
                            <div
                                className='bg-orange-500 rounded-lg cursor-pointer' data-bs-toggle="modal" data-bs-target="#modalEditar"
                                onClick={() => {
                                    obtenerData(params.id)
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ffff" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                                </svg>
                            </div>
                            <div className='cursor-pointer' onClick={() => eliminar(params.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffff" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:text-red-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>

                            </div>
                        </div>
                    )
                }
            },
        ]

        setColumnas(columns);
    }, [usuarios])

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
                                    icon={''}
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
                                    icon={''}
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
                                    icon={''}
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
                                    icon={''}
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
                                    icon={''}
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
                                    icon={''}
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
                                    icon={''}
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
                                    icon={''}
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
                                    icon={''}
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
                                    icon={''}
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
                                    icon={''}
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
                                    icon={''}
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
                                    icon={''}
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
                                    icon={''}
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
                                    icon={''}
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
                                    icon={''}
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
                                    icon={''}
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
                                    icon={''}
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
                <div
                    className='flex sm:justify-between'
                >
                    <Titulo title={'Usuario '} className={{ container: 'flex flex-col w-full px-4 my-2' }} navegacion={' Mantenimiento'} icono={'fi fi-rr-settings'} />
                    <div class="flex flex-row-reverse">
                        <button
                            type="button"
                            className=" 
                            bg-blue-400 h-10 rounded-md text-white cursor-pointer px-3 text-sm w-px-15  w-48  mt-3  mr-4
                            "
                            data-bs-toggle="modal"
                            data-bs-target="#modalRegistro"
                            onClick={() => limpiarData()}


                        >
                            Usuario  +
                        </button>


                    </div>
                </div>

                <div className='mx-3 mt-2 h-screen'>


                    <TablaDataGrid
                        columns={columnas}
                        data={usuarios}
                        loading={false}
                        visibility={{}}
                        pageSize={8}
                    />
                </div>

            </div>


        </>

    );
}

export { MantenimientoUsuario }