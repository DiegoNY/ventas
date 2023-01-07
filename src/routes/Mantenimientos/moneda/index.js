import { _ } from 'gridjs-react';
import React from 'react';
import { urlAPI } from '../../../config';
import { Label } from '../../../ui/forms/label';
import { Modal } from '../../../ui/modal';
import { Table } from '../../../ui/Tabla';
import { DeleteData, SaveData, UpdateData } from '../../useCRUD';
import { updateData } from '../../useFetch';


function MantenimientoMoneda() {

    /**
  * @cliente , @setCliente maneja el estado de los clientes
  */

    const [moneda, setMoneda] = React.useState(null);

    const [loading, setLoading] = React.useState(false);


    const saveMoneda = (e) => {

        e.preventDefault();

        console.log(moneda);

        SaveData(`${urlAPI.Moneda.url}`, moneda);


    }

    const updateMoneda = (e) => {
        e.preventDefault();
        console.log(moneda);
        UpdateData(`${urlAPI.Moneda.url}/${moneda._id}`, moneda)


    }

    const obtenerData = (data) => {
        console.log(data);
        setMoneda(data);

    }

    const eliminar = (data) => {
        console.log(data)
        DeleteData(`${urlAPI.Moneda.url}/${data._id}`);

    }




    const limpiarData = () => {

    }
    /**
 * Informacion para la tabla
 */
    let ModeloCliente = data => data.map(data => [
        data._id,
        data.nombre,
        data.abreviatura,
        data.simbolo,
        data.fecha_registro,
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

    return (
        <>

            <Modal
                id={'modalRegistro'}
                title={'NUEVA MONEDA 💱'}
            >

                <form onSubmit={saveMoneda} className="modal-body p-0">

                    <div className='flex'>


                        <div className='col-sm-4 mr-4 mt-5 ml-5  p-3 mb-5  rounded'>
                            {/* <img src={img_registro} /> */}

                        </div>

                        <div className='col-sm-6 mt-3 ml-4 shadow-sm p-3 mb-3  rounded'>



                            <table className='table mt-3 table-borderless  table-responsive-sm'>

                                <Label
                                    icon={'fi fi-rr-user'}
                                    text={"Nombre"}
                                    onChange={e => {
                                        setMoneda(
                                            {
                                                ...moneda,
                                                nombre: e.target.value,
                                            }
                                        )
                                    }}
                                />

                                <Label
                                    icon={'fi fi-rr-user'}
                                    text={"Abreviatura"}
                                    onChange={e => {
                                        setMoneda(
                                            {
                                                ...moneda,
                                                abreviatura: e.target.value,
                                            }
                                        )
                                    }}

                                />

                                <Label
                                    icon={'fi fi-rr-user'}
                                    text={"simbolo"}
                                    onChange={e => {
                                        setMoneda(
                                            {
                                                ...moneda,
                                                simbolo: e.target.value,
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
                title={'EDITAR LA MONEDA ' + moneda?.nombre}
            >

                <form onSubmit={updateMoneda} className="modal-body p-0">

                    <div className='flex'>


                        <div className='col-sm-4 mr-4 mt-5 ml-5  p-3 mb-5  rounded'>
                            {/* <img src={img_registro} /> */}

                        </div>

                        <div className='col-sm-6 mt-3 ml-4 shadow-sm p-3 mb-3  rounded'>



                            <table className='table mt-3 table-borderless  table-responsive-sm'>

                                <Label
                                    icon={'fi fi-rr-user'}
                                    text={"Nombre"}
                                    value={moneda?.nombre}
                                    onChange={e => {
                                        setMoneda(
                                            {
                                                ...moneda,
                                                nombre: e.target.value,
                                            }
                                        )
                                    }}
                                />

                                <Label
                                    icon={'fi fi-rr-user'}
                                    text={"Abreviatura"}
                                    value={moneda?.abreviatura}
                                    onChange={e => {
                                        setMoneda(
                                            {
                                                ...moneda,
                                                abreviatura: e.target.value,
                                            }
                                        )
                                    }}

                                />

                                <Label
                                    icon={'fi fi-rr-user'}
                                    text={"simbolo"}
                                    value={moneda?.simbolo}
                                    onChange={e => {
                                        setMoneda(
                                            {
                                                ...moneda,
                                                simbolo: e.target.value,
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
                        modelo={ModeloCliente}
                        columns={columns}
                        url={`${urlAPI.Moneda.url}`}

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
                                    Moneda +
                                </button>

                            </div>

                        }
                    />

                </div>

            </div>

        </>

    );
}

export { MantenimientoMoneda }