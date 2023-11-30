//base de datos local de preguntas
const bd_juego = [
    {
        id:0,
        pregunta:"¿Cuál es el mejor momento del día para regar tus plantas debido a que no se evapore el agua?",
        op0:"En la tarde",
        op1:"En la noche",
        op2:"En la mañana",
        correcta:"1"
    },
    {
        id:1,
        pregunta:"¿Qué debes hacer si ves un grifo goteando en casa?",
        op0:"Poner una cubeta debajo",
        op1:"Ignorarlo y esperar a que alguien se de cuenta",
        op2:"Decirle a un adulto para que lo repare",
        correcta:"2"
    },
    {
        id:2,
        pregunta:"¿Cuál es una causa del cambio climático?",
        op0:"La tala de árboles",
        op1:"La producción de alimentos",
        op2:"Ambas",
        correcta:"2"
    },
    {
        id:3,
        pregunta:"¿Cuántos años tarda en descomponerse una botella de plástico?",
        op0:"500 años",
        op1:"55 años",
        op2:"100 años",
        correcta:"0"
    },
    {
        id:4,
        pregunta:"¿Cuál es la manera correcta de desechar los aparatos electrónicos?",
        op0:"Tirarlos en el bote de inorgánicos",
        op1:"Ir a un punto de recogida adecuado y depositar el producto ya utilizado",
        op2:"Tirarlo en el contenedor de electrónicos",
        correcta:"1"
    },
    {
        id:5,
        pregunta:"¿Qué acción es recomendable que realices cuando tienes una consola de videojuegos?",
        op0:"Mantenerla limpia y bien ventilada",
        op1:"Dejarla conectada mientras no se este utilizando",
        op2:"Ninguna",
        correcta:"0"
    },
    {
        id:6,
        pregunta:"¿Cuál es el tipo de productos que son amigables con el medio ambiente?",
        op0:"No importa el tipo de producto",
        op1:"No biodegradables",
        op2:"Biodegradables",
        correcta:"2"
    },
    {
        id:7,
        pregunta:"¿Cuál es el beneficio de plantar árboles?",
        op0:"Filtra 28 kg de contaminación atmosférica y es hogar de pequeños animales",
        op1:"Puede bajar la temperatura del aire entre 2 °C y 8 °C y absorben el CO2 del ambiente",
        op2:"Todas las anteriores",
        correcta:"2"
    },
    {
        id:8,
        pregunta:"¿Por qué es importante levantar las heces de nuestras mascotas?",
        op0:"Contienen bacterias y parásitos que pueden ser perjudiciales para la salud humana",
        op1:"Para que no me multen las autoridades",
        op2:"No tenemos porque hacerlo ya que no es agradable",
        correcta:"0"
    },
    {
        id:9,
        pregunta:"¿Cuál es la manera correcta de actuar cuando visitas la playa?",
        op0:"No comprar ni consumir nada para no contaminar",
        op1:"No preocuparme por la basura que genro en mi estancia",
        op2:"Siempre recoger toda la basura  para dejar limpio el lugar donde estuviste durante el día",
        correcta:"2"
    }
]

//para guardar las respuestas elegidas
let respuestas = [];
//cantidad correctas
let cantiCorrectas = 0;
//pregunta acutal que debe ser cargada
let numPregunta = 0;

//Cargo una pregunta del JSON
function cargarPreguntas(){
    //tomo la pregunta actual de la bd
    const pregunta = bd_juego[numPregunta];

    const contenedor = document.createElement("div");
    contenedor.className = "contenedor-pregunta";
    contenedor.id = pregunta.id;
    const h2 = document.createElement("h2");
    h2.textContent = pregunta.id + 1 + " - " + pregunta.pregunta;
    contenedor.appendChild(h2);
    const opciones = document.createElement("div");

    //vamos a crear los tres labels
    //Lo vamos a hacer mediante una funciòn.
    // A dicha función le envio el numero de label y la opcion
    // el texto, de dicho label
    const label1 = crearLabel("0",pregunta.op0);
    const label2 = crearLabel("1",pregunta.op1);
    const label3 = crearLabel("2",pregunta.op2);

    //agrego los labels al contendor de las opciones
    opciones.appendChild(label1);
    opciones.appendChild(label2);
    opciones.appendChild(label3);

    //agrego las opciones al contenedor principal
    contenedor.appendChild(opciones);
    document.getElementById("juego").appendChild(contenedor);
}

//creo la funciòn que que retornará el label con todo su contenido
function crearLabel(num, txtOpcion){
    const label = document.createElement("label");
    label.id = "l" + numPregunta + num;
    const input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.name = "p" + numPregunta;
    input.setAttribute("onclick", "seleccionar(" + numPregunta+","+num+")");
    const span = document.createElement("span");
    const correccion = document.createElement("span");
    correccion.id = "p" + numPregunta + num;
    span.textContent = txtOpcion;
    label.appendChild(input);
    label.appendChild(span);
    label.appendChild(correccion);

    return label;
}

//Mediante un for cargo todas las preguntas del JSON
for(i=0;i < bd_juego.length;i++){
    cargarPreguntas();
    //actualizo el numero de pregunta actual
    numPregunta++;
}

//Función que carga la opción elegida en el arreglo respuestas.
function seleccionar(pos, opElegida){
    respuestas[pos] = opElegida;
}

//botón corregir
let corregir = document.getElementById("corregir");
corregir.onclick = function(){
    //recorro el arreglo que tiene las respuestas y comparo
    for(i=0;i<bd_juego.length;i++){
        //cargo la pregunta
        const pregunta = bd_juego[i];
        if(pregunta.correcta == respuestas[i]){ //respuesta correcta
            cantiCorrectas++;
            let idCorreccion = "p" + i + pregunta.correcta;
            document.getElementById(i).className = "contenedor-pregunta correcta";
            document.getElementById(idCorreccion).innerHTML = "&check;";
            document.getElementById(idCorreccion).className = "acierto";
        }else{//no acerto
            let id = "p" + i + respuestas[i];
            let idCorreccion = "p" + i + pregunta.correcta;
            document.getElementById(i).className = "contenedor-pregunta incorrecta";
            document.getElementById(id).innerHTML = "&#x2715;";
            document.getElementById(id).className = "no-acierto";
            document.getElementById(idCorreccion).innerHTML = "&check;";
            document.getElementById(idCorreccion).className = "acierto";
        }
    }

    //desabilitamos todos los inputs
    let inputs = document.getElementsByTagName("input");
    for(i=0;i<inputs.length;i++){
        inputs[i].disabled = true;
    }

    //hacemos un scroll hacia arriba
    window.scrollTo(0,0);
    //colocamos la cantidad que acertoy las que no acertó
    h2 = document.createElement("h2");
    h2.className = "resultado";
    h2.textContent = cantiCorrectas + " CORRECTAS - " + (10-cantiCorrectas) + " INCORRECTAS";
    document.getElementById("juego").appendChild(h2);
}