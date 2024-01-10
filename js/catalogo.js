// Llave de API y ID de hoja de cálculo de Google Sheets
const API_KEY = 'AIzaSyAGMHgnyWuzrmM-tOjrL-Ph_tRI3r4rFZw';
const SPREADSHEET_ID = '1Hw2-E8TWrqFPtPFQM7DjlA9rj-Mm9jeVAprqmzeYun4';

// Objeto carrito
const carrito = {
    catalogo: [],
    detalle: []
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
        loadSheetData();
    });
}

function loadSheetData() {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Productos!A2:G',  // Excluye la primera fila al comenzar desde la fila 2
    }).then((response) => {
        // Obtiene los datos de la respuesta
        const sheetData = response.result.values;

        // Convierte los datos a un formato similar al que usas para el archivo Excel local
        carrito.catalogo = sheetData.map(row => ({
            Categoria: row[0],
            Subcategoria: row[1],
            Producto: row[2],
            Codigo: row[3],
            Precio: row[4],
            Stock: row[5],
            Caracteristicas: row[6],
        }));

        // Renderiza el catálogo y detalles
        renderCatalogo();
        renderDetalle();
    });
}

function $(selector) {
    return document.querySelector(selector);
}
  
function renderCatalogo() {
    var template = ``;
    for (var i in carrito.catalogo) {
        template += `
            <div class="col-xl-3 col-lg-3 col-md-3 col-6 filtro ${carrito.catalogo[i].Categoria}" category="${carrito.catalogo[i].Subcategoria}">
                <div class="caja">
                    <div class="producto">
                        <div class="row">
                            <div class="col-12">
                                <div class="recomendadosi"><span class="tx-bold">${carrito.catalogo[i].Stock}</span> en stock</div>
                                <img class="foto-portada" src="img/fotos/${carrito.catalogo[i].Categoria}/${carrito.catalogo[i].Subcategoria}/${carrito.catalogo[i].Codigo}.jpg" alt="Imagen - ${carrito.catalogo[i].Producto}">
                            </div>
                            <div class="col-12 text-left">
                                <p class="tx-bold tx-negro mb-0 pt-2">${carrito.catalogo[i].Producto}</p>
                                <p class="caption tx-gris mb-2">${carrito.catalogo[i].Codigo}</p>
                                <p>Precio: $${carrito.catalogo[i].Precio}</p>
                                <div class="text-center">
                                    <a href="https://api.whatsapp.com/send?phone=593996637879&text=¡Hola! 👋🏼 Estoy interesado en:
                                        
                                        
                                        
                                        Producto: *${carrito.catalogo[i].Producto}*
                                        
                                        
                                        
                                        Código: _${carrito.catalogo[i].Codigo}_
                                        
                                        
                                        
                                        Precio: *$${carrito.catalogo[i].Precio}*
                                        
                                        
                                        
                                        😃 ¿Me puedes ayudar con más información?" target="blank" class="btn bt-comprar mb-3" onclick="gtag('event', 'Click', { 'event_category': 'Comprar', 'event_label': '${carrito.catalogo[i].Producto}'});">
                                        Comprar
                                    </a>
                                    <a href="#" class="bt-detalle" data-toggle="modal" data-target="#${carrito.catalogo[i].Codigo}" onclick="gtag('event', 'Click', { 'event_category': 'Detalle', 'event_label': '${carrito.catalogo[i].Producto}'});">
                                    <img src="img/ojo.svg" class="icono-ver">Ver detalle</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>  
            </div>      
        `;
    }
    $("#catalogo").innerHTML = template;
}
  
function renderDetalle() {
    var template = ``;
    for (var i in carrito.catalogo) {
        template += `
            <div class="modal fade" id="${carrito.catalogo[i].Codigo}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
                            <img class="foto-detalle" src="img/fotos/${carrito.catalogo[i].Categoria}/${carrito.catalogo[i].Subcategoria}/${carrito.catalogo[i].Codigo}.jpg" alt="Imagen - ${carrito.catalogo[i].Producto}">
                        </div>
                        <div class="recomendadosi"><span class="tx-bold">${carrito.catalogo[i].Stock}</span> en stock</div>
                        <!-- Contenido -->
                        <div class="modal-body pt-md-2 text-center">
                            <div class="py-4 px-md-5 px-3">
                                <div class="row align-items-center">
                                    <div class="col-9 text-left">
                                        <h6 class="tx-bold tx-negro mb-0">${carrito.catalogo[i].Producto}</h6>
                                        <p class="tx-gris mb-0">${carrito.catalogo[i].Codigo}</p>
                                    </div>
                                    <div class="col-3 text-right pl-0">
                                        <h6 class="mb-0"><span class="tx-bold">Precio:</span> <span class="tx-gris">$${carrito.catalogo[i].Precio}<span></h6>
                                    </div>
                                </div>
                                <div class="text-left pt-4">
                                    <h6 class="tx-bold">Características:</h6>
                                    <p class="tx-gris">${carrito.catalogo[i].Caracteristicas}</p>
                                </div>
                            </div>
                        </div>
                        <!-- Botón abajo -->
                        <div class="modal-fijo">
                            <div class="row justify-content-center">
                                <div class="col-10"> 
                                    <a href="https://api.whatsapp.com/send?phone=593996637879&text=¡Hola! 👋🏼 Estoy interesado en:
                                        
                                        
                                        
                                        Producto: *${carrito.catalogo[i].Producto}*
                                        
                                        
                                        
                                        Código: _${carrito.catalogo[i].Codigo}_
                                        
                                        
                                        
                                        Precio: *$${carrito.catalogo[i].Precio}*
                                        
                                        
                                        
                                        😃 ¿Me puedes ayudar con más información?" target="blank" class="btn bt-comprar" onclick="gtag('event', 'Click', { 'event_category': 'Comprar', 'event_label': '${carrito.catalogo[i].Producto}'});">
                                        Comprar
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        `;
    }
    $("#detalle").innerHTML = template;
}

// Llama a la función para cargar la API de Google
loadGoogleAPI();
