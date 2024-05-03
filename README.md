# Pentatlón de los Heroes

### En este repositorio se encuentran tanto el backend (node.js, Express, MongoDB) como el front (Vue.js / TypeScript)

Ejecutar el backend desde la carpeta raíz:

``` cd backend ```<br/>
``` npm install ```<br/>
``` nodemon server.js ```<br/>

Ejecutar el frontend desde la carpeta raíz:

``` cd frontend ```<br/>
``` npm install ```<br/>
``` npm run dev ```<br/>

##

El proyecto está montado para que funcione en los puertos 3000 (backend) y 5173 (frontend)

La API_URL es: http://localhost:3000/api/v1/hero

Existe una conexión a una base de datos de Mongo Atlas para hacer pruebas, la DB_URI se encuentra en el fichero .env
