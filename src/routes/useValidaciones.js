const validarSerie = (string) => {
    const pattern = /^[A-Z][a-zA-Z0-9-]{3}-[0-9]{8}$/;
    return pattern.test(string);
}

export {
    validarSerie
}