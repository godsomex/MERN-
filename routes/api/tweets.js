const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const passport = require("passport");

//importing the tweet model
const Tweet = require("../../models/Tweet");

//importing Profile model

const Profile = require("../../models/Profile");
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
// creating a tweet
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

// delete tweets with a delete request to api/tweets/:id
//private route
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Tweet.findById(req.params.id).then(tweet => {
        if (tweet.user.toString() !== req.user.id) {
          return res
            .status(401)
            .json({ notAuthorized: " user not authorized" });
        }
        //remove the item
        tweet
          .remove()
          .then(() => res.json({ success: true }))
          .catch(err => res.status(404).json({ zeropost: "no post found" }));
      });
    });
  }
);

//like tweets with a post request to api/tweets/like/:id
//private route
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Tweet.findById(req.params.id)
        .then(tweet => {
          if (
            tweet.likes.filter(like => like.user.toString() === req.user.id)
              .lenght > 0
          ) {
            return res.status(400).json({ liked: "liked already" });
          }
          //Add user id to likes array
          tweet.likes.unshift({ user: req.user.id });
          //save to db
          tweet.save().then(tweet => res.json(tweet));
        })
        .catch(err => res.status(404).json({ notweetFound: "no tweet found" }));
    });
  }
);

//unlike tweets with a post request to api/tweets/unlike/:id
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Tweet.findById(req.params.id).then(tweet => {
        if (
          tweet.like.filter(like => like.user.toString() === req.user.id)
            .lenght === 0
        ) {
          return res
            .status(400)
            .json({ notlike: "ypu have not like this tweet" });
        }
        //remove index
        const removeIndex = tweet.likes
          .map(item => item.user.toString())
          .indexOf(req.user.id);

        //splice out of array
        post.likes.splice(removeIndex, 1);
        post.save().then(tweet => res.json(tweet));
      });
    });
  }
);

module.exports = router;
