const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const history = require('connect-history-api-fallback');

app.use(cors());
app.use(morgan('tiny'));
app.use(history());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/comidas', require('./routes/comida'));
app.use('/meseros', require('./routes/mesero'));
app.use('/ordenes', require('./routes/orden'));
app.use('/mesas', require('./routes/mesa'));
app.use('/categorias', require('./routes/categoria'));

//API REST --> HTTP --> Web 
// GET, POST --> Enviar y recuperar información 
// GET --> No modifica el estado de la base de datos 
// HEAD 
// POST --> Si modifica el estado de la base de datos 
// PUT 

// Nuestra primera peticion 
app.get('/', function(req, res){
    res.send('¡Hola mundo!');
});

//SEgunda peticion 
//app.get('/hola', function(req, res){
//    res.send('¡Hola grupo de sistemas de administracion de datos!');
//});

//Decirle a nuestra api en que puerto correr (escuchar)
const PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
    console.log('¡API esta corriendo!');
});

