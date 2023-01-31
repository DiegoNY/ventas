import { _, Grid } from 'gridjs-react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../../auth/auth';
import { urlAPI } from '../../../config';
import { Label } from '../../../ui/forms/label';
import { Modal } from '../../../ui/modal';
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

                <Titulo title={'Proveedor '} navegacion={' Mantenimiento'} icono={'fi fi-rr-settings '} />

                <div className='mx-3 mt-4'>




                    <Grid
                        data={dataProveedores}
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
                                        Proveedor  +
                                    </button>


                                </div>),
                                columns: [
                                    { id: '_id', name: '#' },
                                    { id: 'abreviatura', name: 'Abreviatura' },
                                    { id: 'direccion', name: 'Direccion' },
                                    { id: 'telefono', name: 'Telefono' },
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
                                th: 'bg-orange-500',
                                table: 'w-100',
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

export { MantenimientoProveedor }