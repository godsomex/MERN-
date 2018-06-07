const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const passport = require("passport");

//importing the tweet model
const Tweet = require("../../models/Tweet");
//importing the tweet validation
const tweetInputvalidation = require("../../validation/tweets");

router.get("/test", (req, res) => {
  res.json({ msg: "tweets are raining" });
});

//making a post request to api/tweets
//it will be a private route
router.post(
  "/tweets",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, Valid } = tweetInputvalidation(req.body);

    if (!Valid) {
      return res.status(404).json(errors);
    }
    newTweet = new Tweet({
      text: req.body.text,
      name: req.body.name,
      pic: req.body.pic,
      user: req.body.user
    });

    newTweet.save().then(tweet => res.json(tweet));
  }
);

module.exports = router;
