const express = require("express");

const router = express.Router();

const mongoose = require("mongoose");

const passport = require("passport");

const Profile = require("../../models/Profile"); //loading the Profile model

const User = require("../../models/User"); // loading the user model

//testing if profile route works
router.get("/test", (req, res) => {
  res.json({ msg: "profile now avaliable" });
});
//getting the current user profile which is private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.zeroprofile = "zero profile for the user ";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .then(err => res.status(404).json(err));
  }
);
module.exports = router;
