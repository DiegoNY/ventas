import React from 'react';
import QRCode from "react-qr-code";
import { EMPRESA } from '../../../../config';
import { numberToName } from '../../../../routes/useNombresNumeros';


import './index.css'





const ItemsCompras = ({ nombre, cantidad, precio, importe, medida }) => {

    let UNIDA_MEDIDA;

    if (medida == 'U') UNIDA_MEDIDA = 'UNIDAD';
    if (medida == 'C') UNIDA_MEDIDA = 'CAJA';
    if (medida == 'T') UNIDA_MEDIDA = 'TABLETA';


    return (
        <>
            <div
            >
                <div
                    className='grid grid-cols-3 mb-1'

                >

                    <h4 className="" >{cantidad || '1'}</h4>
                    <h4 className="" >{precio || '2.30'}</h4>
                    <h4 className="" >{importe || '4.00'}</h4>
                </div>
                <p>{nombre && `${nombre} X ${UNIDA_MEDIDA}` || 'ACEITE DE ALMENDRAS X 30ML SOLUCION'}</p>
            </div>
        </>
    )
}

const ImprimirTicket = ({ data }) => {

    let moneda;
    let dineroVenta;
    let totalVenta = data.venta.total;
    let centimos = '00';
    let hoy = new Date();
    let fecha = hoy.toISOString();
    console.log(fecha);

    let hora = fecha.substring(13, 21);
    fecha = fecha.substring(0, 10);
    console.log(hora);
    console.log(fecha);

    if (data.venta.tipo_moneda == 'SOLES') moneda = 'SOLES';
    if (data.venta.tipo_moneda == 'DOLARES') moneda = 'DÓLARES AMERICANOS';

    if (Number.isInteger(totalVenta)) {
        dineroVenta = numberToName(totalVenta);
        console.log(dineroVenta);
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
                    flex
                    flex-col
                    h-screen
                '
            >


                <div className="mx-auto mt-10 text-center font-mono" >

                    <div
                        className='
                            flex
                            flex-col
                            justify-center
                            w-96
                        '
                    >
                        <h1>Nombre empresa</h1>
                        <p >{EMPRESA.NOMBRE}</p>
                        <p >{EMPRESA.RUC}</p>
                        <p > {EMPRESA.DIRECCION}</p>
                        <p > TELF: {EMPRESA.TELEFONO} </p>
                        ========================================
                        <h4 className='font-black'>BOLETA DE VENTA ELECTRONICA</h4>
                        <p className='font-semibold' >{data?.venta?.numero_venta}</p>
                    </div>
                    ========================================
                    <div className='grid grid-cols-2 text-left'
                    >
                        <div
                            className='ml-12'
                        >
                            <p >FECHA</p>
                            <p >CLIENTE</p>
                            <p >DNI</p>
                            <p >VENDEDOR</p>
                        </div>
                        <div
                        >
                            <p >{fecha} {hora}</p>
                            <p >Clientes varios</p>
                            <p >000000000</p>
                            <p>admin</p>
                        </div>

                    </div>
                    <div
                        className='grid grid-cols-3 mx-3 mt-1 font-black'
                    >
                        <h4 className="" >CANTIDAD</h4>
                        <h4 className="" >PRECIO</h4>
                        <h4 className="" >IMPORTE</h4>
                    </div>
                    ========================================
                    {data?.venta?.productos?.map((producto, index) => {

                        return (
                            <>
                                <ItemsCompras
                                    precio={producto?.precio}
                                    cantidad={producto?.cantidad_comprada}
                                    importe={producto?.total}
                                    nombre={producto?.descripcion}
                                    medida={producto?.medida}
                                />
                                {index != (data?.venta?.productos?.length - 1) && '------------------------------------'}
                            </>
                        )
                    })
                    }

                    <p >========================================</p>
                    <div
                        className='grid grid-cols-2 text-left'

                    >
                        <div
                            className='ml-12'
                        >
                            <p >SUBTOTAL</p>
                            <p >IGV</p>
                            <p >IMPORTE TOTAL</p>
                        </div>
                        <div
                        >
                            <p >2.50</p>
                            <p >1.90</p>
                            <p >3.00</p>
                        </div>
                    </div>
                    ========================================
                    <div className='uppercase text-center flex justify-center w-80 ml-10' >SON: {dineroVenta} {moneda} CON {centimos}/100 CENTIMOS .</div>

                    <div
                        className='my-2'
                    >
                        <QRCode
                            value={data.qr}
                            style={{ height: "120px", maxWidth: "100%", width: "100%" }}
                            viewBox={`0 0 120 120`}


                        />
                    </div>

                    <p>
                        Autorizado con Resolucion
                    </p>
                    <p
                    >
                        N: {EMPRESA.AUTORIZACION}/SUNAT
                    </p>
                    <p
                    >
                        Repr. Impresa del Documento Electronico
                    </p>
                    <p
                    >
                        www.mundoapu.com:8080/boticasrepublica
                    </p>
                    <p
                        className='mt-3'
                    >
                        Gracias por su compra :)
                    </p>



                </div>

            </div>
        </>
    )
}

export { ImprimirTicket }