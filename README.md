# Pentatlón de los Heroes

### En este repositorio se encuentran tanto el backend (node.js, Express, MongoDB) como el front (Vue.js / TypeScript)

Ejecutar el backend desde la carpeta raíz:

`cd backend`<br/>
`npm install`<br/>
`npm start`<br/>

Ejecutar el frontend desde la carpeta raíz:

`cd frontend`<br/>
`npm install`<br/>
`npm run dev`<br/>

##

### Variables de entorno

El proyecto está montado para que funcione en los puertos 3000 (backend) y cualquiera para el frontend.
<br/>
Se puede habilitar una URL concreta para el front desde el fichero .env (por ejemplo: http://localhost:5173)

La API_URL es: http://localhost:3000/api/v1/hero

Existe una conexión a una base de datos de Mongo Atlas para hacer pruebas, la DB_URI se encuentra en el fichero .env
