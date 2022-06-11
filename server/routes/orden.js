const express = require('express');
const router = express.Router();

const connection = require('../connection');

router.get('/todas_las_ordenes', async (req, res) => { //funcion asincrona
    try{
        const query = 'SELECT * FROM orden';
        const ordenes = await connection.query(query);

        res.json(ordenes);

    } catch(error){
        return res.json({
            error: error 
        });
    }
});

router.post('/eliminar_orden', async (req, res) => { //Vamos a cambiar la base de datos
    try{
        const pre_id = req.body.pre_id;
        const query = 'DELETE FROM orden WHERE ord_id = ?';
        const result = await connection.query(query, [ord_id]);

        res.json('ok');

    } catch(error){
        return res.json({
            error: error 
        });
    }
});

router.post('/nueva_orden', async (req, res) => { //Vamos a cambiar la base de datos
    try{
        const body = req.body;
        const query = 'INSERT INTO orden (ord_mr_id, ord_ms_id, ord_fecha, ord_total) VALUES (?, ?, ?, ?)';
        const result = await connection.query(query, [body.ord_mr_id, body.ord_ms_id, body.ord_fecha, body.ord_total]);

        res.json('ok');

    } catch(error){
        return res.json({
            error: error 
        });
    }
});

router.post('/nuevo_det_orden', async (req, res) => {
    try{
        const body = req.body;
        const query = 'INSERT INTO detalles_orden (deto_com_id, deto_cant, deto_ord_id) VALUES (?, ?, ?)';
        await connection.query(query, [body.deto_com_id, body.deto_cant, body.deto_ord_id]);
    } catch(error){
        return res.json({
            error: error
        });
    }

});

router.get('/leer_det_orden', async (req, res) => {
    try{ 
        const ord_id = req.params.ord_id;
        const query = 'SELECT c.com_producto FROM detalles_orden AS o INNER JOIN comida_bebida AS c ON o.deto_com_id = c.com_id WHERE o.detp_ord_id = ?';
        const comida_bebida = await connection.query(query, [ord_id]);
        res.json(comida_bebida); 

    } catch(error){
        return res.json({
            error: error
        });
    }
});

module.exports = router;