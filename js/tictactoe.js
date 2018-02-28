var board = [];
var jugadas = 0;
board[0] = new Array(3);
board[1] = new Array(3);
board[2] = new Array(3);

function alertDGC(mensaje)
{
	var dgcTiempo=500
	var ventanaCS='<div class="dgcAlert"><div class="dgcVentana"><div class="dgcCerrar"></div><div class="dgcMensaje">'+mensaje+'<br><div class="dgcAceptar">Aceptar</div></div></div></div>';
	$('body').append(ventanaCS);
	var alVentana=$('.dgcVentana').height();
	var alNav=$(window).height();
	var supNav=$(window).scrollTop();
	$('.dgcAlert').css('height',$(document).height());
	$('.dgcVentana').css('top',((alNav-alVentana)/2+supNav-100)+'px');
	$('.dgcAlert').css('display','block');
	$('.dgcAlert').animate({opacity:1},dgcTiempo);
	$('.dgcCerrar,.dgcAceptar').click(function(e) {
		$('.dgcAlert').animate({opacity:0},dgcTiempo);
		setTimeout("$('.dgcAlert').remove()",dgcTiempo);
	});
}

window.alert = function (message) {
  alertDGC(message);
};

function introducir_valor(id){
	if(jugadas % 2 == 0){
		document.getElementById(id).value = 'X';
		document.getElementById(id).disabled = true;
	} else {
		document.getElementById(id).value = 'O';
		document.getElementById(id).disabled = true;
	}

	jugadas = jugadas+1;
	siguiente_ronda();
}

function siguiente_ronda(){
var evaluador;
    for (var i = 0; i < 3; i++) {       
        for (var j = 0; j < 3; j++) {
            board[i][j] = document.getElementById(i+''+j).value;
        }
    }
    
    evaluador = evaluar_ganador();
    if (evaluador == 1) {
    	alert("Gana X!");
    	bloquear_board();
    	//limpiar_board();
    } else {
    	if (evaluador == 2) {
	    	alert("Gana O!");
	    	bloquear_board();
	    	//limpiar_board();
	    } else {
	    	if (evaluador == 0 && jugadas == 9) {
	    		alert("Empate!");
	    		bloquear_board();
	    		//limpiar_board();
	    	}
	    }
    }
}

function evaluar_ganador(){
	var flag = 0;
	var gana_horizontal = evaluar_horizontal();
	var gana_vertical = evaluar_vertical();

	if ((board[0][0] == 'X' && board[1][1] == 'X' && board[2][2] == 'X') /*&& jugadas == 9*/) {
		flag = 1;
	} else {
		if ((board[0][0] == 'O' && board[1][1] == 'O' && board[2][2] == 'O') /*&& jugadas == 9*/) {
			flag = 2;
		} else {
			if ((board[2][0] == 'X' && board[1][1] == 'X' && board[0][2] == 'X') /*&& jugadas == 9*/) {
				flag = 1;
			} else {
				if ((board[2][0] == 'O' && board[1][1] == 'O' && board[0][2] == 'O') /*&& jugadas == 9*/) {
					flag = 2;
				} else {
					if (gana_horizontal != 0 /*&& jugadas == 9*/) {
						flag = gana_horizontal;
					} else {
						if (gana_vertical != 0 /*&& jugadas == 9*/) {
							flag = gana_vertical;
						}
					}
				}
			}	
		}
	}
	return flag;
}

function evaluar_horizontal(){
	var resultadoHorizontal = "";
	var flag = 0;

	for (var i = 0; i < 3; i++) {       
        for (var j = 0; j < 3; j++) {
            resultadoHorizontal = resultadoHorizontal + board[i][j];
        }
        if (resultadoHorizontal == 'XXX') {
        	flag = 1;
        	break;
        } else {
        	if (resultadoHorizontal == 'OOO') {
	        	flag = 2;
	        	break;
	        } else {
        		resultadoVertical = "";
        	}
        }        
    }
    return flag;
}

function evaluar_vertical(){
	var resultadoVertical = "";
	var flag = 0;

	for (var i = 0; i < 3; i++) {       
        for (var j = 0; j < 3; j++) {
            resultadoVertical = resultadoVertical + board[j][i];
        }
        if (resultadoVertical == 'XXX') {
        	flag = 1;
        	break;
        } else {
        	if (resultadoVertical == 'OOO') {
	        	flag = 2;
	        	break;
	        } else {
        		resultadoVertical = "";
        	}
        }
    }
    return flag;
}

function limpiar_board(){
	jugadas = 0;
	
    for (var i = 0; i < 3; i++) {       
        for (var j = 0; j < 3; j++) {
            board[i][j] = "";
            document.getElementById(i+''+j).value = "";
        }
    }

    // obtenemos todos los botones, por su clase
	var buttons = document.querySelectorAll('.Boton')

	// a cada uno le asignamos el manejador del evento.
	for(var i = 0; i < buttons.length; i++) {

	   // aqui generas el equivalente a onclick
	   buttons[i].disabled = false;
	}
}

function bloquear_board(){
	// obtenemos todos los botones, por su clase
	var buttons = document.querySelectorAll('.Boton')

	// a cada uno le asignamos el manejador del evento.
	for(var i = 0; i < buttons.length; i++) {

	   // aqui generas el equivalente a onclick
	   buttons[i].disabled = true;
	}
}

function hacer_click(){
    for (var i = 0; i < 3; i++) {       
        for (var j = 0; j < 3; j++) {
            alert(board[i][j]+' posicion: '+i+''+j);
        }
    }
}
