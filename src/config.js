import { io } from "socket.io-client";
const socket = io('http://localhost:8080/');


// Archivo de Configuracion 🔩🔩🔩
const hostAPI = 'http://192.168.1.43:8000';
const hostAPIV2 = 'http://localhost:8080';

const urlAPI = {

    Cliente: {

        url: `${hostAPIV2}/api/v2/cliente`,

    },

    Caja: {

        url: `${hostAPIV2}/api/v2/caja`,

    },

    Proveedor: {

        url: `${hostAPIV2}/api/v2/proveedor`,

    },

    Producto: {

        url: `${hostAPIV2}/api/v2/producto`,

    },

    Usuario: {

        url: `${hostAPIV2}/api/v2/usuario`,

    },

    Moneda: {

        url: `${hostAPIV2}/api/v2/moneda`,

    },
    Laboratorio: {

        url: `${hostAPIV2}/api/v2/laboratorio`
    },
    TipoDocumento: {
        url: `${hostAPIV2}/api/v2/tipo_documento`
    },
    CodigoBarras:
    {
        url: `${hostAPIV2}/api/v2/codigo_barras`
    },
    ListaCompra: {
        url: `${hostAPIV2}/api/v2/lista_compra`
    },
    Venta: {
        url: `${hostAPIV2}/api/v2/venta`
    },
    Numeros_ventas: {
        url: `${hostAPIV2}/api/v2/serie_ventas`
    },
    Nota_salida : {
        url: `${hostAPIV2}/api/v2/nota_salida`
    }


}



export {
    hostAPI,
    urlAPI,
    socket
}