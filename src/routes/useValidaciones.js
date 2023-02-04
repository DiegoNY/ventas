const validarSerie = (string) => {
    const pattern = /^[a-zA-Z][0-9]{2}-[0-9]{8}$/;
    return pattern.test(string);
}

export {
    validarSerie
}