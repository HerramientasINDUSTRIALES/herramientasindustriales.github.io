// Llave de API y ID de hoja de cálculo de Google Sheets
const API_KEY = 'AIzaSyAGMHgnyWuzrmM-tOjrL-Ph_tRI3r4rFZw';
const SPREADSHEET_ID = '1Hw2-E8TWrqFPtPFQM7DjlA9rj-Mm9jeVAprqmzeYun4';

// Objeto reporte
const reporte = {
    tabla: [],
};

// Función para cargar la API de Google y luego inicializar el cliente
function loadGoogleAPI() {
    gapi.load('client', initClient);
}

function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
    }).then(() => {
        // Llama a la función para cargar los datos de la hoja de cálculo
        loadSheetData1();
        loadSheetData2();
    });
}

// Carga los datos de la tabla
function loadSheetData1() {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Conjunto!A3:Y39', // Se indica que lea a partir de la tercera fila de la columna A hasta la fila 39 de la columna Y
    }).then((response) => {
        // Obtiene los datos de la respuesta
        const sheetData = response.result.values;

        // Convierte los datos
        reporte.tabla = sheetData.map(row => ({
            Numero: row[0],
            Ano: row[1],
            Mes: row[2],
            Descripcion: row[3],
            Desde: row[4],
            Hasta: row[5],
            Factura: row[6],
            Comision: row[7],
            Total: row[8],
            Cuota_reunida: row[9],
            Reserva: row[10],
            Cuota_casas: row[11],
            Pago_casa1: row[12],
            Saldo_casa1: row[13],
            Estado_casa1: row[14],
            Pago_casa2: row[15],
            Saldo_casa2: row[16],
            Estado_casa2: row[17],
            Pago_casa3: row[18],
            Saldo_casa3: row[19],
            Estado_casa3: row[20],
            Pago_casa4: row[21],
            Saldo_casa4: row[22],
            Estado_casa4: row[23],
            Visualizacion: row[24],
        }));

        // Renderiza la tabla de modales
        renderConjunto();
        renderDocumento();
        renderCasa1();
        renderDocumento1();
        renderCasa2();
        renderDocumento2();
        renderCasa3();
        renderDocumento3();
        renderCasa4();
        renderDocumento4();
    });
}

function $(selector) {
    return document.querySelector(selector);
}

// Carga los valores en la tabla del conjunto
function renderConjunto() {
    var template = ``;
    for (var i in reporte.tabla) {
        var producto = reporte.tabla[i];

        if (producto.Visualizacion == 'TRUE') {
            template += `
                <tr>
                    <td>${producto.Ano}</td>
                    <td>${producto.Mes}</td>
                    <td>${producto.Descripcion}</td>
                    <td>${producto.Desde} - ${producto.Hasta}</td>
                    <td class="text-right">${producto.Factura}</td>
                    <td class="text-right">${producto.Comision}</td>
                    <td class="text-right tx-bold">${producto.Total}</td>
                    <td class="text-right">${producto.Cuota_reunida}</td>
                    <td class="text-right tx-bold">${producto.Reserva}</td>
                    <td class="text-center"><a href="#" class="bt-detalle" data-toggle="modal" data-target="#${producto.Numero}">
                    <img src="img/ojo.svg" class="icono-link">Ver</a></td>
                </tr>  
            `;
        }
    }
    $("#conjunto").innerHTML = template;
}

// Carga los modales para la tabla del conjunto
function renderDocumento() {
    var template = ``;
    for (var i in reporte.tabla) {
        if (reporte.tabla[i].Visualizacion == 'TRUE') {
            template += `
                <div class="modal fade" id="${reporte.tabla[i].Numero}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <!-- Cerrar -->
                            <div class="bt-cerrar">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <img src="img/cerrar.svg" width="32px">
                                </button>
                            </div>
                            <!-- Imagen -->
                            <div class="text-center" style="background-color: #ffffff">
                                <h4 class="tx-negro mb-0 pt-4">Documento</h4>
                                <h6 class="tx-gris mb-0 py-3"><span class="tx-bold">${reporte.tabla[i].Ano} ${reporte.tabla[i].Mes}:</span> ${reporte.tabla[i].Descripcion}</h6>
                                <img class="foto-detalle" src="img/Documentos/${reporte.tabla[i].Ano}/${reporte.tabla[i].Mes}/${reporte.tabla[i].Descripcion}.jpg" alt="${reporte.tabla[i].Ano} ${reporte.tabla[i].Mes}: ${reporte.tabla[i].Descripcion}">
                            </div>
                        </div>
                    </div>
                </div>  
            `;
        }
    }
    $("#documentos").innerHTML = template;
}

