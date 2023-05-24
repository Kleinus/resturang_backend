const fs = require('fs');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

  res.render('login', { title: 'Express' });
});

router.post('/', function(req, res, next) {

    var users = null;

    try {
        var rawData = fs.readFileSync('users.json');
        users = JSON.parse(rawData);
    } catch (err) {
        res.send('Error when retrieving from database');
        return;
    }
    
    for (const user of users) {
        console.log(user)

        var userNameIsEqual = user.username == req.body.username;
        var passwordIsEqual = user.password == req.body.password;

        if (userNameIsEqual && passwordIsEqual) {
            res.render('profile',
            Object.assign(user));
            return;
        }
    }

    res.render('login', { errorMsg: 'Username or password is incorrect' });
});

module.exports = router;