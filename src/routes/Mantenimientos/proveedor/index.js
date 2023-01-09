import { _ } from 'gridjs-react';
import React from 'react';
import { urlAPI } from '../../../config';
import { Label } from '../../../ui/forms/label';
import { Modal } from '../../../ui/modal';
import { Table } from '../../../ui/Tabla';
import { DeleteData, SaveData, UpdateData } from '../../useCRUD';


function MantenimientoProveedor() {

    /**
   * @cliente , @setCliente maneja el estado de los clientes
   */

    const [proveedor, setProveedor] = React.useState(null);

    const [loading, setLoading] = React.useState(false);


    const saveProveedor = (e) => {

        e.preventDefault();

        SaveData(`${urlAPI.Proveedor.url}`, proveedor);


    }

    const updateProveedor = (e) => {
        e.preventDefault();
        console.log(proveedor);
        UpdateData(`${urlAPI.Proveedor.url}/${proveedor._id}`, proveedor)


    }

    const obtenerData = (data) => {
        console.log(data);
        setProveedor(data);

    }

    const eliminar = (data) => {
        console.log(data)
        DeleteData(`${urlAPI.Proveedor.url}/${data._id}`);

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
    let Proveedor = data => data.map(data => [
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
                                    icon={'fi fi-rr-user'}
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
                                    icon={'fi fi-rr-user'}
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
                                    icon={'fi fi-rr-user'}
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
                                    icon={'fi fi-rr-user'}
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
                                    icon={'fi fi-rr-user'}
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
                title={'EDITAR EL PRODUCTO ' + proveedor?.nombre}
            >

                <form onSubmit={updateProveedor} className="modal-body p-0">

                    <div className='flex'>


                        <div className='col-sm-4 mr-4 mt-5 ml-5  p-3 mb-5  rounded'>
                            {/* <img src={img_registro} /> */}

                        </div>

                        <div className='col-sm-6 mt-3 ml-4 shadow-sm p-3 mb-3  rounded'>



                            <table className='table mt-3 table-borderless  table-responsive-sm'>

                                <Label
                                    icon={'fi fi-rr-user'}
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
                                    icon={'fi fi-rr-user'}
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
                                    icon={'fi fi-rr-user'}
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
                                    icon={'fi fi-rr-user'}
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
                                    icon={'fi fi-rr-user'}
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

                <div className='mx-3 mt-20'>


                    <Table
                        modelo={Proveedor}
                        columns={columns}
                        url={`${urlAPI.Proveedor.url}`}

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
                                    Proveedor +
                                </button>


                            </div>

                        }
                    />

                </div>

            </div>


        </>

    );
}

export { MantenimientoProveedor }