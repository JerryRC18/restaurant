const { connect } = require('http2');
const mysql = require('mysql');
const { promisify } = require('util');

//Configurar la conexion a la base de datos 
const connection = mysql.createPool({
    host: 'bqsvzdgzbj1smi1rgdnr-mysql.services.clever-cloud.com',
    user: 'ubnz3y3wcnbqvk4s',
    password: 'c7R8Xtm1hP3C2KFSqqdZ',
    database: 'bqsvzdgzbj1smi1rgdnr'
});

/*const connection = mysql.createPool({
    host: 'localhost',
    user: 'proyectofinal',
    password: 'GERARDO180999',
    database: 'bar_db'
});*/

//Mas conection 
//Funcion que solo se usa localmente 
//Arrow function 
connection.getConnection(
    (err, conn) => {
        if(err){
            console.log('Problema para conectar a la DB');
        }
        if(conn){
            console.log('¡DB conectada!');
        }
        return

    }
);

connection.query = promisify(connection.query);

module.exports = connection;