const express = require('express');
const path = require('path');
const connection = require('../db');

var router = express.Router();


router.post('/allow', function (req, res, next) {
    if (req.session.loggedin && req.session) {
        connection.query('update allow set allowed = 1', function (err, result) {
            if(err) throw err
            res.redirect('dashboard')
        });
    } else {
        req.flash('error', 'Please login first!');
        return res.redirect('login');
    }
});

router.post('/disallow', function (req, res, next) {
    if (req.session.loggedin && req.session) {
        connection.query('update allow set allowed = 0', function (err, result) {
            if (err) throw err
            res.redirect('dashboard')
        });
    } else {
        req.flash('error', 'Please login first!');
        return res.redirect('login');
    }
});



module.exports = router; 