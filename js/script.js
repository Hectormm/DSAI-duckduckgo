(function() {
	console.log('Recuperando Stop Words');	
    $.getJSON('es.json', function(data) {
        var stopWords = data;
        console.log(data);
    });

})();


function inicioBusqueda() {
    console.log('Inicio Busqueda')
}