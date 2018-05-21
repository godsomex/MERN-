const express = require("express");

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({ msg: "profile now avaliable" });
});

module.exports = router;
