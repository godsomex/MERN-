const express = require("express");

const router = express.Router();

const gravatar = require("gravatar");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const keys = require("../../config/myKey");

const User = require("../../models/User");

router.get("/test", (req, res) => {
  res.json({ msg: "users avaliable" });
});

router.post("/register", (req, res) => {
  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      return res.status(400).json({ email: "email already exist" });
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

    bcrypt.compare(password, user.password).then(dataMatch => {
      if (dataMatch) {
        // if user is macthed
        //creating the jwt payload
        const payload = { id: user.id, name: user.name, pic: user.pic };

        //jwt to sign the token

        jwt.sign(payload, keys.secret, { expiresIn: 36000 }, (err, token) => {
          res.json({ success: true, token: "Bearer" + token });
        });
      } else {
        return res.status(400).json({ password: "incorrect password" });
      }
    });
  });
});

module.exports = router;
