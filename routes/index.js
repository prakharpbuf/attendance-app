const express = require('express');
const path = require('path');
var router = express.Router();


router.use(express.static(path.join(__dirname, '../public')));


router.get('/', (req, res) => {
    res.sendFile("index.html");
});



module.exports = router;