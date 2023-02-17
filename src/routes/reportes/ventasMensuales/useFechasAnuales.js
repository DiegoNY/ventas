const ObtnerFechas = (fecha, siguiente = false, anterior = false) => {
    const date = new Date(fecha);

    let inicio = new Date(date.getFullYear(), 0, 1);
    let fin = new Date(date.getFullYear() + 1, 0, 1);
    let año = date.getFullYear();

    if (siguiente) {
        inicio = new Date(date.getFullYear() + 2, 0, 1);
        fin = new Date(inicio.getFullYear() + 1, 0, 1);
        año = inicio.getFullYear();
    }

    if (anterior) {

        inicio = new Date(date.getFullYear() - 0, 0, 1);
        fin = new Date(inicio.getFullYear() + 1, 0, 1);
        año = inicio.getFullYear();

    }

    return {
        inicio: `${inicio.toISOString()}`.substring(0, 10),
        fin: `${fin.toISOString()}`.substring(0, 10),
        año
    }
}


export {
    ObtnerFechas,
}