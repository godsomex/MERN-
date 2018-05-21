const express = require("express");

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({ msg: "tweets are raining" });
});

module.exports = router;
