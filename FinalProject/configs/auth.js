const mongoose = require("mongoose");
const User = mongoose.model("user");
const secret = require("./keys").secrete;
const jwt = require("jsonwebtoken");

module.exports = function authenicate(req, res, next) {
  let token = req.headers.authorization;
  //console.log(token);
  if (token.length < 10) {
    res.send("no");
  } else {
    jwt.verify(token, secret, (err, decoded) => {
      User.findById(decoded.id).then(user => {
        //console.log(user);
        req.user = user;
        next();
      });
    });
  }
};
