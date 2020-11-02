const express = require('express');
const path = require('path');
var router = express.Router();


parent = path.resolve(__dirname, '..')

router.use(function (req, res, next) {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
});


router.get('/landing', (req, res) => {
    var d = new Date();
    var n = d.getDay()
    if (n == 5 || n == 4 || n == 3 || n==0 || n==1 || n==2 || n==6) {   //thursaday is 5
        if(!req.session.marked){
            res.render("landing");
        }
        else{
            res.sendFile(parent+'/public/thankyou.html')
        }
    }

    else {
        res.sendFile(parent + "/public/done.html");
    }

});






module.exports = router;