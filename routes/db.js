const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
const rp = require("request-promise");

var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', async(req, res) => {
    try{
        const client = await pool.connect();
        const result = await pool.query('SELECT * FROM users_table ORDER BY id DESC');
        const results = { 'results': (result) ? result.rows : null};
        await new Promise((resolve) => {
            setTimeout(resolve, 1000);
          });
        res.render('db',{title: 'RING-TING-TING', results});
        client.release();
    }catch (err){
        console.error(err);
        res.send('Error ' + err);
    }
});
module.exports = router;