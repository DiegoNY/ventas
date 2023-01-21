import React, { useEffect } from 'react';
import { Titulo } from '../../../ui/titulos-vistas';
import './index.css'
import { getData } from '../../useFetch';
import { urlAPI } from '../../../config';
import { Modal } from '../../../ui/modal';
import iconoMoneda from './img/icono-monedas.svg';
import iconoticket from './img/icono-ticket.svg';
import iconopdf from './img/icono-pdf.svg';
import iconotarjeta from './img/icono-tarjeta-credito.svg';
import iconosol from './img/icono-sol.svg';
import iconodolar from './img/icono-dolar.svg';
import { TablaTalwindCss } from '../../../ui/Tabla/useTabla';
import { TableCell } from '../../../ui/Tabla/tableCell';
import { TablaRow } from '../../../ui/Tabla/tableRow';
import imagenagregarclientes from './img/icono-agregar-cliente.svg';

function PuntoVenta() {
    //Estados

    const [venta, setVenta] = React.useState({

        tipo_documento: '',
        productos: [],
        serie: 'XXXX-XXXXXXX',
        total: 0,
        subtotal: 0,
        igv: 0,
        identificacion: '00000000',
        cliente: 'CLIENTES VARIOS',
        tipo_impresion: '',
        tipo_moneda: '',
        forma_pago: '',

    });
    const [tipoDocumento, setTipoDocumento] = React.useState([]);
    const [productos, setProductos] = React.useState([]);
    const [search, setSearch] = React.useState(false);
    const [stock, setStock] = React.useState([]);
    const [idsCompras, setIdesCompras] = React.useState({
        id: 1
    });
    const [searchProducto, setSearchProducto] = React.useState('');




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

    const GenerarSerie = (serie) => {

        const numeroFactura = `${serie} - 000001`;
        setVenta({ ...venta, serie: numeroFactura })

    }

    //socket este activo debe enviar el id del producto 
    const ActualizarStock = async (id, stock_venta) => {


        const stock = 'stock';
        productos.map(producto => {
            if (producto._id = id)
                producto.stock = stock;
            setProductos([{ ...productos }, producto])
        })

    }

    const obtenerCantidadCompra = (cantidad, cantidadesMedida) => {
        const cantidad_comprada_String = cantidad.toUpperCase();
        const cantidad_comprada_Array = cantidad_comprada_String.split('-');
        const cantidad_comprada = cantidad_comprada_Array[1];
        const MEDIDA = cantidad_comprada_Array[0];

        // console.log(cantidad_comprada_String);
        // console.log(cantidad_comprada_Array);
        // console.log(cantidadesMedida);

        if (MEDIDA == cantidadesMedida.CAJA.MEDIDA) {
            return { MEDIDA: MEDIDA, CANTIDAD: cantidad_comprada * cantidadesMedida.CAJA.CANTIDAD, CANTIDAD_COMPRA: cantidad_comprada };
        }
        if (MEDIDA == cantidadesMedida.UNIDAD.MEDIDA) {
            return { MEDIDA: MEDIDA, CANTIDAD: cantidad_comprada, CANTIDAD_COMPRA: cantidad_comprada };
        }
        if (MEDIDA == cantidadesMedida.TABLETA.MEDIDA) {
            return { MEDIDA: MEDIDA, CANTIDAD: cantidad_comprada * cantidadesMedida.TABLETA.CANTIDAD, CANTIDAD_COMPRA: cantidad_comprada };
        }


    }

    const obtenerTotalCompraProducto = (cantidad, medidaPrecio) => {

        const MEDIDA = cantidad?.MEDIDA;
        const CANTIDAD = cantidad?.CANTIDAD_COMPRA;


        if (MEDIDA == medidaPrecio.CAJA.MEDIDA) {
            console.log(medidaPrecio.CAJA.PRECIO);
            let total = CANTIDAD * medidaPrecio.CAJA.PRECIO;
            return total;
        }

        if (MEDIDA == medidaPrecio.UNIDAD.MEDIDA) {
            console.log(medidaPrecio.UNIDAD.PRECIO);
            let total = CANTIDAD * medidaPrecio.UNIDAD.PRECIO;
            return total;
        }

        if (MEDIDA == medidaPrecio.TABLETA.MEDIDA) {
            console.log(medidaPrecio.TABLETA.PRECIO);
            let total = CANTIDAD * medidaPrecio.TABLETA.PRECIO;
            return total;
        }

    }

    const ModificarTotalGlobla = () => {
        let total = 0;

        venta.productos.map(producto => {
            total += producto.total;
        })

        venta.total = total;
    }

    const ModificadorTotalCantidad = (id, cantidad) => {
        let MEDIDA = '';


        venta.productos.map(producto => {


            if (producto._id == id) {

                producto.cantidad = cantidad;

                const cantidad_medida_precio = {
                    CAJA: { MEDIDA: 'C', CANTIDAD: Number(producto?.stock_caja), PRECIO: Number(producto?.precio_venta_caja) },
                    TABLETA: { MEDIDA: 'T', CANTIDAD: Number(producto?.stock_tableta), PRECIO: Number(producto?.precio_venta_tableta) },
                    UNIDAD: { MEDIDA: 'U', CANTIDAD: 1, PRECIO: Number(producto?.precio_venta) }
                }
                const cantidad_comprada = obtenerCantidadCompra(cantidad, cantidad_medida_precio)
                const total = obtenerTotalCompraProducto(cantidad_comprada, cantidad_medida_precio);
                MEDIDA = cantidad_comprada?.MEDIDA;
                // const precio = obtenerPrecioCompraMedida(MEDIDA);

                //obtener precio
                for (let key in cantidad_medida_precio) {
                    if (cantidad_medida_precio[key].MEDIDA == MEDIDA) {
                        producto.precio = cantidad_medida_precio[key].PRECIO;
                    }
                }
                producto.cantidad_comprada = cantidad_comprada.CANTIDAD_COMPRA;
                producto.stock_vendido = cantidad_comprada?.CANTIDAD;
                producto.total = total;
            }



        })

        ModificarTotalGlobla();

        setVenta({
            ...venta,
        })

        return MEDIDA;

    }

    const ModificarTotalPrecio = (id, valor) => {
        venta.productos.map(producto => {

            if (producto._id == id) {
                const total = producto.cantidad_comprada * valor
                producto.total = total;
            }
        });

        ModificarTotalGlobla();

        return setVenta({
            ...venta,
        });
    }
    //Funciones complementarias
    /**
    * Recibe el producto seleccionado y cambia el estado de la
    * listaProductosSeleccionados 📖 pero no la borra solo agrega el producto 
    * y le ingresa un id que es el id_compra del producto
    * @param {*} producto un objeto con los datos del producto
    */
    const obteniendoProductoSeleccionado = (producto) => {


        setVenta({ ...venta, productos: [...venta.productos, { ...producto, id_compra: idsCompras.id }] });
        setIdesCompras({ id: idsCompras.id + 1 })

    }


    //Sucedera cuando se realiza una venta esto sera emitido a todos los clientes 
    //el socket tiene que enviar el id del producto y el Stock actual ;

    useEffect(() => {
        console.log('Se ejecuto');
        // actualizarStock('63bda472a1f3353740beaec2');

    }, [stock])

    //Obtencion de data Necesaria

    useEffect(() => {

        const obtenerTiposDocumentos = async () => {
            const data = await getData(`${urlAPI.TipoDocumento.url}`);
            setTipoDocumento(data);
        }

        obtenerTiposDocumentos();

        const obtenerProductos = async () => {

            const data = await getData(`${urlAPI.Producto.url}`);
            console.log(data);
            setProductos(data);
        }

        obtenerProductos();


    }, [])




    return (
        <>
            <div
                className='
                    grid
                    grid-cols-6 
                    sm:grid-cols-12
                    sm:grid-rows-6
                    h-screen
                '
            >

                <div
                    className='
                        //bg-indigo-500
                        col-span-6
                        sm:col-span-5
                        row-span-6
                        grid
                        grid-cols-12
                        grid-rows-6
                    '
                >
                    <div
                        className='
                            //bg-yellow-500
                            col-span-12
                            mx-2
                            my-2
                        '
                    >

                        <Titulo
                            title={'Punto venta '} navegacion={'Ventas'} icono={'fi fi-rs-shop'}
                        />

                    </div>

                    <div
                        className='
                            //bg-red-500
                            col-span-12
                            row-span-6
                            mx-2
                            grid
                            grid-cols-12
                            grid-rows-6
                        '
                    >
                        <div
                            className='
                                //bg-yellow-300
                                col-span-12
                                mx-2
                                grid
                                content-center
                            '
                        >
                            <h1 className='ml-2  text-lg text-slate-400 font-'>
                                Datos necesarios
                            </h1>
                        </div>

                        <div
                            className='
                                //bg-red-200
                                col-span-12
                                row-span-4
                                mx-2
                                grid
                                grid-rows-4
                                grid-cols-4

                            '
                        >
                            <div
                                className='
                                    //bg-indigo-500
                                    col-span-4
                                    mx-2
                                    mt-2
                                    flex
                                    
                                '
                            >
                                <div
                                    className='
                                        w-full
                                        mr-2
                                    '
                                >
                                    <h1
                                        for="first-name"
                                        class="block text-xs  text-gray-700"
                                    >
                                        Tipo de documento
                                    </h1>
                                    <select
                                        type="text"
                                        class="mt-1 form-control  font-mono block w-full rounded-md h-8 border-gray-300  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        onChange={(e) => GenerarSerie(e.target.value)}
                                    >
                                        <option  >SELECCIONE</option>
                                        {tipoDocumento.map(tp => {
                                            return <option
                                                value={`${tp.serie}`}
                                            >
                                                {
                                                    tp.nombre == 'BOLETA ELECTRONICA' && 'BOLETA' ||
                                                    tp.nombre == 'FACTURA ELECTRONICA' && 'FACTURA' ||
                                                    'TICKET'
                                                }
                                                ({tp.serie})
                                            </option>
                                        })}
                                    </select>
                                </div>

                                <div
                                    className='
                                        w-full
                                    '
                                >
                                    <span
                                        className="block text-xs  text-gray-700"
                                    >
                                        Dni / Ruc
                                    </span>
                                    <div
                                        className='
                                            flex
                                        '
                                    >
                                        <input
                                            type={'number'}
                                            value={venta?.identificacion}
                                            className="
                                            mt-1 
                                            form-control  
                                            font-mono 
                                            block 
                                            w-full 
                                            rounded-md 
                                            h-8 
                                            border-gray-300 
                                            focus:border-indigo-500 
                                            focus:ring-indigo-500 
                                            sm:text-sm
                                        "
                                            onChange={(e) => {
                                                let identificacion = e.target.valueAsNumber
                                                setVenta({ ...venta, identificacion: identificacion })
                                            }}
                                        />
                                        <img
                                            src={imagenagregarclientes}
                                            className='
                                                h-4
                                                mt-2
                                                ml-2
                                                cursor-pointer

                                            '
                                        />
                                    </div>

                                </div>

                            </div>
                            <div
                                className='
                                    //bg-indigo-400
                                    col-span-4
                                    mx-2
                                    flex
                                '
                            >
                                <div
                                    className='
                                        w-full
                                    '
                                >
                                    <span
                                        className="
                                            block 
                                            text-xs 
                                            font-medium 
                                            text-gray-700
                                        "
                                    >
                                        Cliente
                                    </span>

                                    <input
                                        value={venta?.cliente}
                                        type="text"
                                        className="
                                            mt-1 
                                            form-control  
                                            block w-full 
                                            h-8 
                                            rounded-md 
                                            border-gray-300 
                                            focus:border-indigo-500 
                                            focus:ring-indigo-500 
                                            sm:text-sm
                                        "
                                        onChange={(e) => {
                                            let cliente = e.target.value;

                                            setVenta({ ...venta, cliente: cliente })
                                        }}
                                    />

                                </div>
                                <div
                                    className='flex flex-col justify-center'
                                >
                                    <span
                                        className='
                                            text-xs
                                            ml-2
                                            mb-0
                                        '
                                    >
                                        Impresion
                                    </span>
                                    <div
                                        className='
                                            flex
                                            
                                        '
                                    >
                                        <div
                                            className='
                                            p-1 
                                            text-center 
                                            ml-2 
                                            hover:text-gray-500 
                                            flex
                                            cursor-pointer 
                                            w-full
                                        '
                                        >

                                            <input
                                                type={'checkbox'}
                                                value={'TICKET'}
                                                className='
                                                 mr-1
                                                 mb-3
                                                '
                                                onChange={(e) => {
                                                    let ticket = e.target.value;
                                                    setVenta({ ...venta, tipo_impresion: ticket })
                                                }}
                                            />
                                            <span
                                                className='
                                                text-xs 
                                                
                                            '
                                            >
                                                Ticket
                                            </span>

                                            <img
                                                src={iconoticket}
                                                className='
                                                ml-1
                                                 
                                                h-3
                                            '
                                            />

                                        </div>
                                        <div
                                            className='
                                            p-1 
                                            text-center 
                                            ml-2 
                                            hover:text-gray-500 
                                            cursor-pointer
                                            flex
                                        '
                                        >
                                            <input
                                                type={'checkbox'}
                                                value={'PDF'}
                                                className='
                                                mr-1
                                                mb-3
                                            '
                                                onChange={(e) => {
                                                    let pdf = e.target.value(e)
                                                    setVenta({ ...venta, tipo_impresion: pdf })
                                                }}
                                            />
                                            <span
                                                className='
                                                text-xs
                                                
                                            '
                                            >
                                                PDF
                                            </span>
                                            <img
                                                src={iconopdf}
                                                className='
                                                ml-1 
                                                h-3
                                                
                                            '
                                            />
                                        </div>
                                    </div>



                                </div>

                            </div>
                            <div
                                className='
                                    //bg-indigo-300
                                    col-span-4
                                    mx-2
                                    flex
                                
                                '
                            >
                                <div
                                    className='flex flex-col justify-center mr-3'
                                >
                                    <span
                                        className='
                                            text-xs
                                            ml-2
                                            mb-0
                                        '
                                    >
                                        Moneda
                                    </span>
                                    <div
                                        className='
                                            flex
                                            
                                        '
                                    >
                                        <div
                                            className='
                                            p-1 
                                            text-center 
                                            ml-2 
                                            hover:text-gray-500 
                                            flex
                                            cursor-pointer 
                                            w-full
                                        '
                                        >

                                            <input
                                                type={'checkbox'}
                                                value={'SOLES'}
                                                className='
                                             mr-1
                                             mb-3
                                            '
                                                onChange={(e) => {
                                                    let soles = e.target.value;
                                                    setVenta({ ...venta, tipo_moneda: soles })
                                                }}
                                            />
                                            <span
                                                className='
                                                text-xs 
                                                
                                            '
                                            >
                                                Soles
                                            </span>

                                            <img
                                                src={iconosol}
                                                className='
                                                ml-1
                                                h-4
                                            '
                                            />

                                        </div>
                                        <div
                                            className='
                                            p-1 
                                            text-center 
                                            ml-2 
                                            hover:text-gray-500 
                                            cursor-pointer
                                            flex
                                        '
                                        >
                                            <input
                                                type={'checkbox'}
                                                value={'DOLARES'}
                                                className='
                                                mr-1
                                                mb-3
                                            '
                                                onChange={(e) => {
                                                    let dorales = e.target.value;
                                                    setVenta({ ...venta, tipo_moneda: dorales })
                                                }}
                                            />
                                            <span
                                                className='
                                                text-xs
                                                
                                            '
                                            >
                                                Dolares
                                            </span>
                                            <img
                                                src={iconodolar}
                                                className='
                                                ml-1 
                                                h-3
                                                
                                            '
                                            />
                                        </div>
                                    </div>



                                </div>
                                <div
                                    className='flex flex-col justify-center'
                                >
                                    <span
                                        className='
                                            text-xs
                                            ml-2
                                            mb-0
                                        '
                                    >
                                        Forma pago
                                    </span>
                                    <div
                                        className='
                                            flex
                                            
                                        '
                                    >
                                        <div
                                            className='
                                            p-1 
                                            text-center 
                                            ml-2 
                                            hover:text-gray-500 
                                            flex
                                            cursor-pointer 
                                            w-full
                                        '
                                        >

                                            <input
                                                type={'checkbox'}
                                                value={'EFECTIVO'}
                                                className='
                                             mr-1
                                             mb-3
                                            '
                                                onChange={(e) => {
                                                    let formapago = e.target.value;
                                                    setVenta({ ...venta, forma_pago: formapago })
                                                }}
                                            />
                                            <span
                                                className='
                                                text-xs 
s                                                '
                                            >
                                                Efectivo
                                            </span>

                                            <img
                                                src={iconoMoneda}
                                                className='
                                                ml-1
                                                h-4
                                            '
                                            />

                                        </div>
                                        <div
                                            className='
                                            p-1 
                                            text-center 
                                            ml-2 
                                            hover:text-gray-500 
                                            cursor-pointer
                                            flex
                                        '
                                        >
                                            <input
                                                type={'checkbox'}
                                                value={'CREDITO'}
                                                className='
                                                mr-1
                                                mb-3
                                            '
                                                onChange={(e) => {

                                                }}
                                            />
                                            <span
                                                className='
                                                text-xs
                                                
                                            '
                                            >
                                                Credito
                                            </span>
                                            <img
                                                src={iconotarjeta}
                                                className='
                                                ml-1 
                                                h-3
                                                
                                            '
                                            />
                                        </div>
                                    </div>



                                </div>
                            </div>
                            <div
                                className='
                                    //bg-indigo-200
                                    col-span-4
                                    mt-2
                                    mx-2
                                    flex
                                   
                                    justify-center
                                '
                            >
                                <span
                                    className='
                                       text-lg
                                       font-semibold
                                       mx-2
                                    '
                                >
                                    Subtotal :
                                    <span
                                        className='
                                            font-normal
                                        '
                                    >
                                        123
                                    </span>
                                </span>
                                <span
                                    className='
                                        text-lg
                                        font-semibold
                                        mx-2
                                    '
                                >
                                    IGV :
                                    <span
                                        className='
                                            font-normal
                                        '
                                    >
                                        6.00
                                    </span>
                                </span>
                                <span
                                    className='
                                       text-lg
                                       font-semibold
                                       mx-2
                                    '
                                >
                                    Total :
                                    <span
                                        className='
                                            font-normal
                                        '
                                    >
                                        {venta?.total}
                                    </span>
                                </span>
                            </div>

                        </div>

                        <div
                            className='
                                //bg-indigo-200
                                col-span-12
                                mx-4
                                my-3
                                flex
                                justify-center
                            '
                        >
                            <button
                                className='
                                bg-orange-500
                                rounded-xl	
                                w-1/2
                                text-white
                              '
                            >
                                Emitir venta
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className='
                        //bg-orange-500
                        col-span-6
                        sm:col-span-7
                        sm:row-span-6
                        grid
                        grid-cols-12
                        grid-rows-6

                    '
                >
                    <div
                        className='
                            col-span-12
                            row-start-2
                            row-span-5
                            //bg-indigo-500
                            grid
                            grid-cols-6
                            grid-rows-6
                        '
                    >
                        <div
                            className='
                                //bg-red-500
                                col-span-6
                                my-2
                                mx-1
                                flex
                                justify-between
                            '
                        >
                            <input
                                className='
                                     w-1/2
                                     h-8
                                     mx-3
                                     mt-4
                                     form-control
                                    '
                                placeholder=' Busca un producto ... 💊'
                                onFocus={() => setSearch(!search)}
                                onChange={(e) => {
                                    setSearchProducto(e.target.value)
                                    setSearch(true);
                                }}
                            />
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
                                        ml-3
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
                                                    {producto.descripcion} ( {producto.id_laboratorio} ) | STOCK : {producto.stock}
                                                </div>
                                            </>
                                        )

                                    })

                                    }

                                </div>
                            }
                            <div
                                className='
                                    text-xl 
                                    text-slate-400
                                    proportional-nums
                                    mt-4
                                    mx-2
                                '
                            >
                                {venta?.serie}
                            </div>
                        </div>

                        <div
                            className='
                                //bg-yellow-400
                                col-span-6
                                row-span-5
                                mx-3
                                mb-2
                                flex
                                flex-col
                                h-96
                            '
                        >



                            <TablaTalwindCss
                                headers={[
                                    { name: 'Codigo' },
                                    { name: 'Producto' },
                                    { name: 'Laboratorio' },
                                    { name: 'Lote' },
                                    { name: 'Fecha vencimiento' },
                                    { name: 'Cantidad' },
                                    { name: 'Precio' },
                                    { name: 'Total' },
                                ]}
                            >

                                {venta.productos.map(producto => {


                                    return (
                                        <>
                                            <TablaRow TablaRow >
                                                <TableCell>
                                                    {producto.codigo_barras}
                                                </TableCell>
                                                <TableCell>
                                                    {producto.descripcion}
                                                </TableCell>
                                                <TableCell>
                                                    {producto.id_laboratorio}
                                                </TableCell>
                                                <TableCell>
                                                    {producto.lote}
                                                </TableCell>
                                                <TableCell>
                                                    {producto.fecha_vencimiento}
                                                </TableCell>
                                                <TableCell>
                                                    <textarea
                                                        defaultValue={producto?.stock}
                                                        cols={'8'}
                                                        rows={'1'}
                                                        onChange={(e) => {




                                                            const medida = ModificadorTotalCantidad(producto._id, e.target.value);




                                                        }}

                                                    ></textarea>
                                                </TableCell>
                                                <TableCell>
                                                    <textarea
                                                        defaultValue={producto?.precio}
                                                        cols={'8'}
                                                        rows={'1'}
                                                        onChange={(e) => {

                                                            ModificarTotalPrecio(producto._id, e.target.value);

                                                        }}

                                                    ></textarea>
                                                </TableCell>
                                                <TableCell>
                                                    {producto.total}
                                                </TableCell>
                                            </TablaRow>
                                        </>
                                    )


                                })
                                }

                            </TablaTalwindCss>

                        </div>
                    </div>
                </div>

            </div>

        </>
    );

}



export { PuntoVenta }