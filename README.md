
# Challenge para candidatos a Backend Developers - PatagonianTech 
** Guillermo Agustín Chiarotto**
Email: Agusgc_99@hotmail.com
Teléfono: 2994575660
Linkedin: https://www.linkedin.com/in/agustinchiarotto/


------------
**Objetivo**
El código tiene como objetivo responder a la funcionalidad presentada en la documentación de una API de canciones. Tiene dos endpoints principales, detallados en el archivo api.html.

------------
**Tecnologias**
El desafio fue resuelto principalmente con NodeJs, Express y Mongoose. Se utilizó además la librería[ spotify-web-api-node](http://https://github.com/thelinmichael/spotify-web-api-node " spotify-web-api-node") para gestionar la conexión con la API de Spotify.

------------
**Instalación**
-	Descargar el código y correr el comando `npm i` en la ubicación del archivo package.json. 
-	Tener instalado MongoDB.

------------
**Ejecución**
El archivo **init.js** contiene un script que recibe por parámetros en línea de comandos los ids de los artistas con los que se desea trabajar. Este se conecta con la API de Spotify, busca todas las canciones de los artistas ingresados y los guarda en una base de datos local.

Algunos Artist id para ingresar por parámetro
* Artists ids:
 * **Red Hot Chili Peppers**: 0L8ExT028jH3ddEcZwqJJ5 
 * **Led Zeppelin**: 36QJpDe2go2KgaRleHCDTp
 * **The Beatles**: 3WrFJ7ztbogyGnTHbHJFl2 
 * **Pearl Jam**: 1w5Kfo2jwwIPruYS2UWh56
  

Utilizando estos u otros id separados por espacios, el comando para ejecutar el script es

`node init 0L8ExT028jH3ddEcZwqJJ5 43ZHCT0cAZBISjO8DG9PnE 3WrFJ7ztbogyGnTHbHJFl2`


Al finalizar, la base de datos estará cargada y lista para responder a las peticiones de la API.

Para comenzar a correr el servidor:

`npm start`
