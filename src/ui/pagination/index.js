import React, { useEffect, useState } from 'react';

function Pagination({ onClickNext, onClickPrevious, limiteMuestra, cantidadResultados, onClickPage }) {

    const [limiteMuestraEstado, setLimiteMuestraEstado] = useState(limiteMuestra);
    const [paginas, setPaginas] = useState([]);


    const CalcularTotalPaginas = () => {
        const total = Math.ceil(cantidadResultados / limiteMuestra)
        let paginasEncontrada = [];

        for (let i = 0; i < total; i++) {
            paginasEncontrada.push({ numero: i + 1 })
        }

        setPaginas(paginasEncontrada);
    }


    useEffect(() => {
        CalcularTotalPaginas();

        return () => {

        }
    }, [limiteMuestra, cantidadResultados])

    return (
        <>
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                    <a href="#" className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
                    <a href="#" className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Mostrando
                            <span className="font-medium mx-1">1</span>
                            a
                            <span className="font-medium mx-1">{limiteMuestraEstado}</span>
                            de
                            <span className="font-medium mx-1">{cantidadResultados || 'undefined'}</span>
                            resultados
                        </p>
                    </div>
                    <div>
                        <nav className="isolate flex inline-flex-space-x-px rounded-md shadow-sm" aria-label="Pagination">
                            <a
                                href="#"
                                className="
                                    relative 
                                    inline-flex 
                                    items-center 
                                    rounded-l-md 
                                    border 
                                    border-gray-300 
                                    bg-white px-2 
                                    py-2 
                                    text-sm 
                                    font-medium 
                                    text-gray-500 
                                    hover:bg-gray-50 
                                    focus:z-20
                                "
                                onClick={onClickPrevious}
                            >
                                <span className="sr-only">Previous</span>
                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
                                </svg>
                            </a>
                            {paginas.map(pagina => {

                                return (
                                    <a
                                        href="#"
                                        className="
                                        relative 
                                        inline-flex 
                                        items-center 
                                        border 
                                        border-gray-300 
                                        bg-white 
                                        px-2 
                                        py-2 
                                        text-sm 
                                        font-medium 
                                        text-gray-500 
                                        hover:bg-gray-50 
                                        focus:z-20
                                    "
                                        onClick={onClickPage}
                                    >
                                        {pagina.numero}
                                    </a>
                                )

                            })

                            }

                            <span className="relative inline-flex items-center border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-700">...</span>
                            <a
                                href="#"
                                className="
                                    relative 
                                    inline-flex 
                                    items-center 
                                    rounded-r-md 
                                    border 
                                    border-gray-300 
                                    bg-white px-2 
                                    py-2 
                                    text-sm 
                                    font-medium 
                                    text-gray-500 
                                    hover:bg-gray-50 
                                    focus:z-20
                                "
                                onClick={onClickNext}
                            >
                                <span className="sr-only">Next</span>
                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                                </svg>
                            </a>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )

}

export { Pagination }