function generarSerieVenta(numeroSerie = 'T001-00000001') {
    let serieArr = numeroSerie.split('-');
    let serieIncrementar = Number(serieArr[1]);
    let serieIncrementada = serieIncrementar + 1;
    let serie = serieIncrementada.toString().padStart(8, '0');

    return { serie: serie, tipo_documento: serieArr[0] };
}


export { generarSerieVenta };