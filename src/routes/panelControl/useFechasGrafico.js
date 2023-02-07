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
    const currentDay = date.getDay();
    const daysUntilSunday = 7 - currentDay;
    const nextSunday = new Date(date.getTime() + (daysUntilSunday * 24 * 60 * 60 * 1000));
    return nextSunday;

}

/**
 * Recibe una fecha y le resta 7 dias returna la fecha encontrada 
 * 📅
 * @param {*} fechaParam la fecha  
 * @returns 
 */

function getMonday(fechaParam) {
    let fecha = new Date(fechaParam);
    let sieteDiasMilisegundos = 1000 * 60 * 60 * 24 * 6;
    let resta = fecha.getTime() - sieteDiasMilisegundos;
    return new Date(resta);

}

export {
    getSunday,
    getMonday,
}