const ObtnerFechas = (fecha, siguiente = false, anterior = false) => {
    const date = new Date(fecha);
    console.log(date);

    let inicio = new Date(date.getFullYear(), 0, 1);
    let fin = new Date(date.getFullYear() + 1, 0, 1);

    if (siguiente) {
        inicio = new Date(date.getFullYear() + siguiente, 0, 1);
        fin = new Date(date.getFullYear() + 1, 0, 1);
    }

    if (anterior) {
        inicio = new Date(date.getFullYear() - anterior, 0, 1);
        fin = new Date(date.getFullYear() - 1, 0, 1);
    }

    return {
        inicio,
        fin
    }
}


export {
    ObtnerFechas,
}