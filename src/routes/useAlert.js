import Swal from "sweetalert2";

/**
 * Funcion que retorna una laerta y un mensaje 
 * por defecto contiene un mensaje pero puedes personalizarlo
 * 🐱‍🏍
 * @param {*} message mensaje personalizado 📩 
 */
function Save(message = ' Se registro la informacion correctamente! ') {

    Swal.fire(
        '',
        `${message}`,
        'success'
    )

}

/**
 * Funcion que retorna una laerta y un mensaje 
 * por defecto contiene un mensaje pero puedes personalizarlo
 * 🐱‍🏍
 * @param {*} message mensaje personalizado 📩 
 */

function Delete(message = 'Estas seguro de eliminar esta informacion ?') {

    Swal.fire(
        '',
        `${message}`,
        'error' // cambiar al alert de edicion
    )

}

function Informacion(message = 'Error') {
    //swal edit 🍟

    Swal.fire(
        '',
        `${message}`,
        'error'
    )
}


export { Save, Delete, Informacion }