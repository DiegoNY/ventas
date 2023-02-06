import React from 'react';
import './index.css'


const ImprimirTicket = () => {

    return (

        <>

            <div
                className='
                    flex
                    flex-col
                    h-screen
                '
            >


                <div className="mx-auto mt-10 text-center" >
                    <h1>Nombre empresa</h1>
                    <p >Nombre nuevamente de la empresa</p>
                    <p >20566487986</p>
                    <p > Jr. Monitor Huáscar 290 Urb. San Ignacio - Barranco</p>
                    <p > TELF: 01692 6092 </p>
                    ========================================
                    <h4>BOLETA DE VENTA ELECTRONICA</h4>
                    <p >B001-00000000</p>
                    ========================================
                    <div className="container-doble">
                        <div >
                            <p >FECHA</p>
                            <p >CLIENTE</p>
                            <p >DNI</p>
                            <p >VENDEDOR</p>
                        </div>
                        <div >
                            <p >12/12/2022 1:00:12:59</p>
                            <p >Clientes varios</p>
                            <p >000000000</p>
                            <p
                            >admin</p>
                        </div>

                    </div>
                    <div >
                        <h4 className="text" >CANTIDAD</h4>
                        <h4 className="text" >PRECIO</h4>
                        <h4 className="text" >IMPORTE</h4>
                    </div>
                    ========================================
                    <div>

                        <h4 className="text" >1</h4>
                        <h4 className="text" >2.30</h4>
                        <h4 className="text" >2.30</h4>
                    </div>
                    ACEITE DE ALMENDRAS X 30ML SOLUCION
                    <p >========================================</p>
                    <div className="container-doble">
                        <div >
                            <p >SUBTOTAL</p>
                            <p >IGV</p>
                            <p >IMPORTE TOTAL</p>
                        </div>
                        <div >
                            <p >2.50</p>
                            <p >1.90</p>
                            <p >3.00</p>
                        </div>
                    </div>
                    ========================================
                    <p

                    >SON: DOS CON 00/100 DÓLARES AMERICANOS.</p>
                    <p
                    >
                        Autorizado con Resolucion
                    </p>
                    <p
                    >
                        N: 034-005-0006616/SUNAT
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
                    >
                        Gracias por su compra
                    </p>



                </div>

            </div>
        </>
    )
}

export { ImprimirTicket }