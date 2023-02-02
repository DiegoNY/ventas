import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../../auth/auth';
import { urlAPI } from '../../../config';
import { TablaRow } from '../../../ui/Tabla/tableRow';
import { TablaTalwindCss } from '../../../ui/Tabla/useTabla';
import { Titulo } from '../../../ui/titulos-vistas';
import { BuscadorProductos } from '../../BuscadorProductos';
import { getData } from '../../useFetch';
import { TableCell } from '../../../ui/Tabla/tableCell'
import './index.css'


function NotaSalida() {
    //Usuario autenticado ? 
    const auth = useAuth();
    const navigation = useNavigate();
    if (!auth.user) navigation('/');

    //Estados
    const [productos, setProductos] = useState();
    const [searchValue, setSearchValue] = useState('');
    const [buscador, setBuscador] = useState(false);
    const [notaSalida, setNotaSalida] = useState(

        {
            usuario: auth?.user?._id,
            productos: []
        }

    );


    console.log(notaSalida);
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

    // console.log(searchtProductos);

    useEffect(() => {

        const obtenerInformacionProductos = async () => {

            const productosObtenidos = await getData(`${urlAPI.Producto.url}`);
            setProductos(productosObtenidos);

        }

        obtenerInformacionProductos();

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
                {/* <div
                    className='
                        col-span-12
                        flex
                        flex-col
                        h-full
                    '
                >
                    <Titulo
                        title='Nota salida '
                        navegacion='ventas'
                        iconoEmoji='📝'
                    />


                </div> */}
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

                    <h1 className='text-2xl mx-auto font-bold mt-3 text-blue-800' >Estas realizando una nota de salida</h1>
                    <br />
                    <div
                        className='
                            mt-3
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
                              bg-slate-100
                                mb-3
                                px-2                                
                            '
                        >
                            <div
                                className='mt-2 flex justify-between'

                            >

                                <input
                                    className='border w-96 ml-1 rounded-sm py-1 px-1'
                                    placeholder='Busca un producto'
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    onClick={(event) => {
                                        setBuscador(true)
                                        event.stopPropagation();
                                    }}
                                    type={'text'}
                                />

                                <h1 className='text-right  font-black mr-2 text-blue-800'>Selecciona los productos </h1>
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
                                                bg-gray-100 
                                                p-1 
                                                mb-1 
                                                ${index == 0 && 'mt-1'}
                                                hover:bg-gray-300
                                                cursor-pointer
                                                `
                                            }
                                            onClick={(event) => {
                                                setNotaSalida({
                                                    ...notaSalida,
                                                    productos: [...notaSalida.productos, producto]
                                                })
                                                event.stopPropagation();
                                                event.preventDefault();

                                            }}
                                        >
                                            <h1>{producto.descripcion || 'ACEITE DE NO SE QUE SUPER LARGO'}</h1>
                                            <p className='ml-1 font-semibold'>Lote</p>: {producto.lote || 'FGNOP'}
                                            <p className='ml-1 font-semibold'>Fecha vencimiento</p>: {producto.fecha_vencimiento || '12/12/12'}
                                            <p className='ml-1 font-semibold'>Stock</p> : {producto.stock}
                                        </div>
                                    )
                                })}




                            </div>}
                            <div
                                className='
                                    contenedor-tabla
                                    mt-1
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

                                                    </TableCell>
                                                    <TableCell>

                                                    </TableCell>
                                                    <TableCell
                                                        className={'font-bold'}
                                                    >

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
                                <p className='mb-1  text-blue-800 font-light font-sans'>Por favor completa los siguientes datos :</p>
                                <h1 className='font-black text-blue-800'>Datos del solicitante</h1>
                                <input className='mx-2 rounded-sm mt-1 border p-1 ' />
                                <br />
                                <h1 className='font-black text-blue-800'>Motivo <i className='text-orange-500'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                </svg></i>
                                </h1>
                                <input className='mx-2 rounded-sm mt-1 border p-1 ' />
                                <br />
                                <h1 className='font-black text-blue-800' >¿Cuando se realizo ?</h1>
                                <input type={'date'} className='mx-2 rounded-sm text-center mt-1 border p-1 ' />

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
        </>
    );
}

export { NotaSalida }