// Carga los valores en la tabla de la casa 1
function renderCasa1() {
    var template = ``;
    for (var i in reporte.tabla) {
        var producto = reporte.tabla[i];

        if (producto.Visualizacion == 'TRUE') {
            template += `
                <tr>
                    <td>${producto.Ano}</td>
                    <td>${producto.Mes}</td>
                    <td>${producto.Descripcion}</td>
                    <td>${producto.Hasta}</td>
                    <td class="text-right">${producto.Cuota_casas}</td>
                    <td class="text-right">${producto.Pago_casa1}</td>
                    <td class="text-right"><span class="${producto.Estado_casa1=='Pagado'?'':'tx-bold'}">${producto.Saldo_casa1}</span></td>
                    <td class="caption text-center"><span class="${producto.Estado_casa1=='Pagado'?'estado1':'estado2'}">${producto.Estado_casa1}</span></td>
                    <td class="text-center"><a href="#" class="bt-detalle" data-toggle="modal" data-target="#casa1-${producto.Numero}">
                    <img src="img/ojo.svg" class="icono-link">Ver</a></td>
                </tr>  
            `;
        }
    }
    $("#casa1").innerHTML = template;
}

// Carga los modales para la tabla de la casa 1
function renderDocumento1() {
    var template = ``;
    for (var i in reporte.tabla) {
        if (reporte.tabla[i].Visualizacion == 'TRUE') {
            template += `
                <div class="modal fade" id="casa1-${reporte.tabla[i].Numero}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <!-- Cerrar -->
                            <div class="bt-cerrar">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <img src="img/cerrar.svg" width="32px">
                                </button>
                            </div>
                            <!-- Imagen -->
                            <div class="text-center" style="background-color: #ffffff">
                                <h4 class="tx-negro mb-0 pt-4">Documento</h4>
                                <h6 class="tx-gris mb-0 py-3"><span class="tx-bold">${reporte.tabla[i].Ano} ${reporte.tabla[i].Mes}:</span> ${reporte.tabla[i].Descripcion}</h6>
                                <img class="foto-detalle" src="img/Documentos/${reporte.tabla[i].Ano}/${reporte.tabla[i].Mes}/${reporte.tabla[i].Descripcion}-casa1.jpg" alt="${reporte.tabla[i].Ano} ${reporte.tabla[i].Mes}: ${reporte.tabla[i].Descripcion}">
                            </div>
                        </div>
                    </div>
                </div>  
            `;
        }
    }
    $("#documentos1").innerHTML = template;
}

// Carga los valores en la tabla de la casa 2
function renderCasa2() {
    var template = ``;
    for (var i in reporte.tabla) {
        var producto = reporte.tabla[i];

        if (producto.Visualizacion == 'TRUE') {
            template += `
                <tr>
                    <td>${producto.Ano}</td>
                    <td>${producto.Mes}</td>
                    <td>${producto.Descripcion}</td>
                    <td>${producto.Hasta}</td>
                    <td class="text-right">${producto.Cuota_casas}</td>
                    <td class="text-right">${producto.Pago_casa2}</td>
                    <td class="text-right"><span class="${producto.Estado_casa2=='Pagado'?'':'tx-bold'}">${producto.Saldo_casa2}</span></td>
                    <td class="caption text-center"><span class="${producto.Estado_casa2=='Pagado'?'estado1':'estado2'}">${producto.Estado_casa2}</span></td>
                    <td class="text-center"><a href="#" class="bt-detalle" data-toggle="modal" data-target="#casa2-${producto.Numero}">
                    <img src="img/ojo.svg" class="icono-link">Ver</a></td>
                </tr>  
            `;
        }
    }
    $("#casa2").innerHTML = template;
}

