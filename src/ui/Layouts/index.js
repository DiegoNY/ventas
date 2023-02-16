import React from 'react';
import { Footer } from './Footer';

const Layout = React.memo(({ onClick, children, title, cardex }) => {

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
                onClick={onClick}
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
                    {!!title &&

                        <>
                            <h1 className='ml-10 mt-1 text-2xl sm:text-2xl font-extrabold text-slate-900 tracking-tight  ' >{title}</h1>
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

                                {children}


                            </div>
                        </>

                    }

                    {!title &&
                        <>

                            {children}

                        </>
                    }
                    {!cardex &&
                        <div
                            className='flex w-full text-slate-400 justify-center mb-1'
                        >
                            www.rcingenierossac.com
                        </div>

                    }

                </div>

                {!cardex &&
                    <Footer>

                    </Footer>
                }

            </div>

        </>
    )

})

export { Layout }