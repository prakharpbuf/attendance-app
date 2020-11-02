const express = require('express');
const path = require('path');
var router = express.Router();

router.use(express.static(path.join(__dirname, '../public')));

parent=path.resolve(__dirname, '..')

router.get('/', (req, res) => {
    var d = new Date();
    var n = d.getDay()
    if (n == 5 || n==4 || n==3) {   //thursaday is 5
        res.sendFile(parent+"/thu-only/landing.html");
    }

    //---------------------------------testing--------------------------
        if(n==0){
            res.sendFile(parent + "/thu-only/landing.html");
        }
        //---------------------------testing------------------------

    else {
        res.sendFile(parent+"/public/done.html");
    }
});






module.exports = router;