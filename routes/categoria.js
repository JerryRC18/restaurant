const express = require('express');
const router = express.Router();

const connection = require('../connection');

router.get('/todas_las_categorias', async (req, res) => { //funcion asincrona
    try{
        const query = 'SELECT * FROM categoria';
        const mesas = await connection.query(query);

        res.json(mesas);

    } catch(error){
        return res.json({
            error: error 
        });
    }
});

module.exports = router;