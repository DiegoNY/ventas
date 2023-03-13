import { _, Grid } from 'gridjs-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../../auth/auth';
import { urlAPI } from '../../../config';
import { Label } from '../../../ui/forms/label';
import { Modal } from '../../../ui/modal';
import { TablaDataGrid } from '../../../ui/Tabla/DataGrid';
import { Titulo } from '../../../ui/titulos-vistas';
import { DeleteData, SaveData, UpdateData } from '../../useCRUD';
import { getData } from '../../useFetch';


function MantenimientoProveedor() {

    //Usuario autenticado ? 
    const auth = useAuth();
    const navigation = useNavigate();
    if (!auth.user) navigation('/');

    /**
   * @cliente , @setCliente maneja el estado de los clientes
   */

    const [proveedor, setProveedor] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [dataProveedores, setDataProveedores] = React.useState([]);
    const [columnas, setColumnas] = useState([])


    const saveProveedor = (e) => {

        e.preventDefault();

        SaveData(`${urlAPI.Proveedor.url}`, proveedor);

        setTimeout(() => {
            obtenerDataProveedores();
        }, 800)



    }

    const updateProveedor = (e) => {
        e.preventDefault();
        console.log(proveedor);
        UpdateData(`${urlAPI.Proveedor.url}/${proveedor._id}`, proveedor);

        setTimeout(() => {
            obtenerDataProveedores();
        }, 800)

    }

    const obtenerData = (id) => {
        dataProveedores.map(proveedor => {
            if (proveedor._id == id) {
                setProveedor(proveedor);
            }
        })

    }

    const eliminar = (id) => {
        DeleteData(`${urlAPI.Proveedor.url}/${id}`);

        setTimeout(() => {
            obtenerDataProveedores();
        }, 800)
    }

    const limpiarData = () => {

    }



    /**
    * Informacion para la tabla
    * 
    */


    const obtenerDataProveedores = async () => {
        const data = await getData(`${urlAPI.Proveedor.url}`);
        console.log(data);
        setDataProveedores(data);
    }

    useEffect(() => {
        const columns = [
            {
                field: '_id',
                headerName: 'Id',
                flex: 0.3,
            },
            {
                field: 'abreviatura',
                headerName: 'ABREVIATURA',
                flex: 0.2,
            },
            {
                field: 'nombre',
                headerName: 'RAZON SOCIAL',
                flex: 0.2,
            },
            {
                field: 'direccion',
                headerName: 'DIRECCION',
                flex: 0.4,
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
    }, [dataProveedores])

    useEffect(() => {
        obtenerDataProveedores();
    }, [])

    return (
        <>

            <Modal
                id={'modalRegistro'}
                title={'NUEVO PROVEEDOR 🏢'}

            >

                <form onSubmit={saveProveedor} className="modal-body p-0">

                    <div className='flex'>


                        <div className='col-sm-4 mr-4 mt-5 ml-5  p-3 mb-5  rounded'>
                            {/* <img src={img_registro} /> */}

                        </div>

                        <div className='col-sm-6 mt-3 ml-4 shadow-sm p-3 mb-3  rounded'>



                            <table className='table mt-3 table-borderless  table-responsive-sm'>

                                <Label
                                    icon={''}
                                    text={"Ruc"}
                                    type={'number'}
                                    onChange={e => {
                                        setProveedor(
                                            {
                                                ...proveedor,
                                                ruc: e.target.value,
                                            }
                                        )
                                    }}
                                />

                                <Label
                                    icon={''}
                                    text={"Nombre"}
                                    onChange={e => {
                                        setProveedor(
                                            {
                                                ...proveedor,
                                                nombre: e.target.value,
                                            }
                                        )
                                    }}

                                />

                                <Label
                                    icon={''}
                                    text={"Abreviatura"}
                                    onChange={e => {
                                        setProveedor(
                                            {
                                                ...proveedor,
                                                abreviatura: e.target.value,
                                            }
                                        )
                                    }}
                                />

                                <Label
                                    icon={''}
                                    text={"Direccion"}
                                    onChange={e => {
                                        setProveedor(
                                            {
                                                ...proveedor,
                                                direccion: e.target.value,
                                            }
                                        )
                                    }}

                                />

                                <Label
                                    icon={''}
                                    text={"Telefono"}
                                    type={'number'}
                                    onChange={e => {
                                        setProveedor(
                                            {
                                                ...proveedor,
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
                title={'EDITAR EL PROVEEDOR ' + proveedor?.nombre}
            >

                <form onSubmit={updateProveedor} className="modal-body p-0">

                    <div className='flex'>


                        <div className='col-sm-4 mr-4 mt-5 ml-5  p-3 mb-5  rounded'>
                            {/* <img src={img_registro} /> */}

                        </div>

                        <div className='col-sm-6 mt-3 ml-4 shadow-sm p-3 mb-3  rounded'>



                            <table className='table mt-3 table-borderless  table-responsive-sm'>

                                <Label
                                    icon={''}
                                    text={"Ruc"}
                                    value={proveedor?.ruc}
                                    type={'number'}
                                    onChange={e => {
                                        setProveedor(
                                            {
                                                ...proveedor,
                                                ruc: e.target.value,
                                            }
                                        )
                                    }}
                                />

                                <Label
                                    icon={''}
                                    text={"Nombre"}
                                    value={proveedor?.nombre}
                                    onChange={e => {
                                        setProveedor(
                                            {
                                                ...proveedor,
                                                nombre: e.target.value,
                                            }
                                        )
                                    }}

                                />

                                <Label
                                    icon={''}
                                    text={"Abreviatura"}
                                    value={proveedor?.abreviatura}

                                    onChange={e => {
                                        setProveedor(
                                            {
                                                ...proveedor,
                                                abreviatura: e.target.value,
                                            }
                                        )
                                    }}
                                />

                                <Label
                                    icon={''}
                                    text={"Direccion"}
                                    value={proveedor?.direccion}

                                    onChange={e => {
                                        setProveedor(
                                            {
                                                ...proveedor,
                                                direccion: e.target.value,
                                            }
                                        )
                                    }}

                                />

                                <Label
                                    icon={''}
                                    text={"Telefono"}
                                    value={proveedor?.telefono}
                                    type={'number'}
                                    onChange={e => {
                                        setProveedor(
                                            {
                                                ...proveedor,
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
                <div className='flex  w-full px-4 my-2'>
                    <div
                        className='flex flex-col w-full my-2'
                    >
                        <h1 className='
                            mr-auto
                            text-2xl 
                            sm:text-2xl 
                            font-extrabold 
                            text-slate-900 
                            tracking-tight 
                        '
                        >Proveedor</h1>
                        <p className='
                            text-sm 
                            font-normal 
                            text-slate-500
                        '
                        >Mantenimiento </p>
                    </div>
                    <div class="flex flex-row-reverse">
                        <button
                            type="button"
                            className="  bg-blue-500   h-10   rounded-md  text-white   cursor-pointer  px-3  text-sm  w-px-15  w-48  mr-4  mt-2     mb-auto "
                            data-bs-toggle="modal"
                            data-bs-target="#modalRegistro"
                            onClick={() => limpiarData()}


                        >
                            Proveedor  +
                        </button>

                    </div>
                </div>
                <div className='mt-2 mx-3 card z-0 h-screen border-none col-span-12 row-span-6'>




                    <TablaDataGrid
                        columns={columnas}
                        data={dataProveedores || []}
                        loading={false}
                    />

                </div>

            </div>


        </>

    );
}

export { MantenimientoProveedor }