
/**
 * Obtiene los datos que mande tu API
 * retorna la data en formato json para poder trabajarla🦧.
 * Es asincrona debe estar contenida en  otra funcion asincrona 
 * para que se puedan obtener los datos 🍔
 * 
 * @param {*} urlAPI es la url a la que se le hara la peticion  
 * @returns  devuelve los datos en formato json no hay necesidad de parsearlos 🙉
 */

async function getData(urlAPI) {

    const response = await fetch(urlAPI, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        redirect: 'follow'
    });

    const data = await response.json();
    return data;

}

/**
 * Envia datos por el metodo POST 💨
 * recibe un objeto y retorna la respuesta  en formato json.
 * Es asincrona debe estar contenida en  otra funcion asincrona 
 * para que se puedan obtener los datos ➰
 * 
 * @param {*} urlAPI es la url a la que se le hara la peticion 🍅
 * @param {*} body data en formato objeto 🗾
 * @returns retorna mensaje que proporciona tu API 📨
 */
async function postData(urlAPI, body) {

    const response = await fetch(urlAPI, {

        method: 'POST',
        redirect: 'follow',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"

        },
        body: JSON.stringify(body)

    });

    const data = await response.json();
    return data;

}

async function destroyData(urlAPI) {
    const response = await fetch(urlAPI, {

        method: 'DELETE',
        redirect: 'follow',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"

        },

    });

    const data = await response.json();
    return data;
}

async function updateData(urlAPI,body) {

    const response = await fetch(urlAPI, {

        method: 'PUT',
        redirect: 'follow',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"

        },
        body: JSON.stringify(body)


    });

    const data = await response.json();
    return data;
}

export {
    getData,
    postData,
    destroyData,
    updateData
}