var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const auth = require("../middleware/auth");
var db = require('../public/javascripts/db');


var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + ' ' + time;

router.get('/', function (req, res, next) {
  res.render("index", { date: dateTime })


});

router.post("/register", (req, res, next) => {

  res.render('mark', { date: dateTime });

});
router.post("/savedata", async (req, res, next) => {
  try {

    var User_Id = req.body.User_Name;
    var Pass = req.body.Password;
    encryPassword = await bcrypt.hash(Pass, 10);



    console.log("userid" + User_Id);  // stackoverflow0
    console.log("password" + encryPassword);  // stackoverflow1
    const userId1 = db.getAllLoginId(User_Id, encryPassword);
    console.log("Save Success " + userId1);
    res.redirect("/");


  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});
router.post("/home", async (req, res, next) => {
  try {

    var LoginId = req.body.user;
    var pass_word = req.body.pass;

    console.log("userName" + LoginId)
    console.log("userpassword" + pass_word)
    if (LoginId && pass_word) {
      const user = db.getAllSignIn(LoginId);


      const data = await Promise.resolve(user);
      console.log("data" + JSON.stringify(data));
      if (data == "") {
        res.status(400).send("valid username");
      } else {
        for (let i = 0; i < data.length; i++) {
          let value1 = data[i].User_Name;
          let value = data[i].Password;
          let status = data[i].Status;
          if (user && (await bcrypt.compare(pass_word, value))) {

            var token = jwt.sign(
              { user_id: LoginId, pass_word },
              process.env.JWT_KEY,
              {
                expiresIn: "1hr",
              }
            );
            const userId1 = db.getAllLoginIdToken(token, LoginId);
            console.log("inset" + userId1);
            process.env.auth = token;
            var authdata = process.env.auth;
            console.log("authdata" + authdata);
            
          
            if (status == "admin"){
              res.redirect("/users/" + LoginId);
            }
            if (status =="engineer"){
            res.redirect("/engineer/" + LoginId);
            }
            return next();
            
          }
          
          else {
            res.status(400).send("Aunthedication failed");
            console.log("error")
          }

        }
      }
    } else {
      res.status(400).send("All input is requried");
    }

  } catch (err) {
    console.log(err);
  }

});

module.exports = router;
