const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const User = mongoose.model("user");
const Post = mongoose.model("post");
const authenicate = require("../../configs/auth");

router.post("/favorite/:id", authenicate, (req, res) => {
  let user = req.user;
  console.log(user);
  user.favoriteList.unshift(req.params.id);
  user.save().then(user => {
    Post.findById({ _id: req.params.id })
      .populate("user", ["name", "imgUrl"])
      .then(post => {
        post.favoriteCount += 1;
        post.save().then(data => res.send({ user: user, post: data }));
      });
  });
});

router.post("/follow/:id", authenicate, (req, res) => {
  let user = req.user;
  user.followList.unshift(req.params.id);
  user.save().then(user => res.send(user));
});

router.delete("/favorite/:id", authenicate, (req, res) => {
  let user = req.user;
  console.log(user);
  let removeIndex = user.favoriteList.indexOf(req.params.id);
  user.favoriteList.splice(removeIndex, 1);
  user.save().then(user => {
    Post.findById({ _id: req.params.id })
      .populate("user", ["name", "imgUrl"])
      .then(post => {
        post.favoriteCount -= 1;
        post.save().then(data => res.send({ user: user, post: data }));
      });
  });
});

router.delete("/follow/:id", authenicate, (req, res) => {
  let user = req.user;
  let removeIndex = user.followList.indexOf(req.params.id);
  user.followList.splice(removeIndex, 1);
  user.save().then(user => res.send(user));
});

module.exports = router;
