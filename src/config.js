// Archivo de Configuracion 🔩🔩🔩
const hostAPI = 'http://192.168.1.43:8000';
const hostAPIV2 = 'http://192.168.1.43:8080';

const urlAPI = {

    Cliente: {

        url: `${hostAPIV2}/api/v2/cliente`,

    },

    Caja: {

        url: `${hostAPI}/api/v1/checkoutbox`,

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
    }

}

export {
    hostAPI,
    urlAPI,
}