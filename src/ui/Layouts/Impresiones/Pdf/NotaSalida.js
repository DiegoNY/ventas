import React from 'react';
import QRCode from 'react-qr-code';
import { EMPRESA } from '../../../../config';

const PdfNotaSalida = ({ data }) => {

    return (
        <div
            className='
            layout-pdf
            grid 
            grid-cols-12 
            mx-8
            my-4
            font-sans
            font-semibold
        '
        >
            <div
                className='
                col-span-12
                grid
                grid-cols-2
                //bg-red-200
            '
            >
                <div
                    className='
                    flex
                    flex-col
                    font-bold
                '
                >
                    <div
                        className='
                        h-36
                    '
                    >

                    </div>
                    <p >{EMPRESA.NOMBRE}</p>
                    <p>{EMPRESA.DIRECCION}</p>
                    <p>Telefonos : {EMPRESA.TELEFONO}</p>
                </div>
                <div
                    className='
                        flex
                        flex-col
                    '
                >
                    <div
                        className='

                        border-2
                      border-black
                        h-48
                        flex
                        mx-2 
                        text-3xl
                        text-center
                        py-2
                    '
                    >
                        <div
                            className='
                            flex
                            flex-col
                            mx-auto
                            
                        '
                        >
                            <p >R.U.C. {EMPRESA.RUC}</p>
                            <p>
                                NOTA DE SALIDA
                            </p>
                            <p>{data?.venta?.numeroDocumento}</p>
                        </div>

                    </div>

                    <p className='mx-2 font-bold'>Correo Eletronico : {EMPRESA.EMAIL}</p>
                </div>

            </div>
            <div
                className='
                col-span-12    
                row-span-6
                flex
                flex-col
            '
            >
                <div
                    className='
                    grid
                    grid-cols-2
                    border-x
                    border-y
                    p-2
                    mb-2
                    border-black	
                '
                >
                    <div
                        className='
                        grid
                        grid-cols-2
                    '
                    >
                        <div>
                            <p className='font-bold'>SOLICITANTE </p>
                            <p className='font-bold'>MOTIVO </p>
                        </div>
                        <div>
                            <p>:  {data?.venta?.solicitante}  </p>
                            <p>: {data?.venta?.motivo}</p>
                        </div>

                    </div>
                    <div
                        className='
                            grid
                            grid-cols-2
                        '
                    >
                        <div>
                            <p className='font-bold'>FECHA </p>
                        </div>
                        <div>
                            <p>: {data?.venta?.fecha} </p>
                        </div>

                    </div>
                </div>
                <div
                    className='
                    //bg-green-400
                    grid
                    grid-cols-7 
                    border-y
                    border-x
                    text-center
                    border-black

                '
                >
                    <div
                        className='
                        flex
                        flex-col
                        border-r-2
                        border-b-2
                        border-black	
                    '
                    >
                        <div
                            className='
                        border
                        p-1                              
                      '
                        >
                            CODIGO
                        </div>

                    </div>
                    <div
                        className='
                        flex
                        flex-col
                        border-r-2
                        border-b-2
                        border-black	
                    '
                    >
                        <div
                            className='
                        border
                        p-1                              
                      '
                        >
                            CANT.
                        </div>

                    </div>
                    <div
                        className='
                        col-span-2
                        flex
                        flex-col
                        border-r-2
                        border-b-2
                        border-black	
                    '
                    >
                        <div
                            className='
                        border
                        p-1                              
                      '
                        >
                            DESCRIPCION
                        </div>

                    </div>
                    <div
                        className='
                        flex
                        flex-col
                        border-r-2
                        border-b-2
                        border-black	
                    '
                    >
                        <div
                            className='
                        border
                        p-1                              
                      '
                        >
                            LABORATORIO
                        </div>

                    </div>
                    <div
                        className='
                        flex
                        flex-col
                        border-r-2
                        border-b-2
                        border-black	
                    '
                    >
                        <div
                            className='
                        border
                        p-1                              
                      '
                        >
                            LOTE
                        </div>

                    </div>
                    <div
                        className='
                        flex
                        flex-col
                        
                        border-b-2
                        border-black	
                    '
                    >
                        <div
                            className='
                        border
                        p-1                              
                      '
                        >
                            FECH. VCTO
                        </div>

                    </div>
                    <div
                        className='
                    
                        col-span-8
                        flex
                        flex-col
                        layout-productos-nota-salida
                        border
                    '
                    >
                        {data?.venta?.productos?.map((producto, index) => {

                            let UNIDA_MEDIDA;
                            let MEDIDA = producto.cantidad.split('-')[0];

                            if (MEDIDA == 'U') UNIDA_MEDIDA = 'UNIDAD';
                            if (MEDIDA == 'C') UNIDA_MEDIDA = 'CAJA';
                            if (MEDIDA == 'T') UNIDA_MEDIDA = 'TABLETA';

                            return (
                                <div
                                    className={`
                                 col-span-7
                                 grid
                                 grid-cols-7
                                 ${(data?.venta?.productos?.length - 1) == index && 'h-full'}
                                `
                                    }
                                >
                                    <div className='border-r border-black'> {producto.codigo_barras} </div>
                                    <div className='border-r border-black'> {producto.stock_saliente} </div>
                                    <div className='border-r border-black col-span-2'> {producto.descripcion} X {UNIDA_MEDIDA || 'undefined'}</div>
                                    <div className='border-r border-black'> {producto.id_laboratorio} </div>
                                    <div className='border-r border-black'> {producto.lote} </div>
                                    <div className=' border-black'> {producto.fecha_vencimiento} </div>

                                </div>
                            )
                        })}


                    </div>


                </div>

            </div>


        </div>
    )
}

export { PdfNotaSalida }