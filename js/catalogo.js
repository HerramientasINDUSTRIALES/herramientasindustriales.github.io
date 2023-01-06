var url = "Productos.xlsx";
var oReq = new XMLHttpRequest();
oReq.open("GET", url, true);
oReq.responseType = "arraybuffer";
var datos;
    
oReq.onload = function(e) {
    datos = readData();

    function $(selector){
        return document.querySelector(selector);
    }

    function Carrito(){
        this.catalogo = datos;
    }
    function Carrito_View(){
        this.renderCatalogo = function(){
            var template = ``;
            for (var i in carrito.catalogo) {
                template += `
                    <div class="col-xl-3 col-lg-3 col-md-3 col-6 filtro ${carrito.catalogo[i].Categoria}" category="${carrito.catalogo[i].Subcategoria}">
                        <div class="caja">
                            <div class="producto">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="${carrito.catalogo[i].Promocionar=='x'?'recomendadosi':'recomendado'}"><img src="img/estrella.svg" class="estrella">Más vendido</div>
                                        <img class="foto-portada" src="img/fotos/${carrito.catalogo[i].Categoria}/${carrito.catalogo[i].Subcategoria}/${carrito.catalogo[i].Codigo}.jpg" alt="Imagen - ${carrito.catalogo[i].Producto}">
                                    </div>
                                    <div class="col-12 text-left">
                                        <p class="tx-bold tx-negro mb-0 pt-2">${carrito.catalogo[i].Producto}</p>
                                        <p class="caption tx-gris mb-2">${carrito.catalogo[i].Codigo}</p>
                                        <p>Precio: $${carrito.catalogo[i].Precio}</p>
                                        <div class="text-center">
                                            <a href="https://api.whatsapp.com/send?phone=593962854170&text=¡Hola! 👋🏼 Estoy interesado en:
                                                
                                                
                                                
                                                Producto: *${carrito.catalogo[i].Producto}*
                                                
                                                
                                                
                                                Código: _${carrito.catalogo[i].Codigo}_
                                                
                                                
                                                
                                                Precio: $*${carrito.catalogo[i].Precio}*
                                                
                                                
                                                
                                                Referencia: casaingco.github.io/img/fotos/${carrito.catalogo[i].Categoria}/${carrito.catalogo[i].Subcategoria}/${carrito.catalogo[i].Codigo}.jpg
                                                
                                                
                                                
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
    }

    function Contenido(){
        this.detalle = datos;
    }
    function Contenido_View(){
        this.renderDetalle = function(){
            var template = ``;
            for (var i in contenido.detalle) {
                template += `
                    <div class="modal fade" id="${contenido.detalle[i].Codigo}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
                                    <img class="foto-detalle" src="img/fotos/${contenido.detalle[i].Categoria}/${contenido.detalle[i].Subcategoria}/${contenido.detalle[i].Codigo}.jpg" alt="Imagen - ${contenido.detalle[i].Producto}">
                                </div>
                                <div class="${contenido.detalle[i].Promocionar=='x'?'recomendadosi':'recomendado'}"><img src="img/estrella.svg" class="estrella">Más vendido</div>
                                <!-- Contenido -->
                                <div class="modal-body pt-md-2 text-center">
                                    <div class="py-4 px-md-5 px-3">
                                        <div class="row align-items-center">
                                            <div class="col-9 text-left">
                                                <h6 class="tx-bold tx-negro mb-0">${contenido.detalle[i].Producto}</h6>
                                                <p class="tx-gris mb-0">${contenido.detalle[i].Codigo}</p>
                                            </div>
                                            <div class="col-3 text-right pl-0">
                                                <h6 class="mb-0"><span class="tx-bold">Precio:</span> <span class="tx-gris">$${contenido.detalle[i].Precio}<span></h6>
                                            </div>
                                        </div>
                                        <div class="text-left pt-4">
                                            <h6 class="tx-bold">Características:</h6>
                                            <p class="tx-gris">${contenido.detalle[i].Caracteristicas}</p>
                                        </div>
                                    </div>
                                </div>
                                <!-- Botón abajo -->
                                <div class="modal-fijo">
                                    <div class="row justify-content-center">
                                        <div class="col-10"> 
                                            <a href="https://api.whatsapp.com/send?phone=593962854170&text=¡Hola! 👋🏼 Estoy interesado en:
                                                
                                                
                                                
                                                Producto: *${contenido.detalle[i].Producto}*
                                                
                                                
                                                
                                                Código: _${contenido.detalle[i].Codigo}_
                                                
                                                
                                                
                                                Precio: $*${contenido.detalle[i].Precio}*
                                                
                                                
                                                
                                                Referencia: casaingco.github.io/img/fotos/${contenido.detalle[i].Categoria}/${contenido.detalle[i].Subcategoria}/${contenido.detalle[i].Codigo}.jpg
                                                
                                                
                                                
                                                😃 ¿Me puedes ayudar con más información?" target="blank" class="btn bt-comprar" onclick="gtag('event', 'Click', { 'event_category': 'Comprar', 'event_label': '${contenido.detalle[i].Producto}'});">
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
    }
    
    var carrito = new Carrito();
    var carrito_view = new Carrito_View();
    carrito_view.renderCatalogo();

    var contenido = new Contenido();
    var contenido_view = new Contenido_View();
    contenido_view.renderDetalle();
    
    function readData() {
        var arraybuffer = oReq.response;
        /* convert data to binary string */
        var data = new Uint8Array(arraybuffer);
        var arr = new Array();
        for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        /* Traer el excel */
        var workbook = XLSX.read(bstr, {type:"binary"});
        /* Se elige que pestaña del excel se va a leer */
        var first_sheet_name = workbook.SheetNames[0];
        /* Get worksheet */
        var worksheet = workbook.Sheets[first_sheet_name];
        var datos = XLSX.utils.sheet_to_json(worksheet);
        return datos;
    }
}
oReq.send();