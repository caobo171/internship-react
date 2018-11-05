const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");

const key = require("./configs/keys").mongoURI;
mongoose.Promise = global.Promise;
mongoose.connect(
  key,
  { useNewUrlParser: true },
  () => {
    console.log("database is ready ");
  }
);
require("./models/User");
require("./models/Post");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization "
  );
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

//app.use(passport.initialize());
// require("./configs/auth")(passport);

const postRoute = require("./routes/api/postRoute");
const userRoute = require("./routes/api/userRoute");
const actionRoute = require("./routes/api/actionRoute");

app.use("/api/post", postRoute);
app.use("/api/user", userRoute);
app.use("/api/action", actionRoute);

app.listen(5000, () => {
  console.log("server is running");
});
