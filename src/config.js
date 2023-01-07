// Archivo de Configuracion 🔩🔩🔩

const hostAPI = 'http://192.168.1.43:8000';

const urlAPI = {

    Cliente: {

        url: `${hostAPI}/api/v1/cliente`,

    },

    Caja: {

        url: `${hostAPI}/api/v1/checkoutbox`,

    },

    Proveedor: {

        url: `${hostAPI}/api/v1/proveedor`,

    },

    Producto: {

        url: `${hostAPI}/api/v1/producto`,

    },

    Usuario: {

        url: `${hostAPI}/api/v1/usuario`,   

    },

    Moneda: {

        url: `${hostAPI}/api/v1/moneda`,

    },
    Laboratorio: {

        url: `${hostAPI}/api/v1/laboratorio`
    },
    TipoDocumento :{
        url: `${hostAPI}/api/v1/tipo_documento`
    },
    CodigoBarras : 
    {
        url: `http://localhost:8080/api/v2/codigo_barras`
    }

}

export {
    hostAPI,
    urlAPI,
}