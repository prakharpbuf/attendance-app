const express = require('express');
const path = require('path');
var router = express.Router();
const connection = require('../db');

router.use(function (req, res, next) {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
});


router.use(express.static(path.join(__dirname, '../public')));

parent=path.resolve(__dirname, '..')

router.get('/', (req, res) => {

    connection.query('Select allowed from allow', function (err, result) {
        if (result.rows[0].allowed) {
            if (!req.session.marked) {
                res.render("landing");
            }
            res.sendFile(parent + '/public/thankyou.html')
        }
        else {
            res.sendFile(parent + "/public/done.html");
        }

    })
});






module.exports = router;