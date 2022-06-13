const express = require('express');
const router = express.Router();

const connection = require('../connection');

router.get('/todas_las_mesas', async (req, res) => { //funcion asincrona
    try{
        const query = 'SELECT * FROM mesa';
        const mesas = await connection.query(query);

        res.json(mesas);

    } catch(error){
        return res.json({
            error: error 
        });
    }
});

router.post('/eliminar_mesa', async (req, res) => { //Vamos a cambiar la base de datos
    try{
        const ms_id = req.body.ms_id;
        const query = 'DELETE FROM mesa WHERE ms_id = ?';
        const result = await connection.query(query, [ms_id]);

        res.json('ok');

    } catch(error){
        return res.json({
            error: error 
        });
    }
});

router.post('/nueva_mesa', async (req, res) => { //Vamos a cambiar la base de datos
    try{
        const body = req.body;
        const query = 'INSERT INTO mesa (ms_asientos, ms_area, ms_mr_id) VALUES (?, ?, ?)';
        const result = await connection.query(query, [body.ms_asientos, body.ms_area, body.ms_mr_id]);

        res.json('ok');

    } catch(error){
        return res.json({
            error: error 
        });
    }
});

module.exports = router;