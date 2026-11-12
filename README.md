# Explorador de contenido aleatorio

**Integrante:** Matias Raldes Leon

## Ejecución

1. Descargar o clonar el repositorio.
2. Abrir la carpeta en VS Code e iniciar con la extensión Live Server, o ejecutar `python -m http.server` dentro de la carpeta y abrir http://localhost:8000.
3. Si se aloja en ASP.NET Core MVC: copiar `css/` y `js/` dentro de `wwwroot/`, usar el contenido de `index.html` en una vista, ejecutar `dotnet run` y abrir la URL indicada.

## Preguntas de reflexión

**1. ¿Qué es un endpoint y cuál utilizaste para cada API?**

Un endpoint es la URL concreta de un servicio a la que se envía una solicitud para obtener o enviar datos.

- Citas: https://dummyjson.com/quotes/random
- Perros: https://dog.ceo/api/breeds/image/random
- Gatos: https://cataas.com/cat?json=true
- Datos curiosos: https://uselessfacts.jsph.pl/api/v2/facts/random?language=en
- Traducción: https://api.mymemory.translated.net/get

**2. ¿Qué diferencia existe entre recibir JSON y recibir directamente una imagen?**

JSON es texto estructurado que se convierte en un objeto con `response.json()` y del cual se leen campos como `quote` o `message`. Una imagen es contenido binario: no se procesa con `response.json()`, sino que se usa su URL directamente en el atributo `src` de una etiqueta `<img>`.

**3. ¿Qué función cumplen await y response.json()?**

`await` pausa la ejecución de la función `async` hasta que la promesa se resuelva, sin bloquear la página. `response.json()` lee el cuerpo de la respuesta y lo convierte en un objeto de JavaScript; también devuelve una promesa, por eso se usa con `await`.

**4. ¿Por qué se debe verificar response.ok además de utilizar try/catch?**

`fetch` solo lanza una excepción ante fallos de red. Si el servidor responde con un error HTTP como 404 o 500, la promesa se resuelve igualmente. Verificar `response.ok` permite detectar esos casos y lanzar un error manualmente para que el `catch` lo maneje.

**5. ¿Cómo lograste actualizar una sección sin recargar toda la página?**

Con `fetch` y JavaScript. Al presionar el botón de una sección se consulta únicamente su API y se modifica solo el DOM de esa tarjeta (`textContent` o `src`), sin navegar ni recargar la página. Cada sección tiene su propio estado de carga, su propio botón y su propio manejo de errores.
