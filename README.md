# Explorador de contenido aleatorio

Integrante: Matias Raldes Leon

Página hecha con HTML, CSS, JavaScript y Bootstrap que muestra una cita, una foto de perro, una foto de gato y un dato curioso. Cada tarjeta tiene su botón y se actualiza sola, sin recargar la página.

## Cómo ejecutarlo

1. Descargar o clonar el repositorio.
2. Abrir la carpeta en VS Code y correr index.html con Live Server, o hacer doble clic en index.html para abrirlo en el navegador.
3. Se necesita internet porque las APIs y Bootstrap se cargan desde la web.

## Preguntas

**1. ¿Qué es un endpoint y cuál utilicé para cada API?**

Un endpoint es la dirección (URL) a la que le hacemos la consulta para que nos devuelva los datos. Usé estos:

- Citas: https://dummyjson.com/quotes/random
- Perros: https://dog.ceo/api/breeds/image/random
- Gatos: https://cataas.com/cat?json=true
- Datos curiosos: https://uselessfacts.jsph.pl/api/v2/facts/random?language=en
- Traducción: https://api.mymemory.translated.net/get

**2. ¿Qué diferencia hay entre recibir JSON y recibir directamente una imagen?**

El JSON es texto con datos ordenados, entonces lo paso a objeto con response.json() y saco los campos que necesito (quote, author, message, text). En cambio una imagen llega como archivo binario y no se puede leer con response.json(). Para mostrarla solo se pone su URL en el src de un img. Por eso con los gatos primero pido el JSON para sacar la URL o el id y después armo la dirección de la imagen.

**3. ¿Qué función cumplen await y response.json()?**

await hace que la función espere a que termine la consulta antes de seguir con la siguiente línea, sin congelar la página. response.json() lee la respuesta y la convierte en un objeto de JavaScript que ya puedo usar. Como también devuelve una promesa, se usa con await.

**4. ¿Por qué se debe verificar response.ok además de usar try/catch?**

Porque fetch solo da error cuando falla la red, por ejemplo si no hay internet. Si el servidor responde con un error como 404 o 500, fetch lo toma como una respuesta normal y el catch no se activa. Con response.ok puedo detectar eso y lanzar yo mismo el error para que lo atrape el catch.

**5. ¿Cómo logré actualizar una sección sin recargar toda la página?**

Con fetch y JavaScript. Cuando se presiona el botón de una tarjeta, hago la consulta solo a la API de esa tarjeta y después cambio únicamente su contenido en el DOM (textContent o src). Cada tarjeta tiene su propio botón, su mensaje de "Cargando…" y su manejo de errores, así que si una API falla las otras siguen funcionando.
