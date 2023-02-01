import React, { useEffect } from 'react';
import { Titulo } from '../../../ui/titulos-vistas';
import './index.css'
import { getData } from '../../useFetch';
import { hostAPI, socket, urlAPI } from '../../../config';
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
import img_registro from '../../img/mantenimiento-img/img-registro-cliente.png';
import { SaveData } from '../../useCRUD';
import { generarSerieVenta } from './useSerie';
import { Delete } from '../../useAlert';
import simbolo_alerta_warning from './img/simbolo-alerta-warning.png';
import { Informacion } from '../../../ui/Error';
import { useAuth } from '../../../auth/auth';
import { useNavigate } from 'react-router';
import { DataGrid, esES } from '@mui/x-data-grid';



function PuntoVenta() {
    //Estados

    const auth = useAuth();
    const navigation = useNavigate();
    console.log(auth);

    if (!auth.user) navigation('/');

    const [venta, setVenta] = React.useState({

        tipo_documento: '',
        productos: [],
        numero_venta: 'XXXX-XXXXXXXX',
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

    const [cliente, setCliente] = React.useState({});
    const [loading, setLoading] = React.useState();
    const [correlativo, setSerieComplementaria] = React.useState('0000030');
    const [verMas, setVermas] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [idProductoEnfocado, setIdProductoEnfocado] = React.useState(0);



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
        searchProductos = productos?.filter(producto => {
            const productoText = `${producto?.descripcion?.toLowerCase()}${producto?.id_laboratorio?.toLowerCase()}`;

            const searchText = searchProducto.toLowerCase();

            return productoText?.includes(searchText);
        })
    }

    //Informacion para la tabla Datagrid 

    const columns = [
        {
            field: 'codigo_barras',
            headerName: 'Codigo',
            headerClassName: 'font-bold text-xs',
            flex: 0.1,

        },
        {
            field: 'descripcion',
            headerName: 'Producto',
            headerClassName: 'font-bold text-xs',
            flex: 0.1,

        },
        {
            field: 'lote',
            headerName: 'Laboratorio',
            headerClassName: 'font-bold text-xs',
            flex: 0.1,

        },
        {
            field: 'fecha_vencimiento',
            headerName: 'Fecha vencimiento',
            headerClassName: 'font-bold text-xs',
            flex: 0.2,

        },
        {
            field: 'cantidad',
            headerName: 'Cantidad',
            headerClassName: 'font-bold text-xs',
            flex: 0.1,
            renderCell: (params) => {
                // console.log(params)
                return (
                    <textarea
                        cols={'8'}
                        defaultValue={params.row?.cantidad_comprada}
                        rows={'1'}
                        onChange={(e) => {
                            // console.log(producto);
                            // if (e.target.value > producto.cantidad) console.log("La cantidad solicitadad no esta disponible");
                            ModificadorTotalCantidad(params.row.id_compra, e.target.value);

                        }}

                    ></textarea>
                )
            }

        },
        {
            field: 'precio',
            headerName: 'Precio',
            headerClassName: 'font-bold text-xs',
            flex: 0.1,
            renderCell: (params) => {
                // console.log(params)
                return (
                    <textarea
                        defaultValue={params.row?.precio}
                        cols={'8'}
                        rows={'1'}
                        onChange={(e) => {

                            ModificarTotalPrecio(params.row?.id_compra, e.target.value);

                        }}

                    ></textarea>
                )
            }

        },
        {
            field: 'total',
            headerName: 'Total',
            headerClassName: 'font-bold text-xs',
            flex: 0.1,

        },

    ]


    //Funciones 


    //socket este activo debe enviar el id del producto 
    const ActualizarStock = async (id, stock_vendido) => {

        venta.productos.map(producto => {
            if (producto._id = id)
                producto.stock = producto.stock - stock_vendido;
        })

    }

    const obtenerCantidadCompra = (cantidad, cantidadesMedida) => {
        const cantidad_comprada_String = cantidad.toUpperCase();
        const cantidad_comprada_Array = cantidad_comprada_String.split('-');
        const cantidad_comprada = cantidad_comprada_Array[1];
        const MEDIDA = cantidad_comprada_Array[0];

        console.log(cantidad_comprada_String);
        console.log(cantidad_comprada_Array);
        console.log(cantidadesMedida);
        console.log(cantidad_comprada);


        if (MEDIDA == cantidadesMedida.CAJA.MEDIDA) {
            return {
                MEDIDA: MEDIDA,
                CANTIDAD: cantidad_comprada * cantidadesMedida.CAJA.CANTIDAD,
                CANTIDAD_COMPRA: cantidad_comprada
            };
        }
        if (MEDIDA == cantidadesMedida.UNIDAD.MEDIDA) {
            return {
                MEDIDA: MEDIDA,
                CANTIDAD: cantidad_comprada,
                CANTIDAD_COMPRA: cantidad_comprada
            };
        }
        if (MEDIDA == cantidadesMedida.TABLETA.MEDIDA) {
            return {
                MEDIDA: MEDIDA,
                CANTIDAD: cantidad_comprada * cantidadesMedida.TABLETA.CANTIDAD,
                CANTIDAD_COMPRA: cantidad_comprada
            };
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


            if (producto.id_compra == id) {

                producto.cantidad = cantidad;

                const cantidad_medida_precio = {
                    CAJA: {
                        MEDIDA: 'C',
                        CANTIDAD: Number(producto?.stock_caja),
                        PRECIO: Number(producto?.precio_venta_caja)
                    },
                    TABLETA: {
                        MEDIDA: 'T',
                        CANTIDAD: Number(producto?.stock_tableta),
                        PRECIO: Number(producto?.precio_venta_tableta)
                    },
                    UNIDAD: {
                        MEDIDA: 'U',
                        CANTIDAD: 1,
                        PRECIO: Number(producto?.precio_venta)
                    },
                }

                const cantidad_comprada = obtenerCantidadCompra(cantidad, cantidad_medida_precio)
                const total = obtenerTotalCompraProducto(cantidad_comprada, cantidad_medida_precio);
                MEDIDA = cantidad_comprada?.MEDIDA;
                // const precio = obtenerPrecioCompraMedida(MEDIDA);

                if (cantidad_comprada.CANTIDAD > producto.stock) {

                    producto.cantidad_comprada = '';

                    setError({
                        producto: producto.descripcion,
                        codigo: producto.codigo_barras,
                        stock: producto.stock,
                        stock_caja: producto.stock / producto.stock_caja,
                        stock_tableta: producto.stock / producto.stock_tableta,
                        tabletas_caja: producto.stock_caja / producto.stock_tableta,
                        unidades_tableta: producto.stock_tableta,
                    })

                }
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

            if (producto.id_compra == id) {
                const total = producto.cantidad_comprada * valor
                producto.total = total;
            }
        });

        ModificarTotalGlobla();

        return setVenta({
            ...venta,
        });
    }


    const ObtenerObtenerSubtotalIgv = () => {

    }

    //Funciones complementarias

    /**
    * Recibe el producto seleccionado y cambia el estado de la
    * listaProductosSeleccionados 📖 pero no la borra solo agrega el producto 
    * y le ingresa un id que es el id_compra del producto
    * @param {*} producto un objeto con los datos del producto
    */
    const obteniendoProductoSeleccionado = (producto) => {

        if (producto.stock == 0) console.log("Stock es de 0 producto no puede ser vendido");

        setVenta({
            ...venta,
            productos: [
                ...venta.productos,
                {
                    ...producto,
                    id_compra: idsCompras.id,
                    precio: '',
                    medida: 'U'
                }
            ]
        });
        setIdesCompras({ id: idsCompras.id + 1 });

    }


    const saveClient = async (event) => {
        event.preventDefault();
        const response = await SaveData(`${urlAPI.Cliente.url}`, cliente);
        console.log(response);

    }

    const searchCliente = async (dataParam) => {

        /**
             * Parametros que cambiaran
             */
        let descripcion = "";
        let direccion = "";
        let tipoIdentifiacion = 'DNI';
        let identificacion = '01';
        let queryParametro = 'dni';

        /**
         * Validando si es ruc o Dni
         */
        let dataNumber = dataParam.split('').map(Number);

        /**
         * Asignando el tipo de peticion
         */
        if (dataNumber.length == 12 || dataNumber.length == 11) {

            tipoIdentifiacion = 'RUC';
            queryParametro = 'ruc';
            identificacion = '06';

        }

        let url = `${hostAPI}/api/v1/procesos?peticion=SUNAT&descripcion=${tipoIdentifiacion}&${queryParametro}=`;



        const response = await fetch(`${url}${dataParam}`, {
            method: 'GET'
        })

        const data = await response.json();

        /**
        * Fin de tipo peticion / Inicio de carga de datos 
        */

        descripcion = data.Response.nombre;
        direccion = data.Response.direccion;


        /**
         * Mostrando los datos obtenidos
         */
        console.log("no debi ejecutarme")

        setCliente({
            ...cliente,
            descripcion: descripcion,
            direccion: direccion,
            tipo_identificacion: tipoIdentifiacion,
        })

    }

    const emitirVenta = async () => {
        const response = await SaveData(`${urlAPI.Venta.url}`, venta);
        console.log(response);

    }

    const obtenerInformacionClientesRegistrados = async (identificacion) => {

        const response = await getData(`${urlAPI.Cliente.url}?id=${identificacion}&identificacion=true`);
        if (!response[0].body.length) {

            setVenta({
                ...venta,
                identificacion: identificacion,
                cliente: 'CLIENTES VARIOS'
            })

        };

        if (response[0].body.length != 0) {
            console.log(response);
            setVenta({
                ...venta,
                identificacion: response[0]?.body[0]?.dni,
                cliente: response[0]?.body[0]?.descripcion,
            })
        }


    }

    /**
     * Funcion que recibe la serie seleccionada por el usuario
     * actualizando el numero de venta con el ultimo correlativo incrementado 
     * solo se activa cuando selecciona el numero de serie
     * @param {*} serie 
     */
    const obtenerNumerosVentas = async (serie) => {

        const numeros_ventas = await getData(`${urlAPI.Numeros_ventas.url}`);

        //Array que contiene todos los numerosVentas que coincidan con la serie seleccionada
        let numeros_ventasEncontrados = [];

        numeros_ventas.map(numeros_venta => {
            if (serie == numeros_venta.serie) {
                numeros_ventasEncontrados.push(numeros_venta)
            }
        })

        //Se afirma que el objeta en la ultima posicion del arreglo siempre sera la ultima venta emitida 

        let ultimoNumeroIngresado = numeros_ventasEncontrados[numeros_ventasEncontrados.length - 1];
        if (serie == ultimoNumeroIngresado?.serie) {

            const informacionSerie = generarSerieVenta(ultimoNumeroIngresado.numero);
            setSerieComplementaria(informacionSerie.serie);

            setVenta({
                ...venta,
                numero_venta: `${informacionSerie.tipo_documento}-${informacionSerie.serie}`,
                serie: informacionSerie.tipo_documento,
                correlativo: informacionSerie.serie,
            });

        } else {

            setVenta({
                ...venta,
                numero_venta: `${serie}-00000001`,
                serie: serie,
                correlativo: '00000001',
            });

        }


    }

    const actualizarStockProductosEnCarrito = (productosVendidos) => {

        productosVendidos?.map(productoVenta => {
            // console.log(productoVenta);
            // console.log('Producto ventas');

            venta.productos.map(productoCarrito => {

                if (productoCarrito._id == productoVenta._id) {
                    // console.log('Se encontro el producto que esta en el carrito')
                    productoCarrito.stock = productoCarrito.stock - productoVenta.stock_vendido;
                    // console.log(productoCarrito);
                    if (productoCarrito.stock < Number(productoCarrito.cantidad_comprada)) {
                        setError({
                            producto: productoCarrito.descripcion,
                            stock: productoCarrito.stock,
                            stock_caja: productoCarrito.stock / productoCarrito.stock_caja,
                            stock_tableta: productoCarrito.stock / productoCarrito.stock_tableta
                        })

                        productoCarrito.cantidad_comprada = '';
                        // throw Error('Cantidad solicita no esta disponible');
                    }

                }

            })

        })

    }

    const limpiarVenta = () => {

    }
    //Funcion para imprimir pdf 
    const printComponent = () => {
        const printWindow = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
        printWindow.document.write(`
          <html>
            <head>
              <style>
                /* Estilos para la hoja de impresión */
              </style>
            </head>
            <body>
              <div>
                <MyComponent />
                Imprimir esto 👀
              </div>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    };


    //Obtencion de data Necesaria

    //obtiene los tipos de documentos y actualiza el valor global
    useEffect(() => {

        const obtenerTiposDocumentos = async () => {
            const data = await getData(`${urlAPI.TipoDocumento.url}`);
            setTipoDocumento(data);
        }

        obtenerTiposDocumentos();


    }, [])

    //Obtiene los productos cada que el stock se modifique
    useEffect(() => {

        /**
         * Funcion que obtiene todos los productos para la venta
         * ingresa los productos al estado global actualizando 
         * la informacion de los productos 👀
         */
        const obtenerProductos = async () => {

            const data = await getData(`${urlAPI.Producto.url}?ventas=true`);
            // console.log(data);
            setProductos(data);
        }

        obtenerProductos();

    }, [stock])


    useEffect(() => {
        /**
         * Funcion recibe la informacion que se envia una vez registrada la venta
         * se ingresa la serie complementaria 
         * se actualiza el numero de venta  y la serie y correlativo
         * @param {*} data objeto con informacion  enviada en registro desde el servidor
         */
        const obtenerData = (data) => {
            //actualizando los productos
            actualizarStockProductosEnCarrito(data.productos);


            const informacionSerie = generarSerieVenta(data.numero_venta);
            // console.log(informacionSerie);
            // console.log(venta.serie);

            if (venta.serie == data.serie) {
                setVenta({
                    ...venta,
                    numero_venta: `${informacionSerie.tipo_documento}-${informacionSerie.serie}`,
                    serie: informacionSerie.tipo_documento,
                    correlativo: informacionSerie.serie,
                })
            }

            setStock(data);


        }

        /**
         * Obtiene informacion en tiempo real de las ventas
         */
        socket.on('serie_venta_uso', obtenerData)

        return () => {

            socket.off('serie_venta_uso', obtenerData);
            socket.off('connection', socket => { console.log(socket) });
        }

    }, [venta])



    return (
        <>
            <div
                className='
                    grid
                    grid-cols-6 
                    sm:grid-cols-12
                    sm:grid-rows-6
                    h-screen
                    mx-auto
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
                        mx-auto
                    '
                >
                    <div
                        className='
                            //bg-yellow-500
                            col-span-12
                            my-2
                            container-formulario-venta
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
                            w-full
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
                            <h1 className='ml-2  text-lg text-slate-800 font-black'>
                                Datos necesarios 📝
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
                                        onChange={(e) => {


                                            obtenerNumerosVentas(e.target.value);

                                            setVenta({
                                                ...venta,
                                            })

                                        }}
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
                                                let identificacion = e.target.valueAsNumber;
                                                let arrIdentificacion = String(identificacion).split('');
                                                setVenta({ ...venta, identificacion: identificacion });

                                                if (arrIdentificacion.length >= 8) {
                                                    obtenerInformacionClientesRegistrados(identificacion);
                                                }

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
                                            data-bs-toggle="modal"
                                            data-bs-target="#cliente"
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
                                                checked={true}
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
                                                checked={true}
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
                                                checked={true}
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
                                    justify-start
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
                                mx-2
                                my-3
                                flex
                                justify-end
                            '
                        >
                            <h1
                                className='
                                    mr-3 mt-1 
                                    rounded-xl 
                                    w-28 
                                    text-center 
                                    cursor-pointer 
                                    hover:border-b-2 
                                    hover:border-b-slate-400 
                                '
                                onClick={limpiarVenta}
                            >
                                Cancelar venta
                            </h1>

                            <button
                                className='
                                bg-indigo-500
                                rounded-xl	
                                w-40
                                h-9
                                text-white
                              '
                                onClick={emitirVenta}
                            >
                                <p className='italic' >Emitir venta</p>
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
                        mx-auto
                        container-derecha
                    '
                >
                    <div
                        className='
                            //bg-red-100
                            border
                            rounded-xl
                            col-span-12
                            mx-3
                            mt-2
                            flex
                            flex-col
                            
                        '
                    >

                        <h1 className=' text-xl font-bold ml-2 mt-2 '>📄  Mis Ventas</h1>
                        <div
                            className='
                                //bg-red-100
                                h-full
                                flex
                                justify-between
                            '
                        >
                            <div
                                className='
                                    mx-20
                                    flex
                                    justify-center       
                                '
                            >
                                <div
                                    className='mx-1'
                                >
                                    <p className='font-medium italic '>Cantidad : <span className='text-sm font-normal not-italic'>00</span></p>
                                    <p className='font-medium italic'>Dinero recaudado: <span className='text-sm font-normal not-italic'>S/ 00</span></p>
                                </div>
                                <div>
                                    <p className='ml-2 font-medium italic'>Gastos realizados: <span className='text-sm font-normal not-italic'>S/ 00</span></p>
                                    <p className='ml-2 font-medium italic'>Apertura caja: <span className='text-sm font-normal not-italic'>S/ 00</span></p>
                                </div>

                            </div>
                            <p
                                className='mt-3 mr-2 text-sm text-sky-300 font-bold cursor-pointer hover:text-sky-500'
                                onClick={() => setVermas(!verMas)}
                            >Ver mas </p>
                        </div>

                    </div>
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
                                    font-semibold
                                    italic
                                    text-slate-400
                                    proportional-nums
                                    mt-4
                                    mx-2
                                '
                            >
                                {venta?.numero_venta}
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

                                {venta.productos.map((producto, index) => {


                                    return (
                                        <>
                                            <TablaRow TablaRow
                                                tabIndex={index}
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                }}

                                                onKeyDown={(event) => {

                                                    //Eventes para cambiar el tipo de medida
                                                    if (event.key == 't') {
                                                        producto.medida = 'T';
                                                    }

                                                    if (event.key == 'c') {
                                                        producto.medida = 'C';
                                                    }

                                                    if (event.key == 'u') {
                                                        producto.medida = 'U';
                                                    }

                                                }}
                                            >
                                                <TableCell
                                                    className={'font-bold'}
                                                >
                                                    {producto.codigo_barras}
                                                </TableCell>
                                                <TableCell
                                                    className={'text-xs '}
                                                >
                                                    {producto.descripcion}
                                                </TableCell>
                                                <TableCell
                                                    className={'text-xs '}

                                                >
                                                    {producto.id_laboratorio}
                                                </TableCell>
                                                <TableCell
                                                    className={'text-xs '}

                                                >
                                                    {producto.lote}
                                                </TableCell>
                                                <TableCell
                                                    className={'text-xs '}
                                                >
                                                    {producto.fecha_vencimiento}
                                                </TableCell>
                                                <TableCell>
                                                    <textarea
                                                        cols={'8'}
                                                        defaultValue={producto.cantidad_comprada}
                                                        rows={'1'}
                                                        onChange={(e) => {

                                                            let cantidad = `${producto.medida}-${e.target.value}`;

                                                            ModificadorTotalCantidad(producto.id_compra, cantidad);

                                                        }}

                                                    ></textarea>
                                                </TableCell>
                                                <TableCell>
                                                    <textarea
                                                        defaultValue={producto?.precio}
                                                        cols={'8'}
                                                        rows={'1'}
                                                        onChange={(e) => {

                                                            ModificarTotalPrecio(producto.id_compra, e.target.value);

                                                        }}

                                                    ></textarea>
                                                </TableCell>
                                                <TableCell
                                                    className={'font-bold'}
                                                >
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


                <Modal
                    id={'cliente'}
                    title={'Registrar Cliente'}
                >
                    <form onSubmit={saveClient} className="modal-body p-0">

                        <div className='row'>


                            <div className='col-sm-4 mr-4 mt-5 ml-5  p-3 mb-5  rounded'>
                                <img src={img_registro} />
                            </div>

                            <div className='col-sm-6 mt-3 ml-4 shadow-sm p-3 mb-3  rounded'>

                                <table className='table mt-3 table-borderless  table-responsive-sm'>

                                    <tr >
                                        <td className='font-sans'>

                                            <span>
                                                <i class="fi fi-rr-user"></i>
                                            </span>

                                            DNI / RUC

                                        </td>
                                        <td className='font-mono'>
                                            <div className='flex p-0'>

                                                <input
                                                    value={cliente?.dni_ruc}
                                                    onChange={e => {

                                                        setCliente({
                                                            dni_ruc: e.target.value
                                                        })

                                                    }}
                                                    type='number'
                                                    placeholder='DNI / RUC'
                                                    className='
                                                        input-form
                                                        form-control 
                                                        form-control-sm
                                                        shadow-sm p-2  
                                                        rounded
                                                    '
                                                />

                                                <i
                                                    role='button'
                                                    className="
                                                        fi fi-rr-search
                                                        w-14    
                                                        text-center
                                                        mt-2
                                                    "
                                                    onClick={() => {
                                                        searchCliente(cliente.dni_ruc);
                                                        setLoading(true);
                                                    }}
                                                >

                                                </i>
                                            </div>

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
                                                placeholder=' Razon social / Nombres '
                                                className='
                                                    input-form
                                                    form-control 
                                                    form-control-sm
                                                    shadow-sm p-2  
                                                    rounded
                                                '

                                                value={cliente?.descripcion}
                                                onChange={e => {
                                                    setCliente(
                                                        {
                                                            ...cliente,
                                                            descripcion: e.target.value,
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

                                            Telefono

                                        </td>
                                        <td className='font-mono'>

                                            <input
                                                placeholder='Telefono'
                                                className='
                                                    input-form
                                                    form-control 
                                                    form-control-sm
                                                    shadow-sm p-2  
                                                    rounded
                                                '
                                                type={'number'}
                                                value={cliente?.telefono}
                                                onChange={e => {

                                                    setCliente(
                                                        {
                                                            ...cliente,
                                                            telefono: e.target.value,
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

                                            Direccion

                                        </td>
                                        <td className='font-mono'>

                                            <input
                                                placeholder='Direccion'
                                                className='
                                                    input-form
                                                    form-control 
                                                    form-control-sm
                                                    shadow-sm p-2  
                                                    rounded
                                                '
                                                value={cliente?.direccion}
                                                onChange={e => {
                                                    setCliente(
                                                        {
                                                            ...cliente,
                                                            direccion: e.target.value
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

                                            Correo

                                        </td>
                                        <td className='font-mono'>

                                            <input
                                                placeholder='Correo'
                                                className='
                                                    input-form
                                                    form-control 
                                                    form-control-sm
                                                    shadow-sm p-2  
                                                    rounded
                                                '
                                                value={cliente?.correo}
                                                onChange={e => {
                                                    setCliente(
                                                        {
                                                            ...cliente,
                                                            correo: e.target.value,
                                                        }
                                                    )
                                                }}
                                            />

                                        </td>

                                    </tr>

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
                {error &&
                    <Informacion
                        onClick={() => {
                            setError(false)
                        }}
                    >
                        <div
                            className='
                             //bg-green-200
                             mx-auto
                             h-40
                             
                         '
                        >
                            <img src={simbolo_alerta_warning} className='h-full' />
                        </div>

                        <div
                            className='
                             //bg-red-500
                             mx-3
                             flex
                             flex-col
                             h-96
                             text-center
                         '
                        >
                            <h1 className='text-lg text-slate-700 font-semibold'>
                                La cantidad solicita del producto
                                <span className='text-dark'> {error?.producto} </span>
                                con codigo <span className='text-dark'> {error?.codigo} </span>no esta disponible
                            </h1>


                            <div className='flex justify-start ml-3 mt-1 text-lg'>Stock disponible :</div>
                            <h1 className='flex text-sm ml-20 mt-3 '> Cajas disponibles : {error?.stock_caja}<span className='ml-1'> recuerda que  una caja contiene {error.tabletas_caja || '12'} tabletas</span></h1>
                            <h1 className='flex text-sm ml-20  mt-1' >Tabletas disponibles : {error?.stock_tableta} una tableta contiene {error.unidades_tableta || '8'} unidades</h1>
                            <h1 className='flex text-sm ml-20  mt-1' >Stock general : {error.stock} unidades</h1>


                        </div>
                    </Informacion>
                }
                {!!verMas &&

                    <Informacion
                        onClick={() => setVermas(!verMas)}
                        className={'bg-red-200 h-96 w-1/2'}
                    >

                        sdsad

                    </Informacion>

                }

            </div>



        </>
    );

}



export { PuntoVenta }