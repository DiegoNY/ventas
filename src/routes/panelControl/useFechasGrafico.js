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
    const diff = date.getDate() + (7 - day) + (day > 0 ? 7 : 0);
    return new Date(date.setDate(diff));
}

export {
    getSunday,
}