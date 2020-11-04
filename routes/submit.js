const express = require('express');
const path = require('path');
const connection = require('../db');

var router = express.Router();

parent = path.resolve(__dirname, '..')

router.post('/submit', function(req,res,next){
    var firstName = req.sanitize("first-name").escape().trim()
    var lastName = req.sanitize("last-name").escape().trim()
    var code = req.sanitize("code").escape().trim()
    connection.query('INSERT INTO codes (firstName, lastName, code) VALUES ($1, $2, $3);', [firstName, lastName, code], function (err, result) {
        //if(err) throw err
        if (err) {
            req.flash('error', err)
            return res.render('landing')
        } else {
            req.session.marked=1;
            res.redirect('done');
        }
    });
    
})

module.exports = router;