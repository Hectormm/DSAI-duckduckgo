var stopWords;
var simbolos;
var textoLimpio;
var textoSinStopWords;
var frecuentes;

;
(function() {
    console.log('Recuperando Stop Words');
    $.getJSON('./utiles/es.json', function(data) {
        stopWords = data;
        console.log('Recuperando Simbolos');
        $.getJSON('./utiles/simbolos.json', function(data) {
            simbolos = data;
            //Activo boton de búsqueda cuando se recuperan los datos
            $('button').prop('disabled', false);
        });
    });
})();

function inicializar() {
    textoLimpio = '';
    textoSinStopWords = [];
    frecuentes = [];
    $("#resultado").html('');
}


function inicioBusqueda() {
    console.log('Inicio Busqueda')
    inicializar();
    limpiarTexto();
    separarTexto();
    eliminarStopWords();
    palabrasMasRepetidas();
    buscarPalabras();
}

function limpiarTexto() {
    textoLimpio = $("#texto").val();

    console.log(simbolos);

    _.each(simbolos, function(ele) {
        while (textoLimpio.indexOf(ele) >= 0) {
            textoLimpio = textoLimpio.replace(ele, '');
        }
    });
    console.log(textoLimpio);

}

function separarTexto() {
    textoSeparado = textoLimpio.split(' ');
    console.log(textoSeparado);
}

function eliminarStopWords() {
    textoSinStopWords = _.difference(textoSeparado, stopWords);
    console.log(textoSinStopWords);
}

function palabrasMasRepetidas() {
    _.each(textoSinStopWords, function(palabra) {
        if (_.findIndex(frecuentes, {
                id: palabra
            }) >= 0) {
            frecuentes[_.findIndex(frecuentes, {
                id: palabra
            })].cont = frecuentes[_.findIndex(frecuentes, {
                id: palabra
            })].cont + 1;
        } else {
            frecuentes.push({
                'id': palabra,
                'cont': 1
            });
        }
    });

    frecuentes = _.sortBy(frecuentes, 'cont').reverse();
    console.log(frecuentes);
}


function buscarPalabras() {
    $("#resultado").append("<hr>");

    for (var i = 0; i < 3 && i < frecuentes.length; i++) {
        $.ajax({
            url: 'https://api.duckduckgo.com/?q=' + frecuentes[i].id + '&format=json',
            dataType: 'jsonp',
            success: function(data) {

                //Solo si encuentra resultados de la palabra
                if (data.Heading !== '') {
                    $("#resultado").append('<div class="col-lg-9">' + '<p>' +
                        '<strong>' + data.Heading + '</strong> - ' +
                        '<a href=' + data.AbstractURL + '>' + data.AbstractURL + '</a>' + ' <br>' + data.Abstract +
                        '</p>' +
                        '</div>');
                    //Si existe la imagen
                    if (data.Image !== '') {
                        $("#resultado").append('<div class="col-lg-3">' +
                            '<p>' +
                            '<img src="' + data.Image + '" alt="' + data.Heading + '" height="150" width="150"> ' +
                            '</p>' +
                            '</div>');
                    }

                    .each(data.RelatedTopics, function(ele) {
                        $("#resultado").append('<div class="col-lg-12">' +
                            '<p>' + ele.FirstURL + ele.Result + ele.Text +
                            '</p>' +
                            '</div>');
                    });


                }
                //Si no ha encontrado resultados
                var contenido = $("#resultado").html();
                if (contenido === '<hr>' && (i === 2 || i === frecuentes.length)) {
                    $("#resultado").append('<div class="col-lg-12" style="text-align:center;"> <h3>No se han encontrado resultados </h3></div>');
                }
                console.log(data);
            },
            error: function() {
                console.log("Ha ocurrido un error");
            }
        });
    };

}

function borrarBusqueda() {
    inicializar();
    $("#texto").val('');
}
