const express = require('express');
const bodyParser = require("body-parser");
var flash = require('express-flash');
const session = require("express-session");
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const { Client } = require('pg');

var conn = require('./db.js');
const index = require('./routes/index.js');
const auth = require('./routes/auth.js');
const landing = require('./routes/landing.js')
const submit = require('./routes/submit.js');
const dashboard = require('./routes/dashboard.js')
const codes = require('./routes/triggercodes.js')


const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



var sixDays = 6 * 24 * 3600 * 1000;


app.use(cookieParser());
app.use(session({
    secret: "AS333ProfBremner",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: sixDays }
}));
app.use(expressValidator());

app.use('/', index);
app.use('/', landing);
app.use('/', auth);
app.use('/',submit);
app.use('/',dashboard);
app.use('/',codes);

app.get('*', (req, res) => {
    res.sendFile(__dirname+"/public/404.html");
});

port = process.env.PORT || 80;
var server = app.listen(port)