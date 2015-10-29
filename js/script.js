(function() {
	console.log('Recuperando Stop Words');	
    $.getJSON('util/es.json', function(data) {
        var stopWords = data;
        console.log(data);
    });

})();


function inicioBusqueda() {
    console.log('Inicio Busqueda')
}