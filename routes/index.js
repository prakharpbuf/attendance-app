const express = require('express');
const path = require('path');
var router = express.Router();

router.use(function (req, res, next) {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
});


router.use(express.static(path.join(__dirname, '../public')));

parent=path.resolve(__dirname, '..')

router.get('/', (req, res) => {
    var d = new Date();
    var n = d.getDay()
    if (n == 5 || n==4 || n==3) {   //thursaday is 5
        if (!req.session.marked) {
            res.render("landing");
        }
        else {
            res.sendFile(parent + '/public/thankyou.html')
        }
    }

    else {
        res.sendFile(parent+"/public/done.html");
    }
});






module.exports = router;