const express = require('express');
const cors = require('cors');
const { dbCONN } = require('./database/db');
require('dotenv').config();

//Creacion de nuestro servidor
const app = express();

dbCONN();

//cors
app.use( cors() );

//Lectura del json
app.use( express.json());

app.use( '/usuarios', require('./routes/usuarios') );
app.use('/documentos', require('./routes/documentos'));
app.use('/buscar', require('./routes/buscar'));
app.use( '/login', require('./routes/auth') );
app.use('/upload', require('./routes/upload'));

app.listen( process.env.PORT, () => {
    console.log(`Conectado al puerto ${ process.env.PORT }`);
})