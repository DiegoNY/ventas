import { _, Grid } from 'gridjs-react';
import React, { useEffect, useState } from 'react';
import { socket, urlAPI } from '../../../config';
import { Label } from '../../../ui/forms/label';
import { Modal } from '../../../ui/modal';
import { DeleteData, SaveData, UpdateData } from '../../useCRUD';
import { getData } from '../../useFetch';
import { GeneradorCodigoBarras } from './useCodigoBarras';
import { Titulo } from '../../../ui/titulos-vistas';
import { useAuth } from '../../../auth/auth';
import { useNavigate } from 'react-router';
import { DataGrid, esES } from '@mui/x-data-grid';
import { CustomToolbar } from '../../../ui/Tabla/CustomToolbar';
import { TablaDataGrid } from '../../../ui/Tabla/DataGrid';

function MantenimientoProducto() {

    //Usuario autenticado ? 
    const auth = useAuth();
    const navigation = useNavigate();
    if (!auth.user) navigation('/');

    /**
   * @producto , @setProducto maneja el estado de los clientes
   */

    const [producto, setProducto] = React.useState(null);
    const [laboratorios, setLaboratorios] = React.useState([]);
    const [codigoBarra, setCodigoBarra] = React.useState('');
    const [productos, setProductos] = React.useState([]);
    const [codigosBarras, setCodigosBarras] = React.useState([{ id: "", numero: '00008' }]);
    const [loading, setLoading] = React.useState(false);
    const [load, setLoad] = useState(false);
    const [columnas, setColumnas] = useState([])

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
        UpdateData(`${urlAPI.Producto.url}/${producto._id}`, producto);
        setTimeout(() => {
            obtenerDataProductos();
        }, 800)

    }

    const obtenerData = (id) => {
        productos.map(producto => {
            if (producto._id === id) {
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
        const codigo = GeneradorCodigoBarras(ultimoCodigoBarra?.numero);
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


    useEffect(() => {
        const columns = [
            {
                field: '_id',
                headerName: 'Id',
                flex: 0.3,
            },
            {
                field: 'codigo_barras',
                headerName: 'CODIGO BARRAS',
                flex: 0.3,
            },
            {
                field: 'descripcion',
                headerName: 'DESCRIPCION',
                flex: 0.3,
            },
            {
                field: 'fecha_registro',
                headerName: 'FECHA REGISTRO',
                flex: 0.3,
            },
            {
                field: 'stock',
                headerName: 'STOCK',
                flex: 0.3,
                renderCell: (params) => {

                    const percentage = params.row.stock / params.row.stock_minimo * 100;
                    let color = '';

                    if (percentage >= 70) {
                        color = '#5DAB5D';
                    } else if (percentage >= 30) {
                        color = '#F5D496';
                    } else {
                        color = '#F44336';
                    }

                    const progressStyle = {
                        width: `${percentage}%`,
                        height: '30px',
                        backgroundColor: color,
                    };

                    return (
                        <div className='flex w-full border mx-1'>
                            <div style={progressStyle} className=' items-center  border-x border-slate-400 rounded-sm p-2 flex justify-center'  ></div>
                            <div className='bg-white w-auto'>
                            </div>
                            <div className='absolute w-32 mt-1 text-center'>{params.row.stock}</div>
                        </div>
                    )
                }
            },
            {
                field: 'precio_venta',
                headerName: 'PRECIO VENTA',
                flex: 0.3,
            },
            {
                field: 'tipo',
                headerName: 'TIPO',
                flex: 0.3,
            },
            {
                field: 'estado',
                headerName: 'ESTADO',
                flex: 0.3,
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
                flex: 0.2,
                renderCell: (params) => {
                    return (
                        <div className='w-full flex justify-between mx-3'>
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
    }, [productos])

    // Informacion adicional para el formulario se ejecutan al primer render solo una vez 

    useEffect(() => {

        const laboratorios = async () => {

            const data = await getData(`${urlAPI.Laboratorio.url}`);
            setLaboratorios(data);
        }

        laboratorios();

    }, [])


    useEffect(() => {

        const RecibirCodigoBarras = (data) => {
            const codigoBarraObtenido = GeneradorCodigoBarras(data.codigo_barras);
            setCodigoBarra(codigoBarraObtenido);
        }

        socket.on('codigo_barra_uso', RecibirCodigoBarras);

        socket.on('connect', () => {
            console.log('El socket se a conectado');
        })

        socket.on('welcome', data => {
            console.log(data);
        })

        socket.emit('mensaje', 'Mensaje para todos');

        return () => {
            socket.off('codigo_barra_uso', RecibirCodigoBarras);
            socket.off('connect', () => {
                console.log('El socket se a conectado');
            })
            socket.off('welcome', data => {
                console.log(data);
            })
        }
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
        setProductos(data);
        setLoad(false);
    }

    useEffect(() => {
        setLoad(true)
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
                                            <option>SELECCIONE</option>
                                            {
                                                laboratorios.map(data => {

                                                    return (<option value={data.abreviatura}>{data.abreviatura + '-' + data.nombre}</option>)


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
                                            <option>SELECCIONE</option>
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
                                                mt-2
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
                                                mt-2
                                                input-form
                                                form-control 
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
                                                    mt-2
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
                                                mt-2
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
                                            <option>SELECCIONE</option>
                                            <option>CON RECETA MEDICA</option>
                                            <option>SIN RECETA MEDICA</option>

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
                                            <option>SELECCIONE</option>
                                            <option value={'1'}> ACTIVO </option>
                                            <option value={'0'}> INACTIVO </option>

                                        </Label>




                                    </table>


                                </div>


                                <div
                                    className='
                                        sm:ml-4
                                        sm:mt-1
                                        col-span-6
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
                                            <option value=''>SELECCIONE</option>
                                            {
                                                laboratorios.map(data => {

                                                    return (<option value={data.abreviatura}>{data.abreviatura + '-' + data.nombre}</option>)


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
                                                    mt-2 
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
                                                mt-2
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
                                                    mt-2
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
                                                    mt-2 
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



                                </div>

                                <div
                                    className='
                                        sm:ml-4
                                        sm:mt-1
                                        col-span-6
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
                    className='col-span-12 row-span-2 sm:row-span-1 flex z-10'
                >

                    <div
                        className='flex flex-col w-full ml-4 my-2'
                    >
                        <h1 className='
                            mr-auto
                            text-2xl 
                            sm:text-2xl 
                            font-extrabold 
                            text-slate-900 
                            tracking-tight 
                        '
                        >Productos registrados</h1>
                        <p className='
                            text-sm 
                            font-normal 
                            text-slate-500
                        '
                        >Para poder ingresar un producto debes de dar click sobre el boton </p>
                    </div>

                    {/**Boton */}
                    <div class="flex flex-row-reverse">
                        <button
                            type="button"
                            class=" 

                                bg-blue-500 
                                h-10 
                                rounded-md
                                text-white 
                                cursor-pointer
                                px-3
                                text-sm
                                w-px-15
                                w-48
                                mr-4
                                mt-2   
                                mb-auto 

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

                <div className='mt-2 mx-3 card z-0 h-screen border-none col-span-12 row-span-6'>




                    <TablaDataGrid
                        columns={columnas}
                        data={productos}
                        loading={load}
                    />

                </div>

            </div >


        </>

    );
}

export { MantenimientoProducto }