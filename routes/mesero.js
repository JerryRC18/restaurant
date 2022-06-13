const express = require('express');
const router = express.Router();

const connection = require('../connection');

router.get('/todos_los_meseros', async (req, res) => { //funcion asincrona
    try{
        const query = 'SELECT * FROM mesero';
        const meseros = await connection.query(query);

        res.json(meseros);

    } catch(error){
        return res.json({
            error: error 
        });
    }
});

router.post('/eliminar_mesero', async (req, res) => { //Vamos a cambiar la base de datos
    try{
        const mr_id = req.body.mr_id;
        const query = 'DELETE FROM mesero WHERE mr_id = ?';
        const result = await connection.query(query, [mr_id]);

        res.json('ok');

    } catch(error){
        return res.json({
            error: error 
        });
    }
});

router.post('/nuevo_mesero', async (req, res) => { //Vamos a cambiar la base de datos
    try{
        const body = req.body;
        const query = 'INSERT INTO mesero (mr_nombre, mr_apellido_pat, mr_telefono) VALUES (?, ?, ?)';
        const result = await connection.query(query, [body.mr_nombre, body.mr_apellido_pat, body.mr_telefono]);

        res.json('ok');

    } catch(error){
        return res.json({
            error: error 
        });
    }
});

module.exports = router;