import React from 'react';
import { Label } from '../../../ui/forms/label';
import { Titulo } from '../../../ui/titulos-vistas';
import { InputForm } from './InputForm';
import './index.css'

function PuntoVenta() {

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
                            B001-00234411
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
                                        >
                                            <option>BOLETA</option>
                                            <option>FACTURA</option>
                                        </select>

                                    </div>

                                    <div class="col-span-6 sm:col-span-3">
                                        <label
                                            for="last-name"
                                            class="block text-sm font-medium text-gray-700"
                                        >
                                            Dni / Ruc
                                        </label>

                                        <input
                                            type="text"
                                            class="mt-1 block form-control  w-full h-8 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />

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

                            <div className='card box-productos'>
                                <div className='card-header text-lg '>
                                    Productos
                                </div>
                                <div className='scroll-box'>
                                    <table className='table '>
                                        <thead>

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

                                            <tr>
                                                <td>
                                                    ACI BASIC X 220ML SUSPENSION
                                                </td>
                                                <td>
                                                    TEVA
                                                </td>
                                                <td>
                                                    28.0
                                                </td>
                                                <td>
                                                    200004140
                                                </td>
                                                <td>
                                                    12/12/12
                                                </td>
                                                <td>
                                                    20
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    ACI BASIC X 220ML SUSPENSION
                                                </td>
                                                <td>
                                                    TEVA
                                                </td>
                                                <td>
                                                    28.0
                                                </td>
                                                <td>
                                                    200004140
                                                </td>
                                                <td>
                                                    12/12/12
                                                </td>
                                                <td>
                                                    20
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    ACI BASIC X 220ML SUSPENSION
                                                </td>
                                                <td>
                                                    TEVA
                                                </td>
                                                <td>
                                                    28.0
                                                </td>
                                                <td>
                                                    200004140
                                                </td>
                                                <td>
                                                    12/12/12
                                                </td>
                                                <td>
                                                    20
                                                </td>
                                            </tr>
                                        </tbody>

                                    </table>
                                </div>

                            </div>
                            <div className='card box-lista-producto '>

                                <div className='card-header'>
                                    Lista de Productos
                                </div>

                                <div className='scroll-box-table'>
                                    <table className='border-collapse border border-slate-400'>
                                        <thead className='static '>
                                            <th className='p-2 text-center text-sm font-normal'>
                                                Codigo
                                            </th >
                                            <th className='p-2 text-center text-sm font-normal'>
                                                Producto
                                            </th>
                                            <th className='p-2 text-center text-sm font-normal'>
                                                Laboratorio
                                            </th>
                                            <th className='p-2 text-center text-sm font-normal'>
                                                Lote
                                            </th>
                                            <th className='p-2 text-center text-sm font-normal'>
                                                F.Vencimiento
                                            </th >
                                            <th className='p-2 text-center text-sm font-normal'>
                                                Cantidad
                                            </th>
                                            <th className='p-2 text-center text-sm font-normal'>
                                                Precio
                                            </th>
                                            <th className='p-2 text-center text-sm font-normal'>
                                                Total
                                            </th>

                                        </thead>
                                        <tbody>
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
        </>
    );

}

export { PuntoVenta }