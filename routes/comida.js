const express = require('express');
const router = express.Router();

const connection = require('../connection');

router.get('/todas_las_comidas', async (req, res) => { //funcion asincrona
    try{
        //const query = 'SELECT * FROM comida_bebida';
        
        const query = 'SELECT com_id, com_producto, com_precio, com_categoria FROM comida_bebida, categoria WHERE com_cat_id = cat_id';
        
        const comidas = await connection.query(query);

        res.json(comidas);

    } catch(error){
        return res.json({
            error: error 
        });
    }
});

router.post('/eliminar_comida', async (req, res) => { //Vamos a cambiaer la base de datos
    try{
        const com_id = req.body.com_id;
        const query = 'DELETE FROM comida_bebida WHERE com_id = ?';
        const result = await connection.query(query, [com_id]);

        res.json('ok');

    } catch(error){
        return res.json({
            error: error 
        });
    }
});

router.post('/nueva_comida', async (req, res) => { //Vamos a cambiaer la base de datos
    try{
        const body = req.body;
        const query = 'INSERT INTO comida_bebida (com_producto, com_precio, com_cat_id) VALUES (?, ?, ?)';
        const result = await connection.query(query, [body.com_producto, body.com_precio, body.com_cat_id]);

        res.json('ok');

    } catch(error){
        return res.json({
            error: error 
        });
    }
});

module.exports = router;