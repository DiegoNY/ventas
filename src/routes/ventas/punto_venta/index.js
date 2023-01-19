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

function PuntoVenta() {
    //Estados

    const [venta, setVenta] = React.useState({

        tipo_documento: '',
        productos: [],
        serie: '',
        total: 0,
        subtotal: 0,
        igv: 0,
        identificacion: '',
        cliente: '',
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

    const generarSerie = (serie) => {

        const numeroFactura = `${serie} - 000001`;
        setVenta({ ...venta, serie: numeroFactura })

    }

    //socket este activo debe enviar el id del producto 
    const actualizarStock = async (id) => {

        const stock = 'stock'

        productos.map(producto => {
            if (producto._id = id)
                producto.stock = stock;
            setProductos([{ ...productos }, producto])
        })

    }


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

    console.log(venta);


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
                            <h1 className='ml-2  text-lg font-semibold'>
                                Datos Necesarios
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
                                        class="mt-1 form-control  font-mono block w-full rounded-md h-8 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        onChange={(e) => generarSerie(e.target.value)}
                                    >
                                        <option>SELECCIONE</option>
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
                                    <input
                                        type={'number'}
                                        className="
                                            mt-1 
                                            form-control  
                                            font-mono 
                                            block 
                                            w-full 
                                            rounded-md 
                                            h-8 
                                            border-gray-300 
                                            shadow-sm 
                                            focus:border-indigo-500 
                                            focus:ring-indigo-500 
                                            sm:text-sm
                                        "
                                        onChange={(e) => {
                                            let identificacion = e.target.valueAsNumber
                                            setVenta({ ...venta, identificacion: identificacion })
                                        }}
                                    />
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
                                        type="text"
                                        className="
                                            mt-1 
                                            form-control  
                                            block w-full 
                                            h-8 
                                            rounded-md 
                                            border-gray-300 
                                            shadow-sm 
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
                                        150
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
                                placeholder=' Busca un producto ... '
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
                                                    {producto.descripcion} ({producto.id_laboratorio})
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
                                                    <input
                                                        placeholder='Cantidad'
                                                        className='
                                                           w-1/2
                                                        '
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <input
                                                        placeholder='Precio'
                                                        className='
                                                            w-1/2
                                                        '
                                                    />
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