# Pentathlon of Heroes

### In this repository you will find both the backend (node.js, Express, MongoDB) and the frontend (Vue.js / TypeScript).

Run the backend from the root folder:

`cd backend`<br/>
`npm install`<br/>
`npm start`<br/>

Run the frontend from the root folder:

`cd frontend`<br/>
`npm install`<br/>
`npm run dev`<br/>

##

### Environment variables

The project is set up to run on port 3000 (backend) and any for the frontend.
<br/>
You can enable a specific URL for the frontend from the .env file (e.g. http://localhost:5173).

API_URL is: http://localhost:3000/api/v1/heroes

Documentation for the endpoints can be found at: http://localhost:3000/docs

There is a connection to a Mongo Atlas database for testing, the DB_URI is in the .env file.
