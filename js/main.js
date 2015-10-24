function get_parrilla() {
	var call;
	if (window.XMLHttpRequest) {
		call = new XMLHttpRequest();
		call.open("GET", "get_data.php", true);
		call.send();

		call.onreadystatechange = function() {
			if (call.readyState == 4 && call.status == 200) {
				var respuesta = JSON.parse(call.responseText);

				var hora = respuesta.hora.replace(" ", "T");
				var hora_act = respuesta.actualizar.replace(" ", "T");
				update(respuesta.actual + "<br/><br/><span class='current'>"+ respuesta.emitiendo +"</span><br/><br/>"+respuesta.proximo);
						
				var hora_actual = new Date(Date.parse(hora));
				var hora_llamada = new Date(Date.parse(hora_act));
						
				setTimeout('get_parrilla()', (hora_llamada - hora_actual) + 5000);
				//setTimeout('get_parrilla()', 10000);
			}
		};
	}
}

function update(valor) {
	var parrilla = document.getElementById('parrilla');
	parrilla.innerHTML = valor;
}

get_parrilla();

var pause = 0;
var boton = document.getElementById('play');
boton.addEventListener("click", function() {
	if (pause == 0) {		
		audio.pause();
		pause = 1;
		boton.innerHTML="<b class='pause'>|&nbsp;|</b>";
	} else {	
		audio.play();
		pause = 0;	
		boton.innerHTML="<b>&gt;</b>";
	}
});
