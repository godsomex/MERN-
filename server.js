const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
const profile = require("./routes/api/profile");

const app = express();

//bring body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Database configuration

const db = require("./config/myKey").mongoURI;

//mongoose connection

mongoose
  .connect(db)
  .then(() => console.log("connected to mongodb databse"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("hello adidas "));

//use routes

app.use("/api/users", users);
app.use("/api/tweets", tweets);
app.use("/api/profile", profile);

const port = process.env.port || 4000;

app.listen(port, () => console.log(`server running on ${port}`));
