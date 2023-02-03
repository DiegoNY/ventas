
import { Save } from "./useAlert";
import { destroyData, postData, updateData } from "./useFetch";

/**
 * Funcion para poder enviar datos 🙈
 * @param {*} urlApi url en la que se encuentra la api
 * @param {*} data  la data que se guardara
 */

const SaveData = async (urlApi, data, formData = false) => {


    const response = await postData(urlApi, data, formData)

    if (!response.error) Save();
    
    return response;

}

/**
 * 
 * @param {*} urlApi la url debe contener el id  
 * un ejemplo es localhost/api/v1/example/id  <= 👈
 */
const DeleteData = async (urlApi) => {

    const response = await destroyData(urlApi);
    console.log(response);

    /**
     * Alerta
     */

    Save();


}

/**
 * 
 * 
 * @param {*} urlAPI la url debe contener el id 
 * un ejemplo es localhost/api/v1/example/id  <= 👈 
 * @param {*} body el objeto 
 */
const UpdateData = async (urlAPI, body) => {

    const response = await updateData(urlAPI, body);
    console.log(response);

    Save();

}

export {
    SaveData,
    DeleteData,
    UpdateData

}