function numberToName(num) {
    let numbers = {
        0: "cero", 1: "uno", 2: "dos", 3: "tres", 4: "cuatro", 5: "cinco",
        6: "seis", 7: "siete", 8: "ocho", 9: "nueve", 10: "diez", 11: "once", 12: "doce", 13: "trece", 14: "catorce",
        15: "quince", 16: "dieciseis", 17: "diecisiete", 18: "dieciocho", 19: "diecinueve", 20: "veinte", 21: "veintiuno",
        22: "veintidos", 23: "veintitres", 24: "veinticuatro", 25: "veinticinco", 26: "veintiseis", 27: "veintisiete",
        28: "veintiocho", 29: "veintinueve", 30: "treinta", 40: "cuarenta", 50: "cincuenta", 60: "sesenta", 70: "setenta",
        80: "ochenta", 90: "noventa", 100: "cien", 101: "ciento", 200: "doscientos", 300: "trescientos", 400: "cuatrocientos",
        500: "quinientos", 600: "seiscientos", 700: "setecientos", 800: "ochocientos", 900: "novecientos"
    };

    if (num >= 0 && num <= 19) {
        return numbers[num];
    } else if (num >= 20 && num <= 99) {
        let tens = Math.floor(num / 10);
        let ones = num % 10;
        if (ones === 0) {
            let numeroString = `${tens}${ones}`;
            let numero = Number(numeroString);
            return numbers[numero];
        } else {
            let numeroString = `${tens}${ones}`;
            let numero = Number(numeroString);
            let numeroInNumbers = numero - ones;

            return numbers[numeroInNumbers] + " y " + numbers[ones];
        }
    } else if (num >= 100 && num <= 999) {
        let hundreds = Math.floor(num / 100);
        let rest = num % 100;

        // console.log(rest);
        // console.log(hundreds);

        if (rest === 0) {
            let numeroString = `${hundreds}00`;

            return numbers[Number(numeroString)];
        } else {
            let numeroString = `${hundreds}00`;
            if (numeroString == '100') numeroString = 101;

            return numbers[numeroString] + " " + numberToName(rest);
        }
    } else {
        return "Número fuera de rango";
    }
}


export { numberToName }