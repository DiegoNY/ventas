import React, { useEffect, useState } from 'react';
import { urlAPI } from '../../config';
import { Titulo } from '../../ui/titulos-vistas';
import { getData } from '../useFetch';
import icono_moneda from './img/icono-monedas.svg'
import { ProductoSeleccionado } from './productosSeleccionados';
import { obtnerDescuento } from './useDescuentos';
import './index.css'

function RegistroCompras() {
    //estados
    const [search, setSearch] = React.useState(false);
    const [productos, setProductos] = React.useState([{}]);
    const [searchProducto, setSearchProducto] = React.useState('');
    const [proveedores, setProveedores] = React.useState([]);
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

    const [loading, setLoading] = React.useState(false);


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


        setListaCompra({ ...listaCompra, productos: [...listaCompra.productos, { ...producto, id_compra: idsCompras.id }] });
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

                if (unidadesCompra.CAJA == tipoUnidad) {
                    // console.log("Se esta realizando una compra por caja");

                    const stock_comprado = stock * producto.stock_caja;
                    // console.log(stock_comprado);
                    producto.stock_comprado = stock_comprado;

                    console.log(producto);

                }

                if (unidadesCompra.TABLETA == tipoUnidad) {
                    const stock_comprado = stock * producto.stock_tableta;
                    producto.stock_comprado = stock_comprado;
                    console.log(producto);
                }

                if (unidadesCompra.UNIDAD == tipoUnidad) {

                    const stock_comprado = stock;
                    producto.stock_comprado = stock_comprado;
                    console.log(producto);

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
                    console.log(producto);

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
            <div className='grid sm:grid grid-cols-12 gap-1 layout-registro  grid-rows-6'>

                <div
                    className='
                         
                        h-full 
                        //bg-indigo-500 
                        row-span-5 
                        col-span-9 
                        col-start-1 
                        row-start-1
                        ml-3
                        border-none
                        grid
                        grid-cols-12
                        grid-rows-6
                    '
                >
                    <div
                        className='
                            col-start-1
                            col-span-6
                        '
                    >
                        <Titulo
                            title='Compras '
                            navegacion=' Registro'
                        />
                    </div>

                    <div
                        className='
                            row-start-2 
                            col-span-12
                            row-span-6
                            mx-3
                            //bg-orange-500
                            flex
                            flex-col
                        '
                    >
                        <div
                            className='
                                mb-2
                                flex
                            '
                        >

                            <input
                                type={'text'}
                                placeholder={'Busca un producto ... '}
                                className='
                                    form-control
                                '
                                onFocus={() => setSearch(!search)}
                                onChange={(e) => {
                                    setSearchProducto(e.target.value)
                                    setSearch(true);
                                }}
                            />


                            <button
                                className='
                                    mx-2
                                '
                            >
                                Agregar
                            </button>

                            {/**Todos los productos cargados */}

                            {search &&
                                <div
                                    className={`
                                        form-control
                                        h-20
                                        overflow-y-auto
                                        px-1
                                        p-1
                                        absolute
                                        z-40
                                        mt-5
                                        w-auto

                                    `}
                                    onMouseLeave={() => setSearch(!search)}

                                >

                                    {searchProductos.map(producto => {

                                        return (
                                            <>
                                                <div
                                                    className='
                                                     p-2
                                                     hover:bg-gray-100
                                                    '
                                                    onClick={() => obteniendoProductoSeleccionado(producto)}
                                                >
                                                    {producto.descripcion} ({producto.id_laboratorio})
                                                </div>
                                            </>
                                        )

                                    })

                                    }

                                </div>
                            }



                        </div>

                        <div
                            className='
                                mx-1
                                relative rounded-xl overflow-auto
                                shadow-sm overflow-hidden my-8
                            '
                        >

                            <div
                                className='relative rounded-xl overflow-auto'
                            >
                                <div
                                    className='shadow-sm  my-8 '
                                >
                                    <div className="table w-full border-collapse table-auto w-full text-sm">
                                        <div className="table-header-group ">
                                            <div className="table-row ">
                                                <div className="table-cell text-center border-b text-xs p-2 pt-0  text-slate-400  text-left">#</div>
                                                <div className="table-cell text-center border-b text-xs p-2 pt-0  text-slate-400  text-left">Descripcion</div>
                                                <div className="table-cell text-center border-b text-xs p-2  pt-0  text-slate-400  text-left">Lote</div>
                                                <div className="table-cell text-center border-b text-xs p-2  pt-0  text-slate-400  text-left">F.Vencimiento</div>
                                                <div className="table-cell text-center border-b text-xs p-2  pt-0  text-slate-400  text-left">Cantidad</div>
                                                <div className="table-cell text-center border-b text-xs p-2  pt-0  text-slate-400  text-left">P.Compra unitario</div>
                                                <div className="table-cell text-center border-b text-xs p-2  pt-0  text-slate-400  text-left">P.Venta</div>
                                                <div className="table-cell text-center border-b text-xs p-2  pt-0  text-slate-400  text-left">Descuento 01</div>
                                                <div className="table-cell text-center border-b text-xs p-2  pt-0  text-slate-400  text-left">Descuento 02</div>
                                                <div className="table-cell text-center border-b text-xs p-2  pt-0  text-slate-400  text-left">Descuento 03</div>
                                                <div className="table-cell text-center border-b text-xs p-2  pt-0  text-slate-400  text-left">Total</div>
                                            </div>
                                        </div>
                                        <div className="table-row-group">
                                            {listaCompra?.productos?.map(producto => {



                                                return (
                                                    <>
                                                        <div className="table-row">
                                                            <div className="table-cell ...">{producto.id_compra} </div>
                                                            <div className="table-cell ...">{producto.descripcion} </div>
                                                            <div className="table-cell ...">
                                                                <textarea
                                                                    rows={'1'}
                                                                    cols={'5'}
                                                                    defaultValue={producto?.lote}
                                                                    onChange={(e) => {
                                                                        modificandoProductosSeleccionados(producto._id, e.target.value, 'lote')
                                                                    }}
                                                                >

                                                                </textarea>
                                                            </div>
                                                            <div className="table-cell ...">
                                                                <input
                                                                    className='
                                                                        form-control-sm 
                                                                        w-46
                                                                    '
                                                                    value={producto?.fecha_venciemiento}
                                                                    type={'date'}
                                                                    onChange={(e) => {
                                                                        modificandoProductosSeleccionados(producto._id, e.target.value, 'fecha_vencimiento')
                                                                    }}
                                                                />

                                                            </div>
                                                            <div className="table-cell ...">

                                                                <textarea
                                                                    className=' uppercase'
                                                                    rows={'1'}
                                                                    cols={'5'}
                                                                    defaultValue={producto?.stock}
                                                                    onChange={(e) => {
                                                                        modificandoProductosSeleccionados(producto.id_compra, e.target.value, 'stock')
                                                                    }}
                                                                >
                                                                </textarea>
                                                            </div>
                                                            <div className="table-cell ...">
                                                                <textarea
                                                                    rows={'1'}
                                                                    cols={'5'}
                                                                    defaultValue={producto?.precio_compra}
                                                                    onChange={(e) => {

                                                                        modificandoProductosSeleccionados(producto.id_compra, e.target.value, 'precio_compra')
                                                                    }}
                                                                >
                                                                </textarea>


                                                            </div>
                                                            <div className="table-cell ...">
                                                                <textarea
                                                                    rows={'1'}
                                                                    cols={'6'}
                                                                    defaultValue={`U-${producto?.precio_venta_unidad || ''}`}
                                                                    onChange={(e) => {
                                                                        let stringValue = e.target.value;
                                                                        let arrStringValue = stringValue.split('-');
                                                                        modificandoProductosSeleccionados(producto._id, arrStringValue[1], 'precio_venta_unidad')
                                                                    }}
                                                                >

                                                                </textarea>

                                                                <textarea
                                                                    rows={'1'}
                                                                    cols={'6'}
                                                                    defaultValue={`C-${producto?.precio_venta_caja || ''}`}
                                                                    onChange={(e) => {
                                                                        let stringValue = e.target.value;
                                                                        let arrStringValue = stringValue.split('-');
                                                                        modificandoProductosSeleccionados(producto._id, arrStringValue[1], 'precio_venta_caja')
                                                                    }}
                                                                >
                                                                </textarea>
                                                                <textarea
                                                                    rows={'1'}
                                                                    cols={'6'}
                                                                    defaultValue={`T-${producto?.precio_venta_tableta || ''}`}
                                                                    onChange={(e) => {
                                                                        let stringValue = e.target.value;
                                                                        let arrStringValue = stringValue.split('-');
                                                                        modificandoProductosSeleccionados(producto._id, arrStringValue[1], 'precio_venta_tableta')
                                                                    }}
                                                                >
                                                                </textarea>

                                                            </div>
                                                            <div className="table-cell ...">
                                                                <textarea
                                                                    rows={'1'}
                                                                    cols={'5'}
                                                                    defaultValue={producto?.descuento}
                                                                    onChange={(e) => {
                                                                        console.log(e.target.value)
                                                                        modificandoProductosSeleccionados(producto.id_compra, e.target.value, 'descuento', true)
                                                                    }}
                                                                >

                                                                </textarea>
                                                            </div>
                                                            <div className="table-cell ...">
                                                                <textarea
                                                                    rows={'1'}
                                                                    cols={'5'}
                                                                    defaultValue={producto?.descuento_1}
                                                                    onChange={(e) => {
                                                                        modificandoProductosSeleccionados(producto._id, e.target.value, 'descuento_1', true)
                                                                    }}
                                                                >

                                                                </textarea>
                                                            </div>
                                                            {/* <ProductoSeleccionado /> */}
                                                            <div className="table-cell ...">
                                                                <textarea
                                                                    rows={'1'}
                                                                    cols={'5'}
                                                                    defaultValue={producto?.descuento_2}
                                                                    onChange={(e) => {
                                                                        console.log(e.target.value)
                                                                        modificandoProductosSeleccionados(producto._id, e.target.value, 'descuento_2', true)
                                                                    }}
                                                                >

                                                                </textarea>
                                                            </div>
                                                            <ProductoSeleccionado total={producto.total} />
                                                        </div>
                                                    </>
                                                )
                                            })}

                                        </div>
                                    </div>
                                </div>

                            </div>


                        </div>

                    </div>


                </div>

                <div
                    className='
                    
                        border-none
                        h-full
                        //bg-orange-500
                        sm:col-span-3
                        sm:row-span-5
                        sm:col-start-10
                        sm:row-start-1
                        sm:mr-5
                        grid 
                        grid-cols-6
                        grid-rows-6
                    '
                >
                    <div
                        className='
                            bg-red-500
                            col-span-6
                            mx-2
                            my-2
                        '
                    >

                    </div>
                    <div
                        className='
                            //bg-indigo-500
                            row-start-2
                            row-span-4
                            col-span-6
                            mx-2
                            flex 
                            flex-col
                            p-2
                        '
                    >
                        <span className='text-sm font-semibold font-sans'>Tipo de documento</span>
                        <select
                            className='
                             form-control
                             form-control-sm
                             text-xs
                             h-4
                            '
                            onChange={(e) => {

                                setListaCompra({
                                    ...listaCompra,
                                    numero_documento: e.target.value
                                })

                            }}
                        >
                            <option>SELECCIONE</option>
                            <option className='text-xs' value={'B001-'}>BOLETA</option>
                            <option className='text-xs' value={'F001-'} >FACTURA</option>
                            <option className='text-xs' value={'GUIA REMISION'}>GUIA REMISION</option>
                            <option className='text-xs' value={'PROFORMA'}>PROFORMA </option>
                        </select>
                        <br />
                        <span className='text-sm font-semibold font-sans'> N° Documento</span>
                        <input
                            className='
                             mt-1
                             form-control
                             form-control-sm
                             h-4
                            '
                            value={listaCompra?.numero_documento}
                            onChange={(e) => {
                                setListaCompra({
                                    ...listaCompra,
                                    numero_documento: e.target.value,
                                })


                            }}
                        />
                        <br />
                        <span className='text-sm font-semibold font-sans'>Fecha de documento</span>
                        <input
                            className='
                             form-control
                             form-control-sm
                             h-4
                          '
                            type={'date'}
                            value={listaCompra?.fecha_documento}
                            onChange={(e) => {
                                setListaCompra({
                                    ...listaCompra,
                                    fecha_documento: e.target.value,
                                })
                            }}
                        />
                        <br />
                        <span className='text-sm font-semibold font-sans'>Proveedor</span>
                        <select
                            className='
                             form-control
                             form-control-sm
                             h-4
                          '
                        >

                            <option>SELECCIONE</option>
                            {proveedores.map(proveedor => {

                                return (<option value={`${proveedor.nombre} - ${proveedor.abreviatura}`}>{`${proveedor.abreviatura} - ${proveedor.nombre}`}</option>)

                            })}
                        </select>
                        <br />
                        <span className='text-sm font-semibold font-sans'>Forma de pago</span>
                        <div
                            className='flex flex-row'
                        >
                            <div
                                className='p-1 text-center ml-2 hover:text-gray-500 flex cursor-pointer '
                            >
                                <input
                                    type={'checkbox'}
                                    value={'EFECTIVO'}
                                    className='
                                        mr-1
                                    '
                                    onChange={(e) => {

                                        setListaCompra({
                                            ...listaCompra,
                                            forma_pago: e.target.value,
                                        })
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
                                    className='
                                     mr-1
                                    '
                                    onChange={(e) => {
                                        setListaCompra({
                                            ...listaCompra,
                                            forma_pago: e.target.value,
                                        })
                                        setFormaPagoCredito(true);
                                    }}
                                />
                                <span className='text-xs'>Credito</span>
                                <i class="fi fi-rs-credit-card ml-1"></i>
                            </div>


                        </div>

                        <div
                            className='
                              //bg-indigo-500
                              flex
                              justify-between
                              mt-3
                            '
                        >
                            <span className='ml-1 text-lg font-semibold'>Efectivo :
                                <span className='font-normal' >

                                    <input
                                        disabled={formaPagoCredito}
                                        className='h-5 text-sm w-14'
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
                            <span className='ml-1 text-lg font-semibold'>Vuelto : <span className='font-normal'> {listaCompra.vuelto || 0}</span> </span>
                        </div>

                    </div>

                </div>

                <div className='row-start-6 //bg-indigo-500 col-span-12 mb-0 grid grid-cols-4'>
                    <div className='//bg-indigo-500 col-span-3 flex'>
                        <span className='sm:ml-20  text-slate-700 text-lg font-semibold w-full text-center mt-4'>Subtotal :  <span className='text-lg font-normal'>{listaCompra.subtotal}</span></span>
                        <span className=' text-lg text-slate-700 w-full  text-center font-semibold mt-4'>IGV : <span className='text-lg font-normal'>{listaCompra.igv}</span></span>
                        <span className=' text-lg text-slate-700 w-full  font-semibold mt-4'>Total : <span className='text-lg font-normal'>{listaCompra.total}</span> </span>
                    </div>

                    <div
                        className='
                            //bg-indigo-500
                            w-full
                            h-full
                            flex flex-col
                            mt-3
                        '
                    >
                        <button
                            className='
                               bg-orange-500
                               h-10
                               w-1/2
                               ml-16
                               rounded-xl
                               text-white
                               text-uppercase
                               text-xs	
                               font-semibold
                            '
                            onClick={() => {
                                console.log(listaCompra)
                            }}
                        >
                            registrar compra
                        </button>
                    </div>
                </div>


            </div>
        </>
    )
}

export { RegistroCompras }