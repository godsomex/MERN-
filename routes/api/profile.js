const express = require("express");

const router = express.Router();

const mongoose = require("mongoose");

const passport = require("passport");

const Profile = require("../../models/Profile"); //loading the Profile model

const User = require("../../models/User"); // loading the user model

const profileInputvalidation = require("../../validation/profile"); //loading validation

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
      .populate("user", ["name", "pic"])
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

//getting all users profile which is public
// GET request to api/profile/all
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("users", ["name", "pic"])
    .then(proiles => {
      if (!profiles) {
        errors.zeroprofile = "there are no profiles";
        return res.status(404).json(erros);
      }
      res.json(profiles);
    })
    .catch(err => {
      res.status(404).json({
        profile: "internal erro occured while retrieving all the users "
      });
    });
});

//getting the profile by user ID, a public route
// GET request to api/profile/handle/:user_id
router.get("/handle/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "pic"])
    .then(profile => {
      if (!profile) {
        errors.zeroprofile = "there is no profile for the user";
        return res.status(404).json(errors);
      }
      res.json(profile); // if there re no errors return a response with the profile payload
    })
    .catch(err =>
      res.status(404).json({ profile: "error occured internally" })
    );
});

//getting the profile by handle, a public route
// GET request to api/profile/handle/:handle
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "pic"])
    .then(profile => {
      if (!profile) {
        errors.zeroprofile = "there is no profile for the user";
        return res.status(404).json(errors);
      }
      res.json(profile); // if there re no errors return a response with the profile payload
    })
    .catch(err => res.status(404).json(err));
});

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = profileInputvalidation(req.body); //destructuring or say pulling out this identifiers from the register.js //this is possible becuase we are returning the errors, isValid in register.us

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const getProfileFileds = {};

    getProfileFileds.user = req.user.id;
    if (req.body.handle) getProfileFileds.handle = req.body.handle;
    if (req.body.company) getProfileFileds.company = req.body.company;
    if (req.body.website) getProfileFileds.website = req.body.website;
    if (req.body.bio) getProfileFileds.bio = req.body.bio;
    if (req.body.status) getProfileFileds.status = req.body.status;
    if (req.body.github) getProfileFileds.github = req.github;

    //split skills into arrays
    if (typeof req.body.skills !== "undefined") {
      getProfileFileds.skills = req.body.skills.split(",");
    }

    // social input
    getProfileFileds.social = {};

    if (req.body.youtube) getProfileFileds.social.youtube = req.body.youtube;
    if (req.body.twitter) getProfileFileds.social.twitter = req.body.twitter;
    if (req.body.facebook) getProfileFileds.social.facebook = req.body.facebook;
    if (req.body.linkdn) getProfileFileds.social.linkdn = req.body.linkdn;
    if (req.body.instagram)
      getProfileFileds.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: getProfileFileds },
          { new: true }
        ).then(profile => res.json());
      } else {
        //create

        //check if handle exists
        Profile.findOne({ handle: getProfileFileds.handle }).then(profile => {
          if (profile) {
            errors.handle = "that handle already exist";
            res.status(400).json(errors);
          }

          // save profile
          new Profile(getProfileFileds)
            .save()
            .then(profile => res.json(profile));
        });
      }
    });
  }
);

//addig experience to profile routes
//POST request
//priavte route

router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newObjExperience = {
        title: req.body.title,
        organisation: req.body.organisation,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      //add to experience array
      Profile.experience.unshift(newObjExperience);
      Profile.save().then(profile => res.json(profile));
    });
  }
);
module.exports = router;