// Carga los modales para la tabla de la casa 2
function renderDocumento2() {
    var template = ``;
    for (var i in reporte.tabla) {
        if (reporte.tabla[i].Visualizacion == 'TRUE') {
            template += `
                <div class="modal fade" id="casa2-${reporte.tabla[i].Numero}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <!-- Cerrar -->
                            <div class="bt-cerrar">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <img src="img/cerrar.svg" width="32px">
                                </button>
                            </div>
                            <!-- Imagen -->
                            <div class="text-center" style="background-color: #ffffff">
                                <h4 class="tx-negro mb-0 pt-4">Documento</h4>
                                <h6 class="tx-gris mb-0 py-3"><span class="tx-bold">${reporte.tabla[i].Ano} ${reporte.tabla[i].Mes}:</span> ${reporte.tabla[i].Descripcion}</h6>
                                <img class="foto-detalle" src="img/Documentos/${reporte.tabla[i].Ano}/${reporte.tabla[i].Mes}/${reporte.tabla[i].Descripcion}-casa2.jpg" alt="${reporte.tabla[i].Ano} ${reporte.tabla[i].Mes}: ${reporte.tabla[i].Descripcion}">
                            </div>
                        </div>
                    </div>
                </div>  
            `;
        }
    }
    $("#documentos2").innerHTML = template;
}

// Carga los valores en la tabla de la casa 3
function renderCasa3() {
    var template = ``;
    for (var i in reporte.tabla) {
        var producto = reporte.tabla[i];

        if (producto.Visualizacion == 'TRUE') {
            template += `
                <tr>
                    <td>${producto.Ano}</td>
                    <td>${producto.Mes}</td>
                    <td>${producto.Descripcion}</td>
                    <td>${producto.Hasta}</td>
                    <td class="text-right">${producto.Cuota_casas}</td>
                    <td class="text-right">${producto.Pago_casa3}</td>
                    <td class="text-right"><span class="${producto.Estado_casa3=='Pagado'?'':'tx-bold'}">${producto.Saldo_casa3}</span></td>
                    <td class="caption text-center"><span class="${producto.Estado_casa3=='Pagado'?'estado1':'estado2'}">${producto.Estado_casa3}</span></td>
                    <td class="text-center"><a href="#" class="bt-detalle" data-toggle="modal" data-target="#casa3-${producto.Numero}">
                    <img src="img/ojo.svg" class="icono-link">Ver</a></td>
                </tr>  
            `;
        }
    }
    $("#casa3").innerHTML = template;
}

// Carga los modales para la tabla de la casa 3
function renderDocumento3() {
    var template = ``;
    for (var i in reporte.tabla) {
        if (reporte.tabla[i].Visualizacion == 'TRUE') {
            template += `
                <div class="modal fade" id="casa3-${reporte.tabla[i].Numero}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <!-- Cerrar -->
                            <div class="bt-cerrar">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <img src="img/cerrar.svg" width="32px">
                                </button>
                            </div>
                            <!-- Imagen -->
                            <div class="text-center" style="background-color: #ffffff">
                                <h4 class="tx-negro mb-0 pt-4">Documento</h4>
                                <h6 class="tx-gris mb-0 py-3"><span class="tx-bold">${reporte.tabla[i].Ano} ${reporte.tabla[i].Mes}:</span> ${reporte.tabla[i].Descripcion}</h6>
                                <img class="foto-detalle" src="img/Documentos/${reporte.tabla[i].Ano}/${reporte.tabla[i].Mes}/${reporte.tabla[i].Descripcion}-casa3.jpg" alt="${reporte.tabla[i].Ano} ${reporte.tabla[i].Mes}: ${reporte.tabla[i].Descripcion}">
                            </div>
                        </div>
                    </div>
                </div>  
            `;
        }
    }
    $("#documentos3").innerHTML = template;
}

