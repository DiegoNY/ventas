const obtnerDescuento = (total, descuento1, descuento2 = 0, descuento3 = 0) => {

    total = Number(total);
    console.log(total);
    descuento1 = Number(descuento1);
    descuento2 = Number(descuento2);
    descuento3 = Number(descuento3);
    console.log(descuento1);
    // Aplicar descuentos
    total = total - (total * (descuento1 / 100));
    total = total - (total * (descuento2 / 100));
    total = total - (total * (descuento3 / 100));


    console.log(total);
    return total;
}

export { obtnerDescuento }