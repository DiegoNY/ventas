import { _ } from 'gridjs-react';
import React from 'react';
import { urlAPI } from '../../../config';
import { Label } from '../../../ui/forms/label';
import { Modal } from '../../../ui/modal';
import { Table } from '../../../ui/Tabla';
import { DeleteData, SaveData, UpdateData } from '../../useCRUD';
import img_1 from '../../img/mantenimiento-img/img-matenimiento-tc-3.png'
import img_2 from '../../img/mantenimiento-img/img-mantenimiento-tc.png'
import { Series } from './useSeries';

function MantenimientoTipoDocumento() {

    /**
* @cliente , @setCliente maneja el estado de los clientes
*/

    const [tipoDocumento, setTipoDocumento] = React.useState(null);

    const [loading, setLoading] = React.useState(false);


    const saveTipoDocumento = (e) => {

        e.preventDefault();

        SaveData(`${urlAPI.TipoDocumento.url}`, tipoDocumento);


    }

    const updateTipoDocumento = (e) => {
        e.preventDefault();
        console.log(tipoDocumento);
        UpdateData(`${urlAPI.TipoDocumento.url}/${tipoDocumento._id}`, tipoDocumento)


    }

    const obtenerData = (data) => {
        console.log(data);
        setTipoDocumento(data);

    }

    const eliminar = (data) => {
        console.log(data)
        DeleteData(`${urlAPI.TipoDocumento.url}/${data._id}`);

    }




    const limpiarData = () => {

    }


    /**
 * Informacion para la tabla
 */
    let ModeloTipoDocumento = data => data.map(data => [
        data._id,
        data.nombre,
        data.serie,
        data.descripcion_caja,
        data.ip_mask,
        data.direccion,
        data.max_correlativos,
        data.estado,
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
            name: '#'
        },
        {
            name: 'Descripcion'
        },
        {
            name: 'Serie'
        },
        {
            name: 'Caja'
        },
        {
            name: 'Ip Caja'
        },
        {
            name: 'Direccion Sucu'
        },
        {
            name: 'Max ( Correlativos )'
        },
        {
            name: 'Estado'
        },
        {
            name: 'Acciones',
        }
    ]


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
                                                nombre: e.target.value,
                                                serie: Series[e.target.value].serie
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
                                    <option value={'2'} >Inactivo</option>
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

            <div className='card'>

                <div className='mx-3 mt-20'>


                    <Table
                        modelo={ModeloTipoDocumento}
                        columns={columns}
                        url={`${urlAPI.TipoDocumento.url}`}

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
                                    Tipo Documento +
                                </button>


                            </div>

                        }
                    />

                </div>

            </div>


        </>

    );
}


export { MantenimientoTipoDocumento }