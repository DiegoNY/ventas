import React from 'react';

function Informacion({ onClick, children, className }) {

    return (
        <div
            className='
                        absolute
                         backdrop-blur-sm bg-white/30
                         z-50
                         h-full
                         w-full
                         flex
                        '
            onClick={onClick}
        >

            <div
                className='
                                mx-auto
                                mt-20
                                mb-auto
                                w-1/2
                                rounded-xl
                                p-2
                                bg-white
                                border
                                flex
                            '
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className={

                        className || `
                         //bg-red-200
                         h-96
                         w-full
                            flex
                         flex-col                                
                        `
                    }
                >
                    {children}

                </div>

            </div>

        </div >
    );

}

export { Informacion };