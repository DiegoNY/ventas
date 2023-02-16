import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../../auth/auth';
import { EMPRESA, socket, urlAPI } from '../../../config';
import { TablaRow } from '../../../ui/Tabla/tableRow';
import { TablaTalwindCss } from '../../../ui/Tabla/useTabla';
import { getData } from '../../useFetch';
import { TableCell } from '../../../ui/Tabla/tableCell'
import './index.css'
import { Informacion } from '../../../ui/Error';
import simbolo_alerta_warning from '../punto_venta/img/simbolo-alerta-warning.png';
import { generarSerieVenta } from '../punto_venta/useSerie';
import { SaveData } from '../../useCRUD';



function NotaSalida() {
    //Usuario autenticado ? 
    const auth = useAuth();
    const navigation = useNavigate();
    if (!auth.user) navigation('/');

    //Estados
    const [productos, setProductos] = useState();
    const [searchValue, setSearchValue] = useState('');
    const [buscador, setBuscador] = useState(false);
    const [informacionMotivo, setInformacionMotivo] = useState(true);
    const [ids_notasalida, setIdNotaSalida] = useState(0);
    const [error, setError] = useState(false);
    const [numeroDocumento, setNumeroDocumento] = useState('');
    const [notaSalida, setNotaSalida] = useState(

        {
            correlativo: '000000001',
            serie: 'N01',
            numeroDocumento: 'N01-00000001',
            usuario: auth?.user?._id,
            productos: [],
            solicitante: '',
            fecha: '',
            motivo: ''
        }

    );

    const [info, setObtenerInfo] = useState();

    // console.log(notaSalida);
    let searchtProductos = [];
    if (!searchValue.length >= 1) {
        searchtProductos = productos;
    } else {
        searchtProductos = productos?.filter(producto => {
            const productoText = `${producto?.descripcion?.toLowerCase()}${producto?.id_laboratorio?.toLowerCase()}`;

            const searchText = searchValue?.toLowerCase();

            return productoText?.includes(searchText);
        })
    }

    //Funciones 

    const obtnerCantidadSaliente = (cantidad, medida) => {
        const cantidad_comprada_String = cantidad.toUpperCase();
        const cantidad_comprada_Array = cantidad_comprada_String.split('-');
        const cantidad_comprada = cantidad_comprada_Array[1];
        const MEDIDA = cantidad_comprada_Array[0];



        if (MEDIDA == medida.CAJA.MEDIDA) {
            return {
                MEDIDA: MEDIDA,
                CANTIDAD: cantidad_comprada * medida.CAJA.CANTIDAD,
                CANTIDAD_COMPRA: cantidad_comprada
            };
        }
        if (MEDIDA == medida.UNIDAD.MEDIDA) {
            return {
                MEDIDA: MEDIDA,
                CANTIDAD: cantidad_comprada,
                CANTIDAD_COMPRA: cantidad_comprada
            };
        }
        if (MEDIDA == medida.TABLETA.MEDIDA) {
            return {
                MEDIDA: MEDIDA,
                CANTIDAD: cantidad_comprada * medida.TABLETA.CANTIDAD,
                CANTIDAD_COMPRA: cantidad_comprada
            };
        }
    }

    const obtnerCantidadProductos = (id_notasalida, cantidad) => {

        console.log(cantidad);

        notaSalida.productos.map(producto => {
            if (producto.id_notasalida == id_notasalida) {

                producto.cantidad = cantidad;

                const CANTIDAD_MEDIDA_PRECIO = {
                    CAJA: {
                        MEDIDA: 'C',
                        CANTIDAD: Number(producto?.stock_caja),
                    },
                    TABLETA: {
                        MEDIDA: 'T',
                        CANTIDAD: Number(producto?.stock_tableta),
                    },
                    UNIDAD: {
                        MEDIDA: 'U',
                        CANTIDAD: 1,
                    },
                }

                const CANTIDAD_SALIENTE = obtnerCantidadSaliente(cantidad, CANTIDAD_MEDIDA_PRECIO);

                if (CANTIDAD_SALIENTE.CANTIDAD > producto.stock) {
                    producto.cantidad_comprada = '';

                    console.log('NO HAY SUfICIENTE STOCK');

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

                producto.stock_saliente = Number(CANTIDAD_SALIENTE.CANTIDAD);

            }
        })


    }

    const emitirNotaSalida = async () => {
        const response = await SaveData(`${urlAPI.Nota_salida.url}`, notaSalida);
        if (response.error) {
            setError({
                SaveData: response.body,
            });

            return;
        }

    }

    const limipiarNotaSalida = () => {

        return setNotaSalida(
            {
                ...notaSalida,
                productos: [],
                solicitante: '',
                fecha: '',
                motivo: ''
            }
        )
    }

    useEffect(() => {

        const obtenerInformacionProductos = async () => {

            const productosObtenidos = await getData(`${urlAPI.Producto.url}?ventas=true`);
            setProductos(productosObtenidos);

        }

        obtenerInformacionProductos();

    }, [info])

    useEffect(() => {


        const actualizarStockProductos = (id, stock) => {


            notaSalida.productos.map(producto => {
                if (producto._id == id) {
                    producto.stock = producto.stock - stock
                }
            })

        }

        const obtenerProductosActualizar = (informacion) => {
            let producto = informacion.productos;

            for (let key in producto) {
                actualizarStockProductos(
                    producto[key]._id,
                    producto[key].stock_saliente,
                )
            }
        }

        const obtenerSerie = (informacion) => {

            const serieGenerada = generarSerieVenta(informacion.numeroNotaSalida)

            obtenerProductosActualizar(informacion);

            setObtenerInfo(informacion)

            setNotaSalida({
                ...notaSalida,
                serie: serieGenerada.tipo_documento,
                correlativo: serieGenerada.serie,
                numeroDocumento: `${serieGenerada.tipo_documento}-${serieGenerada.serie}`
            })
        }

        socket.on('serie_nota_salida', obtenerSerie)

        return () => {

            socket.off('serie_nota_salida', obtenerSerie);

        }

    }, [notaSalida])

    useEffect(() => {
        const obtenerCorrelativoNotaSalida = async () => {
            const data = await getData(`${urlAPI.Nota_salida.url}?serie=${EMPRESA.SERIE_NOTA_CREDITO}`);
            const serieGenerada = generarSerieVenta(data[data.length - 1].numero);
            setNotaSalida({
                ...notaSalida,
                serie: serieGenerada.tipo_documento,
                correlativo: serieGenerada.serie,
                numeroDocumento: `${serieGenerada.tipo_documento}-${serieGenerada.serie}`
            })
        }

        obtenerCorrelativoNotaSalida();
    }, [])

    return (
        <>
            <div
                className=' 
                    h-screen
                    grid
                    grid-cols-12
                    mx-auto
                    w-full
                '
                onClick={(event) => {
                    setBuscador(false);
                }}
            >

                <div
                    className='
                        //bg-red-200
                        col-span-12
                        row-span-6
                        flex
                        flex-col
                        w-full
                    '
                >

                    <h1 className='ml-14 text-2xl sm:text-2xl font-extrabold text-slate-900 tracking-tight  mt-3' >Estas realizando una nota de salida</h1>
                    <p className='ml-14 font-normal text-sm  text-slate-500'>Las cantidades salientes de los productos seran restadas </p>
                    <br />
                    <div
                        className='
                            mt-1
                            flex
                            justify-between
                            h-full
                            mx-auto
                            mb-2
                            //bg-green-400
                        '
                    >

                        <div
                            className='
                                flex
                                flex-col
                                mr-14
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
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
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

                                {searchtProductos?.map((producto, index) => {
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
                                                setNotaSalida({
                                                    ...notaSalida,
                                                    productos: [...notaSalida.productos, { ...producto, id_notasalida: ids_notasalida }]

                                                })
                                                setIdNotaSalida(ids_notasalida + 1)

                                                event.stopPropagation();
                                                event.preventDefault();

                                            }}
                                        >
                                            <h1><span className=' font-semibold'>Descripcion :</span> {producto.descripcion || 'ACEITE DE NO SE QUE SUPER LARGO'}</h1>
                                            <p className='ml-1 font-semibold '>Lote </p> <span className='mx-1'>:</span>{producto.lote || 'FGNOP'}
                                            <p className='ml-1 font-semibold '>Fecha vencimiento </p><span className='mx-1'>:</span> {producto.fecha_vencimiento || '12/12/12'}
                                            <p className='ml-1 font-semibold '>Stock </p><span className='mx-1'>:</span>{producto.stock}
                                        </div>
                                    )
                                })}




                            </div>}
                            <div
                                className='
                                    contenedor-tabla
                                    mt-2
                                '
                            >
                                <TablaTalwindCss
                                    headers={[
                                        { name: 'Codigo' },
                                        { name: 'Producto' },
                                        { name: 'Laboratorio' },
                                        { name: 'Lote' },
                                        { name: 'Fecha vencimiento' },
                                        { name: 'Stock disponible' },
                                        { name: 'Cantidad' },
                                    ]}
                                    marginY={'my-0 bg-white'}
                                >

                                    {notaSalida?.productos?.map((producto, index) => {

                                        producto.medida = 'U';

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
                                                        className={'text-xs font-bold'}
                                                    >
                                                        {producto.codigo_barras}
                                                    </TableCell>
                                                    <TableCell
                                                        className={'text-xs'}
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
                                                        {producto.stock}
                                                    </TableCell>
                                                    <TableCell>
                                                        <textarea
                                                            rows={1}
                                                            cols={3}
                                                            onChange={(e) => {

                                                                let cantidad = `${producto.medida}-${e.target.value}`
                                                                obtnerCantidadProductos(producto.id_notasalida, cantidad);
                                                            }}
                                                        >

                                                        </textarea>
                                                    </TableCell>

                                                </TablaRow>
                                            </>
                                        )


                                    })
                                    }

                                </TablaTalwindCss>
                            </div>



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
                                <h1 className='flex justify-end text-slate-700 font-black'>{notaSalida.numeroDocumento}</h1>
                                <p className='mb-1  text-slate-500 font-light font-sans'>Por favor completa los siguientes datos :</p>
                                <h1 className='font-black text-slate-700'>Datos del solicitante</h1>
                                <input
                                    type={'text'}
                                    className='mx-2 rounded-sm mt-1 border-x border-y  p-1 focus:border-2 focus:border-blue-600 '
                                    placeholder='Nombre del solicitante ...'
                                    onChange={(e) => {
                                        setNotaSalida({
                                            ...notaSalida,
                                            solicitante: e.target.value
                                        })
                                    }}
                                />
                                <br />
                                <h1 className='font-black text-slate-700 flex' >Motivo
                                    <i
                                        className='text-orange-500 ml-1 cursor-pointer'
                                        onPointerEnter={() => setInformacionMotivo(false)}
                                        onMouseLeave={() => setInformacionMotivo(true)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                        </svg>
                                    </i>

                                </h1>
                                {!informacionMotivo &&
                                    <div
                                        className='
                                                absolute
                                                z-10
                                                border
                                                bg-white
                                                mt-9
                                                mr-4 
                                                flex
                                                w-32
                                                rounded-sm
                                                p-2
                                                text-xs
                                            '
                                    >
                                        Motivo o recordatorio de la nota de salida
                                    </div>
                                }
                                <input
                                    type={'text'}
                                    className='mx-2 rounded-sm mt-1 border-y border-x p-1  focus:border-2 focus:border-blue-600 '
                                    placeholder='Motivo de la salida ... '
                                    onChange={(e) => {
                                        setNotaSalida({
                                            ...notaSalida,
                                            motivo: e.target.value
                                        })
                                    }}

                                />
                                <br />
                                <h1 className='font-black text-slate-700' >¿Cuando se realizo ?</h1>
                                <input
                                    type={'date'}
                                    className='mx-2 rounded-sm text-center mt-1 border-y border-x p-1 focus:border-2 focus:border-blue-600 '
                                    onChange={(e) => {
                                        setNotaSalida({
                                            ...notaSalida,
                                            fecha: e.target.value
                                        })
                                    }}
                                />
                                <div
                                    className='h-40'
                                >

                                </div>
                                <div
                                    className='
                                        flex
                                        justify-end
                                    '
                                >
                                    <button
                                        className={`
                                         
                                         rounded-xl
                                         w-24
                                         p-1
                                         bg-orange-500 
                                         text-white
                                         
                                        `}


                                        onClick={() => {
                                            // console.log(notaSalida)
                                            emitirNotaSalida();
                                            limipiarNotaSalida();
                                        }}
                                    >
                                        Emitir 🖨
                                    </button>

                                </div>

                            </div>
                        </div>

                    </div>

                </div>
                <div
                    className='
                        border-t-2
                        col-span-12
                        row-span-2
                        mx-2
                    '
                >
                    <div
                        className='h-14'
                    >

                    </div>

                </div>

            </div>
            {!!error &&

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
                        {!error.SaveData &&
                            <>
                                <h1 className='text-lg text-slate-700 font-semibold'>
                                    La cantidad solicita del producto
                                    <span className='text-dark'> {error?.producto} </span>
                                    con codigo <span className='text-dark'> {error?.codigo} </span>no esta disponible
                                </h1>


                                <div className='flex justify-start ml-3 mt-1 text-lg'>Stock disponible :</div>
                                <h1 className='flex text-sm ml-20 mt-3 '> Cajas disponibles : {error?.stock_caja}<span className='ml-1'> recuerda que  una caja contiene {error.tabletas_caja || '12'} tabletas</span></h1>
                                <h1 className='flex text-sm ml-20  mt-1' >Tabletas disponibles : {error?.stock_tableta} una tableta contiene {error.unidades_tableta || '8'} unidades</h1>
                                <h1 className='flex text-sm ml-20  mt-1' >Stock general : {error.stock} unidades</h1>

                            </>
                        }
                        {error.SaveData &&

                            <h1 className='text-lg text-slate-700 font-semibold' >{error.SaveData}</h1>

                        }


                    </div>
                </Informacion>

            }
        </>
    );
}

export { NotaSalida }