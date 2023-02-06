/**
 * Funcion recibe como parametro la fecha actual y retorna el domingo siguiente si es domingo retorna
 * la fecha actual 
 * @param {*} date fecha a ingresar 
 * @returns 
 */
function getSunday(date) {
    if (date.getDay() == 0) {
        return date;
    }
    const day = date.getDay();
    const diff = date.getDate() + (7 - day) + (day > 0 ? 7 : 0) - (day == 1 ? + 7 : 0);
    return new Date(date.setDate(diff));
}

/**
 * Recibe una fecha y le resta 7 dias returna la fecha encontrada 
 * 📅
 * @param {*} fechaParam la fecha  
 * @returns 
 */

function getAfterSunday(fechaParam) {
    let fecha = new Date(fechaParam);
    let sieteDiasMilisegundos = 1000 * 60 * 60 * 24 * 7;
    let resta = fecha.getTime() - sieteDiasMilisegundos;

    return new Date(resta);

}

export {
    getSunday,
    getAfterSunday,
}