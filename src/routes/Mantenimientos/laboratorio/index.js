import { _ } from 'gridjs-react';
import React from 'react';
import { urlAPI } from '../../../config';
import { Label } from '../../../ui/forms/label';
import { Modal } from '../../../ui/modal';
import { Table } from '../../../ui/Tabla';
import { DeleteData, SaveData, UpdateData } from '../../useCRUD';
import img1_1 from '../../img/mantenimiento-img/editarLaboratorio2.png'
import img1_2 from '../../img/mantenimiento-img/editarLaboratorio3.png'

function MantenimientoLaboratorio() {

    /**
  * @cliente , @setCliente maneja el estado de los clientes
  */

    const [laboratorio, setLaboratorio] = React.useState(null);

    const [loading, setLoading] = React.useState(false);


    const saveLaboratorio = (e) => {

        e.preventDefault();

        SaveData(`${urlAPI.Laboratorio.url}`, laboratorio);


    }

    const updateLaboratorio = (e) => {
        e.preventDefault();
        console.log(laboratorio);
        UpdateData(`${urlAPI.Laboratorio.url}/${laboratorio._id}`, laboratorio)


    }

    const obtenerData = (data) => {
        console.log(data);
        setLaboratorio(data);

    }

    const eliminar = (data) => {
        console.log(data)
        DeleteData(`${urlAPI.Laboratorio.url}/${data._id}`);

    }




    const limpiarData = () => {

    }

    /**
 * Informacion para la tabla
 */
    let ModeloLaboratorio = data => data.map(data => [
        data.abreviatura,
        data.nombre,
        data.direccion,
        data.telefono,
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
            name: 'Abreviatura'
        },
        {
            name: 'Direccion'
        },
        {
            name: 'Telefono'
        },
        {
            name: 'Acciones',
        }
    ]

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

                <div className='mx-3 mt-20'>


                    <Table
                        modelo={ModeloLaboratorio}
                        columns={columns}
                        url={`${urlAPI.Laboratorio.url}`}

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
                                    Laboratorio Proveedor  +
                                </button>


                            </div>

                        }
                    />

                </div>

            </div>


        </>

    );
}

export { MantenimientoLaboratorio }