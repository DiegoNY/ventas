import { _ } from 'gridjs-react';
import React, { useEffect } from 'react';
import { urlAPI } from '../../../config';
import { Label } from '../../../ui/forms/label';
import { Modal } from '../../../ui/modal';
import { Table } from '../../../ui/Tabla';
import img_registro from '../../img/mantenimiento-img/img-registro-cliente.png'
import { DeleteData, SaveData, UpdateData } from '../../useCRUD';
import { getData } from '../../useFetch';
import { GeneradorCodigoBarras } from './useCodigoBarras';
import io from 'socket.io-client';
const socket = io('http://localhost:8080/');


function MantenimientoProducto() {

    /**
   * @producto , @setProducto maneja el estado de los clientes
   */

    const [producto, setProducto] = React.useState(null);
    const [laboratorios, setLaboratorios] = React.useState([]);
    const [codigoBarra, setCodigoBarra] = React.useState('');

    const [codigosBarras, setCodigosBarras] = React.useState([{ id: "", numero: '00008' }]);
    const [loading, setLoading] = React.useState(false);

    const saveProducto = (e) => {

        e.preventDefault();

        SaveData(`${urlAPI.Producto.url}`, producto);


    }

    const updateProducto = (e) => {
        e.preventDefault();
        console.log(producto);
        UpdateData(`${urlAPI.Producto.url}/${producto._id}`, producto)

    }

    const obtenerData = (data) => {

        setProducto(data);

    }

    const eliminar = (data) => {
        console.log(data)
        DeleteData(`${urlAPI.Producto.url}/${data._id}`);

    }

    const limpiarData = () => {

    }
    /**
     * Recibe los codigos de barra existentes obtiene 
     * el ultimo codigo de barras y aumenta el codigo en 1
     * @param {*} codigoBarras debe ser un array de objetos y debe contener propiedad numero
     * ejemplo [ {id:"ejemplo_id", numero:"1234" } ]
     */
    const obtenerCodigosBarras = (codigoBarra) => {

        console.log(codigoBarra);

        let ultimoCodigoBarra = codigosBarras[codigoBarra.length - 1];
        console.log(ultimoCodigoBarra);

        const codigo = GeneradorCodigoBarras(ultimoCodigoBarra.numero);

        setCodigoBarra(codigo);

    }

    // Informacion adicional para el formulario

    useEffect(() => {

        const laboratorios = async () => {

            const data = await getData(`${urlAPI.Laboratorio.url}`);
            setLaboratorios(data);
        }

        laboratorios();

    }, [])

    const codigo = () => {
        const dataCodigosBarra = async () => {
            const data = await getData(`${urlAPI.CodigoBarras.url}`)
            setCodigosBarras(data);

        }

        dataCodigosBarra();
    }

    useEffect(() => {
        
        obtenerCodigosBarras(codigosBarras);
        console.log(codigosBarras);

    }, [codigosBarras])

    console.log(codigosBarras);









    /**
    * Informacion para la tabla
    * 
    * @const columns son las columnas que contendra tu tabla
    * @ModeloProducto Modelo de la data que se mostrara
    * 
    */

    let ModeloProducto = data => data.map(data => [
        data._id,
        data.codigo_barras,
        data.descripcion,
        data.fecha_registro,
        data.stock,
        data.precio_venta,
        data.tipo,
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
            id: '_id',
            name: '#'
        },
        {
            id: 'descripcion',
            name: 'Cod. Barras'
        },
        {
            name: 'descripcion'
        },
        {
            name: 'Fec. Registro'
        },
        {
            name: 'Stock'
        },
        {
            name: 'P.Venta'
        },
        {
            name: 'Tipo'
        },
        {
            name: 'Estado'
        }
    ]

    return (
        <>

            <div className='card'>

                <Modal
                    id={'modalRegistro'}
                    title={'NUEVO PRODUCTO 🛒'}

                >

                    <form onSubmit={saveProducto} className="modal-body p-0">

                        <div className='flex'>


                            <div className='col-sm-5 mt-3 ml-4 shadow-sm p-3 mb-3  rounded'>
                                {/* <img src={img_registro} /> */}
                                <table className='table mt-3 table-borderless  table-responsive-sm'>
                                    {loading && <p>OBteniendo codigo</p> || <tr>
                                        <td className='font-sans'>

                                            <span>
                                                <i class="fi fi-rr-user"></i>
                                            </span>

                                            Cod.Producto

                                        </td>
                                        <td className='font-mono'>

                                            <input
                                                placeholder=' Codigo Producto '
                                                className='
                                                    input-form
                                                    form-control 
                                                    form-control-sm
                                                    shadow-sm p-2  
                                                    rounded
                                                '
                                                value={codigoBarra}


                                            />

                                        </td>

                                    </tr>}

                                    <tr>
                                        <td className='font-sans'>

                                            <span>
                                                <i class="fi fi-rr-user"></i>
                                            </span>

                                            Descripción

                                        </td>
                                        <td className='font-mono'>

                                            <input
                                                placeholder=' Descripción '
                                                className='
                                                    input-form
                                                    form-control 
                                                    form-control-sm
                                                    shadow-sm p-2  
                                                    rounded
                                                '

                                                onChange={e => {
                                                    setProducto(
                                                        {
                                                            ...producto,
                                                            descripcion: e.target.value,
                                                        }
                                                    )
                                                }}
                                            />

                                        </td>

                                    </tr>

                                    <Label
                                        icon={'fi fi-rr-user'}
                                        text={"Laboratorio"}
                                        value={producto?.id_laboratorio}
                                        select={true}
                                        onChange={e => {

                                            setProducto(
                                                {
                                                    ...producto,
                                                    id_laboratorio: e.target.value,
                                                }
                                            )
                                        }}
                                    >

                                        {
                                            laboratorios.map(data => {

                                                return (<option value={data.abreviatura + '-' + data.nombre}>{data.abreviatura + '-' + data.nombre}</option>)


                                            })
                                        }

                                    </Label>

                                    <Label
                                        icon={'fi fi-rr-user'}
                                        text={"Tipo"}
                                        value={producto?.tipo}
                                        select={true}
                                        onChange={e => {

                                            setProducto(
                                                {
                                                    ...producto,
                                                    tipo: e.target.value,
                                                }
                                            )
                                        }}
                                    >
                                        <option>Generico</option>
                                        <option>No Generico</option>

                                    </Label>

                                    <tr>
                                        <td className='font-sans'>

                                            <span>
                                                <i class="fi fi-rr-user"></i>
                                            </span>

                                            Stock

                                        </td>
                                        <td className='font-mono'>

                                            <input
                                                placeholder='Stock'
                                                className='
                                                input-form
                                                form-control 
                                                form-control-sm
                                                shadow-sm p-2  
                                                rounded
                                                '
                                                type={'number'}
                                                onChange={e => {
                                                    setProducto(
                                                        {
                                                            ...producto,
                                                            stock: e.target.value,
                                                        }
                                                    )
                                                }}
                                            />

                                        </td>

                                    </tr>

                                    <tr>
                                        <td className='font-sans'>

                                            <span>
                                                <i class="fi fi-rr-user"></i>
                                            </span>

                                            Stock Minimo

                                        </td>
                                        <td className='font-mono'>

                                            <input
                                                placeholder='Stock minimo'
                                                className='
                                                input-form
                                                form-control 
                                                form-control-sm
                                                shadow-sm p-2  
                                                rounded
                                                '
                                                type={'number'}
                                                onChange={e => {
                                                    setProducto(
                                                        {
                                                            ...producto,
                                                            stock_minimo: e.target.value,
                                                        }
                                                    )
                                                }}
                                            />

                                        </td>

                                    </tr>





                                </table>
                            </div>

                            <div className='col-sm-5 mt-3 ml-4 shadow-sm p-3 mb-3  rounded'>



                                <table className='table mt-3 table-borderless  table-responsive-sm'>

                                    <Label
                                        icon={'fi fi-rr-user'}
                                        text={"Precio.Compra"}
                                        type={'number'}
                                        onChange={e => {
                                            setProducto(
                                                {
                                                    ...producto,
                                                    precio_compra: e.target.value,
                                                }
                                            )
                                        }}
                                    />

                                    <Label
                                        icon={'fi fi-rr-user'}
                                        text={"Precio venta"}
                                        type={"number"}
                                        onChange={e => {
                                            setProducto(
                                                {
                                                    ...producto,
                                                    precio_venta: e.target.value,
                                                }
                                            )
                                        }}

                                    />

                                    <Label
                                        icon={'fi fi-rr-user'}
                                        text={"Descuento"}
                                        type={'number'}
                                        onChange={e => {
                                            setProducto(
                                                {
                                                    ...producto,
                                                    descuento: e.target.value,
                                                }
                                            )
                                        }}
                                    />

                                    <Label
                                        icon={'fi fi-rr-user'}
                                        text={"Venta sujeta"}
                                        select={true}
                                        onChange={e => {
                                            setProducto(
                                                {
                                                    ...producto,
                                                    venta_sujeta: e.target.value,
                                                }
                                            )
                                        }}

                                    >
                                        <option>Con receta medica</option>
                                        <option>Sin receta medica</option>

                                    </Label>

                                    <Label
                                        icon={'fi fi-rr-user'}
                                        text={"Estado"}
                                        select={true}
                                        onChange={e => {
                                            setProducto(
                                                {
                                                    ...producto,
                                                    estado: e.target.value,
                                                }
                                            )
                                        }}
                                    >
                                        <option value={'1'}> Activo </option>
                                        <option value={'0'}> Inactivo </option>

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

                {/**Modal de editar */}
                <Modal
                    id={'modalEditar'}
                    title={'EDITAR EL PRODUCTO ' + producto?.descripcion}
                >

                    <form onSubmit={updateProducto} className="modal-body p-0">

                        <div className='flex'>


                            <div className='col-sm-5 mt-3 ml-4 shadow-sm p-3 mb-3  rounded'>
                                {/* <img src={img_registro} /> */}
                                <table className='table mt-3 table-borderless  table-responsive-sm'>

                                    <tr>
                                        <td className='font-sans'>

                                            <span>
                                                <i class="fi fi-rr-user"></i>
                                            </span>

                                            Cod.Producto

                                        </td>
                                        <td className='font-mono'>

                                            <input
                                                placeholder=' Codigo Producto '
                                                className='
                                                    input-form
                                                    form-control 
                                                    form-control-sm
                                                    shadow-sm p-2  
                                                    rounded
                                                '
                                                value={producto?.codigo_barras}

                                            />

                                        </td>

                                    </tr>
                                    <tr>
                                        <td className='font-sans'>

                                            <span>
                                                <i class="fi fi-rr-user"></i>
                                            </span>

                                            Descripción

                                        </td>
                                        <td className='font-mono'>

                                            <input
                                                placeholder=' Descripción '
                                                className='
                                                    input-form
                                                    form-control 
                                                    form-control-sm
                                                    shadow-sm p-2  
                                                    rounded
                                                '
                                                value={producto?.descripcion}

                                                onChange={e => {
                                                    setProducto(
                                                        {
                                                            ...producto,
                                                            descripcion: e.target.value,
                                                        }
                                                    )
                                                }}
                                            />

                                        </td>

                                    </tr>
                                    <Label
                                        icon={'fi fi-rr-user'}
                                        text={"Laboratorio"}
                                        value={producto?.id_laboratorio}
                                        select={true}
                                        onChange={e => {

                                            setProducto(
                                                {
                                                    ...producto,
                                                    id_laboratorio: e.target.value,
                                                }
                                            )
                                        }}
                                    >

                                        {
                                            laboratorios.map(data => {

                                                return (<option value={data.abreviatura + '-' + data.nombre}>{data.abreviatura + '-' + data.nombre}</option>)


                                            })
                                        }

                                    </Label>

                                    <Label
                                        icon={'fi fi-rr-user'}
                                        text={"Tipo"}
                                        value={producto?.tipo}
                                        select={true}
                                        onChange={e => {

                                            setProducto(
                                                {
                                                    ...producto,
                                                    tipo: e.target.value,
                                                }
                                            )
                                        }}
                                    >
                                        <option>Generico</option>
                                        <option>No Generico</option>

                                    </Label>
                                    <tr>
                                        <td className='font-sans'>

                                            <span>
                                                <i class="fi fi-rr-user"></i>
                                            </span>

                                            Stock

                                        </td>
                                        <td className='font-mono'>

                                            <input
                                                placeholder='Stock'
                                                className='
                                                    input-form
                                                    form-control 
                                                    form-control-sm
                                                    shadow-sm p-2  
                                                    rounded
                                                '
                                                type={'number'}
                                                value={producto?.stock}
                                                onChange={e => {
                                                    setProducto(
                                                        {
                                                            ...producto,
                                                            stock: e.target.value,
                                                        }
                                                    )
                                                }}
                                            />

                                        </td>

                                    </tr>

                                    <tr>
                                        <td className='font-sans'>

                                            <span>
                                                <i class="fi fi-rr-user"></i>
                                            </span>

                                            Stock Minimo

                                        </td>
                                        <td className='font-mono'>

                                            <input
                                                placeholder='Stock minimo'
                                                className='
                                                    input-form
                                                    form-control 
                                                    form-control-sm
                                                    shadow-sm p-2  
                                                    rounded
                                                '
                                                type={'number'}
                                                value={producto?.stock_minimo}
                                                onChange={e => {
                                                    setProducto(
                                                        {
                                                            ...producto,
                                                            stock_minimo: e.target.value,
                                                        }
                                                    )
                                                }}
                                            />

                                        </td>

                                    </tr>





                                </table>
                            </div>

                            <div className='col-sm-5 mt-3 ml-4 shadow-sm p-3 mb-3  rounded'>



                                <table className='table mt-3 table-borderless  table-responsive-sm'>

                                    <Label
                                        icon={'fi fi-rr-user'}
                                        text={"Precio.Compra"}
                                        value={producto?.precio_compra}
                                        type={'number'}
                                        onChange={e => {
                                            setProducto(
                                                {
                                                    ...producto,
                                                    precio_compra: e.target.value,
                                                }
                                            )
                                        }}
                                    />

                                    <Label
                                        icon={'fi fi-rr-user'}
                                        text={"Precio venta"}
                                        type={'number'}
                                        value={producto?.precio_venta}
                                        onChange={e => {
                                            setProducto(
                                                {
                                                    ...producto,
                                                    precio_venta: e.target.value,
                                                }
                                            )
                                        }}

                                    />

                                    <Label
                                        icon={'fi fi-rr-user'}
                                        text={"Descuento"}
                                        type={"number"}
                                        value={producto?.descuento}
                                        onChange={e => {
                                            setProducto(
                                                {
                                                    ...producto,
                                                    descuento: e.target.value,
                                                }
                                            )
                                        }}
                                    />

                                    <Label
                                        icon={'fi fi-rr-user'}
                                        text={"Venta sujeta"}
                                        select={true}
                                        onChange={e => {
                                            setProducto(
                                                {
                                                    ...producto,
                                                    venta_sujeta: e.target.value,
                                                }
                                            )
                                        }}

                                    >
                                        <option>Con receta medica</option>
                                        <option>Sin receta medica</option>

                                    </Label>

                                    <Label
                                        icon={'fi fi-rr-user'}
                                        text={"Estado"}
                                        select={true}
                                        value={producto?.estado}
                                        onChange={e => {
                                            setProducto(
                                                {
                                                    ...producto,
                                                    estado: e.target.value,
                                                }
                                            )
                                        }}
                                    >
                                        <option value={'1'}> Activo </option>
                                        <option value={'0'}> Inactivo </option>

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

                <div className='mx-3 mt-20'>

                    <Table
                        modelo={ModeloProducto}
                        columns={columns}
                        url={`${urlAPI.Producto.url}`}

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
                                    onClick={() => {
                                        limpiarData();
                                        codigo()

                                    }
                                    }


                                >
                                    Producto +
                                </button>


                            </div>

                        }
                    />


                </div>

            </div>


        </>

    );
}

export { MantenimientoProducto }