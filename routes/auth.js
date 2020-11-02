const express = require('express');
const connection = require('../db');

var router = express.Router();


router.use(function (req, res, next) {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
});


router.get('/login', (req, res) => {
    res.render("login");
});

router.post('/auth', function (req, res, next) {
    var user = {
        email: req.sanitize('email').escape().trim(),
        password: req.sanitize('password').escape().trim()
    }
    connection.query('SELECT * FROM users WHERE email = $1 AND password = $2', [user.email, user.password], (err, rows) => {
        if (err) console.log(err);
        // if user not found
        if(rows.rows.length==0){
            req.flash('error', 'Incorrect ID/Password');
            return res.render('login');
        }
        if (rows.rows.length == 1) { // if user found
            req.session.loggedin = true;
            return res.redirect('dashboard');
        }
        else {
            req.flash('error', 'Some error occured, please contact developer!');
            return res.render('login');
        }
    });
});

router.get('/dashboard', function (req, res) {
    if (req.session.loggedin && req.session) {
        res.render('dashboard');
    } else {
        req.flash('error', 'Please login first!');
        return res.redirect('login');
    }
});


router.get('/logout', function (req, res) {
    return res.redirect('login');
    req.session.loggedin = 0;
    req.session.destroy();
});


module.exports = router;

