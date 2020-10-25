const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', async (req, res) => {
    res.render('mejoras', { title: 'RING-TING-TING' });
});

router.post('/insertUser', async (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    if (name && email && password) {
        try {
            const client = await pool.connect();
            const result = await pool.query("INSERT INTO users_table values (1, '" + name + "', '" + password + "', '" + email + "')");
            if(result.rows > 0){
                alert("Se ha añadido un nuevo usuario con éxito.");
            }
            client.release();
        } catch (err) {
            console.error(err);
            res.send('Error ' + err);
        }
    }
    res.send('Fin de petición');

});


module.exports = router;