import React, { useEffect, useState } from 'react';
import { useAuth } from '../../auth/auth';
import { urlAPI } from '../../config';
import { Footer } from '../../ui/Layouts/Footer';
import { SaveData } from '../useCRUD';

const RegistrarGastos = () => {

    const auth = useAuth();
    const [gastos, setGastos] = useState({

    });

    const saveGastos = () => {
        //Agregando datos al formData ya que se esta enviando un archivo 
        let formData = new FormData();

        for (const key in gastos) {
            formData.append(key, gastos[key]);
        }

        const response = SaveData(`${urlAPI.Gastos.url}`, formData, true);
        if (!response.error) {
            cleanGastos();
        }

    }

    const cleanGastos = () => {
        setGastos(
            {
                usuario: gastos.usuario,
                idUsuario: gastos.idUsuario,
                fecha: '',
                descripcion: '',
                monto: '',
            }
        )
    }

    useEffect(() => {
        setGastos({
            ...gastos,
            usuario: auth?.user?.nombre,
            id_usuario: auth?.user?._id,
        })
    }, [auth.loading]);

    return (
        <>
            <div
                className='
                    grid
                    grid-cols-12
                    h-screen
                '
            >


                <div
                    className='
                        col-span-12
                        flex
                        flex-col
                        my-2     
                        mx-3
                    '
                >

                    <h1 className='
                            mr-auto
                            text-2xl 
                            sm:text-2xl 
                            font-extrabold 
                            text-slate-900 
                            tracking-tight 
                        '
                    >Estas registrando un gasto</h1>
                    <p className='
                            text-sm 
                            font-normal 
                            text-slate-500
                        '
                    >Por favor completa todos los campos</p>
                    <div

                        className='
                        mt-2
                        mx-auto
                        w-6/12
                        my-3

                        '
                    >
                        <div
                            className='
                           flex
                           rounded-xl

                        '
                        >
                            <div
                                className='
                                flex
                                flex-col
                                w-1/2
                                mr-3
                            '
                            >
                                <br />
                                <h1 className='font-semibold'>Usuario</h1>
                                <input placeholder='Obteniendo informacion espere por favor' disabled value={auth?.user?.nombre} className='mt-1 px-1 py-1' />
                                <br />
                                <h1 className='font-semibold'>Fecha</h1>
                                <input type='date'
                                    value={gastos?.fecha}
                                    className='text-center'
                                    onChange={(e) => {
                                        setGastos(
                                            {
                                                ...gastos,
                                                fecha: e.target.value,
                                            }
                                        )
                                    }}
                                />
                                <br />
                                <h1 className='font-semibold'>Descripcion</h1>
                                <textarea
                                    className='px-1'
                                    value={gastos?.descripcion}

                                    onChange={(e) => {
                                        setGastos(
                                            {
                                                ...gastos,
                                                descripcion: e.target.value,
                                            }
                                        )
                                    }}
                                >

                                </textarea>
                                <br />
                                <h1 className='font-semibold'>¿Cuanto dinero se gasto ?</h1>
                                <input
                                    className='px-1'
                                    type='text'
                                    value={gastos?.monto}
                                    placeholder='Ingresa el valor del pago'
                                    onChange={(e) => {
                                        setGastos(
                                            {
                                                ...gastos,
                                                monto: e.target.value,
                                            }
                                        )
                                    }}
                                />
                            </div>

                            <div
                                className='
                                        my-auto
                                        sm:ml-4
                                        sm:mt-1
                                        w-full
                                    '
                            >
                                <label class="block text-sm  text-slate-800 font-semibold">Selecciona un archivo </label>
                                <div class="mt-1 flex justify-center rounded-md border-2 border-dashed border-sky-400 px-6 pt-2 pb-2">
                                    <div class="space-y-1 text-center">
                                       
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mx-auto h-20 w-12 text-gray-400">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                        </svg>

                                        <div class="flex text-sm text-gray-600">
                                            <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-medium text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                                                <span>Sube un archivo </span>
                                                <input
                                                    id="file-upload"
                                                    name="file-upload"
                                                    type="file"
                                                    class="sr-only"
                                                    onChange={(e) => {
                                                        setGastos(
                                                            {
                                                                ...gastos,
                                                                imagen: e.target.files[0],
                                                            }
                                                        )
                                                    }}
                                                />
                                            </label>
                                            <p class="pl-1">📁</p>
                                        </div>
                                        <p class="text-xs text-gray-500">PNG, JPG, PDF, XLSX </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div
                            className='
                                flex
                                justify-end
                            '
                        >
                            <button
                                className='
                                    px-2
                                    rounded-xl
                                    mr-2
                                    h-10
                                    text-slate-500
                                    border-b
                                    border-b-slate-400
                                    hover:text-xs
                                '
                                onClick={() => cleanGastos()}
                            >
                                Cancelar gastos
                            </button>
                            <button
                                type='submit'
                                className='
                                    px-2
                                    bg-orange-500
                                    rounded-xl
                                    h-10
                                    text-white
                                '
                                onClick={() => saveGastos()}
                            >
                                Registrar gasto
                            </button>

                        </div>
                    </div>



                </div>
                <div
                    className='flex w-full col-span-12 text-slate-400 justify-center  items-center'
                >
                    www.rcingenierossac.com
                </div>
                <div
                    className='
                        border-t-2
                        col-span-12
                        mx-3
                    '
                >

                </div>
            </div>

        </>
    )
}

export { RegistrarGastos }