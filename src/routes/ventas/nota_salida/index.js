import React from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../../auth/auth';
import { TablaTalwindCss } from '../../../ui/Tabla/useTabla';
import { Titulo } from '../../../ui/titulos-vistas';

function NotaSalida() {
    //Usuario autenticado ? 
    const auth = useAuth();
    const navigation = useNavigate();
    if (!auth.user) navigation('/');

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
            >
                <div
                    className='
                        col-span-12
                        flex
                        flex-col
                        h-1
                    '
                >
                    <Titulo
                        title='Nota salida '
                        navegacion='ventas'
                        iconoEmoji='📝'
                    />


                </div>
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

                    <h1 className='text-2xl mx-auto' >Estas realizando una nota de credito</h1>
                    <div
                        className='
                            flex
                            h-full
                            mx-auto
                            mb-2
                            bg-green-400
                        '
                    >
                        <div
                            className='
                                w-1/2
                            '
                        >
                            ss
                        </div>
                        <div
                            className='
                                w-1/2
                            '
                        >
                            ss
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export { NotaSalida }