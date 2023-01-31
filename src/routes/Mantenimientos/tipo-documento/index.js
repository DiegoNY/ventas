import { _, Grid } from 'gridjs-react';
import React, { useEffect } from 'react';
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

                <Titulo title={'Tipo de documento '} navegacion={' Mantenimiento'} icono={'fi fi-rr-settings'} />

                <div className='mx-3 mt-4 card border-none'>


                    <Grid
                        data={dataTipoDocumento}
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
                                        Tipo Documento  +
                                    </button>


                                </div>),
                                columns: [
                                    { id: '_id', name: '#' },
                                    { id: 'descripcion_caja', name: 'ABREVIATURA' },
                                    { id: 'serie', name: 'SERIE' },
                                    { id: 'ip_mask', name: 'IP MASK' },
                                    { id: 'direccion', name: 'DIRECCION' },
                                    { id: 'max_correlativo', name: 'MAX ( correlativo )' },
                                    {
                                        id: 'estado', name: 'ESTADO', formatter: (cell) => {
                                            if (cell == 1)
                                                return _(<i className='badge bg-yellow w-14'>Activo</i>)

                                            if (cell == 0)
                                                return _(<i className='badge bg-orange-500'>Inactivo</i>)

                                        }
                                    },
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
                                table: 'w-100 z-20 ',
                                header: ''

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


export { MantenimientoTipoDocumento }