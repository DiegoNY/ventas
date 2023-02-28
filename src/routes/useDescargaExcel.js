import * as ExcelJS from 'exceljs'

/**
 * 
 * @param {*} data array con la informacion que ira en tabla :
 * let data = [
    {
        descripcion: "descripcion", fecha: "12-12-12",
    }
]
 * @param {*} columns las columnas que iran en la tabla esta es un array :
 * let columns = [
 *      {
 *          key : "descripcion",
 *          width: 20,
 *      },
 *      {
 *          key : "fecha",
 *          width: 10,
 *      }
 * ]
 * @param {*} informacionExcel informacion complementaria para el archivo en json :
 * {
 *      hoja: "HOJA",
        titulo: {
            celdas: "A1:H1",
            value: "TITULO",
        },
        celdas: [
            {
                numero: "A4",
                value: "PRUeAB DE CELDA",
                font: { bold: true }
                style: { 
                    font: { color: { argb: 'FFFFFFFF' } },
                    fill: { 
                        type: 'pattern', 
                        pattern: 'solid',
                        fgColor: { argb: 'FF0070C0' } 
                    },
                    alignment: { horizontal: 'center' }
                }
            },
            {
                numero: "B4",
                value: "PRUEBA DE CELDA",
                font: { bold: true }
            }
        ],
        nombreArchivo: "PRUEBA"
 * }
 */
const DescargarDataExcel = (data, columns, informacionExcel) => {


    const worbook = new ExcelJS.Workbook();
    const sheet = worbook.addWorksheet(informacionExcel.hoja);

    sheet.properties.defaultRowHeight = 16;
    sheet.mergeCells(informacionExcel.titulo.celdas);

    const titleCell = sheet.getCell('A1');
    titleCell.value = informacionExcel.titulo.value;
    titleCell.font = { bold: true };
    titleCell.alignment = { horizontal: 'center', vertical: 'middle' };


    const blueStyle = informacionExcel.style || {
        font: { color: { argb: 'FFFFFFFF' } },
        fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0070C0' } },
        alignment: { horizontal: 'center' }
    };

    informacionExcel.celdas.map(celda => {
        const celdaExcel = sheet.getCell(celda.numero);
        celdaExcel.value = celda.value;
        celdaExcel.font = celda.font || { bold: true };
        celdaExcel.alignment = celda.alignment || { horizontal: 'center', vertical: 'middle' };
        celdaExcel.width = celda.width;
        celdaExcel.style = celda.style || blueStyle;

    })


    sheet.columns = columns;

    data.map(data => {

        const row = sheet.addRow(data)

        row.eachCell(cell => {
            cell.alignment = { horizontal: 'center' };
        });
    })

    const totalRows = sheet.rowCount;

    informacionExcel?.final?.map(celda => {

        const celdaExcel = sheet.getCell(`${celda.columna}${totalRows + celda.cantidad}]`);
        celdaExcel.value = celda.value;

        if (celda.value.formula) celdaExcel.value = { formula: `=${celda?.value?.formula?.operacion}(${celda?.value?.formula.columna}${celda?.value?.formula?.numero}:${celda?.value?.formula?.columna}${totalRows})`, result: 7 };

        celdaExcel.font = celda.font || { bold: true };
        celdaExcel.alignment = celda.alignment || { horizontal: 'center' };

    })



    worbook.xlsx.writeBuffer().then(datas => {
        const blob = new Blob([datas], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
        })

        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = `${informacionExcel.nombreArchivo}.xlsx`;
        anchor.click();
        window.URL.revokeObjectURL(url);
    })


}

export { DescargarDataExcel }