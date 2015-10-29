var stopWords;
var simbolos;
var textoLimpio;
var textoSinStopWords;
var frecuentes = [];

(function() {
    console.log('Recuperando Stop Words');
    $.getJSON('./utiles/es.json', function(data) {
        stopWords = data;
    });

    console.log('Recuperando Simbolos');

    $.getJSON('./utiles/simbolos.json', function(data) {
        simbolos = data;
        console.log(data);
    });

})();


function inicioBusqueda() {
    console.log('Inicio Busqueda')
    limpiarTexto();
    separarTexto();
    eliminarStopWords();
    palabrasMasRepetidas();
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
        if (_.findIndex(frecuentes, {id: palabra}) >= 0) {
            frecuentes[_.findIndex(frecuentes, {id: palabra}) ].cont = frecuentes[_.findIndex(frecuentes, {id: palabra}) ].cont + 1;
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
