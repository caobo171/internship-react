const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = mongoose.model("user");
const secret = require("../../configs/keys").secrete;
const authenicate = require("../../configs/auth");

router.get("/", () => {});

router.post("/register", async (req, res) => {
  let hashPassword = bcrypt.hashSync(req.body.password, 8);
  let user = new User({
    imgUrl:
      "https://anh.24h.com.vn/upload/2-2017/images/2017-06-07/1496818441-em-gai-bao-thanh-5.jpg",
    name: req.body.name,
    email: req.body.email,
    password: hashPassword
  });
  let data = await user.save();
  let token = jwt.sign({ id: data._id }, secret, {
    expiresIn: 24 * 60 * 60
  });
  res.send({ auth: true, token: token });
});

router.get("/me", authenicate, (req, res) => {
  //console.log(req.user);
  if (req.user) {
    res.send(req.user);
  } else {
    res.send("something went wrong");
  }
});
router.post("/settings", authenicate, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      imgUrl: req.body.imgUrl,
      name: req.body.name,
      about: req.body.about,
      email: req.body.email,
      password:
        req.body.password > 3
          ? bcrypt.hashSync(req.body.password, 8)
          : req.user.password
    },
    (err, user) => {
      console.log(user);
      res.send(user);
    }
  );
});

router.post("/login", (req, res) => {
  //console.log(req.body.password);
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      res.send("User not found");
    } else {
      //console.log(user);
      let passwordisValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordisValid) {
        res.send({ auth: false, token: null });
      } else {
        let token = jwt.sign({ id: user._id }, secret, {
          expiresIn: 86400
        });
        res.send({ auth: true, token: token });
      }
    }
  });
});

router.get("/get/:id", (req, res) => {
  User.findById({ _id: req.params.id }).then(user => {
    res.send(user);
  });
});

module.exports = router;
