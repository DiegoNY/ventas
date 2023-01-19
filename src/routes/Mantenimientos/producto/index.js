import { _, Grid } from 'gridjs-react';
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
import { Titulo } from '../../../ui/titulos-vistas';
const socket = io('http://192.168.1.43:8080/');

function MantenimientoProducto() {

    /**
   * @producto , @setProducto maneja el estado de los clientes
   */

    const [producto, setProducto] = React.useState(null);
    const [laboratorios, setLaboratorios] = React.useState([]);
    const [codigoBarra, setCodigoBarra] = React.useState('');
    const [productos, setProductos] = React.useState([]);
    const [codigosBarras, setCodigosBarras] = React.useState([{ id: "", numero: '00008' }]);
    const [loading, setLoading] = React.useState(false);

    const saveProducto = async (e) => {

        e.preventDefault();

        let formData = new FormData();

        for (const key in producto) {
            formData.append(key, producto[key]);
        }

        SaveData(`${urlAPI.Producto.url}`, formData, true);

        SaveData(`${urlAPI.CodigoBarras.url}`, { numero: producto.codigo_barras });

        //Obtiene codigo de barra  / se limpian los labels
        codigo();
        limpiarData();

        setTimeout(() => {
            obtenerDataProductos();
        }, 800)

    }

    const updateProducto = (e) => {
        e.preventDefault();
        console.log(producto);
        UpdateData(`${urlAPI.Producto.url}/${producto._id}`, producto);

        setTimeout(() => {
            obtenerDataProductos();
        }, 800)

    }

    const obtenerData = (id) => {
        productos.map(producto => {
            if (producto._id == id) {
                setProducto(producto);
            }
        })

    }

    const eliminar = (id) => {
        DeleteData(`${urlAPI.Producto.url}/${id}`);

        setTimeout(() => {
            obtenerDataProductos();
        }, 800)

    }

    const limpiarData = () => {

    }
    /**
     * Obtiene 
     * el ultimo codigo de barras y aumenta el codigo en 1
     * los codigos de barras deben ser un array de objetos y debe contener propiedad numero
     * ejemplo [ {id:"ejemplo_id", numero:"0001" } ]
     * 
     */
    const obtenerCodigosBarras = () => {


        let ultimoCodigoBarra = codigosBarras[codigosBarras.length - 1];
        console.log(ultimoCodigoBarra);

        const codigo = GeneradorCodigoBarras(ultimoCodigoBarra.numero);

        setCodigoBarra(codigo);
        setProducto({
            ...producto,
            codigo_barras: codigo,
        })

    }

    /**
     * Funcion para obtener todos los codigos de barras registrados 📶
     * actualiza el estado de los codigos de barras haciendo que se 
     * ejecute nuevamente la obtención de codigos de barras actualizando el
     * valor del codigo de barra 😩
     */
    const codigo = () => {
        const dataCodigosBarra = async () => {
            const data = await getData(`${urlAPI.CodigoBarras.url}`);
            setCodigosBarras(data);


        }
        dataCodigosBarra();
    }



    // Informacion adicional para el formulario se ejecutan al primer render solo una vez 

    useEffect(() => {

        const laboratorios = async () => {

            const data = await getData(`${urlAPI.Laboratorio.url}`);
            setLaboratorios(data);
        }

        laboratorios();

    }, [])

    socket.on('connect', () => {
        console.log('El socket se a conectado');
    })

    socket.on('welcome', data => {
        console.log(data);
    })



    useEffect(() => {
        socket.on('codigo_barra_uso', data => {
            console.log(data);
            const codigoBarraObtenido = GeneradorCodigoBarras(data.codigo_barras);
            console.log(codigoBarraObtenido);
            setCodigoBarra(codigoBarraObtenido);
        })

        socket.emit('mensaje', 'Mensaje para todos');
    }, [])

    /**
     * Esta ligada al estado de codigosBarras si este cambia se ejecuta
     * 🙉 
     */
    useEffect(() => {

        obtenerCodigosBarras();

    }, [codigosBarras])


    /**
    * Informacion para la tabla
    * 
    */


    const obtenerDataProductos = async () => {
        const data = await getData(`${urlAPI.Producto.url}`);
        // console.log(data);
        setProductos(data);
    }

    useEffect(() => {
        obtenerDataProductos();
    }, [])

    return (
        <>

            <div className='grid grid-cols-12 auto-rows-fr	 h-96 gap-1'>

                <Modal
                    id={'modalRegistro'}
                    title={'NUEVO PRODUCTO 🛒'}

                >

                    <form onSubmit={saveProducto} className="modal-body p-0">

                        <div className='grid grid-cols-6 grid-rows-6 h-auto '>
                            <div
                                className='
                                    col-span-6
                                    //bg-indigo-500
                                    row-span-6
                                    mx-2
                                    my-2
                                    sm:grid
                                    sm:grid-cols-6


                                '
                            >

                                <div
                                    className='
                                        sm:col-span-3
                                    '
                                >
                                    <table className='table mt-3 table-borderless  table-responsive-sm '>
                                        {loading && <p>OBteniendo codigo</p> ||

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
                                                    disabled
                                                    type={'number'}
                                                    value={'0'}

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

                                        <Label
                                            icon={'fi fi-rr-user'}
                                            text={'Stock por caja'}
                                            type={'number'}
                                            onChange={(e) => {
                                                setProducto({
                                                    ...producto,
                                                    stock_caja: e.target.value,
                                                    stock: 0
                                                })
                                            }}
                                        />

                                        <Label
                                            icon={'fi fi-rr-user'}
                                            text={'Stock por tableta'}
                                            type={'number'}
                                            onChange={(e) => {
                                                console.log(e.target.value);
                                                setProducto({
                                                    ...producto,
                                                    stock_tableta: e.target.value
                                                })
                                            }}
                                        />

                                    </table>
                                </div>


                                <div
                                    className='
                                        sm:col-span-3
                                    '
                                >
                                    <table className='table mt-3 table-borderless  table-responsive-sm'>

                                        <Label
                                            icon={'fi fi-rr-user'}
                                            text={"Precio.Compra"}
                                            varios={true}
                                            onChange={e => {
                                                setProducto(
                                                    {
                                                        ...producto,
                                                        precio_compra: e.target.value,
                                                    }
                                                )
                                            }}
                                        >
                                            <input
                                                className='
                                                    input-form
                                                    form-control 
                                                    px-2
                                                    form-control-sm
                                                    shadow-sm p-0  
                                                    rounded
                                                '
                                                placeholder='Precio de compra por caja'
                                                onChange={(e) => {
                                                    setProducto(
                                                        {
                                                            ...producto,
                                                            precio_compra_caja: e.target.value,
                                                        }
                                                    )
                                                }}
                                            />
                                            <input
                                                className='
                                                input-form
                                                form-control 
                                                px-2
                                                form-control-sm
                                                shadow-sm p-0  
                                                rounded
                                            '
                                                placeholder='Precio de compra por tableta'
                                                onChange={(e)=>{
                                                    setProducto(
                                                        {
                                                            ...producto,
                                                            precio_compra_tableta : e.target.value,
                                                        }
                                                    )
                                                }}
                                            />

                                        </Label>

                                        <Label
                                            icon={'fi fi-rr-user'}
                                            text={"Precio venta"}
                                            varios={true}
                                            onChange={e => {
                                                setProducto(
                                                    {
                                                        ...producto,
                                                        precio_venta: e.target.value,
                                                    }
                                                )
                                            }}

                                        >

                                            <input
                                                className='
                                                    input-form
                                                    form-control 
                                                    px-2
                                                    form-control-sm
                                                    shadow-sm p-0  
                                                    rounded
                                                '
                                                placeholder='Precio de venta por caja'
                                                onChange={(e) => {

                                                    setProducto(
                                                        {
                                                            ...producto,
                                                            precio_venta_caja: e.target.value,
                                                        }
                                                    )

                                                }}
                                            />
                                            <input
                                                className='
                                                input-form
                                                form-control 
                                                px-2
                                                form-control-sm
                                                shadow-sm p-0  
                                                rounded
                                            '
                                                placeholder='Precio de venta por tableta'
                                                onChange={(e) => {
                                                    setProducto(
                                                        {
                                                            ...producto,
                                                            precio_venta_tableta: e.target.value,
                                                        }
                                                    )
                                                }}
                                            />

                                        </Label>



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


                                    <div
                                        className='
                                                sm:ml-4
                                                sm:mt-1
                                                sm:w-96
                                                flex 
                                                grid
                                            '
                                    >
                                        <label class="block text-sm font-medium text-gray-700">Foto producto</label>
                                        <div class="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-2 pb-2">
                                            <div class="space-y-1 text-center">
                                                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                                <div class="flex text-sm text-gray-600">
                                                    <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                                                        <span>Sube un archivo </span>
                                                        <input
                                                            id="file-upload"
                                                            name="file-upload"
                                                            type="file"
                                                            class="sr-only"
                                                            onChange={(e) => {
                                                                setProducto(
                                                                    {
                                                                        ...producto,
                                                                        imagen: e.target.files[0],
                                                                    }
                                                                )
                                                            }}
                                                        />
                                                    </label>
                                                    <p class="pl-1">📷</p>
                                                </div>
                                                <p class="text-xs text-gray-500">PNG, JPG </p>
                                            </div>
                                        </div>
                                    </div>


                                </div>



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

                        <div className='grid grid-cols-6 grid-rows-6 h-auto'>

                            <div
                                className='
                                col-span-6
                                //bg-indigo-500
                                row-span-6
                                mx-2
                                my-2
                                sm:grid
                                sm:grid-cols-6

                            '
                            >


                                <div
                                    className='
                                     sm:col-span-3
                                 '
                                >
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
                                                    disabled
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

                                        <Label
                                            icon={'fi fi-rr-user'}
                                            text={'Stock por caja'}
                                            type={'number'}
                                            value={producto?.stock_caja}
                                            onChange={(e) => {
                                                setProducto({
                                                    ...producto,
                                                    stock_caja: e.target.value
                                                })
                                            }}
                                        />

                                        <Label
                                            icon={'fi fi-rr-user'}
                                            text={'Stock por tableta'}
                                            type={'number'}
                                            value={producto?.stock_tableta}
                                            onChange={(e) => {
                                                console.log(e.target.value);
                                                setProducto({
                                                    ...producto,
                                                    stock_tableta: e.target.value
                                                })
                                            }}
                                        />


                                    </table>
                                </div>

                                <div
                                    className='
                                     sm:col-span-3
                                 '
                                >



                                    <table className='table mt-3 table-borderless  table-responsive-sm'>

                                        <Label
                                            icon={'fi fi-rr-user'}
                                            text={"Precio.Compra"}
                                            value={producto?.precio_compra}
                                            varios={true}
                                            type={'number'}
                                            onChange={e => {
                                                setProducto(
                                                    {
                                                        ...producto,
                                                        precio_compra: e.target.value,
                                                    }
                                                )
                                            }}
                                        >

                                            <input
                                                value={producto?.precio_compra_caja}
                                                className='
                                                    input-form
                                                    form-control 
                                                    px-2
                                                    form-control-sm
                                                    shadow-sm p-0 
                                                    mt-1 
                                                    rounded
                                                '
                                                placeholder='Precio de compra por caja'
                                                onChange={(e) => {
                                                    setProducto(
                                                        {
                                                            ...producto,
                                                            precio_compra_caja: e.target.value,
                                                        }
                                                    )
                                                }}
                                            />
                                            <input
                                                value={producto?.precio_compra_tableta}
                                                className='
                                                input-form
                                                form-control 
                                                mt-1
                                                px-2
                                                form-control-sm
                                                shadow-sm p-0  
                                                rounded
                                            '
                                                placeholder='Precio de compra por tableta'
                                                onChange={(e) => {
                                                    setProducto(
                                                        {
                                                            ...producto,
                                                            precio_compra_tableta: e.target.value,
                                                        }
                                                    )
                                                }}
                                            />

                                        </Label>

                                        <Label
                                            icon={'fi fi-rr-user'}
                                            text={"Precio venta"}
                                            type={'number'}
                                            varios={true}
                                            value={producto?.precio_venta}
                                            onChange={e => {
                                                setProducto(
                                                    {
                                                        ...producto,
                                                        precio_venta: e.target.value,
                                                    }
                                                )
                                            }}

                                        >
                                            <input
                                                value={producto?.precio_venta_caja}
                                                className='
                                                    input-form
                                                    form-control 
                                                    px-2
                                                    mt-1
                                                    form-control-sm
                                                    shadow-sm p-0  
                                                    rounded
                                                '
                                                placeholder='Precio de venta por caja'
                                                onChange={(e) => {
                                                    setProducto(
                                                        {
                                                            ...producto,
                                                            precio_venta_caja: e.target.value
                                                        }
                                                    )
                                                }}
                                            />
                                            <input
                                                value={producto?.precio_venta_tableta}
                                                className='
                                                    input-form
                                                    form-control 
                                                    px-2
                                                    mt-1
                                                    form-control-sm
                                                    shadow-sm p-0  
                                                    rounded
                                                '
                                                placeholder='Precio de venta por tableta'
                                                onChange={(e) => {
                                                    setProducto(
                                                        {
                                                            ...producto,
                                                            precio_venta_tableta: e.target.value,
                                                        }
                                                    )
                                                }}
                                            />

                                        </Label>

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

                                    <div
                                        className='
                                                sm:ml-4
                                                sm:mt-1
                                                sm:w-96
                                                flex 
                                                grid
                                            '
                                    >
                                        <label class="block text-sm font-medium text-gray-700">Foto producto</label>
                                        <div class="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-2 pb-2">
                                            <div class="space-y-1 text-center">
                                                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                                <div class="flex text-sm text-gray-600">
                                                    <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                                                        <span>Sube un archivo </span>
                                                        <input
                                                            id="file-upload"
                                                            name="file-upload"
                                                            type="file"
                                                            class="sr-only"
                                                            onChange={(e) => {
                                                                console.log(e.target.files[0])
                                                            }}
                                                        />
                                                    </label>
                                                    <p class="pl-1">📷</p>
                                                </div>
                                                <p class="text-xs text-gray-500">PNG, JPG </p>
                                            </div>
                                        </div>
                                    </div>


                                </div>

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

                </Modal >
                <div
                    className='col-span-12 row-span-2 sm:row-span-1 flex z-50'
                >

                    <Titulo title={'Producto '} navegacion={' Mantenimiento'} icono={'fi fi-rr-settings'} />
                    {/**Boton */}
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
                                margin-top-boton
                                mr-4

                            "

                            data-bs-toggle="modal"
                            data-bs-target="#modalRegistro"
                            onClick={() => {

                                limpiarData()
                                codigo();

                            }}


                        >
                            Producto  +
                        </button>


                    </div>


                </div>

                <div className='mt-2  mx-3 card z-0 h-96 border-none col-span-12 row-span-6'>


                    <Grid
                        data={productos}

                        columns={[
                            { id: '_id', name: '#' },
                            { id: 'codigo_barras', name: 'COD BARRAS' },
                            { id: 'descripcion', name: 'DESCRIPCION' },
                            { id: 'fecha_registro', name: 'FEC. REGISTRO' },
                            { id: 'stock', name: 'STOCK' },
                            { id: 'precio_venta', name: 'P.VENTA' },
                            { id: 'tipo', name: 'TIPO' },
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
                        }}

                    />

                </div>

            </div >


        </>

    );
}

export { MantenimientoProducto }