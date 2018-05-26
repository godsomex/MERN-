const express = require("express");

const router = express.Router();

const gravatar = require("gravatar");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const passport = require("passport");

const keys = require("../../config/myKey");

const User = require("../../models/User"); //loading user model

const registrationInputValidate = require("../../validation/register");

router.get("/test", (req, res) => {
  res.json({ msg: "users avaliable" });
});

router.post("/register", (req, res) => {
  //chcek for number of character entered by someone trying to register

  const { errors, isValid } = registrationInputValidate(req.body); //destructurign or say pulling out this identifiers from the register.js //this is possible becuase we are returning the errors, isValid in register.us

  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      return res.status(400).json({ email: "email already exist" }); // or we can pass in error as an object alone after declaring it as errors.email
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        pic: avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //finding user by their email using the mongoose model

  User.findOne({ email }).then(user => {
    //check if user is not valid
    if (!user) {
      return res.status(404).json({ email: "user not found" });
    }

    //match password or say check password

    bcrypt.compare(password, user.password).then(passwordMatch => {
      if (passwordMatch) {
        // if password is macthed
        //creating the jwt payload
        const payload = { id: user.id, name: user.name, pic: user.pic };

        //jwt to sign the token
        jwt.sign(payload, "secret", { expiresIn: 360000 }, (err, token) => {
          res.json({ success: true, token: "Bearer " + token });
        });
      } else {
        return res.status(400).json({ password: "incorrect password" });
      }
    });
  });
});

//return current useer //private route // GET method for retrieving api/users/current

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //res.json(req.user);

    res.json({ id: req.user.id, name: req.user.name, email: req.user.email });
  }
);

module.exports = router;
