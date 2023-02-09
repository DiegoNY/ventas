import React, { useEffect, useState } from 'react';
import { urlAPI } from '../../config';
import { Titulo } from '../../ui/titulos-vistas';
import { getData } from '../useFetch';
import icono_moneda from './img/icono-monedas.svg'
import { ProductoSeleccionado } from './productosSeleccionados';
import { obtnerDescuento } from './useDescuentos';
import './index.css'
import { TablaTalwindCss } from '../../ui/Tabla/useTabla';
import { TableCell } from '../../ui/Tabla/tableCell';
import { TablaRow } from '../../ui/Tabla/tableRow';
import { SaveData } from '../useCRUD';
import { useAuth } from '../../auth/auth';
import { useNavigate } from 'react-router';
import { Layout } from '../../ui/Layouts';
import { Footer } from '../../ui/Layouts/Footer';
import { validarSerie } from '../useValidaciones';

function RegistroCompras() {
    //Usuario autenticado ? 
    const auth = useAuth();
    const navigation = useNavigate();
    if (!auth.user) navigation('/');

    //estados
    const [search, setSearch] = React.useState(false);
    const [productos, setProductos] = React.useState([{}]);
    const [searchProducto, setSearchProducto] = React.useState('');
    const [proveedores, setProveedores] = React.useState([]);
    const [formaPago, setFormaPago] = React.useState(true);
    const [tiposDocumentos, setTipoDocumentos] = React.useState([
        {
            id: '',
            name: 'BOLETA',
        },
        {
            id: '',
            name: 'FACTURA',
        },
        {
            id: '',
            name: 'PROFORMA',
        }
    ])
    const [listaCompra, setListaCompra] = React.useState({
        productos: [

        ],
        tipo_documento: '',
        numero_documento: '',
        fecha_documento: '',
        proveedor: '',
        efectivo: 0,
        vuelto: 0,
        subtotal: 0,
        igv: 0,
        total: 0,
        forma_pago: 'EFECTIVO',

    });

    const [unidadesCompra, setUnidadesCompra] = React.useState({

        CAJA: 'C',
        TABLETA: 'T',
        UNIDAD: 'U'

    });

    const [idsCompras, setIdesCompras] = React.useState({
        id: 1
    });

    const [formaPagoCredito, setFormaPagoCredito] = React.useState(false);
    const [buscador, setBuscador] = React.useState(false);
    const [erroresFormulario, setErroresFormulario] = React.useState({
        NUMERO_DOCUMENTO: {
            error: false
        },
        FECHA_REALIZACION: {
            error: false
        },
        PROVEEDOR: {
            error: false
        },
        TIPO_DOCUENTO: {
            error: false,
        },
        FORMA_PAGO: {

        }
    });

    const [tipoCompra, setTipoCompra] = React.useState('');

    //variables

    /**
     * @let searchProductos variable que contiene todos los productos 
     */
    let searchProductos = [];

    //Buscador cuando el valor del buscador es menor que 1 no se filtra pero 
    //si es mayor que uno se filtra y se retorna el producto encontrado

    if (!searchProducto.length >= 1) {
        searchProductos = productos;
    } else {
        searchProductos = productos.filter(producto => {
            const productoText = `${producto?.descripcion?.toLowerCase()}${producto?.id_laboratorio?.toLowerCase()}`;

            const searchText = searchProducto.toLowerCase();

            return productoText?.includes(searchText);
        })
    }

    //Funciones

    /**
     * Recibe el producto seleccionado y cambia el estado de la
     * listaProductosSeleccionados 📖 pero no la borra solo agrega el producto 
     * y le ingresa un id que es el id_compra del producto
     * @param {*} producto un objeto con los datos del producto
     */
    const obteniendoProductoSeleccionado = (producto) => {


        setListaCompra({
            ...listaCompra,
            productos: [
                ...listaCompra.productos,
                {
                    ...producto,
                    id_compra: idsCompras.id,
                    medida: 'U'
                }
            ]
        });

        setIdesCompras({ id: idsCompras.id + 1 })

    }

    /**
     * Recibe el id del producto que se desea modificar (puede ser el id de producto o el id compra) 
     * busca el producto y cambia  el valor de la propiedad 🎐
     * @param {*} id string con el id del producto 
     * @param {*} valor string con el vlor a cambiar
     * @param {*} propiedad  string con la propiedad a alterar
     * 
     * ejemplo 👀 :  modificandoProductosSeleccionados('id','valor','propiedad ')
     * 
     */
    const modificandoProductosSeleccionados = (id, valor, propiedad, modificadorTotal = false) => {


        listaCompra.productos.map(producto => {

            if (producto._id == id || producto.id_compra == id) {
                //cambiando el valor de las propiedad
                producto[propiedad] = valor;

                //Modificando el total
                //obteniendo el string
                let stringStock = producto.stock;
                console.log(stringStock);
                //separandolo 
                let arrStringStock = stringStock.split('-');
                const stock = arrStringStock[1];

                //hay 3 Tipos de unidades tableta caja y unidad [T, C , U] 
                const tipoUnidad = arrStringStock[0];

                //modificando Total
                producto.total = stock * producto.precio_compra;


                //Validando el tipo de unidad para poder actualizare el stock real del producto
                //esto se puede ya que al registrar un producto se tiene mapeado cuantas unidades 
                //contiene una caja  y cuantas unidades contiene la tableta

                if (unidadesCompra.CAJA == tipoUnidad.toUpperCase()) {
                    // console.log("Se esta realizando una compra por caja");

                    const stock_comprado = stock * producto.stock_caja;
                    // console.log(stock_comprado);
                    producto.stock_comprado = stock_comprado;

                    // console.log(producto);

                }

                if (unidadesCompra.TABLETA == tipoUnidad.toUpperCase()) {
                    const stock_comprado = stock * producto.stock_tableta;
                    producto.stock_comprado = stock_comprado;
                    // console.log(producto);
                }

                if (unidadesCompra.UNIDAD == tipoUnidad.toUpperCase()) {

                    const stock_comprado = stock;
                    producto.stock_comprado = stock_comprado;
                    // console.log(producto);

                }

                //Moificando el total segun descuentos ingresados
                if (modificadorTotal) {

                    const total = obtnerDescuento(
                        producto.total,
                        producto.descuento,
                        producto.descuento_1,
                        producto.descuento_2,
                    )

                    producto.total = total;
                    // console.log(producto);

                }

            }

        })

        let totalReal = 0;

        listaCompra.productos.map(producto => {

            totalReal += producto.total;

        })

        listaCompra.total = totalReal;
        listaCompra.efectivo = totalReal;

        setListaCompra(() => {

            return { ...listaCompra }
        })

        // console.log(listaCompra);

    }


    const saveListaCompra = () => {
        console.log(listaCompra);
        SaveData(`${urlAPI.ListaCompra.url}`, listaCompra);
    }


    //llamados a API o Funciones que se ejecuten solo una vez 
    useEffect(() => {

        const obtenerProductos = async () => {
            const data = await getData(`${urlAPI.Producto.url}`);
            setProductos(data);
        }

        obtenerProductos();

    }, [])

    useEffect(() => {

        const obtnerProveedores = async () => {
            const data = await getData(`${urlAPI.Proveedor.url}`);
            setProveedores(data);
        }

        obtnerProveedores();

    }, [])

    return (
        < >
            <Layout
                title='Estas registrando una nueva compra'
                onClick={() => {
                    setBuscador(false);
                }}
            >
                <div
                    className='
                                flex
                                flex-col
                                mr-6
                                rounded-xl
                              bg-sky-200
                                mb-3
                                px-2 
                            '
                >
                    <div
                        className='mt-2 flex justify-between'

                    >

                        <input
                            className='border border-slate-100 w-96 ml-1 rounded-sm py-1 px-1'
                            placeholder='Busca un producto'
                            onChange={(e) => {
                                setSearchProducto(e.target.value)
                                setSearch(true);

                            }}
                            onClick={(event) => {
                                setBuscador(true)

                                event.stopPropagation();
                            }}
                            type={'text'}
                        />

                        <h1 className='text-right  font-black mr-2 text-slate-400'>Selecciona los productos </h1>
                    </div>
                    {!!buscador && <div
                        className='
                                    bg-white
                                    border 
                                    absolute 
                                    z-10 
                                    mt-11 
                                    mx-1  
                                    flex 
                                    flex-col 
                                    px-1 
                                    rounded-sm
                                    contenedor-productos

                                '
                        onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();

                        }}
                    >

                        {searchProductos?.map((producto, index) => {
                            return (
                                <div
                                    key={index}
                                    className={
                                        `
                                                w-full 
                                                flex 
                                                p-1 
                                                mb-1 
                                                ${index == 0 && 'mt-1'}
                                                hover:bg-sky-100
                                                cursor-pointer
                                                text-slate-600
                                                `
                                    }
                                    onClick={(event) => {

                                        obteniendoProductoSeleccionado(producto)

                                        event.stopPropagation();
                                        event.preventDefault();

                                    }}
                                >
                                    {producto.descripcion} ({producto.id_laboratorio})

                                </div>
                            )
                        })}




                    </div>}
                    <div
                        className='
                            contenedor-tabla
                            mt-2
                            rounded-2xl
                        '
                    >
                        <TablaTalwindCss
                            headers={[
                                { name: '#' },
                                { name: 'Descripcion' },
                                { name: 'Lote' },
                                { name: 'F.Vencimiento' },
                                { name: 'Cantidad' },
                                { name: 'P.Compra unitario' },
                                { name: 'P.Venta' },
                                { name: 'Descuento 01' },
                                { name: 'Descuento 02' },
                                { name: 'Descuento 03' },
                                { name: 'Total' },
                            ]}

                            marginY={'my-0 bg-white '}
                        >
                            <TablaRow>

                            </TablaRow>

                            {listaCompra?.productos?.map((producto, index) => {



                                return (
                                    <>

                                        <TablaRow

                                            tabIndex={index}
                                            onClick={(event) => {
                                                let medida = '';
                                                if (producto.medida == 'C') medida = ' caja';
                                                if (producto.medida == 'T') medida = ' tableta';
                                                if (producto.medida == 'U') medida = ' unidad';
                                                setTipoCompra(producto.descripcion + ' esta siendo comprado por' + medida)
                                                event.preventDefault();
                                            }}

                                            onKeyDown={(event) => {

                                                //Eventes para cambiar el tipo de medida
                                                if (event.key == 't') {
                                                    producto.medida = 'T';
                                                    setTipoCompra(producto.descripcion + ' esta siendo comprado por tableta')
                                                }

                                                if (event.key == 'c') {
                                                    producto.medida = 'C';
                                                    setTipoCompra(producto.descripcion + ' esta siendo comprado por caja')
                                                }

                                                if (event.key == 'u') {
                                                    producto.medida = 'U';
                                                    setTipoCompra(producto.descripcion + ' esta siendo comprado por unidad')
                                                }

                                            }}

                                        >
                                            <TableCell
                                                className='text-xs'
                                            >
                                                {producto.id_compra}
                                            </TableCell>
                                            <TableCell
                                                className='text-xs'
                                            >
                                                {producto.descripcion}
                                            </TableCell>
                                            <TableCell>
                                                <ProductoSeleccionado
                                                    rows={'1'}
                                                    cols={'5'}
                                                    defaultValue={producto?.lote}
                                                    onChange={(e) => {
                                                        modificandoProductosSeleccionados(producto._id, e.target.value, 'lote')
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                className='text-xs'

                                            >
                                                <ProductoSeleccionado
                                                    input={true}
                                                    value={producto?.fecha_vencimiento}
                                                    type={'date'}
                                                    onChange={(e) => {
                                                        modificandoProductosSeleccionados(producto._id, e.target.value, 'fecha_vencimiento')
                                                    }}
                                                />

                                            </TableCell>
                                            <TableCell
                                                className='text-xs'

                                            >
                                                <textarea
                                                    className=' uppercase'
                                                    rows={'1'}
                                                    cols={'5'}
                                                    onChange={(e) => {
                                                        let cantidad = `${producto.medida}-${e.target.value}`;
                                                        modificandoProductosSeleccionados(producto.id_compra, cantidad, 'stock')
                                                    }}
                                                >
                                                </textarea>
                                            </TableCell>
                                            <TableCell
                                                className='text-xs'

                                            >
                                                <ProductoSeleccionado
                                                    rows={'1'}
                                                    cols={'5'}
                                                    defaultValue={producto?.precio_compra}
                                                    onChange={(e) => {

                                                        modificandoProductosSeleccionados(producto.id_compra, e.target.value, 'precio_compra')
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                className='text-xs'

                                            >
                                                <div
                                                    className='
                                                 flex
                                                 flex-col
                                                '
                                                >
                                                    <ProductoSeleccionado
                                                        rows={'1'}
                                                        cols={'6'}
                                                        defaultValue={`U-${producto?.precio_venta || ''}`}
                                                        onChange={(e) => {
                                                            let stringValue = e.target.value;
                                                            let arrStringValue = stringValue.split('-');
                                                            modificandoProductosSeleccionados(producto._id, arrStringValue[1], 'precio_venta')
                                                        }}
                                                    />

                                                    <ProductoSeleccionado
                                                        rows={'1'}
                                                        cols={'6'}
                                                        defaultValue={`C-${producto?.precio_venta_caja || ''}`}
                                                        onChange={(e) => {
                                                            let stringValue = e.target.value;
                                                            let arrStringValue = stringValue.split('-');
                                                            modificandoProductosSeleccionados(producto._id, arrStringValue[1], 'precio_venta_caja')
                                                        }}
                                                    />
                                                    <ProductoSeleccionado
                                                        rows={'1'}
                                                        cols={'6'}
                                                        defaultValue={`T-${producto?.precio_venta_tableta || ''}`}
                                                        onChange={(e) => {
                                                            let stringValue = e.target.value;
                                                            let arrStringValue = stringValue.split('-');
                                                            modificandoProductosSeleccionados(producto._id, arrStringValue[1], 'precio_venta_tableta')
                                                        }}
                                                    />
                                                </div>

                                            </TableCell>
                                            <TableCell
                                                className='text-xs'

                                            >
                                                <ProductoSeleccionado
                                                    rows={'1'}
                                                    cols={'5'}
                                                    defaultValue={producto?.descuento}
                                                    onChange={(e) => {
                                                        console.log(e.target.value)
                                                        modificandoProductosSeleccionados(producto.id_compra, e.target.value, 'descuento', true)
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                className='text-xs'

                                            >
                                                <ProductoSeleccionado
                                                    rows={'1'}
                                                    cols={'5'}
                                                    defaultValue={producto?.descuento_1}
                                                    onChange={(e) => {
                                                        modificandoProductosSeleccionados(producto._id, e.target.value, 'descuento_1', true)
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                className='text-xs'

                                            >
                                                <ProductoSeleccionado
                                                    rows={'1'}
                                                    cols={'5'}
                                                    defaultValue={producto?.descuento_2}
                                                    onChange={(e) => {
                                                        console.log(e.target.value)
                                                        modificandoProductosSeleccionados(producto._id, e.target.value, 'descuento_2', true)
                                                    }}
                                                />
                                            </TableCell>
                                            <ProductoSeleccionado total={producto.total} />

                                        </TablaRow>
                                    </>
                                )
                            })}


                        </TablaTalwindCss>
                    </div>

                    <h1 className='text-slate-600 ml-2 mt-1'>{tipoCompra}</h1>

                </div>

                <div
                    className='
                        flex
                        w-full
                    '
                >
                    <div
                        className='
                            flex
                            flex-col
                        '
                    >
                        <p className='mb-1  text-slate-500 font-light font-sans'>Por favor completa los siguientes datos :</p>
                        <h1 className='font-black text-slate-800'>¿Que tipo de documento registraras?</h1>
                        <select
                            type={'text'}
                            className='mx-2 rounded-sm mt-1 border-x border-y  p-1 focus:border-2 focus:border-blue-600 '
                            placeholder='Nombre del solicitante ...'
                            onChange={(e) => {
                                setListaCompra({
                                    ...listaCompra,
                                    tipo_documento: e.target.value,
                                })
                            }}
                        >
                            <option>SELECCIONE</option>
                            {tiposDocumentos.map(tipo => {
                                return (<option value={tipo.name}>{tipo.name}</option>)

                            })}
                        </select>
                        <br />
                        <h1 className='font-black text-slate-800 flex' >Ingresa el numero del documento
                            <i
                                className='text-orange-500 ml-1 cursor-pointer'

                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                </svg>
                            </i>

                        </h1>

                        <input
                            type={'text'}
                            className={`mx-2 rounded-sm mt-1 border-y border-x p-1  focus:border-2 ${!!erroresFormulario?.NUMERO_DOCUMENTO?.error && 'border-2 border-red-500' || ' focus:border-blue-600'}  `}
                            placeholder='B00-00000000 ... '
                            onChange={(e) => {
                                let formatoCorrecto = validarSerie(e.target.value);

                                if (!formatoCorrecto) setErroresFormulario({
                                    ...erroresFormulario,
                                    NUMERO_DOCUMENTO: {
                                        error: true
                                    }
                                });

                                if (!!formatoCorrecto) {
                                    setErroresFormulario(false);
                                    setListaCompra({
                                        ...listaCompra,
                                        numero_documento: e.target.value,
                                    })
                                }

                            }}

                        />
                        <br />
                        <h1 className='font-black text-slate-800' >¿Cuando se realizo? </h1>
                        <input
                            type={'date'}
                            className='mx-2 rounded-sm text-center mt-1 border-y border-x p-1 focus:border-2 focus:border-blue-600 '
                            onChange={(e) => {
                                setListaCompra({
                                    ...listaCompra,
                                    fecha_documento: e.target.value
                                })
                            }}
                        />
                        <br />
                        <h1 className='font-black text-slate-800'>¿Quien es el proveedor?</h1>
                        <select
                            type={'text'}
                            className='mx-2 rounded-sm mt-1 border-x border-y  p-1 focus:border-2 focus:border-blue-600 '
                            placeholder='Nombre del solicitante ...'
                            onChange={(e) => {
                                let informacion = e.target.value;
                                let proveedor = informacion.split('-');
                                setListaCompra({
                                    ...listaCompra,
                                    proveedor: proveedor[0],
                                    ruc_proveedor: proveedor[1],
                                })
                            }}
                        >
                            <option>SELECCIONE</option>
                            {proveedores.map(proveedor => {
                                return (<option value={`${proveedor.abreviatura}-${proveedor.ruc}`}>{`${proveedor.abreviatura} - ${proveedor.nombre}`}</option>)

                            })}
                        </select>
                        <br />
                        <h1 className='font-black text-slate-800'>Selecciona la forma de pago</h1>
                        <div
                            className='flex flex-row'
                        >
                            <div
                                className='p-1 text-center ml-2 hover:text-gray-500 flex cursor-pointer '
                            >
                                <input
                                    type={'checkbox'}
                                    value={'EFECTIVO'}
                                    checked={formaPago}
                                    className='
                                        mr-1
                                    '
                                    onChange={(e) => {

                                        setListaCompra({
                                            ...listaCompra,
                                            forma_pago: e.target.value,
                                        })
                                        setFormaPago(!formaPago)
                                        setFormaPagoCredito(false);

                                    }}
                                />
                                <span className='text-xs mt-1'>Efectivo</span>

                                <img src={icono_moneda} className='ml-1 h-5' />
                            </div>
                            <div
                                className='p-1 text-center ml-2 hover:text-gray-500 cursor-pointer'
                            >
                                <input
                                    type={'checkbox'}
                                    value={'CREDITO'}
                                    checked={!formaPago}
                                    className='
                                     mr-1
                                    '
                                    onChange={(e) => {
                                        setListaCompra({
                                            ...listaCompra,
                                            forma_pago: e.target.value,
                                        })
                                        setFormaPago(!formaPago)
                                        setFormaPagoCredito(true);
                                    }}
                                    onClick={() => {
                                        setFormaPago(!formaPago);
                                    }}
                                />
                                <span className='text-xs'>Credito</span>
                                <i class="fi fi-rs-credit-card ml-1 text-blue-700"></i>
                            </div>


                        </div>
                        <br />
                        <div
                            className='
                                    
                                flex
                                justify-between
                            '
                        >



                            <p className='font-black ' >Subtotal : <span className='font-normal'>{listaCompra.subtotal}</span></p>
                            <p className='font-black '>igv : <span className='font-normal'>{listaCompra.igv}</span></p>
                            <p className='font-black '>Total : <span className='font-normal'>{listaCompra.total}</span></p>

                        </div>
                        <div
                            className='
                              //bg-indigo-500
                              mt-1
                              flex
                            '
                        >
                            <span className='mr-1  font-semibold'>Efectivo :
                                <span className='font-normal ' >

                                    <input
                                        type='text'
                                        disabled={formaPagoCredito}
                                        className='h-5 text-sm w-9'
                                        value={listaCompra?.efectivo}
                                        onChange={(e) => {
                                            setListaCompra({
                                                ...listaCompra,
                                                efectivo: e.target.value,
                                                vuelto: e.target.value - listaCompra.total,
                                            })
                                        }}
                                    />


                                </span>
                            </span>
                            <span className='  font-semibold'>Vuelto : <span className='font-normal'> {listaCompra.vuelto || 0}</span> </span>
                        </div>
                        <br />
                        <div
                            className='
                                flex
                                justify-end
                            '
                        >
                            <button
                                className={`
                                         
                                bg-orange-500
                                h-10
                                w-1/2
                                ml-16
                                rounded-xl
                                text-white
                                text-uppercase
                                text-xs	
                                font-semibold
                                        `}

                                onClick={() => {
                                    saveListaCompra();
                                }}
                            >
                                Registrar compra
                            </button>

                        </div>

                    </div>
                </div>

            </Layout>

        </>
    )
}

export { RegistroCompras }