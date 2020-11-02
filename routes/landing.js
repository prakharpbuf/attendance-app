const express = require('express');
const path = require('path');
var router = express.Router();


parent = path.resolve(__dirname, '..')

router.get('/landing.html', (req, res) => {
    var d = new Date();
    var n = d.getDay()
    if (n == 5 || n == 4 || n == 3) {   //thursaday is 5
        res.sendFile(parent + "/thu-only/landing.html");
    }

    else {
        res.sendFile(parent + "/public/done.html");
    }
});






module.exports = router;