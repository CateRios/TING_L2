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

router.get('/', async(req, res) => {
        res.render('mejoras',{title: 'RING-TING-TING'});
});

module.exports = router;