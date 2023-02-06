
const imprimirPDF = (informacion) => {
    const printWindow = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    printWindow.document.write(`
      <html>
        <head>
          <style>
            /* Estilos para la hoja de impresión */
          </style>
        </head>
        <body>
          <div>
            <MyComponent />
            Imprimir esto en PDF 👀
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
};


const imprimirTicket = (informacion, qr) => {
    const printWindow = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    printWindow.document.write(`
      <html>
        <head>
        <title>Document</title>
        <style>
            .container {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
    
            .container-doble {
                width: 350px;
                display: flex;
                height: 140px;
                font-size: 0.875rem;
                margin-bottom: -52px;
                line-height: 1.25rem;
                margin-left: 44px;
            }
    
            .text {
                font-size: 0.875rem;
                /* 14px */
                line-height: 1.25rem;
                margin: 0 0;
            }
        </style>
        </head>
        <body>

    <div class="container" style="
    font-size: 0.875rem;
    line-height: 1.25rem;
">
        <h1>Nombre empresa</h1>
        <p style="
    margin: 00;
">Nombre nuevamente de la empresa</p>
        <p style="
    margin: 0 0;
">20566487986</p>
        <p style="
    margin: 0 0;
"> Jr. Monitor Huáscar 290 Urb. San Ignacio - Barranco</p>
        <p style="
    margin: 00;
"> TELF: 01692 6092 </p>
        ========================================
        <h4 style="
    font-size: 0.875rem;
    line-height: 1.25rem;
    margin: 0 0 0;
">BOLETA DE VENTA ELECTRONICA</h4>
        <p style="
    font-size: 0.875rem;
    line-height: 1.25rem;
    margin: 0 0;
">B001-00000000</p>
        ========================================
        <div class="container-doble">
            <div style="display: flex; flex-direction: column;">
                <p style="
                /* margin-top: 0; */
                margin: 2px 0 0;
            ">FECHA</p>
                <p style="
                margin: 2px 0 0;
            ">CLIENTE</p>
                <p style="
                margin: 2px 0 0;
            ">DNI</p>
                <p style="width: 122px;margin: 2px 0 0;">VENDEDOR</p>
            </div>
            <div style="display: flex;flex-direction: column;">
                <p style="
                margin: 2px 0 0;
            ">12/12/2022 1:00:12:59</p>
                <p style="
                margin: 2px 0 0;
            ">Clientes varios</p>
                <p style="
                margin: 2px 0 0;
            ">000000000</p>
                <p style="
                margin: 2px 0 0;
            ">admin</p>
            </div>

        </div>
        <div style="
                width: 400px;
                display: grid;
                grid-template-columns: auto auto auto ;
                align-items: center;
                gap: 10; height:35px; 
            ">
            <h4 class="text" style=" display:flex; margin-left:auto; margin-right:auto;">CANTIDAD</h4>
            <h4 class="text" style=" display:flex; margin-left:auto; margin-right:auto;">PRECIO</h4>
            <h4 class="text" style=" display:flex; margin-left:auto; margin-right:auto;">IMPORTE</h4>
        </div>
        ========================================
        <div style="
            width: 400px;
            display: grid;
            grid-template-columns: auto auto auto ;
            align-items: center;
            gap: 10; 
        ">

            <h4 class="text" style=" display:flex; margin-left:auto; margin-right:auto;">1</h4>
            <h4 class="text" style=" display:flex; margin-left:auto; margin-right:auto;">2.30</h4>
            <h4 class="text" style=" display:flex; margin-left:auto; margin-right:auto;">2.30</h4>
        </div>
        ACEITE DE ALMENDRAS X 30ML SOLUCION
        <p style="margin: 0 0 0;">========================================</p>
        <div class="container-doble">
            <div style="display: flex; flex-direction: column;">
                <p style="
                /* margin-top: 0; */
                margin: 2px 0 0;
            ">SUBTOTAL</p>
                <p style="
                margin: 2px 0 0;
            ">IGV</p>
                <p style="width: 121px;margin: 2px 0 0;">IMPORTE TOTAL</p>
            </div>
            <div style="display: flex;flex-direction: column;">
                <p style="
                margin: 2px 0 0;
            ">2.50</p>
                <p style="
                margin: 2px 0 0;
            ">1.90</p>
                <p style="
                margin: 2px 0 0;
            ">3.00</p>
            </div>
        </div>
        ========================================
        <p 
            style="margin-top: 0;"
        >SON: DOS CON 00/100 DÓLARES AMERICANOS.</p>
         ${qr}
        <p 
            style="margin: 0 0 1px 0;"
        >
            Autorizado con Resolucion
        </p>
        <p 
            style="margin: 0 0 1px 0 ;"
        >
            N: 034-005-0006616/SUNAT
        </p>
        <p 
            style="margin: 0 0 1px 0;"
        >
            Repr. Impresa del Documento Electronico
        </p>
        <p 
            style="margin: 0 0 1px 0;"
        >
            www.mundoapu.com:8080/boticasrepublica
        </p>
        <p 
            style="margin: 0 0 1px 0;"
        >
            Gracias por su compra
        </p>



    </div>


</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
};


export {
    imprimirPDF,
    imprimirTicket
}