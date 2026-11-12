const URL_CITA = "https://dummyjson.com/quotes/random";
const URL_PERRO = "https://dog.ceo/api/breeds/image/random";
const URL_GATO_JSON = "https://cataas.com/cat?json=true";
const URL_DATO = "https://uselessfacts.jsph.pl/api/v2/facts/random?language=en";
const URL_TRADUCCION = "https://api.mymemory.translated.net/get";

async function traducirTexto(texto) {
  try {
    const parametros = new URLSearchParams({ q: texto, langpair: "en|es" });
    const respuesta = await fetch(`${URL_TRADUCCION}?${parametros}`);
    if (!respuesta.ok) throw new Error(`Error HTTP ${respuesta.status}`);
    const datos = await respuesta.json();
    const traduccion = datos.responseData && datos.responseData.translatedText;
    if (datos.responseStatus !== 200 || !traduccion) throw new Error("Traducción no disponible");
    return traduccion;
  } catch (error) {
    console.error(error);
    return texto;
  }
}

async function obtenerCita() {
  const respuesta = await fetch(URL_CITA);
  if (!respuesta.ok) throw new Error(`Error HTTP ${respuesta.status}`);
  const datos = await respuesta.json();
  const textoTraducido = await traducirTexto(datos.quote);
  return { texto: textoTraducido, autor: datos.author };
}

async function obtenerUrlPerro() {
  const respuesta = await fetch(URL_PERRO);
  if (!respuesta.ok) throw new Error(`Error HTTP ${respuesta.status}`);
  const datos = await respuesta.json();
  return datos.message;
}

async function obtenerUrlGato() {
  const respuesta = await fetch(URL_GATO_JSON);
  if (!respuesta.ok) throw new Error(`Error HTTP ${respuesta.status}`);
  const datos = await respuesta.json();
  if (datos.url) return datos.url;
  const identificador = datos.id ?? datos._id;
  if (!identificador) throw new Error("Respuesta sin identificador de imagen");
  return `https://cataas.com/cat/${identificador}`;
}

async function obtenerDato() {
  const respuesta = await fetch(URL_DATO);
  if (!respuesta.ok) throw new Error(`Error HTTP ${respuesta.status}`);
  const datos = await respuesta.json();
  return traducirTexto(datos.text);
}

function precargarImagen(url) {
  return new Promise((resolve, reject) => {
    const imagen = new Image();
    imagen.onload = () => resolve(url);
    imagen.onerror = () => reject(new Error("No se pudo cargar la imagen"));
    imagen.src = url;
  });
}

function configurarSeccion({ botonId, estadoId, cargar, mostrar }) {
  const boton = document.getElementById(botonId);
  const estado = document.getElementById(estadoId);

  async function ejecutar() {
    boton.disabled = true;
    estado.className = "estado text-muted";
    estado.textContent = "Cargando…";
    try {
      const contenido = await cargar();
      mostrar(contenido);
      estado.textContent = "";
    } catch (error) {
      console.error(error);
      estado.className = "estado error";
      estado.textContent = "No se pudo obtener el contenido. Revisa tu conexión y presiona el botón para reintentar.";
    } finally {
      boton.disabled = false;
    }
  }

  boton.addEventListener("click", ejecutar);
  ejecutar();
}

configurarSeccion({
  botonId: "boton-cita",
  estadoId: "estado-cita",
  cargar: obtenerCita,
  mostrar: ({ texto, autor }) => {
    const contenedor = document.getElementById("contenido-cita");
    contenedor.innerHTML = "";
    const parrafo = document.createElement("p");
    parrafo.textContent = `“${texto}”`;
    const pie = document.createElement("footer");
    pie.className = "blockquote-footer";
    pie.textContent = autor;
    contenedor.append(parrafo, pie);
  }
});

configurarSeccion({
  botonId: "boton-perro",
  estadoId: "estado-perro",
  cargar: async () => precargarImagen(await obtenerUrlPerro()),
  mostrar: (url) => {
    const imagen = document.getElementById("imagen-perro");
    imagen.src = url;
    imagen.hidden = false;
  }
});

configurarSeccion({
  botonId: "boton-gato",
  estadoId: "estado-gato",
  cargar: async () => precargarImagen(await obtenerUrlGato()),
  mostrar: (url) => {
    const imagen = document.getElementById("imagen-gato");
    imagen.src = url;
    imagen.hidden = false;
  }
});

configurarSeccion({
  botonId: "boton-dato",
  estadoId: "estado-dato",
  cargar: obtenerDato,
  mostrar: (texto) => {
    document.getElementById("contenido-dato").textContent = texto;
  }
});
