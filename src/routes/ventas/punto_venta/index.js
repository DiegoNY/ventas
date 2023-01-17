import React, { useEffect } from 'react';
import { Label } from '../../../ui/forms/label';
import { Titulo } from '../../../ui/titulos-vistas';
import { InputForm } from './InputForm';
import './index.css'
import { getData } from '../../useFetch';
import { urlAPI } from '../../../config';
import { Modal } from '../../../ui/modal';
import iconoMoneda from './img/icono-monedas.svg'

function PuntoVenta() {
    //Estados
    const [venta, setVenta] = React.useState({});
    const [serie, setSerie] = React.useState('')
    const [tipoDocumento, setTipoDocumento] = React.useState([]);
    const [productos, setProductos] = React.useState([]);
    const [stock, setStock] = React.useState([]);
    const [productosCarrito, setProductosCarrito] = React.useState([{}]);



    //Funciones 

    const generarNumeroFactura = (serie) => {


        const numeroFactura = `${serie} - 000001`;

        setSerie(numeroFactura);
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


    const mostrarProductosCarrito = (producto) => {
        console.log(producto.children);

    }

    //Sucedera cuando se realiza una venta esto sera emitido a todos los clientes 
    //el socket tiene que enviar el id del producto y el Stock actual ;

    useEffect(() => {
        console.log('Se ejecuto');
        actualizarStock('63bda472a1f3353740beaec2');

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
            <div className=' page-header '>
                <Titulo
                    title={'Punto venta '} navegacion={'Ventas'} icono={'fi fi-rs-shop'}
                />
            </div>
            <div className='content' >

                <form className='card h-100'>

                    <div className='card-header flex justify-between'>
                        <h1 className='font-sans text-lg font-semibold'>
                            Datos Necesarios
                        </h1>

                        <div className='text-xl font-medium proportional-nums '>
                            {serie}
                        </div>

                    </div>

                    <div className='card-body border-none h-96 sm:grid grid-cols-10  place-contents-tart '>

                        <div className='col-span-4'>

                            <div className='bg-white px-4 py-2 sm:p-6'>

                                <div className='grid grid-cols-6 gap-6'>

                                    <div class="col-span-6 sm:col-span-3">
                                        <label
                                            for="first-name"
                                            class="block text-sm font-medium text-gray-700"
                                        >
                                            Tipo de documento
                                        </label>

                                        <select
                                            type="text"
                                            class="mt-1 form-control  font-mono block w-full rounded-md h-8 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            onChange={(e) => generarNumeroFactura(e.target.value)}
                                        >
                                            <option>SELECCIONE</option>
                                            {tipoDocumento.map(tp => {
                                                return <option
                                                    value={`${tp.serie}`}
                                                >
                                                    {
                                                        tp.nombre == 'BOLETA ELECTRONICA' && 'BOLETA'
                                                        || tp.nombre == 'FACTURA ELECTRONICA' && 'FACTURA'
                                                        || 'TICKET'
                                                    }
                                                    ({tp.serie})
                                                </option>
                                            })}
                                        </select>

                                    </div>

                                    <div class="col-span-6 sm:col-span-3">
                                        <label
                                            for="last-name"
                                            class="block text-sm font-medium text-gray-700"
                                        >
                                            Dni / Ruc
                                        </label>
                                        <div className='flex'>

                                            <input
                                                type="text"
                                                class=" block form-control   h-8 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                            <i
                                                role='button'
                                                className="
                                                fi fi-rr-plus-small
                                                w-14    
                                                text-center
                                                text-xl
                                                text-indigo-400
                                                bg
                                                mt-1
                                                hover:text-2xl 
                                                
                                            "
                                                onClick={() => {
                                                    console.log('Modal abierto')
                                                }}
                                            ></i>
                                        </div>


                                    </div>

                                    <div class="col-span-6 sm:col-span-4">
                                        <label for="email-address" class="block text-sm font-medium text-gray-700">Cliente</label>
                                        <input type="text" name="email-address" id="email-address" autocomplete="email" class="mt-1 form-control  block w-full h-8 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                    </div>

                                    <div class="col-span-6 sm:col-span-2">
                                        <label
                                            for="last-name"
                                            class="block text-sm font-medium text-gray-700"
                                        >
                                            Impresion
                                        </label>

                                        <select
                                            type="text"
                                            class="mt-1 form-control  block w-full h-8 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        >
                                            <option>TICKET</option>
                                            <option>PDF</option>
                                        </select>

                                    </div>

                                    <div class="col-span-6 sm:col-span-3">
                                        <label
                                            for="first-name"
                                            class="block text-sm font-medium text-gray-700"
                                        >
                                            Moneda
                                        </label>

                                        <select
                                            type="text"
                                            class="mt-1 form-control  font-mono block w-full rounded-md h-8 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        >
                                            <option>SOLES</option>
                                            <option>DOLARES</option>
                                        </select>

                                    </div>

                                    <div class="col-span-6 sm:col-span-3">
                                        <label
                                            for="first-name"
                                            class="block text-sm font-medium text-gray-700"
                                        >
                                            Forma pago
                                        </label>

                                        <select
                                            type="text"
                                            class="mt-1 form-control  font-mono block w-full rounded-md h-8 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        >
                                            <option>CREDITO</option>
                                            <option>EFECTIVO</option>
                                        </select>

                                    </div>

                                    <div class="col-span-6 sm:col-span-2">
                                        <label
                                            for="last-name"
                                            class="block  text-sm font-medium text-gray-700"
                                        >
                                            Subtotal
                                        </label>

                                        <input
                                            type="text"
                                            class="mt-1 block form-control  w-full h-8 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />

                                    </div>

                                    <div class="col-span-6 sm:col-span-2">
                                        <label
                                            for="last-name"
                                            class="block text-sm font-medium text-gray-700"
                                        >
                                            IGV
                                        </label>

                                        <input
                                            type="text"
                                            class="mt-1 form-control block w-full h-8 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />

                                    </div>

                                    <div class="col-span-6 sm:col-span-2">
                                        <label
                                            for="last-name"
                                            class="block text-sm font-medium text-gray-700"
                                        >
                                            Total venta
                                        </label>

                                        <input
                                            type="text"
                                            class="mt-1 form-control  block w-full h-8 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />

                                    </div>


                                </div>
                            </div>

                        </div>

                        <div className='col-span-6  '>


                            <div className='card border-none box-lista-producto '>

                                <div className='flex flex-row-reverse  rounded-sm h-11 p-2 mb-2'>

                                    <div
                                        className='
                                            flex 
                                            cursor-pointer 
                                            text-sky-500
                                            hover:text-sky-200
                                        '
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalProductos"
                                    >
                                        <div className='mt-1  text-sm  text-xs leading-6 '>
                                            Agregar producto
                                        </div>
                                        <i className='fi fi-rr-shopping-cart-add p-1  leading-6 text-xl '> </i>

                                    </div>

                                </div>

                                <div className='scroll-box-table mt-1'>
                                    <table className=' border-collapse border border-slate-400 w-full h-full'>
                                        <thead className='static navbar-dark '>
                                            <tr>
                                                <th className='p-2 text-center text-sm '>
                                                    Codigo
                                                </th >
                                                <th className='p-2 text-center text-sm '>
                                                    Producto
                                                </th>
                                                <th className='p-2 text-center text-sm '>
                                                    Laboratorio
                                                </th>
                                                <th className='p-2 text-center text-sm '>
                                                    Lote
                                                </th>
                                                <th className='p-2 text-center text-sm '>
                                                    F.Vencimiento
                                                </th >
                                                <th className='p-2 text-center text-sm '>
                                                    Cantidad
                                                </th>
                                                <th className='p-2 text-center text-sm '>
                                                    Precio
                                                </th>
                                                <th className='p-2 text-center text-sm '>
                                                    Total
                                                </th>
                                            </tr>

                                        </thead>
                                        <tbody className='divide-y divide-slate-200'>

                                            {productosCarrito.map(producto => {

                                                return (
                                                    <tr>
                                                        <td className='p-2 text-center'>
                                                            {producto.codigo_barras}
                                                        </td>
                                                        <td className='p-2 text-center'>
                                                            {producto.descripcion}
                                                        </td>
                                                        <td className='p-2 text-center'>
                                                            {producto.laboratorio}
                                                        </td>
                                                        <td className='p-2 text-center'>
                                                            {producto.lote}
                                                        </td>
                                                        <td className='p-2 text-center'>
                                                            {producto.fecha_vencimiento}
                                                        </td>
                                                        <td className='p-2 text-center'>

                                                        </td>
                                                        <td className='p-2 text-center'>

                                                        </td>
                                                        <td className='p-2 text-center'>
                                                            {venta?.total}
                                                        </td>
                                                    </tr>
                                                )
                                            })

                                            }
                                            <tr>
                                                <td className='p-2 text-center'>
                                                    000001
                                                </td>
                                                <td className='p-2 text-center'>
                                                    ACI BASIC X 220ML SUSPENSION
                                                </td>
                                                <td className='p-2 text-center'>
                                                    TEVA
                                                </td>
                                                <td className='p-2 text-center'>
                                                    2000410
                                                </td>
                                                <td className='p-2 text-center'>
                                                    12/12/12
                                                </td>
                                                <td className='p-2 text-center'>
                                                    124
                                                </td>
                                                <td className='p-2 text-center'>
                                                    2.80
                                                </td>
                                                <td className='p-2 text-center'>
                                                    123
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className='p-2 text-center'>
                                                    000001
                                                </td>
                                                <td className='p-2 text-center'>
                                                    ACI BASIC X 220ML SUSPENSION
                                                </td>
                                                <td className='p-2 text-center'>
                                                    TEVA
                                                </td>
                                                <td className='p-2 text-center'>
                                                    2000410
                                                </td>
                                                <td className='p-2 text-center'>
                                                    12/12/12
                                                </td>
                                                <td className='p-2 text-center'>
                                                    124
                                                </td>
                                                <td className='p-2 text-center'>
                                                    2.80
                                                </td>
                                                <td className='p-2 text-center'>
                                                    123
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>

                            </div>

                        </div>


                    </div>

                </form>


            </div>

            {/** Modal de Productos */}

            <Modal
                id='modalProductos'
                title='Productos 🛒'
            >

                <div className='card-body '>

                    <div className='flex flex-row-reverse'>
                        <input
                            className='

                              form-control
                              border-gray-200
                              my-2
                              w-48	
                            '
                        />
                    </div>


                    <div className='box-productos'>

                        <div className='scroll-box '>
                            <table className='table'>
                                <thead className='navbar-dark'>

                                    <th>
                                        Nombre
                                    </th>
                                    <th>
                                        Laboratorio
                                    </th>
                                    <th>
                                        P.Caja
                                    </th>
                                    <th>
                                        Lote
                                    </th>
                                    <th>
                                        F.Vencimiento
                                    </th>
                                    <th>
                                        Stock
                                    </th>
                                </thead>
                                <tbody>
                                    {productos.map(producto => {
                                        return (
                                            <tr
                                                onClick={(e) => {
                                                    console.log(e.currentTarget);
                                                    mostrarProductosCarrito(e.currentTarget);
                                                }}
                                            >
                                                <td>
                                                    {<input type={'hidden'} value={producto._id}></input>}
                                                    {producto.descripcion}
                                                </td>
                                                <td>
                                                    {producto.id_laboratorio}
                                                </td>
                                                <td>
                                                    {producto.precio_compra}
                                                </td>
                                                <td>
                                                    {producto.codigo_barras}
                                                </td>
                                                <td>
                                                    {producto.fecha_vencimiento}
                                                </td>
                                                <td>
                                                    {producto.stock}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>

                            </table>
                        </div>

                    </div>

                </div>

            </Modal>

        </>
    );

}

export { PuntoVenta }