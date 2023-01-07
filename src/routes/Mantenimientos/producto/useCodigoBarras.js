const GeneradorCodigoBarras = (numero = '1') => {

    let codigo = Number(numero);
    let incrementador = codigo + 1;
    let codigoGenerado = incrementador.toString().padStart(6, '0');
    
    return codigoGenerado;
}


export { GeneradorCodigoBarras }