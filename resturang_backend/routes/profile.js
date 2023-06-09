const fs = require('fs');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var users = null;

  try {

    var rawData = fs.readFileSync('users.json');
    users = JSON.parse(rawData);
  } catch (err) {
    res.send('Error when retrieving from database');
    return;
  }

  for (const user of users) {

    if (user.username == user) {
      res.render('profile', user);
      return;
    }
  }

  res.send('Error linus not found');
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

  var actualUser = null

  for (const user of users) {

    if (user.id == "00000000") {
      actualUser = user
    }
  }

  if (actualUser.password != req.body.old_password) {
    res.render('profile',
      Object.assign(actualUser, { errorMsg: "Old password is wrong. Please try again!" }));
  } else {
    var updatedUser = {
      username: req.body.username,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password
    }
  
    addUser("00000000", updatedUser, users)
  
    save(users)
  
    res.render('profile',
    Object.assign(updatedUser, { errorMsg: "Profile info update!" }));
  }
});

function addUser(id, userToAdd, usersList) {
  var objIndex = usersList.findIndex((obj => obj.id == id));

  usersList[objIndex] = userToAdd
  usersList[objIndex].id = id;
  
  console.log(usersList)
}

function save(usersList) {
  let dataToSave = JSON.stringify(usersList);
    fs.writeFileSync('users.json', dataToSave);
}


module.exports = router;