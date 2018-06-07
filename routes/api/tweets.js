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

//get all tweets
router.get("/", (req, res) => {
  Tweet.find()
    .sort({ date: -1 })
    .then(tweets => {
      res.json(tweets).catch(err => {
        res.status(400).json({ noTweets: "no tweets were found" });
      });
    });
});

// get a single post

router.get("/:id", (req, res) => {
  Tweet.findById(req.params.findById)
    .then(tweet => res.json(tweet))
    .catch(err => res.status(400).json({ noTweet: "no tweet was found" }));
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
