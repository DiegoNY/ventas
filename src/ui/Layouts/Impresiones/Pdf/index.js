import React from 'react';
import QRCode from 'react-qr-code';
import { EMPRESA } from '../../../../config';
import { numberToName } from '../../../../routes/useNombresNumeros';
import './index.css';

const ImprimirPDF = ({ data }) => {

    let moneda;
    let dineroVenta;
    let totalVenta = data?.venta?.total;
    let centimos = '00';

    const hoy = new Date();

    let fecha = hoy.toLocaleDateString("es-ES", {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    })
    const Totales = [
        {
            nombre: 'Sub Total',
            descripcion: data?.venta?.subtotal || '00',
        },
        {
            nombre: 'Otros Cargos',
            descripcion: data?.venta?.otros_cargos || '00',
        },
        {
            nombre: 'Descuento Total',
            descripcion: data?.venta?.descuento_total || '00',
        },
        {
            nombre: 'Operaciones Gravadas',
            descripcion: data?.venta?.operaciones_gravadas || '00',
        },
        {
            nombre: 'Operaciones Exoneradas',
            descripcion: data?.venta?.operaciones_exoneradas || '00',
        },
        {
            nombre: 'Operaciones Inafectas',
            descripcion: data?.venta?.operaciones_inafectas || '00',
        },
        {
            nombre: 'I.G.V 18.00%',
            descripcion: data?.venta?.igv || '00',
        },
        {
            nombre: 'IMPORTE TOTAL',
            descripcion: data?.venta?.total || '00',
        },
    ]
    let DOCUMENTO;
    let documentoArray = data?.venta?.serie?.split('') || [];

    DOCUMENTO = data?.venta?.tipo_documento;

    if (documentoArray[0] == 'B') DOCUMENTO = 'BOLETA DE VENTA';
    if (documentoArray[0] == 'F') DOCUMENTO = 'FACTURA';
    if (documentoArray[0] == 'T') DOCUMENTO = 'TICKET DE VENTA';

    if (data?.venta?.tipo_moneda == 'SOLES') moneda = 'SOLES';
    if (data?.venta?.tipo_moneda == 'DOLARES') moneda = 'DÓLARES AMERICANOS';

    if (Number.isInteger(totalVenta)) {
        dineroVenta = numberToName(totalVenta);
        // console.log(dineroVenta);
        if (dineroVenta === 'uno') {
            dineroVenta = 'UN';
            if (moneda == 'SOLES') moneda = 'SOL';
            if (moneda == 'DÓLARES AMERICANOS') moneda = 'DOLAR';
        };
    } else {
        let total = totalVenta?.toString()?.split('.') || [];
        dineroVenta = numberToName(total[0]);
        if (dineroVenta == 'uno') {
            dineroVenta = 'UN';
            if (moneda == 'SOLES') moneda = 'SOL';
            if (moneda == 'DÓLARES AMERICANOS') moneda = 'DOLAR';
        };
        centimos = total[1]?.toString()?.padEnd(2, '0');
    }

    return (
        <>
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
                        //bg-indigo-500
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
                                    {DOCUMENTO} ELECTRÓNICA
                                </p>
                                <p>{data?.venta?.numero_venta}</p>
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
                            grid-cols-3 
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
                                <p className='font-bold'>SEÑORES   </p>
                                <p className='font-bold'>DIRECCION </p>
                                <p className='font-bold'>R.U.C N°  </p>
                                <p className='font-bold'>FECHA EMISION  </p>
                            </div>
                            <div>
                                <p>:  {data?.venta?.cliente || data?.venta?.proveedor}  </p>
                                <p>: {data?.venta?.direccion || '-'}</p>
                                <p>:  {data?.venta?.identificacion || data?.venta?.ruc_proveedor} </p>
                                <p>: {data?.venta?.fecha_registro || fecha} </p>
                            </div>

                        </div>
                        <div
                            className='
                                grid
                                grid-cols-2
                            '
                        >
                            <div>
                                <p className='font-bold'>MONEDA  </p>
                            </div>
                            <div>
                                <p>: {data?.venta?.tipo_moneda} </p>
                            </div>

                        </div>
                        <div
                            className='
                                grid
                                grid-cols-2
                            '
                        >
                            <div>
                                <p className='font-bold'>TIPO PAGO</p>
                                <p className='font-bold'>VENDEDOR </p>
                            </div>
                            <div>
                                <p>: {data?.venta?.forma_pago} </p>
                                <p>:  {data?.venta?.nombre_usuario || 'undefined'} </p>
                            </div>

                        </div>
                    </div>
                    <div
                        className='
                            //bg-green-400
                            grid
                            grid-cols-8
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
                                LOTE
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
                                FECH. VCTO
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
                                P. UNIT
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
                                IMPORTE
                            </div>

                        </div>
                        <div
                            className='
                            
                                col-span-8
                                flex
                                flex-col
                                layout-productos
                                border
                            '
                        >
                            {data?.venta?.productos?.map((producto, index) => {

                                let UNIDA_MEDIDA;

                                if (producto.medida == 'U') UNIDA_MEDIDA = 'UNIDAD';
                                if (producto.medida == 'C') UNIDA_MEDIDA = 'CAJA';
                                if (producto.medida == 'T') UNIDA_MEDIDA = 'TABLETA';

                                return (
                                    <div
                                        className={`
                                         col-span-8
                                         grid
                                         grid-cols-8
                                         ${(data?.venta?.productos?.length - 1) == index && 'h-full'}
                                        `
                                        }
                                    >
                                        <div className='border-r border-black'> {producto.codigo_barras} </div>
                                        <div className='border-r border-black'> {producto.cantidad_comprada || producto?.stock_comprado} </div>
                                        <div className='border-r border-black col-span-2'> {producto.descripcion} X {UNIDA_MEDIDA || 'undefined'}</div>
                                        <div className='border-r border-black'> {producto.lote} </div>
                                        <div className='border-r border-black'> {producto.fecha_vencimiento} </div>
                                        <div className='border-r border-black'> {producto.precio || producto?.precio_compra} </div>
                                        <div className=''> {producto.total} </div>

                                    </div>
                                )
                            })}


                        </div>


                    </div>

                </div>

                <div

                    className='
                        col-span-12
                        border-y
                        border-x
                        border-black
                        grid
                        grid-cols-3
                    '
                >
                    <div className='col-span-3 border-b border-b-black px-2 uppercase'> SON: {dineroVenta} {moneda} CON {centimos}/100 CENTIMOS. </div>
                    <div
                        className='
                            col-span-2
                            flex
                            flex-col
                            border-b
                            border-b-black
                        '
                    >
                        <p className='px-2 border-b border-b-black mb-2 font-semibold'>Cuentas de Bancos</p>
                        <div
                            className='p-2 flex '
                        >
                            <div

                            >
                                <QRCode
                                    value={data?.qr || 'www.tuCompra.com'}
                                    style={{ height: "120px", maxWidth: "100%", width: "100%" }}
                                    viewBox={`0 0 120 120`}


                                />
                            </div>

                        </div>
                    </div>
                    <div
                        className='
                            flex
                            flex-col
                            p-2
                            border-l
                            border-b
                            border-l-black
                            border-b-black
                        '
                    >
                        {Totales?.map((total, index) => {
                            return (
                                <div
                                    className='
                                        flex
                                        justify-between
                                        font-semibold
                                    '
                                >
                                    <p className='font-bold' >{total?.nombre}</p> <p>{total?.descripcion}</p>
                                </div>
                            )
                        })}


                    </div>

                    <div
                        className='col-span-3 p-2'
                    >
                        Representación impresa de la , esta puede ser consultada en http://www.mundoapu.com:8080/admin/
                        Autorizado mediante resolución de intendencia N° {EMPRESA.AUTORIZACION}/SUNAT
                    </div>
                </div>
            </div>
        </>
    )
}

export { ImprimirPDF }