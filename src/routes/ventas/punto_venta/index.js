import React, { useEffect } from 'react';
import { Titulo } from '../../../ui/titulos-vistas';
import './index.css'
import { getData } from '../../useFetch';
import { hostAPI, IGV, socket, urlAPI } from '../../../config';
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
import { useLocalStorage } from '../../useLocalStorage';
import { useReactToPrint } from 'react-to-print';
import { ImprimirTicket } from '../../../ui/Layouts/Impresiones/Ticket';
import { ImprimirPDF } from '../../../ui/Layouts/Impresiones/Pdf';
import { Layout } from '../../../ui/Layouts';


function PuntoVenta() {
    const auth = useAuth();
    const navigation = useNavigate();
    if (!auth.user) navigation('/');

    //Estados

    const [venta, setVenta] = React.useState({

        tipo_documento: '',
        productos: [],
        numero_venta: 'XXXX-XXXXXXXX',
        total: 0,
        subtotal: 0,
        igv: 0,
        identificacion: '00000000',
        cliente: 'CLIENTES VARIOS',
        tipo_impresion: 'TICKET',
        tipo_moneda: 'SOLES',
        forma_pago: 'EFECTIVO',
        cuotas: 0,
        informacion_cuotas: [],

    });
    const [tipoDocumento, setTipoDocumento] = React.useState([]);
    const [productos, setProductos] = React.useState([]);
    const [search, setSearch] = React.useState(false);
    const [stock, setStock] = React.useState([]);
    const [idsCompras, setIdesCompras] = React.useState({
        id: 1
    });
    const [searchProducto, setSearchProducto] = React.useState('');
    const [tipoCompra, setTipoCompra] = React.useState();

    const [cliente, setCliente] = React.useState({});
    const [loadings, setLoading] = React.useState();

    const [impresion, setImpresion] = React.useState(true);
    const [moneda, setMoneda] = React.useState(true);
    const [formaPago, setFormaPago] = React.useState(true);

    const {
        item: moneyInBox,
        saveItem: saveMoneyInBox,
        loading,
    } = useLocalStorage('BOX_V1', []);

    const [informacionUsuario, setInformacionUsuario] = React.useState({});
    const [nuevaVenta, setNuevaVenta] = React.useState();
    const [verMas, setVermas] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [errores, setErrores] = React.useState({})
    const [verCuotas, setVerCuotas] = React.useState(false);

    const componenTicketRef = React.useRef();
    const componentPdfRef = React.useRef();

    //impresion
    const [informacionImpresion, setInformacionImpresion] = React.useState({});

    const imprimirTicket = useReactToPrint({
        content: () => componenTicketRef.current,
        documentTitle: 'Ticket de venta',
        onAfterPrint: () => console.log('Impreso uwu')
    })
    const imprimirPDF = useReactToPrint({
        content: () => componentPdfRef.current,
        documentTitle: 'Documento de venta',
        onAfterPrint: () => console.log('Impreso uwu')
    })


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

    //Funciones 

    /**
     * Recibe la cantidad de compra junto a el tipo de medida en string 🥐
     * y un objeto con las cantidades de medidas disponibles esto incluye precio 
     * cantidad y  el tipo de medida encuentra la cantidad comprada y retorna un 
     * objeto con la informacion de la cantidad comprada.
     * @param {*} cantidad string  separado por ( - )  incluye el tipo de medida y cantidad MEDIDA-CANTIDAD 🍥
     * @param {*} cantidadesMedida Objeto contiene medida , cantidad , 
     * precio  { EJEMPLO : { MEDIDA:'EJMP',CANTIDAD:10,PRECIO:2.60 } } 👓
     * @returns objeto con informacion de compra 🎯
     */
    const obtenerCantidadCompra = (cantidad, cantidadesMedida) => {
        const cantidad_comprada_String = cantidad.toUpperCase();
        const cantidad_comprada_Array = cantidad_comprada_String.split('-');
        const cantidad_comprada = cantidad_comprada_Array[1];
        const MEDIDA = cantidad_comprada_Array[0];

        // console.log(cantidad_comprada_String);
        // console.log(cantidad_comprada_Array);
        // console.log(cantidadesMedida);
        // console.log(cantidad_comprada);


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
    /**
     * Funcion que cambia el valor del total segun la cantidad ingresada por el 
     * usuario 
     * @param {*} id string con el id de compra del producto 
     * @param {*} cantidad  string separado por ( - )  que contenga la MEDIDA y la CANTIDAD 
     * ejemplo MEDIDA-CANTIDAD
     * @returns  la medida que esta en uso 
     */
    const ModificadorTotalCantidad = (id, cantidad) => {
        let MEDIDA = '';


        venta.productos.map(producto => {


            if (producto.id_compra == id) {

                producto.cantidad = cantidad;

                //Tipos de medida 
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
                // Obteniendo CANTIDAD_COMPRADA esto es un objeto que contiene cantidad, 
                // cantidad_comprada , medida.

                const cantidad_comprada = obtenerCantidadCompra(cantidad, cantidad_medida_precio)
                const total = obtenerTotalCompraProducto(cantidad_comprada, cantidad_medida_precio);
                MEDIDA = cantidad_comprada?.MEDIDA;

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
                producto.precio = valor
                const total = producto.cantidad_comprada * valor
                producto.total = total;
            }
        });

        ModificarTotalGlobla();

        return setVenta({
            ...venta,
        });
    }

    useEffect(() => {
        const ObtenerInformacionComplementariaVenta = () => {
            let total = venta.total;
            const igvVenta = (Number(total) * IGV) / 100;
            const subTotal = total - igvVenta;

            setVenta({
                ...venta,
                igv: igvVenta,
                subtotal: subTotal,
            })
        }
        ObtenerInformacionComplementariaVenta();
        
    }, [venta.total])


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

    /**
     * Guarda los datos de la venta e imprime la venta 
     */
    const emitirVenta = async () => {
        setInformacionImpresion(venta);
        const response = await SaveData(`${urlAPI.Venta.url}`, venta);

        if (!response[0].error) {
            response[0].body.tipo_impresion === 'TICKET' ? imprimirTicket() : imprimirPDF();
        }

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
    const obtenerNumerosVentas = async (serie, tipoDocumento) => {

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
            // setSerieComplementaria(informacionSerie.serie);

            setVenta({
                ...venta,
                numero_venta: `${informacionSerie.tipo_documento}-${informacionSerie.serie}`,
                serie: informacionSerie.tipo_documento,
                correlativo: informacionSerie.serie,
                tipo_documento: tipoDocumento
            });

        } else {

            setVenta({
                ...venta,
                numero_venta: `${serie}-00000001`,
                serie: serie,
                correlativo: '00000001',
                tipo_documento: tipoDocumento

            });

        }


    }

    const actualizarStockProductosEnCarrito = (productosVendidos) => {

        productosVendidos?.map(productoVenta => {

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
        console.log(venta);
        setVenta({
            ...venta,
            productos: [],
            total: 0,
            subtotal: 0,
            igv: 0,
            identificacion: '00000000',
            cliente: 'CLIENTES VARIOS',
            tipo_impresion: 'TICKET',
            tipo_moneda: 'SOLES',
            forma_pago: 'EFECTIVO',
            cuotas: 0,
            informacion_cuotas: [],
        })

        setTipoCompra('');
    }

    const actualizarFechaCuotas = (id, fechaMinima) => {
        venta?.informacion_cuotas?.map((value, index) => {
            if (!value?.fechaMinima) {

                value.fechaMinima = fechaMinima;
            }

            if (value.id == id) {
                value.fechaMinima = fechaMinima;
                return;
            }
        })

        return setVenta(
            {
                ...venta
            }
        )
    }

    const actualizarMontoCuotas = (id, monto) => {

        const totalCuotas = venta?.informacion_cuotas?.reduce((acumulador, cuotas) => {
            return acumulador + Number(cuotas.monto);
        }, 0)

        if (venta.total < totalCuotas) {

            venta?.informacion_cuotas?.map((cuota, index) => {
                if (cuota.id == id) {
                    cuota.error = true;
                    return;
                }
            })

            setErrores({
                ...errores,
                informacionCuotas: true,
            })

        } else {

            venta?.informacion_cuotas?.map((cuota, index) => {

                cuota.error = false;

                if (cuota.id == id) {
                    cuota.monto = monto;
                    return;
                }


                setErrores({
                    ...errores,
                    informacionCuotas: false,
                })

            })

        }



        return setVenta(
            {
                ...venta
            }
        )

    }


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
                    productos: [],
                    total: 0,
                    subtotal: 0,
                    igv: 0,
                    identificacion: '00000000',
                    cliente: 'CLIENTES VARIOS',
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

    useEffect(() => {
        if (!auth.loading) setVenta({ ...venta, usuario: auth?.user?._id })
    }, [auth])

    useEffect(() => {


        if (!loading) {


            const InformacionCantidadVentas = async () => {
                const informacion = await getData(`${urlAPI.Venta.url}?usuario=${auth.user._id}`)
                return informacion;
            }

            InformacionCantidadVentas()
                .then(informacionUsuario => {

                    setInformacionUsuario({
                        ...informacionUsuario,
                        apertura_caja: moneyInBox.dinero_apertura,
                        cantidad_ventas: informacionUsuario[0].cantidad,
                        dinero_recaudado: informacionUsuario[0].cantidad_recaudada,
                        gastos: informacionUsuario[0].gastos.total_dinero_gastos,
                    })

                });

        }


    }, [moneyInBox])

    useEffect(() => {
        if (!loading) {
            const informacionUsuarios = (informacion) => {
                if (auth.user._id == informacion._id) {
                    console.log('Modificar cantidad de venta');

                    console.log(informacionUsuario);
                    setInformacionUsuario({
                        ...informacionUsuario,
                        cantidad_ventas: informacionUsuario.cantidad_ventas + 1,
                    })

                    setNuevaVenta(informacion._id);

                    console.log(informacionUsuario);

                }
            }
            socket.on('ventas_recientes', informacionUsuarios);

            return () => {

                socket.off('ventas_recientes', informacionUsuarios)

            }
        }

    }, [nuevaVenta, moneyInBox, informacionUsuario])


    return (
        <>
            {/**Impresion */}
            <div
                className='hidden'
            >
                <div
                    ref={componenTicketRef}

                >

                    <ImprimirTicket
                        data={
                            {
                                venta: informacionImpresion,
                                qr: 'www.datos.com'
                            }
                        }
                    />
                </div>
            </div>
            <div
                className='hidden'
            >
                <div
                    ref={componentPdfRef}

                >

                    <ImprimirPDF
                        data={
                            {
                                venta: informacionImpresion,
                                qr: 'www.datos.com'
                            }
                        }
                    />

                </div>
            </div>

            {/**Fin impresion */}
            <Layout
                onClick={() => {
                    setSearch(false);
                    setVerCuotas(false);
                }}
            >
                <div
                    className='
                        
                        flex
                        justify-center
                        items-center
                        w-full

                 '
                >
                    <div
                        className='
                            
                            flex 
                            justify-start
                            w-1/2
                            my-auto
                            
                        '
                    >
                        <div
                            className='
                            font-black
                            text-lg
                            h-full
                            flex
                            justify-start
                            flex-col
                            w-full
                            
                        '
                        >
                            <h1 className=' 
                                  text-2xl sm:text-2xl font-extrabold text-slate-900 tracking-tight  ml-auto
                                  mr-72
                                '
                            >Estas realizando una venta</h1>
                            <p className='font-normal text-sm  text-slate-500 ml-auto
                                  mr-96'>Estas en el punto de venta ...  ... </p>
                        </div>

                    </div>

                    <div
                        className='
                        w-1/2 mr-10

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
                                py-1
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
                                        <p className='font-medium italic '>Cantidad : <span className='text-sm font-normal not-italic'>{informacionUsuario.cantidad_ventas || '00'}</span></p>
                                        <p className='font-medium italic'>Dinero recaudado: <span className='text-sm font-normal not-italic'>S/ {informacionUsuario.dinero_recaudado || '00'}</span></p>
                                    </div>
                                    <div>
                                        <p className='ml-2 font-medium italic'>Gastos realizados: <span className='text-sm font-normal not-italic'>S/ {informacionUsuario.gastos || '00'}</span></p>
                                        <p className='ml-2 font-medium italic'>Apertura caja: <span className='text-sm font-normal not-italic'>S/ {informacionUsuario.apertura_caja}</span></p>
                                    </div>

                                </div>
                                <p
                                    className='mt-3 mr-2 text-sm text-sky-400 font-bold cursor-pointer hover:text-sky-200'
                                    onClick={() => setVermas(!verMas)}
                                >Ver mas </p>
                            </div>

                        </div>
                    </div>
                </div>
                <div
                    className='
                     mt-3
                     flex
                     justify-between
                     h-full
                     mx-5
                     mb-2
                    '
                >

                    <div
                        className='
                                 w-full
                            '
                    >
                        <div
                            className='
                                flex
                                flex-col
                                w-full

                            '
                        >
                            <div
                                className='
                                    flex
                                    flex-col
                                    ml-auto
                                    mr-24
                                '
                            >
                                <p className='mb-1  text-slate-500 font-light font-sans'>Por favor selecciona las opciones correctas:</p>
                                <h1 className='font-black text-slate-800 flex'>
                                    Que serie usaras?
                                    <i
                                        className='text-orange-500 ml-1 cursor-pointer'

                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                        </svg>
                                    </i>
                                </h1>
                                <div
                                    className='flex'
                                >
                                    <select
                                        type={'text'}
                                        className=' mt-1 
                                            form-control  
                                            block 
                                            w-40 
                                            rounded-md 
                                            h-8 
                                            border-gray-300 
                                            focus:border-indigo-500 
                                            focus:ring-indigo-500 
                                            sm:text-sm 
                                            text-xs
                                            text-center
                                        '
                                        placeholder='Nombre del solicitante ...'
                                        onChange={(e) => {

                                            let informacion = e.target.value
                                            let informacionArray = informacion.split('-');

                                            obtenerNumerosVentas(informacionArray[0], informacionArray[1]);

                                        }}
                                    >
                                        <option>SELECCIONE</option>
                                        {tipoDocumento.map(tp => {
                                            return <option
                                                value={`${tp.serie}-${tp.nombre}`}
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
                                    <div className='flex w-full justify-end text-center mt-1   text-slate-700'> <h1>{venta.numero_venta}</h1></div>
                                </div>

                                <br />
                                <h1 className='font-black text-slate-800 flex' >Busca al cliente
                                    <i
                                        className='text-orange-500 ml-1 cursor-pointer'

                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                        </svg>
                                    </i>

                                </h1>
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
                                            font-mono 
                                            w-36 
                                            rounded-md 
                                            h-8 
                                            sm:text-sm
                                            text-xs
                                            text-center
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

                                    <textarea
                                        value={venta?.cliente}
                                        type="text"
                                        rows={1}
                                        className="
                                            ml-1
                                            w-full 
                                            py-2
                                            text-center 
                                            rounded-md 
                                            border-gray-300 
                                            sm:text-sm
                                        "

                                    ></textarea>
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
                                <br />
                                <div
                                    className='flex'
                                >
                                    <div>

                                        <h1 className='font-black text-slate-800' >Impresion </h1>
                                        <div
                                            className='
                                            flex
                                            w-1/2
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
                                                    checked={impresion}
                                                    className='
                                                 mr-1
                                                 mb-3
                                                '
                                                    onChange={(e) => {
                                                        let ticket = e.target.value;
                                                        setVenta({ ...venta, tipo_impresion: ticket })
                                                        setImpresion(!impresion);
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
                                                    checked={!impresion}
                                                    className='
                                                mr-1
                                                mb-3
                                            '
                                                    onChange={(e) => {
                                                        let pdf = e.target.value
                                                        setVenta({ ...venta, tipo_impresion: pdf })
                                                        setImpresion(!impresion)
                                                    }}

                                                    onClick={() => {
                                                        setImpresion(!impresion);
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
                                    <div>
                                        <h1 className='font-black text-slate-800'> Forma de pago</h1>
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
                                                    checked={formaPago}
                                                    className='
                                                 mr-1
                                                 mb-3
                                                '
                                                    onChange={(e) => {
                                                        let formapago = e.target.value;
                                                        setFormaPago(!formaPago)
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
                                            hover:text-gray-500 
                                            cursor-pointer
                                            flex
                                        '
                                            >
                                                <input
                                                    type={'checkbox'}
                                                    value={'CREDITO'}
                                                    checked={!formaPago}
                                                    className='
                                                        mr-1
                                                        mb-3
                                                    '
                                                    onChange={(e) => {

                                                        setFormaPago(!formaPago);
                                                        setVenta({ ...venta, forma_pago: e.target.value })

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
                                {!formaPago &&
                                    <div
                                        className='
                                            flex
                                            flex-col
                                        '
                                    >
                                        <div
                                            className='
                                                flex
                                                flex-col
                                            '
                                        >
                                            <h1 className='text-xs text-slate-800'>En cuantas cuotas se pagara ? </h1>
                                            <div
                                                className='flex'
                                            >

                                                <input
                                                    type='text'
                                                    value={venta?.cuotas}
                                                    onChange={(e) => {

                                                        let hoy = new Date();

                                                        setVerCuotas(true);
                                                        setVenta({
                                                            ...venta,
                                                            cuotas: e.target.value,
                                                            informacion_cuotas: Array.from(
                                                                { length: e.target.value },
                                                                (_, index) => {
                                                                    if (index == 0) {

                                                                        return (
                                                                            {
                                                                                id: index + 1,
                                                                                monto: '',
                                                                                fecha_pago: '',
                                                                                fechaMinima: `${hoy.toISOString()}`.substring(0, 10)
                                                                            }
                                                                        )
                                                                    }
                                                                    return (
                                                                        {
                                                                            id: index + 1,
                                                                            monto: '',
                                                                            fecha_pago: '',
                                                                            fechaMinima: '',
                                                                        }
                                                                    )

                                                                }
                                                            )
                                                        })
                                                    }}
                                                />
                                                {venta.informacion_cuotas.length != 0 &&

                                                    <div
                                                        className='flex'

                                                        onClick={(e) => {
                                                            setVerCuotas(true);
                                                            e.stopPropagation();
                                                        }}

                                                    >
                                                        <p className='cursor-pointer ml-1 font-semibold text-salte-900 hover:text-sky-300'>ver cuotas </p>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentcolor" class="w-6 h-4 mt-1 cursor-pointer">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                                                        </svg>
                                                    </div>

                                                }


                                            </div>

                                        </div>
                                        {!!verCuotas &&

                                            <div
                                                className='
                                                    border
                                                    py-2
                                                    px-2
                                                    rounded-xl
                                                    mt-10
                                                    absolute z-30
                                                    bg-white
                                                '
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                }}
                                            >
                                                <h1 className='mb-1  text-slate-600 flex'>
                                                    El total es <span className='font-semibold mx-1'>{venta?.total}</span>
                                                    {!!errores.informacionCuotas &&
                                                        <i
                                                            className='text-orange-500  cursor-pointer'
                                                            onMouseEnter={() => setErrores(
                                                                {
                                                                    ...errores,
                                                                    mensajeCuotas: true,
                                                                }
                                                            )}
                                                            onMouseLeave={() => setErrores(
                                                                {
                                                                    ...errores,
                                                                    mensajeCuotas: false,
                                                                }
                                                            )}

                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-5">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                                            </svg>
                                                        </i>
                                                    }
                                                    {!!errores.mensajeCuotas &&
                                                        <>
                                                            <div
                                                                className='
                                                                    absolute
                                                                    z-10 mt-4
                                                                    border
                                                                    flex
                                                                    w-32
                                                                    ml-10
                                                                    text-xs
                                                                    bg-white
                                                                    py-1
                                                                    px-1

                                                                '
                                                            >
                                                                Recuerda que la suma de los montos no debe ser mayor al total de la venta
                                                            </div>
                                                        </>
                                                    }

                                                </h1>
                                                <div
                                                    className='
                                                         grid
                                                         grid-cols-2
                                                         gap-3
                                                     '
                                                >
                                                    {venta?.informacion_cuotas?.map((informacion_cuota, index) => {

                                                        return (
                                                            <div
                                                                className='
                                                                     flex
                                                                     flex-col
 
                                                                 '
                                                            >
                                                                <p className='text-xs'>Fecha de la {informacion_cuota.id}° cuota</p>
                                                                <input
                                                                    className='px-2 w-32'
                                                                    type='date'
                                                                    min={informacion_cuota.fechaMinima}
                                                                    defaultValue={informacion_cuota?.fecha_pago}
                                                                    onChange={(e) => {
                                                                        informacion_cuota.fecha_pago = e.target.value;
                                                                        actualizarFechaCuotas(informacion_cuota.id + 1, e.target.value)

                                                                    }}
                                                                />
                                                                <input
                                                                    type='text'
                                                                    className={`mt-1 ${informacion_cuota.error && 'border-y border-x border-red-500 rounded-sm focus:border-red-500' || ''}`}
                                                                    placeholder='Ingresa el monto'
                                                                    defaultValue={informacion_cuota.monto}
                                                                    onChange={(e) => {
                                                                        informacion_cuota.monto = e.target.value;
                                                                        actualizarMontoCuotas(informacion_cuota.id, e.target.value);
                                                                    }}
                                                                />
                                                            </div>
                                                        )
                                                    })}

                                                </div>

                                            </div>

                                        }



                                    </div>
                                }



                                <br />
                                <h1 className='font-black text-slate-800'>Escoge el tipo de moneda</h1>
                                <div
                                    className='
                                            flex
                                            w-1/2
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
                                            checked={moneda}
                                            className='
                                                 mr-1
                                                 mb-3
                                                '
                                            onChange={(e) => {
                                                let soles = e.target.value;
                                                setVenta({ ...venta, tipo_moneda: soles })
                                                setMoneda(!moneda)
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
                                            checked={!moneda}
                                            className='
                                                mr-1
                                                mb-3
                                            '
                                            onChange={(e) => {
                                                let dorales = e.target.value;
                                                setVenta({ ...venta, tipo_moneda: dorales })
                                                setMoneda(!moneda)
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

                                <div
                                    className='
                                        flex
                                    '
                                >



                                    <p className='font-black mr-2' >Subtotal : <span className='font-normal'>{venta.subtotal}</span></p>
                                    <p className='font-black mr-2'>igv : <span className='font-normal'>{venta.igv}</span></p>
                                    <p className='font-black mr-2'>Total : <span className='font-normal'>{venta.total}</span></p>

                                </div>
                                <br />


                            </div>
                            <div
                                className='
                                flex
                                justify-end
                            '
                            >
                                <button
                                    className={`
                                         
                                h-10
                                ml-auto
                                px-2
                                rounded-xl
                                text-slate-400
                                text-uppercase
                                text-xs	
                                font-semibold
                                hover:border-b-2 
                                hover:border-b-slate-400 
                                        `}

                                    onClick={() => {
                                        limpiarVenta();
                                    }}
                                >
                                    cancelar venta
                                </button>
                                <button
                                    className={`
                                         
                                bg-orange-500
                                h-10
                                px-2
                                ml-2
                                mr-10
                                rounded-xl
                                text-white
                                text-uppercase
                                text-xs	
                                font-semibold
                                        `}

                                    onClick={emitirVenta}

                                >
                                    Emitir venta
                                </button>

                            </div>
                        </div>
                    </div>



                    <div
                        className='
                                flex
                                flex-col
                                rounded-xl
                              bg-sky-200
                                h-full
                                mb-3
                                px-2 
                            '
                    >
                        <div
                            className='mt-2 flex justify-between'

                        >

                            <input
                                className='border border-slate-100 w-96 ml-1 rounded-sm py-1 px-1'
                                // placeholder='Busca un producto'
                                placeholder=' Busca un producto ... 💊'
                                onClick={(e) => {
                                    setSearch(true)
                                    e.stopPropagation();
                                }}
                                onChange={(e) => {
                                    setSearchProducto(e.target.value)
                                }}
                            />

                            <h1 className='text-right  font-black mr-2 text-slate-400'>Selecciona los productos </h1>
                        </div>
                        {!!search && <div
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
                                    contenedor-tablas
                                    mt-2
                                    rounded-2xl
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
                                marginY={'my-0 bg-white'}

                            >

                                {venta.productos.map((producto, index) => {


                                    return (
                                        <>
                                            <TablaRow TablaRow
                                                tabIndex={index}
                                                onClick={(event) => {
                                                    let medida = '';
                                                    if (producto.medida == 'C') medida = ' caja';
                                                    if (producto.medida == 'T') medida = ' tableta';
                                                    if (producto.medida == 'U') medida = ' unidad';
                                                    setTipoCompra(producto.codigo_barras + ' ' + producto.descripcion + ' esta siendo vendido por' + medida)
                                                    event.preventDefault();
                                                }}

                                                onKeyDown={(event) => {

                                                    //Eventes para cambiar el tipo de medida
                                                    if (event.key == 't') {
                                                        producto.medida = 'T';
                                                        setTipoCompra(producto.codigo_barras + ' ' + producto.descripcion + ' esta siendo vendido por tableta')

                                                    }

                                                    if (event.key == 'c') {
                                                        producto.medida = 'C';
                                                        setTipoCompra(producto.codigo_barras + ' ' + producto.descripcion + ' esta siendo vendido por caja')

                                                    }

                                                    if (event.key == 'u') {
                                                        producto.medida = 'U';
                                                        setTipoCompra(producto.codigo_barras + ' ' + producto.descripcion + ' esta siendo vendido por unidad')

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
                                                            //La funcion modificarTotalCantidad recibe un string  como cantidad
                                                            // este string tiene que estar separado por ( - ) 
                                                            // para poder funcionar.
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

                        <h1 className='text-slate-900 ml-2 my-auto uppercase'>{tipoCompra}</h1>

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

            </Layout>

        </>
    );

}



export { PuntoVenta }