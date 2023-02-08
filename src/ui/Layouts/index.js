import React from 'react';
import { Footer } from './Footer';

const Layout = React.memo(({ onClick, children, title }) => {

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
                            <h1 className='text-2xl mx-auto font-bold mt-3 text-blue-400' >{title}</h1>
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
                    <div
                        className='flex w-full text-slate-400 justify-center mb-1'
                    >
                     www.rcingenierossac.com
                    </div>
                </div>
                
                <Footer>

                </Footer>

            </div>

        </>
    )

})

export { Layout }