// Carga los valores en la tabla de la casa 4
function renderCasa4() {
    var template = ``;
    for (var i in reporte.tabla) {
        var producto = reporte.tabla[i];

        if (producto.Visualizacion == 'TRUE') {
            template += `
                <tr>
                    <td>${producto.Ano}</td>
                    <td>${producto.Mes}</td>
                    <td>${producto.Descripcion}</td>
                    <td>${producto.Hasta}</td>
                    <td class="text-right">${producto.Cuota_casas}</td>
                    <td class="text-right">${producto.Pago_casa4}</td>
                    <td class="text-right"><span class="${producto.Estado_casa4=='Pagado'?'':'tx-bold'}">${producto.Saldo_casa4}</span></td>
                    <td class="caption text-center"><span class="${producto.Estado_casa4=='Pagado'?'estado1':'estado2'}">${producto.Estado_casa4}</span></td>
                    <td class="text-center"><a href="#" class="bt-detalle" data-toggle="modal" data-target="#casa4-${producto.Numero}">
                    <img src="img/ojo.svg" class="icono-link">Ver</a></td>
                </tr>  
            `;
        }
    }
    $("#casa4").innerHTML = template;
}

// Carga los modales para la tabla de la casa 4
function renderDocumento4() {
    var template = ``;
    for (var i in reporte.tabla) {
        if (reporte.tabla[i].Visualizacion == 'TRUE') {
            template += `
                <div class="modal fade" id="casa4-${reporte.tabla[i].Numero}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <!-- Cerrar -->
                            <div class="bt-cerrar">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <img src="img/cerrar.svg" width="32px">
                                </button>
                            </div>
                            <!-- Imagen -->
                            <div class="text-center" style="background-color: #ffffff">
                                <h4 class="tx-negro mb-0 pt-4">Documento</h4>
                                <h6 class="tx-gris mb-0 py-3"><span class="tx-bold">${reporte.tabla[i].Ano} ${reporte.tabla[i].Mes}:</span> ${reporte.tabla[i].Descripcion}</h6>
                                <img class="foto-detalle" src="img/Documentos/${reporte.tabla[i].Ano}/${reporte.tabla[i].Mes}/${reporte.tabla[i].Descripcion}-casa4.jpg" alt="${reporte.tabla[i].Ano} ${reporte.tabla[i].Mes}: ${reporte.tabla[i].Descripcion}">
                            </div>
                        </div>
                    </div>
                </div>  
            `;
        }
    }
    $("#documentos4").innerHTML = template;
}

// Carga los valores totales del final de la tabla
function loadSheetData2() {
    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Conjunto', // Rango de celdas que contienen los textos
    }).then(function(response) {
      const values = response.result.values;

        const ingresos = values[39][9];
        const gastos = values[39][8];
        const diferencia = values[39][10];
        const saldo_total_casa1 = values[39][13];
        const general_casa1 = values[39][14];
        const saldo_total_casa2 = values[39][16];
        const general_casa2 = values[39][17];
        const saldo_total_casa3 = values[39][19];
        const general_casa3 = values[39][20];
        const saldo_total_casa4 = values[39][22];
        const general_casa4 = values[39][23];
  
        // Actualizar los elementos HTML con los textos obtenidos
        document.getElementById('ingresos').innerText = ingresos;
        document.getElementById('gastos').innerText = gastos;
        document.getElementById('diferencia').innerText = diferencia;
        document.getElementById('saldo_total_casa1').innerText = saldo_total_casa1;
        document.getElementById('general_casa1').innerText = general_casa1;
        document.getElementById('saldo_total_casa2').innerText = saldo_total_casa2;
        document.getElementById('general_casa2').innerText = general_casa2;
        document.getElementById('saldo_total_casa3').innerText = saldo_total_casa3;
        document.getElementById('general_casa3').innerText = general_casa3;
        document.getElementById('saldo_total_casa4').innerText = saldo_total_casa4;
        document.getElementById('general_casa4').innerText = general_casa4;
    })
}

// Llama a la función para cargar la API de Google
loadGoogleAPI();
