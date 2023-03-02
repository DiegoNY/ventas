import { _, Grid } from 'gridjs-react';
import React, { useEffect, useState } from 'react';
import { urlAPI } from '../../../config';
import { Label } from '../../../ui/forms/label';
import { Modal } from '../../../ui/modal';
import { DeleteData, SaveData, UpdateData } from '../../useCRUD';
import img1_1 from '../../img/mantenimiento-img/editarLaboratorio2.png'
import img1_2 from '../../img/mantenimiento-img/editarLaboratorio3.png'
import { getData } from '../../useFetch';
import { Titulo } from '../../../ui/titulos-vistas';
import { useAuth } from '../../../auth/auth';
import { useNavigate } from 'react-router';
import { TablaDataGrid } from '../../../ui/Tabla/DataGrid';

function MantenimientoLaboratorio() {

    const auth = useAuth();
    const navigation = useNavigate();
    if (!auth.user) navigation('/');


    /**
    * @cliente , @setCliente maneja el estado de los clientes
    */

    const [laboratorio, setLaboratorio] = React.useState(null);
    const [dataLaboratoriosEstado, setDataLaboratiosEstado] = React.useState([]);
    const [load, setLoad] = useState(false);
    const [columnas, setColumnas] = useState([])

    const saveLaboratorio = (e) => {

        e.preventDefault();
        SaveData(`${urlAPI.Laboratorio.url}`, laboratorio);
        dataLaboratorios();

    }

    const updateLaboratorio = (e) => {
        e.preventDefault();
        UpdateData(`${urlAPI.Laboratorio.url}/${laboratorio._id}`, laboratorio)
        dataLaboratorios();
    }

    const obtenerData = (data) => {
        dataLaboratoriosEstado.map(laboratorio => {
            if (laboratorio._id == data) {

                setLaboratorio(laboratorio);
            }
        })
    }

    const eliminar = (data) => {
        DeleteData(`${urlAPI.Laboratorio.url}/${data}`);
        dataLaboratorios();
    }


    const limpiarData = () => {
        setLaboratorio({
            abreviatura: "",
            correo: "",
            created_at: "",
            direccion: "",
            estado: "",
            nombre: "",
            ruc: "",
            telefono: "",
            updated_at: "",
            _id: "",
        })
    }

    /**
     * Informacion para la tabla
    */

    const dataLaboratorios = async () => {
        const data = await getData(`${urlAPI.Laboratorio.url}`);
        setDataLaboratiosEstado(data);
    }

    useEffect(() => {
        const columns = [
            {
                field: '_id',
                headerName: 'Id',
                flex: 0.2,
                renderCell: (params) => {
                    return <div className='w-full text-center'>{params.row._id}</div>
                }
            },
            {
                field: 'abreviatura',
                headerName: 'RAZON SOCIAL',
                flex: 0.2,
                renderCell: (params) => {
                    return <div className='w-full text-center'>{params.row.abreviatura}</div>
                }
            },
            {
                field: 'direccion',
                headerName: 'DIRECCION',
                flex: 0.1,
            },
            {
                field: 'telefono',
                headerName: 'TELEFONO',
                flex: 0.2,
              
            },
            {
                field: '',
                headerName: 'ACCIONES',
                flex: 0.1,
                renderCell: (params) => {
                    return (
                        <div className='w-full flex justify-between mx-3 p-3'>
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
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:text-red-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>

                            </div>
                        </div>
                    )
                }
            },
        ]

        setColumnas(columns);

    }, [dataLaboratoriosEstado])

    useEffect(() => {
        dataLaboratorios();
    }, [])

    return (
        <>

            <Modal
                id={'modalRegistro'}
                title={'NUEVO LABORATORIO 🔬'}
            >

                <form onSubmit={saveLaboratorio} className="modal-body p-0">

                    <div className='flex'>


                        <div className='col-sm-4 mr-4 mt-2 ml-5  p-3 mb-2  rounded'>
                            <img src={img1_1} />

                        </div>

                        <div className='col-sm-6 mt-3 ml-4 shadow-sm p-3 mb-3  rounded'>



                            <table className='table mt-3 table-borderless  table-responsive-sm'>

                                <Label
                                    icon={'fi fi-rr-user'}
                                    text={"Ruc"}
                                    type={'number'}
                                    onChange={e => {
                                        setLaboratorio(
                                            {
                                                ...laboratorio,
                                                ruc: e.target.value,
                                            }
                                        )
                                    }}
                                />

                                <Label
                                    icon={'fi fi-rr-user'}
                                    text={"Nombre"}
                                    onChange={e => {
                                        setLaboratorio(
                                            {
                                                ...laboratorio,
                                                nombre: e.target.value,
                                            }
                                        )
                                    }}

                                />

                                <Label
                                    icon={'fi fi-rr-user'}
                                    text={"Abreviatura"}
                                    onChange={e => {
                                        setLaboratorio(
                                            {
                                                ...laboratorio,
                                                abreviatura: e.target.value,
                                            }
                                        )
                                    }}
                                />

                                <Label
                                    icon={'fi fi-rr-user'}
                                    text={"Direccion"}
                                    onChange={e => {
                                        setLaboratorio(
                                            {
                                                ...laboratorio,
                                                direccion: e.target.value,
                                            }
                                        )
                                    }}

                                />

                                <Label
                                    icon={'fi fi-rr-user'}
                                    text={"Telefono"}
                                    type={'number'}
                                    onChange={e => {
                                        setLaboratorio(
                                            {
                                                ...laboratorio,
                                                telefono: e.target.value,
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
                title={'EDITAR EL LABORATORIO ' + laboratorio?.nombre}
            >

                <form onSubmit={updateLaboratorio} className="modal-body p-0">

                    <div className='flex'>


                        <div className='col-sm-4 mr-4 mt-5 ml-5  p-3 mb-5  rounded'>
                            <img src={img1_2} />

                        </div>

                        <div className='col-sm-6 mt-3 ml-4 shadow-sm p-3 mb-3  rounded'>



                            <table className='table mt-3 table-borderless  table-responsive-sm'>

                                <Label
                                    icon={'fi fi-rr-user'}
                                    text={"Ruc"}
                                    type={'number'}

                                    value={laboratorio?.ruc}
                                    onChange={e => {
                                        setLaboratorio(
                                            {
                                                ...laboratorio,
                                                ruc: e.target.value,
                                            }
                                        )
                                    }}
                                />

                                <Label
                                    icon={'fi fi-rr-user'}
                                    text={"Nombre"}
                                    value={laboratorio?.nombre}

                                    onChange={e => {
                                        setLaboratorio(
                                            {
                                                ...laboratorio,
                                                nombre: e.target.value,
                                            }
                                        )
                                    }}

                                />

                                <Label
                                    icon={'fi fi-rr-user'}
                                    text={"Abreviatura"}
                                    value={laboratorio?.abreviatura}
                                    onChange={e => {
                                        setLaboratorio(
                                            {
                                                ...laboratorio,
                                                abreviatura: e.target.value,
                                            }
                                        )
                                    }}
                                />

                                <Label
                                    icon={'fi fi-rr-user'}
                                    text={"Direccion"}
                                    value={laboratorio?.direccion}

                                    onChange={e => {
                                        setLaboratorio(
                                            {
                                                ...laboratorio,
                                                direccion: e.target.value,
                                            }
                                        )
                                    }}

                                />

                                <Label
                                    icon={'fi fi-rr-user'}
                                    text={"Telefono"}
                                    type={'number'}
                                    value={laboratorio?.telefono}
                                    onChange={e => {
                                        setLaboratorio(
                                            {
                                                ...laboratorio,
                                                telefono: e.target.value,
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

            <div className='card'>
                <div className='flex justify-between'>
                    <Titulo title={'Laboratorio '} className={{ container: 'flex flex-col w-full px-4 my-2' }} navegacion={' Mantenimiento'} icono={'fi fi-rr-settings'} />
                    <div class="flex flex-row-reverse">
                        <button
                            type="button"
                            className=" 
                            bg-blue-400  h-10   rounded-md text-white cursor-pointer px-3 text-sm w-px-15  w-48  mt-3  mr-4
                            "
                            data-bs-toggle="modal"
                            data-bs-target="#modalRegistro"
                            onClick={() => limpiarData()}


                        >
                            Laboratorio Proveedor 
                        </button>


                    </div>
                </div>

                <div className='mx-3 mt-4 h-screen'>

                    <TablaDataGrid
                        columns={columnas}
                        data={dataLaboratoriosEstado}
                        loading={load}
                        visibility={{}}
                    />

                </div>

            </div>


        </>

    );
}

export { MantenimientoLaboratorio }