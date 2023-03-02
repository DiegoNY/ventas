import { _, Grid } from 'gridjs-react';
import React, { useEffect, useState } from 'react';
import { urlAPI } from '../../../config';
import { Label } from '../../../ui/forms/label';
import { Modal } from '../../../ui/modal';
import { Table } from '../../../ui/Tabla';
import { DeleteData, SaveData, UpdateData } from '../../useCRUD';
import img_1 from '../../img/mantenimiento-img/img-matenimiento-tc-3.png'
import img_2 from '../../img/mantenimiento-img/img-mantenimiento-tc.png'
import { Series } from './useSeries';
import { getData } from '../../useFetch';
import { Titulo } from '../../../ui/titulos-vistas';
import { useAuth } from '../../../auth/auth';
import { useNavigate } from 'react-router';
import { TablaDataGrid } from '../../../ui/Tabla/DataGrid';

function MantenimientoTipoDocumento() {
    //Usuario autenticado ? 
    const auth = useAuth();
    const navigation = useNavigate();
    if (!auth.user) navigation('/');

    /**
    * @cliente , @setCliente maneja el estado de los clientes
    */

    const [tipoDocumento, setTipoDocumento] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [dataTipoDocumento, setDataTipoDocument] = React.useState([]);

    const [load, setLoad] = useState(false);
    const [columnas, setColumnas] = useState([])

    const saveTipoDocumento = (e) => {

        e.preventDefault();

        SaveData(`${urlAPI.TipoDocumento.url}`, tipoDocumento);

        setTimeout(() => {
            dataDeTipoDocumentos();
        }, 800)

    }

    const updateTipoDocumento = (e) => {
        e.preventDefault();
        console.log(tipoDocumento);
        UpdateData(`${urlAPI.TipoDocumento.url}/${tipoDocumento._id}`, tipoDocumento)

        setTimeout(() => {
            dataDeTipoDocumentos();
        }, 800)
    }

    const obtenerData = (id) => {

        dataTipoDocumento.map(tipoDocumentoEncontrado => {
            if (tipoDocumentoEncontrado._id == id) {
                setTipoDocumento(tipoDocumentoEncontrado);
            }
        })


    }

    const eliminar = (id) => {

        DeleteData(`${urlAPI.TipoDocumento.url}/${id}`);

        setTimeout(() => {
            dataDeTipoDocumentos();
        }, 800)

    }




    const limpiarData = () => {

        setTipoDocumento({
            created_at: "",
            descripcion_caja: "",
            estado: "",
            estatus: "",
            ip_mask: "",
            nombre: "",
            serie: "",
            updated_at: "",
            _id: "",
        })

    }


    /**
    * Informacion para la tabla
    */


    const dataDeTipoDocumentos = async () => {
        const data = await getData(`${urlAPI.TipoDocumento.url}`);
        console.log(data);
        setDataTipoDocument(data);

    }


    useEffect(() => {
        const columns = [
            {
                field: '_id',
                headerName: 'Id',
                flex: 0.3,
            },
            {
                field: 'descripcion_caja',
                headerName: 'ABREVIATURA',
                flex: 0.3,
                renderCell: (params) => {
                    return <div className='w-full text-center'>{params.row.descripcion_caja}</div>
                }
            },
            {
                field: 'serie',
                headerName: 'SERIE',
                flex: 0.2,
                renderCell: (params) => {
                    return <div className='w-full text-center'>{params.row.serie}</div>
                }
            },
            {
                field: 'ip_mask',
                headerName: 'IP MASK',
                flex: 0.2,
            },
            {
                field: 'direccion',
                headerName: 'DIRECCION',
                flex: 0.3,
            },
            {
                field: 'max_correlativo',
                headerName: 'MAX CORRELATIVO',
                flex: 0.2,
            },
            {
                field: 'estado',
                headerName: 'ESTADO',
                flex: 0.2,
                renderCell: (params) => {
                    let estadoInfo = {
                        borde: 'border-red-400', text: 'text-red-400', texto: 'Inactivo',
                        icono: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                    }

                    if (params.row.estado === 1) {
                        estadoInfo = {
                            borde: 'border-green-600', text: 'text-green-600', texto: 'Activo',
                            icono: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>

                        }
                    }


                    return (
                        <div className='w-full  px-4'>
                            <div className={`border-y border-x text-xs text-center px-1  rounded-xl ${estadoInfo.borde} ${estadoInfo.text} flex justify-between mx-1`}>
                                <div className='mt-0.5'>
                                    {estadoInfo.icono}
                                </div>
                                <div className='mt-0.5 mr-1'>
                                    {estadoInfo.texto}
                                </div>
                            </div>
                        </div>
                    )
                }
            },
            {
                field: '',
                headerName: 'ACCIONES',
                flex: 0.105,
                renderCell: (params) => {
                    return (
                        <div className='w-full flex justify-between '>
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
    }, [dataTipoDocumento])

    useEffect(() => {
        dataDeTipoDocumentos();
    }, [])

    return (
        <>

            <Modal
                id={'modalRegistro'}
                title={'Nuevo Tipo de Documento 📃'}

            >

                <form onSubmit={saveTipoDocumento} className="modal-body p-0">

                    <div className='flex'>


                        <div className='col-sm-4 mr-4 mt-1 ml-5  p-3 mb-1 rounded'>
                            <img src={img_1} />

                        </div>

                        <div className='col-sm-6 mt-3 ml-4 shadow-sm p-3 mb-3  rounded'>



                            <table className='table mt-3 table-borderless  table-responsive-sm'>

                                <Label
                                    icon={'fi fi-rr-user'}
                                    text={"Selecciona.Tipo"}
                                    select={true}
                                    onChange={e => {

                                        setTipoDocumento(
                                            {
                                                ...tipoDocumento,
                                                tipo: Series[e.target.value].tipo,
                                                nombre: e.target.value,
                                                serie: Series[e.target.value].serie,
                                            }
                                        )
                                    }}
                                >

                                    <option value={'FACTURA ELECTRONICA'}>FACTURA ELECTRONICA</option>
                                    <option value={'TICKET ELECTRONICO'}>TICKET ELECTRONIC0</option>
                                    <option value={'BOLETA ELECTRONICA'}>BOLETA ELECTRONICA</option>

                                </Label>



                                <Label
                                    icon={'fi fi-rr-user'}
                                    text={"Serie"}
                                    value={tipoDocumento?.serie}
                                    onChange={e => {
                                        setTipoDocumento(
                                            {
                                                ...tipoDocumento,
                                                serie: e.target.value,
                                            }
                                        )
                                    }}

                                />

                                <Label
                                    icon={'fi fi-rr-user'}
                                    text={"Descripcion Caja"}
                                    onChange={e => {
                                        setTipoDocumento(
                                            {
                                                ...tipoDocumento,
                                                descripcion_caja: e.target.value,
                                            }
                                        )
                                    }}
                                />

                                <Label
                                    icon={'fi fi-rr-user'}
                                    text={"IP Mask"}
                                    onChange={e => {
                                        setTipoDocumento(
                                            {
                                                ...tipoDocumento,
                                                ip_mask: e.target.value,
                                            }
                                        )
                                    }}

                                />

                                <Label
                                    icon={'fi fi-rr-user'}
                                    text={"Selecciona.Estado"}
                                    select={true}
                                    onChange={e => {
                                        setTipoDocumento(
                                            {
                                                ...tipoDocumento,
                                                estado: e.target.value,
                                            }
                                        )
                                    }}
                                >
                                    <option value={''} >SELECCIONA</option>
                                    <option value={'1'} >Activo</option>
                                    <option value={'0'} >Inactivo</option>
                                </Label>


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
                title={'EDITAR SERIE ' + tipoDocumento?.descripcion_caja}
            >

                <form onSubmit={updateTipoDocumento} className="modal-body p-0">

                    <div className='flex'>


                        <div className='col-sm-4 mr-4 mt-1 ml-5  p-3 mb-1 rounded'>
                            <img src={img_2} />

                        </div>

                        <div className='col-sm-6 mt-3 ml-4 shadow-sm p-3 mb-3  rounded'>



                            <table className='table mt-3 table-borderless  table-responsive-sm'>

                                <Label
                                    icon={'fi fi-rr-user'}
                                    text={"Selecciona.Tipo"}
                                    value={tipoDocumento?.nombre}
                                    select={true}
                                    onChange={e => {

                                        setTipoDocumento(
                                            {
                                                ...tipoDocumento,
                                                nombre: e.target.value,
                                                tipo: Series[e.target.value].tipo
                                            }
                                        )
                                    }}
                                >

                                    <option value={'FACTURA ELECTRONICA'}>FACTURA ELECTRONICA</option>
                                    <option value={'TICKET ELECTRONICO'}>TICKET ELECTRONIC0</option>
                                    <option value={'BOLETA ELECTRONICA'}>BOLETA ELECTRONICA</option>

                                </Label>

                                <Label
                                    icon={'fi fi-rr-user'}
                                    text={"Serie"}
                                    value={tipoDocumento?.serie}

                                />


                                <Label
                                    icon={'fi fi-rr-user'}
                                    text={"Descripcion Caja"}
                                    value={tipoDocumento?.descripcion_caja}

                                    onChange={e => {
                                        setTipoDocumento(
                                            {
                                                ...tipoDocumento,
                                                descripcion_caja: e.target.value,
                                            }
                                        )
                                    }}
                                />

                                <Label
                                    icon={'fi fi-rr-user'}
                                    text={"IP Mask"}
                                    value={tipoDocumento?.ip_mask}

                                    onChange={e => {
                                        setTipoDocumento(
                                            {
                                                ...tipoDocumento,
                                                ip_mask: e.target.value,
                                            }
                                        )
                                    }}

                                />

                                <Label
                                    icon={'fi fi-rr-user'}
                                    text={"Selecciona.Estado"}
                                    select={true}
                                    value={tipoDocumento?.estado}
                                    onChange={e => {
                                        setTipoDocumento(
                                            {
                                                ...tipoDocumento,
                                                estado: e.target.value,
                                            }
                                        )
                                    }}
                                >

                                    <option value={'1'} >Activo</option>
                                    <option value={'0'} >Inactivo</option>

                                </Label>


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


            <div className=''>
                <div className='flex justify-between'>
                    <Titulo title={'Tipo de documento '} navegacion={' Mantenimiento'} icono={'fi fi-rr-settings'} />
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
                            Tipo Documento  +
                        </button>


                    </div>
                </div>

                <div className='mx-3 mt-4 h-screen card border-none'>

                    <TablaDataGrid
                        columns={columnas}
                        data={dataTipoDocumento || []}
                        loading={false}
                        pageSize={16}
                    />

                </div>

            </div>


        </>

    );
}


export { MantenimientoTipoDocumento }