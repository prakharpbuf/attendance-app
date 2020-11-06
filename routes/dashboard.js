const express = require('express');
const path = require('path');
const connection = require('../db');

const nodemailer = require('nodemailer')


function sendEmail(txt){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pawprakharpaw',
            pass: process.env.gmailpass
        }
    });
    var mailOptions = {
        from: 'pawprakharpaw@gmail.com',
        to: process.env.testing_email || 'fbg169@gmail.com',
        subject: '***Attendance report for '+month+"/"+date + " ***",
        text: txt
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}





var router = express.Router();


router.get('/:year-:month-:date', function (req, res, next) {


    if (req.session) {
        if (req.session.loggedin) {
            date = req.params.date;
            date = parseInt(date);
            date += 1;
            month = req.params.month;
            console.log(date, month);
            connection.query('select * from codes where extract (day from entereddate) = $1 and extract (month from entereddate) = $2;', [date, month], function (err, result) {
                if (err) throw err
                if (result.rows.length == 0) {
                    req.flash('error', 'No records found for this date')
                    res.redirect('dashboard')
                }
                else {
                    var i=0;
                    var text="Here is the attendance report for the requested date: \n";
                    for (i = 0; i < result.rows.length; i++) {
                        text+=i+1 + ". "
                        text += result.rows[i].firstname.trim() + " " + result.rows[i].lastname.trim() + ": "+ result.rows[i].code.trim() + "\n";
                    }
                    sendEmail(text,date,month);
                    req.flash('success', 'Email sent successfully')
                    res.redirect('dashboard')
                }
            });

        }
    }
    else {
        req.flash('error','Please login first')
        return res.render('login')
    }
})


module.exports = router;