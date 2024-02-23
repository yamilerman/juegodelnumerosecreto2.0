let numeroSecreto = 0;
let intentosUsuario = 0;
let listaNumeroSecreto = [];
let numeroMaximo = 10; //con ctrl F verifico donde hay 10 por ejemplo

/* se asigna el elemento html y el texto, coloco el return 
como buena práctica en esta fx aunque no devuelva nada */
function asignarTextoElemento(elemento, texto) {
  let elementoHtml = document.querySelector(elemento);
  elementoHtml.innerHTML = texto;
  return;
}

/*como en este form tengo solo un imput puedo usar el document.querySelector('input') 
pero voy a ponerlo con ID para traer el selector y que me retorne el objeto*/
function verificarIntento() {
  let numeroDeUsuario = parseInt(document.getElementById("valorUsuario").value);
  /* === igual en valor igual en tipo*/
  if (numeroDeUsuario === numeroSecreto) {
    //usar en operador ternario para definir si es vez o veces ? se transforma en un if y los : se transforman en un else. En esta caso seria si intentos es igual a 1 coloca vez, si no veces.
    asignarTextoElemento(
      "p",
      `Acertaste el número en ${intentosUsuario} ${
        intentosUsuario === 1 ? "vez" : "veces"
      }`
    );
    //reiniciar botón de nuevo juego
    document.getElementById("reiniciar").removeAttribute("disabled");
    //El usuario no acertó el número
  } else {
    if (numeroDeUsuario > numeroSecreto) {
      asignarTextoElemento("p", "El número es menor");
    } else {
      asignarTextoElemento("p", "El número secreto es mayor");
    }
    intentosUsuario++;
    limpiarCaja();
  }
  return;
}

//función para limpiar caja las , '' vacias significas vacio
function limpiarCaja() {
  document.querySelector("#valorUsuario").value = "";
}
//numero secreto
function generarNumeroSecreto() {
  let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
  //Si ya sorteamos todos los numeros
  if (listaNumeroSecreto.length === numeroMaximo) {
    asignarTextoElemento("p", "ACERTASTE TODOS LOS NÚMEROS POSIBLES");
  } else {
    //Si el número generado está incluido en la lista
    if (listaNumeroSecreto.includes(numeroGenerado)) {
      return generarNumeroSecreto();
    } else {
      listaNumeroSecreto.push(numeroGenerado);
      return numeroGenerado;
    }
  }
}

function condicionesIniciales() {
  /* acá estamos llamando a la función  */
  asignarTextoElemento("h1", "JUEGO DEL NÚMERO SECRETO 2.0");
  asignarTextoElemento("p", `INDICA UN NÚMERO DEL 1 AL ${numeroMaximo}`);
  numeroSecreto = generarNumeroSecreto();
  intentos = 1;
}

//funcion para reiniciar juego
function reiniciarJuego() {
  //limpiar la caja
  limpiarCaja();
  //indicar mensaje de intervalo de números
  //generar el número aleatorio nuevamente
  //inicializar el numero de intentos
  condicionesIniciales();
  //deshabilitar el botón de nuevo juego
  document.querySelector("#reiniciar").setAttribute("disabled", "true");
}

condicionesIniciales();
