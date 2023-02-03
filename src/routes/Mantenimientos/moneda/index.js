import { _, Grid } from 'gridjs-react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../../auth/auth';
import { urlAPI } from '../../../config';
import { Label } from '../../../ui/forms/label';
import { Modal } from '../../../ui/modal';
import { Table } from '../../../ui/Tabla';
import { Titulo } from '../../../ui/titulos-vistas';
import { DeleteData, SaveData, UpdateData } from '../../useCRUD';
import { getData } from '../../useFetch';


function MantenimientoMoneda() {

    //Usuario autenticado ? 
    const auth = useAuth();
    const navigation = useNavigate();
    if (!auth.user) navigation('/');

    /**
    * @cliente , @setCliente maneja el estado de los clientes
    */

    const [moneda, setMoneda] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [monedas, setMonedas] = React.useState([]);


    const saveMoneda = (e) => {

        e.preventDefault();
        console.log(moneda);
        SaveData(`${urlAPI.Moneda.url}`, moneda);

        setTimeout(() => {
            obtenerDataMonedas();
        }, 800)

    }

    const updateMoneda = (e) => {
        e.preventDefault();
        console.log(moneda);
        UpdateData(`${urlAPI.Moneda.url}/${moneda._id}`, moneda)

        setTimeout(() => {
            obtenerDataMonedas();
        }, 800)

    }

    const obtenerData = (id) => {
        monedas.map(moneda => {
            if (moneda._id == id) {
                setMoneda(moneda);
            }
        })
    }

    const eliminar = (id) => {
        DeleteData(`${urlAPI.Moneda.url}/${id}`);

        setTimeout(() => {
            obtenerDataMonedas();
        }, 800)
    }

    const limpiarData = () => {
        setMoneda({
            abreviatura: "",
            created_at: "",
            estado: "",
            nombre: "",
            simbolo: "",
            updated_at: "",
            _id: "",
        })
    }
    /**
    * Informacion para la tabla
    */

    const obtenerDataMonedas = async () => {
        const data = await getData(`${urlAPI.Moneda.url}`);
        console.log(data);
        setMonedas(data);
    }

    useEffect(() => {
        obtenerDataMonedas();
    }, [])

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

                <Titulo title={'Moneda '} navegacion={' Mantenimiento'} icono={'fi fi-rr-settings'} />


                <div className='mx-3 mt-4'>


                    <Grid
                        data={monedas}
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
                                        Nueva moneda  +
                                    </button>


                                </div>),
                                columns: [
                                    { id: '_id', name: '#' },
                                    { id: 'abreviatura', name: 'ABREVIATURA' },
                                    { id: 'nombre', name: 'DESCRIPCION' },
                                    { id: 'simbolo', name: 'SIMBOLO' },
                                    { id: 'fecha_creacion', name: 'F.REGISTRO' },
                                    {
                                        id: 'acciones', name: 'ACCIONES', formatter: (cells, row) => _(
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

export { MantenimientoMoneda }