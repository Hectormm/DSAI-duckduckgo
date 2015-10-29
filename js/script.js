(function() {
	console.log('Recuperando Stop Words');	
    $.getJSON('utiles/es.json', function(data) {
        var stopWords = data;
        console.log(data);
    });

})();


function inicioBusqueda() {
    console.log('Inicio Busqueda')
}